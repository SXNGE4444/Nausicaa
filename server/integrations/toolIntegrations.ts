/**
 * Tool Integrations Module
 * Manages connections to external tools and services
 */

export interface ToolIntegration {
  id: string;
  name: string;
  description: string;
  category: "messaging" | "email" | "crm" | "analytics" | "payment" | "automation";
  icon: string;
  status: "connected" | "disconnected" | "error";
  requires_auth: boolean;
  auth_type: "oauth" | "api_key" | "webhook";
  features: string[];
}

export const AVAILABLE_TOOLS: Record<string, ToolIntegration> = {
  whatsapp: {
    id: "whatsapp",
    name: "WhatsApp Business",
    description: "Send and receive messages via WhatsApp Business API",
    category: "messaging",
    icon: "💬",
    status: "disconnected",
    requires_auth: true,
    auth_type: "oauth",
    features: ["Send messages", "Receive messages", "Media sharing", "Group chats"],
  },
  slack: {
    id: "slack",
    name: "Slack",
    description: "Integrate with Slack for team communication",
    category: "messaging",
    icon: "🔗",
    status: "disconnected",
    requires_auth: true,
    auth_type: "oauth",
    features: ["Send messages", "Create channels", "Notifications", "Workflows"],
  },
  gmail: {
    id: "gmail",
    name: "Gmail",
    description: "Connect your Gmail account for email automation",
    category: "email",
    icon: "📧",
    status: "disconnected",
    requires_auth: true,
    auth_type: "oauth",
    features: ["Send emails", "Receive emails", "Labels", "Attachments"],
  },
  stripe: {
    id: "stripe",
    name: "Stripe",
    description: "Accept payments and manage subscriptions",
    category: "payment",
    icon: "💳",
    status: "disconnected",
    requires_auth: true,
    auth_type: "api_key",
    features: ["Payments", "Subscriptions", "Invoices", "Payouts"],
  },
  paystack: {
    id: "paystack",
    name: "Paystack",
    description: "South African payment processing",
    category: "payment",
    icon: "🏦",
    status: "disconnected",
    requires_auth: true,
    auth_type: "api_key",
    features: ["Payments", "Transfers", "Settlements", "Disputes"],
  },
  flutterwave: {
    id: "flutterwave",
    name: "Flutterwave",
    description: "Pan-African payment platform",
    category: "payment",
    icon: "🌍",
    status: "disconnected",
    requires_auth: true,
    auth_type: "api_key",
    features: ["Payments", "Transfers", "Collections", "Settlements"],
  },
  hubspot: {
    id: "hubspot",
    name: "HubSpot",
    description: "CRM and marketing automation",
    category: "crm",
    icon: "📊",
    status: "disconnected",
    requires_auth: true,
    auth_type: "oauth",
    features: ["Contacts", "Deals", "Emails", "Forms"],
  },
  salesforce: {
    id: "salesforce",
    name: "Salesforce",
    description: "Enterprise CRM platform",
    category: "crm",
    icon: "☁️",
    status: "disconnected",
    requires_auth: true,
    auth_type: "oauth",
    features: ["Leads", "Accounts", "Opportunities", "Reports"],
  },
  google_analytics: {
    id: "google_analytics",
    name: "Google Analytics",
    description: "Website and app analytics",
    category: "analytics",
    icon: "📈",
    status: "disconnected",
    requires_auth: true,
    auth_type: "oauth",
    features: ["Traffic", "Conversions", "Events", "Reports"],
  },
  zapier: {
    id: "zapier",
    name: "Zapier",
    description: "Connect 5000+ apps",
    category: "automation",
    icon: "⚡",
    status: "disconnected",
    requires_auth: true,
    auth_type: "webhook",
    features: ["Zaps", "Webhooks", "Multi-step workflows"],
  },
};

/**
 * Get all available tools
 */
export function getAvailableTools() {
  return Object.values(AVAILABLE_TOOLS);
}

/**
 * Get tools by category
 */
export function getToolsByCategory(category: ToolIntegration["category"]) {
  return Object.values(AVAILABLE_TOOLS).filter((tool) => tool.category === category);
}

/**
 * Get South Africa specific tools
 */
export function getSouthAfricaTools() {
  return {
    messaging: getToolsByCategory("messaging"),
    payment: [AVAILABLE_TOOLS.paystack, AVAILABLE_TOOLS.flutterwave, AVAILABLE_TOOLS.stripe],
    crm: getToolsByCategory("crm"),
    email: getToolsByCategory("email"),
    analytics: getToolsByCategory("analytics"),
  };
}

/**
 * Connect a tool
 */
export async function connectTool(toolId: string, credentials: Record<string, any>) {
  const tool = AVAILABLE_TOOLS[toolId];
  if (!tool) {
    throw new Error(`Tool ${toolId} not found`);
  }

  // Validate credentials based on auth type
  if (tool.auth_type === "api_key" && !credentials.api_key) {
    throw new Error("API key required");
  }

  if (tool.auth_type === "oauth" && !credentials.access_token) {
    throw new Error("OAuth token required");
  }

  return {
    success: true,
    tool_id: toolId,
    connected_at: new Date().toISOString(),
    status: "connected",
  };
}

/**
 * Disconnect a tool
 */
export async function disconnectTool(toolId: string) {
  return {
    success: true,
    tool_id: toolId,
    disconnected_at: new Date().toISOString(),
    status: "disconnected",
  };
}

/**
 * Get tool connection status
 */
export async function getToolStatus(toolId: string) {
  const tool = AVAILABLE_TOOLS[toolId];
  if (!tool) {
    throw new Error(`Tool ${toolId} not found`);
  }

  return {
    tool_id: toolId,
    name: tool.name,
    status: tool.status,
    last_checked: new Date().toISOString(),
  };
}

/**
 * Test tool connection
 */
export async function testToolConnection(toolId: string) {
  const tool = AVAILABLE_TOOLS[toolId];
  if (!tool) {
    throw new Error(`Tool ${toolId} not found`);
  }

  // Simulate connection test
  const isConnected = Math.random() > 0.2; // 80% success rate

  return {
    tool_id: toolId,
    connected: isConnected,
    message: isConnected ? "Connection successful" : "Connection failed",
    timestamp: new Date().toISOString(),
  };
}
