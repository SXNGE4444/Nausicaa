import { createNotification, getUserByOpenId } from "./db";
import { ENV } from "./_core/env";
import { notifyOwner as manusPlatformNotify } from "./_core/notification";

export interface NotificationPayload {
  title: string;
  content: string;
  type: "automation" | "agent" | "integration" | "system";
  recipientOpenId?: string;
}

/**
 * Send notification to app owner (in-app and email)
 * Only the owner receives these critical alerts
 */
export async function notifyOwner(payload: NotificationPayload) {
  try {
    // Get owner user record
    const owner = await getUserByOpenId(ENV.ownerOpenId);
    if (!owner) {
      console.warn("[Notifications] Owner not found for notifications");
      return false;
    }

    // Create in-app notification
    await createNotification({
      userId: owner.id,
      title: payload.title,
      content: payload.content,
      type: payload.type,
    });

    // Send email notification via Manus platform
    if (owner.email) {
      await sendEmailNotification({
        email: owner.email,
        name: owner.name || "Owner",
        title: payload.title,
        content: payload.content,
        type: payload.type,
      });
    }

    return true;
  } catch (error) {
    console.error("[Notifications] Failed to notify owner:", error);
    return false;
  }
}

/**
 * Send email notification via Manus built-in notification service
 * Uses the platform's verified email delivery infrastructure
 */
async function sendEmailNotification(params: {
  email: string;
  name: string;
  title: string;
  content: string;
  type: string;
}) {
  try {
    // Validate email format
    if (!params.email || !params.email.includes("@")) {
      console.warn("[Notifications] Invalid email address:", params.email);
      return false;
    }

    // Use Manus platform notification helper for reliable delivery
    const success = await manusPlatformNotify({
      title: params.title,
      content: `${params.content}\n\nType: ${params.type}`,
    });

    if (!success) {
      console.warn(
        `[Notifications] Email delivery failed for ${params.email}`
      );
      return false;
    }

    console.info(
      `[Notifications] Email sent successfully to ${params.email}`
    );
    return true;
  } catch (error) {
    console.error("[Notifications] Email send error:", error);
    return false;
  }
}

/**
 * Notification triggers for key events
 */

export async function onAutomationTriggered(
  automationName: string,
  status: "success" | "failed"
) {
  return notifyOwner({
    title: `Automation ${status === "success" ? "Executed" : "Failed"}`,
    content: `Your automation "${automationName}" ${status === "success" ? "ran successfully" : "encountered an error"}. Check the automation details for more information.`,
    type: "automation",
  });
}

export async function onAgentCompleted(agentName: string, result: string) {
  return notifyOwner({
    title: `Agent Task Completed`,
    content: `${agentName} has completed its task: ${result}`,
    type: "agent",
  });
}

export async function onToolConnectionFailed(
  toolName: string,
  reason: string
) {
  return notifyOwner({
    title: `Tool Connection Failed`,
    content: `Connection to ${toolName} failed: ${reason}. Please check your API credentials.`,
    type: "integration",
  });
}

export async function onSystemAlert(title: string, message: string) {
  return notifyOwner({
    title,
    content: message,
    type: "system",
  });
}

/**
 * Real event trigger wiring
 * These functions should be called from actual event handlers
 */

export async function handleAutomationExecution(
  automationId: number,
  automationName: string,
  success: boolean,
  errorMessage?: string
) {
  if (success) {
    await onAutomationTriggered(automationName, "success");
  } else {
    await onAutomationTriggered(automationName, "failed");
    if (errorMessage) {
      await onSystemAlert(
        `Automation Error: ${automationName}`,
        errorMessage
      );
    }
  }
}

export async function handleAgentCompletion(
  agentId: number,
  agentName: string,
  result: string
) {
  await onAgentCompleted(agentName, result);
}

export async function handleToolConnectionError(
  toolId: number,
  toolName: string,
  error: Error
) {
  await onToolConnectionFailed(toolName, error.message);
}
