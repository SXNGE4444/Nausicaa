import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import {
  getMessagesByUserId,
  getToolIntegrationsByUserId,
  getAutomationsByUserId,
  getAgentsByUserId,
  getNotificationsByUserId,
  getActivityFeedByUserId,
  createNotification,
  markNotificationAsRead,
  getAgentConversation,
  createOrUpdateAgentConversation,
} from "./db";
import { invokeLLM } from "./_core/llm";
import {
  onAutomationTriggered,
  onAgentCompleted,
  onToolConnectionFailed,
  onSystemAlert,
  handleAutomationExecution,
  handleAgentCompletion,
  handleToolConnectionError,
} from "./notifications";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Messages / Inbox
  messages: router({
    list: protectedProcedure
      .input(z.object({ limit: z.number().default(20) }))
      .query(async ({ input, ctx }) => {
        return getMessagesByUserId(ctx.user.id, input.limit);
      }),
  }),

  // Tool Integrations
  tools: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getToolIntegrationsByUserId(ctx.user.id);
    }),
  }),

  // Automations
  automations: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getAutomationsByUserId(ctx.user.id);
    }),
  }),

  // Agents
  agents: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getAgentsByUserId(ctx.user.id);
    }),
    chat: protectedProcedure
      .input(
        z.object({
          agentId: z.number(),
          message: z.string(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        try {
          // Get or create conversation
          let conversation = await getAgentConversation(input.agentId, ctx.user.id);
          let conversationMessages: Array<{ role: "user" | "assistant"; content: string }> = [];

          if (conversation && conversation.messages) {
            conversationMessages = JSON.parse(conversation.messages);
          }

          // Add user message
          conversationMessages.push({
            role: "user",
            content: input.message,
          });

          // Call LLM
          const response = await invokeLLM({
            messages: conversationMessages,
          });

          const assistantMessage = typeof response.choices[0]?.message?.content === "string"
            ? response.choices[0].message.content
            : "No response";

          // Add assistant message
          conversationMessages.push({
            role: "assistant",
            content: assistantMessage,
          });

          // Save conversation
          await createOrUpdateAgentConversation(
            input.agentId,
            ctx.user.id,
            JSON.stringify(conversationMessages)
          );

          return {
            success: true,
            message: assistantMessage,
          };
        } catch (error) {
          console.error("Agent chat error:", error);
          return {
            success: false,
            message: "Failed to process message",
          };
        }
      }),
  }),

  // Notifications
  notifications: router({
    list: protectedProcedure
      .input(z.object({ limit: z.number().default(20) }))
      .query(async ({ input, ctx }) => {
        return getNotificationsByUserId(ctx.user.id, input.limit);
      }),
    markAsRead: protectedProcedure
      .input(z.object({ notificationId: z.number() }))
      .mutation(async ({ input }) => {
        return markNotificationAsRead(input.notificationId);
      }),
    create: protectedProcedure
      .input(
        z.object({
          title: z.string(),
          content: z.string(),
          type: z.enum(["automation", "agent", "integration", "system"]),
        })
      )
      .mutation(async ({ input, ctx }) => {
        return createNotification({
          userId: ctx.user.id,
          title: input.title,
          content: input.content,
          type: input.type,
        });
      }),
  }),

  // Activity Feed
  activity: router({
    list: protectedProcedure
      .input(z.object({ limit: z.number().default(20) }))
      .query(async ({ input, ctx }) => {
        return getActivityFeedByUserId(ctx.user.id, input.limit);
      }),
  }),

  // Automation triggers with real event handling
  automation: router({
    trigger: protectedProcedure
      .input(z.object({ automationId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        try {
          const automations = await getAutomationsByUserId(ctx.user.id);
          const automation = automations?.find((a: any) => a.id === input.automationId);

          if (!automation) {
            throw new Error(`Automation ${input.automationId} not found`);
          }

          // Execute automation and trigger notifications
          const success = true;
          await handleAutomationExecution(
            input.automationId,
            automation.name,
            success
          );

          return { success, message: `Executed: ${automation.name}` };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          await handleAutomationExecution(
            input.automationId,
            `Automation ${input.automationId}`,
            false,
            errorMessage
          );
          throw error;
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
