/**
 * Mock data provider for development and demonstration
 * This provides realistic data when the database is unavailable
 */

export const mockMessages = [
  {
    id: 1,
    userId: 1,
    channel: 'whatsapp',
    sender: 'Priya Sharma',
    content: 'Interested in automation for our sales team',
    isRead: false,
    isPriority: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
  },
  {
    id: 2,
    userId: 1,
    channel: 'gmail',
    sender: 'James Carter',
    content: 'Partnership opportunity - let\'s discuss',
    isRead: false,
    isPriority: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
  },
  {
    id: 3,
    userId: 1,
    channel: 'linkedin',
    sender: 'Sophie Lin',
    content: 'Great article on workflow automation!',
    isRead: true,
    isPriority: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
  },
  {
    id: 4,
    userId: 1,
    channel: 'instagram',
    sender: '@smartechywizard',
    content: 'Can I collaborate on a project?',
    isRead: true,
    isPriority: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
  },
  {
    id: 5,
    userId: 1,
    channel: 'slack',
    sender: 'Ethan Brooks',
    content: 'Support: AI workflow not saving',
    isRead: true,
    isPriority: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 360), // 6 hours ago
  },
  {
    id: 6,
    userId: 1,
    channel: 'discord',
    sender: 'Olivia Bennett',
    content: 'Feedback on onboarding process',
    isRead: true,
    isPriority: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 480), // 8 hours ago
  },
];

export const mockToolIntegrations = [
  { id: 1, userId: 1, toolName: 'Gmail', status: 'connected', apiKey: 'key_gmail' },
  { id: 2, userId: 1, toolName: 'WhatsApp Business', status: 'connected', apiKey: 'key_whatsapp' },
  { id: 3, userId: 1, toolName: 'Slack', status: 'connected', apiKey: 'key_slack' },
  { id: 4, userId: 1, toolName: 'LinkedIn', status: 'rate_limited', apiKey: 'key_linkedin' },
  { id: 5, userId: 1, toolName: 'Instagram DM', status: 'connected', apiKey: 'key_instagram' },
  { id: 6, userId: 1, toolName: 'Discord', status: 'connected', apiKey: 'key_discord' },
  { id: 7, userId: 1, toolName: 'Paystack', status: 'connected', apiKey: 'key_paystack' },
  { id: 8, userId: 1, toolName: 'Flutterwave', status: 'connected', apiKey: 'key_flutterwave' },
];

export const mockAutomations = [
  {
    id: 1,
    userId: 1,
    name: 'WhatsApp to CRM',
    trigger: 'whatsapp_message',
    action: 'create_contact',
    status: 'active',
    createdAt: new Date(),
  },
  {
    id: 2,
    userId: 1,
    name: 'Email to Task',
    trigger: 'email_received',
    action: 'create_task',
    status: 'active',
    createdAt: new Date(),
  },
  {
    id: 3,
    userId: 1,
    name: 'Lead Detection',
    trigger: 'message_contains_keyword',
    action: 'tag_as_lead',
    status: 'active',
    createdAt: new Date(),
  },
  {
    id: 4,
    userId: 1,
    name: 'Auto-Reply',
    trigger: 'message_received',
    action: 'send_reply',
    status: 'active',
    createdAt: new Date(),
  },
  {
    id: 5,
    userId: 1,
    name: 'Slack Notification',
    trigger: 'automation_completed',
    action: 'send_slack_message',
    status: 'paused',
    createdAt: new Date(),
  },
  {
    id: 6,
    userId: 1,
    name: 'Payment Processing',
    trigger: 'payment_received',
    action: 'update_invoice',
    status: 'paused',
    createdAt: new Date(),
  },
];

export const mockAgents = [
  {
    id: 1,
    userId: 1,
    name: 'Sales Assistant',
    description: 'Helps with sales inquiries and lead qualification',
    status: 'active',
    createdAt: new Date(),
  },
  {
    id: 2,
    userId: 1,
    name: 'Support Agent',
    description: 'Handles customer support requests',
    status: 'active',
    createdAt: new Date(),
  },
  {
    id: 3,
    userId: 1,
    name: 'Lead Qualifier',
    description: 'Qualifies and scores leads automatically',
    status: 'active',
    createdAt: new Date(),
  },
  {
    id: 4,
    userId: 1,
    name: 'Task Manager',
    description: 'Creates and manages tasks from messages',
    status: 'active',
    createdAt: new Date(),
  },
];

export const mockActivityFeed = [
  {
    id: 1,
    userId: 1,
    type: 'message',
    description: 'WhatsApp lead converted to CRM',
    icon: 'whatsapp',
    createdAt: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    id: 2,
    userId: 1,
    type: 'automation',
    description: 'ClickUp task created from Gmail',
    icon: 'mail',
    createdAt: new Date(Date.now() - 1000 * 60 * 20),
  },
  {
    id: 3,
    userId: 1,
    type: 'sync',
    description: 'LinkedIn DM added to CRM',
    icon: 'linkedin',
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: 4,
    userId: 1,
    type: 'automation',
    description: 'Obsidian note synced to workspace',
    icon: 'note',
    createdAt: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: 5,
    userId: 1,
    type: 'report',
    description: 'Weekly pipeline summary generated',
    icon: 'chart',
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: 6,
    userId: 1,
    type: 'message',
    description: 'Slack message tagged as urgent',
    icon: 'slack',
    createdAt: new Date(Date.now() - 1000 * 60 * 90),
  },
  {
    id: 7,
    userId: 1,
    type: 'sync',
    description: 'Instagram DM rate-limited',
    icon: 'instagram',
    createdAt: new Date(Date.now() - 1000 * 60 * 120),
  },
];

export const mockNotifications = [
  {
    id: 1,
    userId: 1,
    title: 'New Lead Detected',
    message: 'Hot lead from website - Priya Sharma',
    type: 'lead',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: 2,
    userId: 1,
    title: 'Automation Triggered',
    message: 'Email to CRM automation ran successfully',
    type: 'automation',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: 3,
    userId: 1,
    title: 'Tool Connection Failed',
    message: 'Slack API connection error - please reconnect',
    type: 'error',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
];
