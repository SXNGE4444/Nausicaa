/**
 * Automation Templates and Marketplace
 * Pre-built automation workflows for South African businesses
 */

export interface AutomationTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  icon: string;
  triggers: string[];
  actions: string[];
  estimated_time: number; // in minutes
  popularity: number; // 1-5 stars
  uses: number;
}

export const AUTOMATION_TEMPLATES: Record<string, AutomationTemplate> = {
  whatsapp_to_crm: {
    id: "whatsapp_to_crm",
    name: "WhatsApp to CRM",
    description: "Automatically save WhatsApp messages to your CRM",
    category: "crm",
    difficulty: "easy",
    icon: "💬",
    triggers: ["New WhatsApp message"],
    actions: ["Create CRM contact", "Add to deal", "Send email"],
    estimated_time: 5,
    popularity: 5,
    uses: 2341,
  },
  email_to_task: {
    id: "email_to_task",
    name: "Email to Task",
    description: "Convert emails to tasks automatically",
    category: "productivity",
    difficulty: "easy",
    icon: "📧",
    triggers: ["New email from specific sender"],
    actions: ["Create task", "Assign to team", "Set reminder"],
    estimated_time: 3,
    popularity: 5,
    uses: 1892,
  },
  payment_notification: {
    id: "payment_notification",
    name: "Payment Notification",
    description: "Get notified when payments are received",
    category: "payments",
    difficulty: "medium",
    icon: "💳",
    triggers: ["Payment received"],
    actions: ["Send SMS", "Create invoice", "Update CRM"],
    estimated_time: 10,
    popularity: 4,
    uses: 1456,
  },
  lead_scoring: {
    id: "lead_scoring",
    name: "Lead Scoring",
    description: "Automatically score leads based on engagement",
    category: "sales",
    difficulty: "hard",
    icon: "⭐",
    triggers: ["Email opened", "Link clicked", "Form submitted"],
    actions: ["Update lead score", "Notify sales team", "Create task"],
    estimated_time: 20,
    popularity: 5,
    uses: 987,
  },
  customer_onboarding: {
    id: "customer_onboarding",
    name: "Customer Onboarding",
    description: "Automated onboarding sequence for new customers",
    category: "customer_success",
    difficulty: "hard",
    icon: "🎯",
    triggers: ["New customer signup"],
    actions: ["Send welcome email", "Create account", "Schedule call"],
    estimated_time: 30,
    popularity: 5,
    uses: 756,
  },
  invoice_reminder: {
    id: "invoice_reminder",
    name: "Invoice Reminder",
    description: "Send automatic payment reminders",
    category: "finance",
    difficulty: "medium",
    icon: "📋",
    triggers: ["Invoice due date approaching"],
    actions: ["Send email", "Send SMS", "Create task"],
    estimated_time: 15,
    popularity: 4,
    uses: 1234,
  },
  slack_notification: {
    id: "slack_notification",
    name: "Slack Notifications",
    description: "Send Slack notifications for important events",
    category: "notifications",
    difficulty: "easy",
    icon: "🔔",
    triggers: ["New lead", "Payment received", "Task completed"],
    actions: ["Send Slack message", "Create channel", "Mention team"],
    estimated_time: 5,
    popularity: 5,
    uses: 2156,
  },
  data_sync: {
    id: "data_sync",
    name: "Data Sync",
    description: "Keep data synchronized across multiple tools",
    category: "integration",
    difficulty: "hard",
    icon: "🔄",
    triggers: ["Data updated in source"],
    actions: ["Update in destination", "Log changes", "Send notification"],
    estimated_time: 25,
    popularity: 4,
    uses: 654,
  },
};

/**
 * Get all automation templates
 */
export function getAutomationTemplates() {
  return Object.values(AUTOMATION_TEMPLATES);
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category: string) {
  return Object.values(AUTOMATION_TEMPLATES).filter((t) => t.category === category);
}

/**
 * Get popular templates
 */
export function getPopularTemplates(limit: number = 5) {
  return Object.values(AUTOMATION_TEMPLATES)
    .sort((a, b) => b.popularity - a.popularity || b.uses - a.uses)
    .slice(0, limit);
}

/**
 * Get templates by difficulty
 */
export function getTemplatesByDifficulty(difficulty: "easy" | "medium" | "hard") {
  return Object.values(AUTOMATION_TEMPLATES).filter((t) => t.difficulty === difficulty);
}

/**
 * Search templates
 */
export function searchTemplates(query: string) {
  const lowerQuery = query.toLowerCase();
  return Object.values(AUTOMATION_TEMPLATES).filter(
    (t) =>
      t.name.toLowerCase().includes(lowerQuery) ||
      t.description.toLowerCase().includes(lowerQuery) ||
      t.category.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get template categories
 */
export function getTemplateCategories() {
  const categories = new Set(Object.values(AUTOMATION_TEMPLATES).map((t) => t.category));
  return Array.from(categories);
}

/**
 * Create automation from template
 */
export async function createAutomationFromTemplate(
  templateId: string,
  userId: number,
  customization: Record<string, any>
) {
  const template = AUTOMATION_TEMPLATES[templateId];
  if (!template) {
    throw new Error(`Template ${templateId} not found`);
  }

  return {
    id: Math.random(),
    name: customization.name || template.name,
    description: template.description,
    template_id: templateId,
    user_id: userId,
    triggers: template.triggers,
    actions: template.actions,
    status: "active",
    created_at: new Date().toISOString(),
  };
}

/**
 * Get South Africa specific templates
 */
export function getSouthAfricaTemplates() {
  return {
    payments: getTemplatesByCategory("payments"),
    crm: getTemplatesByCategory("crm"),
    sales: getTemplatesByCategory("sales"),
    customer_success: getTemplatesByCategory("customer_success"),
    finance: getTemplatesByCategory("finance"),
    popular: getPopularTemplates(10),
  };
}
