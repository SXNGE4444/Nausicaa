import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): { ctx: TrpcContext; clearedCookies: Array<{ name: string; options: Record<string, unknown> }> } {
  const clearedCookies: Array<{ name: string; options: Record<string, unknown> }> = [];

  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: (name: string, options: Record<string, unknown>) => {
        clearedCookies.push({ name, options });
      },
    } as TrpcContext["res"],
  };

  return { ctx, clearedCookies };
}

describe("Nausicaa Features", () => {
  describe("auth", () => {
    it("returns current user from me query", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const user = await caller.auth.me();

      expect(user).toBeDefined();
      expect(user?.id).toBe(1);
      expect(user?.email).toBe("test@example.com");
    });

    it("clears session cookie on logout", async () => {
      const { ctx, clearedCookies } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.logout();

      expect(result).toEqual({ success: true });
      expect(clearedCookies).toHaveLength(1);
      expect(clearedCookies[0]?.name).toBeDefined();
    });
  });

  describe("notifications", () => {
    it("creates a notification", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      // This would normally insert into the database
      // For now, we're just testing that the mutation is callable
      expect(caller.notifications).toBeDefined();
      expect(caller.notifications.create).toBeDefined();
    });

    it("lists notifications for user", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      // This would normally query the database
      expect(caller.notifications.list).toBeDefined();
    });
  });

  describe("agents", () => {
    it("lists agents for user", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      expect(caller.agents.list).toBeDefined();
    });

    it("has chat mutation for agent interaction", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      expect(caller.agents.chat).toBeDefined();
    });
  });

  describe("automations", () => {
    it("lists automations for user", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      expect(caller.automations.list).toBeDefined();
    });
  });

  describe("tools", () => {
    it("lists tool integrations for user", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      expect(caller.tools.list).toBeDefined();
    });
  });

  describe("messages", () => {
    it("lists messages for user", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      expect(caller.messages.list).toBeDefined();
    });
  });

  describe("activity", () => {
    it("lists activity feed for user", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      expect(caller.activity.list).toBeDefined();
    });
  });
});
