import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  messages,
  toolIntegrations,
  automations,
  agents,
  agentConversations,
  notifications,
  activityFeed,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.openId, openId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Messages
export async function getMessagesByUserId(userId: number, limit = 20) {
  const db = await getDb();
  if (!db) {
    // Return mock data for development
    const { mockMessages } = await import('./mockData');
    return mockMessages.slice(0, limit);
  }

  return db
    .select()
    .from(messages)
    .where(eq(messages.userId, userId))
    .orderBy(desc(messages.createdAt))
    .limit(limit);
}

export async function createMessage(data: typeof messages.$inferInsert) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.insert(messages).values(data);
  return result;
}

// Tool Integrations
export async function getToolIntegrationsByUserId(userId: number) {
  const db = await getDb();
  if (!db) {
    // Return mock data for development
    const { mockToolIntegrations } = await import('./mockData');
    return mockToolIntegrations;
  }

  return db
    .select()
    .from(toolIntegrations)
    .where(eq(toolIntegrations.userId, userId));
}

export async function createToolIntegration(data: typeof toolIntegrations.$inferInsert) {
  const db = await getDb();
  if (!db) return null;

  return db.insert(toolIntegrations).values(data);
}

// Automations
export async function getAutomationsByUserId(userId: number) {
  const db = await getDb();
  if (!db) {
    // Return mock data for development
    const { mockAutomations } = await import('./mockData');
    return mockAutomations;
  }

  return db
    .select()
    .from(automations)
    .where(eq(automations.userId, userId))
    .orderBy(desc(automations.createdAt));
}

export async function createAutomation(data: typeof automations.$inferInsert) {
  const db = await getDb();
  if (!db) return null;

  return db.insert(automations).values(data);
}

export async function updateAutomationStatus(
  automationId: number,
  status: "active" | "paused" | "disabled"
) {
  const db = await getDb();
  if (!db) return null;

  return db
    .update(automations)
    .set({ status })
    .where(eq(automations.id, automationId));
}

// Agents
export async function getAgentsByUserId(userId: number) {
  const db = await getDb();
  if (!db) {
    // Return mock data for development
    const { mockAgents } = await import('./mockData');
    return mockAgents;
  }

  return db
    .select()
    .from(agents)
    .where(eq(agents.userId, userId))
    .orderBy(desc(agents.createdAt));
}

export async function createAgent(data: typeof agents.$inferInsert) {
  const db = await getDb();
  if (!db) return null;

  return db.insert(agents).values(data);
}

// Agent Conversations
export async function getAgentConversation(agentId: number, userId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(agentConversations)
    .where(
      and(
        eq(agentConversations.agentId, agentId),
        eq(agentConversations.userId, userId)
      )
    )
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function createOrUpdateAgentConversation(
  agentId: number,
  userId: number,
  messages: string
) {
  const db = await getDb();
  if (!db) return null;

  const existing = await getAgentConversation(agentId, userId);

  if (existing) {
    return db
      .update(agentConversations)
      .set({ messages, updatedAt: new Date() })
      .where(eq(agentConversations.id, existing.id));
  } else {
    return db.insert(agentConversations).values({
      agentId,
      userId,
      messages,
    });
  }
}

// Notifications
export async function getNotificationsByUserId(userId: number, limit = 20) {
  const db = await getDb();
  if (!db) {
    // Return mock data for development
    const { mockNotifications } = await import('./mockData');
    return mockNotifications.slice(0, limit);
  }

  return db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt))
    .limit(limit);
}

export async function createNotification(data: typeof notifications.$inferInsert) {
  const db = await getDb();
  if (!db) return null;

  return db.insert(notifications).values(data);
}

export async function markNotificationAsRead(notificationId: number) {
  const db = await getDb();
  if (!db) return null;

  return db
    .update(notifications)
    .set({ isRead: 1 })
    .where(eq(notifications.id, notificationId));
}

// Activity Feed
export async function getActivityFeedByUserId(userId: number, limit = 15) {
  const db = await getDb();
  if (!db) {
    // Return mock data for development
    const { mockActivityFeed } = await import('./mockData');
    return mockActivityFeed.slice(0, limit);
  }

  return db
    .select()
    .from(activityFeed)
    .where(eq(activityFeed.userId, userId))
    .orderBy(desc(activityFeed.createdAt))
    .limit(limit);
}

export async function createActivityFeedEntry(data: typeof activityFeed.$inferInsert) {
  const db = await getDb();
  if (!db) return null;

  return db.insert(activityFeed).values(data);
}
