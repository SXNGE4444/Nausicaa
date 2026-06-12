import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Messages table for unified inbox
 */
export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  channel: varchar("channel", { length: 64 }).notNull(), // gmail, whatsapp, linkedin, slack, discord, etc
  sender: varchar("sender", { length: 255 }).notNull(),
  subject: text("subject"),
  content: text("content").notNull(),
  status: mysqlEnum("status", ["unread", "read", "archived"]).default("unread").notNull(),
  priority: mysqlEnum("priority", ["normal", "high", "urgent"]).default("normal").notNull(),
  isLead: int("isLead").default(0).notNull(), // 0 or 1 for boolean
  aiDraft: text("aiDraft"),
  externalId: varchar("externalId", { length: 255 }).unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

/**
 * Tool integrations table
 */
export const toolIntegrations = mysqlTable("toolIntegrations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  toolName: varchar("toolName", { length: 128 }).notNull(),
  category: varchar("category", { length: 64 }).notNull(), // email, communication, project-mgmt, automation, etc
  status: mysqlEnum("status", ["connected", "disconnected", "error"]).default("disconnected").notNull(),
  apiKeyEncrypted: text("apiKeyEncrypted"), // encrypted API key
  config: text("config"), // JSON config
  lastSyncedAt: timestamp("lastSyncedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ToolIntegration = typeof toolIntegrations.$inferSelect;
export type InsertToolIntegration = typeof toolIntegrations.$inferInsert;

/**
 * Automations table
 */
export const automations = mysqlTable("automations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  trigger: text("trigger").notNull(), // JSON trigger config
  actions: text("actions").notNull(), // JSON actions array
  status: mysqlEnum("status", ["active", "paused", "disabled"]).default("active").notNull(),
  successCount: int("successCount").default(0).notNull(),
  errorCount: int("errorCount").default(0).notNull(),
  lastRunAt: timestamp("lastRunAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Automation = typeof automations.$inferSelect;
export type InsertAutomation = typeof automations.$inferInsert;

/**
 * AI Agents table
 */
export const agents = mysqlTable("agents", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  systemPrompt: text("systemPrompt"),
  status: mysqlEnum("status", ["active", "idle", "error"]).default("idle").notNull(),
  model: varchar("model", { length: 128 }).default("claude-sonnet-4-6").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Agent = typeof agents.$inferSelect;
export type InsertAgent = typeof agents.$inferInsert;

/**
 * Agent conversations table
 */
export const agentConversations = mysqlTable("agentConversations", {
  id: int("id").autoincrement().primaryKey(),
  agentId: int("agentId").notNull().references(() => agents.id),
  userId: int("userId").notNull().references(() => users.id),
  messages: text("messages").notNull(), // JSON array of messages
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AgentConversation = typeof agentConversations.$inferSelect;
export type InsertAgentConversation = typeof agentConversations.$inferInsert;

/**
 * Notifications table for owner alerts
 */
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id), // owner user
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  type: mysqlEnum("type", ["automation", "agent", "integration", "system"]).notNull(),
  isRead: int("isRead").default(0).notNull(),
  emailSent: int("emailSent").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

/**
 * Activity feed table
 */
export const activityFeed = mysqlTable("activityFeed", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  action: varchar("action", { length: 128 }).notNull(), // message_synced, automation_triggered, tool_connected, etc
  description: text("description").notNull(),
  metadata: text("metadata"), // JSON metadata
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ActivityFeedEntry = typeof activityFeed.$inferSelect;
export type InsertActivityFeedEntry = typeof activityFeed.$inferInsert;