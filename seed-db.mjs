import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL not set in .env.local');
  process.exit(1);
}

// Parse DATABASE_URL
const url = new URL(`mysql://${DATABASE_URL}`);
const connection = await mysql.createConnection({
  host: url.hostname,
  user: url.username,
  password: url.password,
  database: url.pathname.split('/')[1],
  port: url.port || 3306,
});

console.log('Connected to database');

try {
  // Clear existing data
  console.log('Clearing existing data...');
  await connection.execute('DELETE FROM activityFeed');
  await connection.execute('DELETE FROM notifications');
  await connection.execute('DELETE FROM agentConversations');
  await connection.execute('DELETE FROM agents');
  await connection.execute('DELETE FROM automations');
  await connection.execute('DELETE FROM toolIntegrations');
  await connection.execute('DELETE FROM messages');
  await connection.execute('DELETE FROM users');

  // Insert test user
  console.log('Inserting test user...');
  const [userResult] = await connection.execute(
    'INSERT INTO users (openId, name, email, loginMethod, role, createdAt, updatedAt, lastSignedIn) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), NOW())',
    ['test-user-123', 'Alex Morgan', 'alex@example.com', 'manus', 'user']
  );
  const userId = userResult.insertId;
  console.log(`Created user with ID: ${userId}`);

  // Insert messages
  console.log('Inserting messages...');
  const messageChannels = ['gmail', 'whatsapp', 'linkedin', 'instagram', 'slack', 'discord'];
  const senders = [
    { name: 'Priya Sharma', channel: 'whatsapp' },
    { name: 'James Carter', channel: 'gmail' },
    { name: 'Sophie Lin', channel: 'linkedin' },
    { name: '@smartechywizard', channel: 'instagram' },
    { name: 'Ethan Brooks', channel: 'slack' },
    { name: 'Olivia Bennett', channel: 'discord' },
  ];

  for (let i = 0; i < 12; i++) {
    const sender = senders[i % senders.length];
    await connection.execute(
      'INSERT INTO messages (userId, channel, sender, content, isRead, isPriority, createdAt) VALUES (?, ?, ?, ?, ?, ?, NOW())',
      [
        userId,
        sender.channel,
        sender.name,
        `Message ${i + 1}: This is a test message from ${sender.name}`,
        i > 5,
        i < 3,
      ]
    );
  }
  console.log('Inserted 12 messages');

  // Insert tool integrations
  console.log('Inserting tool integrations...');
  const tools = [
    { name: 'Gmail', status: 'connected' },
    { name: 'WhatsApp Business', status: 'connected' },
    { name: 'Slack', status: 'connected' },
    { name: 'LinkedIn', status: 'rate_limited' },
    { name: 'Instagram DM', status: 'connected' },
    { name: 'Discord', status: 'connected' },
    { name: 'Paystack', status: 'connected' },
    { name: 'Flutterwave', status: 'connected' },
  ];

  for (const tool of tools) {
    await connection.execute(
      'INSERT INTO toolIntegrations (userId, toolName, status, apiKey, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())',
      [userId, tool.name, tool.status, `key_${tool.name.toLowerCase().replace(/\s/g, '_')}`]
    );
  }
  console.log('Inserted 8 tool integrations');

  // Insert automations
  console.log('Inserting automations...');
  const automationNames = [
    'WhatsApp to CRM',
    'Email to Task',
    'Lead Detection',
    'Auto-Reply',
    'Slack Notification',
    'Payment Processing',
  ];

  for (let i = 0; i < 6; i++) {
    await connection.execute(
      'INSERT INTO automations (userId, name, trigger, action, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
      [
        userId,
        automationNames[i],
        `trigger_${i}`,
        `action_${i}`,
        i < 4 ? 'active' : 'paused',
      ]
    );
  }
  console.log('Inserted 6 automations');

  // Insert agents
  console.log('Inserting agents...');
  const agentNames = [
    'Sales Assistant',
    'Support Agent',
    'Lead Qualifier',
    'Task Manager',
  ];

  for (const agentName of agentNames) {
    await connection.execute(
      'INSERT INTO agents (userId, name, description, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())',
      [userId, agentName, `${agentName} agent for automation`, 'active']
    );
  }
  console.log('Inserted 4 agents');

  // Insert activity feed
  console.log('Inserting activity feed...');
  const activities = [
    { type: 'message', description: 'WhatsApp lead converted to CRM', icon: 'whatsapp' },
    { type: 'automation', description: 'ClickUp task created from Gmail', icon: 'mail' },
    { type: 'sync', description: 'LinkedIn DM added to CRM', icon: 'linkedin' },
    { type: 'automation', description: 'Obsidian note synced to workspace', icon: 'note' },
    { type: 'report', description: 'Weekly pipeline summary generated', icon: 'chart' },
    { type: 'message', description: 'Slack message tagged as urgent', icon: 'slack' },
    { type: 'sync', description: 'Instagram DM rate-limited', icon: 'instagram' },
  ];

  for (let i = 0; i < activities.length; i++) {
    const activity = activities[i];
    const hoursAgo = (i + 1) * 2;
    await connection.execute(
      'INSERT INTO activityFeed (userId, type, description, icon, createdAt) VALUES (?, ?, ?, ?, DATE_SUB(NOW(), INTERVAL ? HOUR))',
      [userId, activity.type, activity.description, activity.icon, hoursAgo]
    );
  }
  console.log('Inserted 7 activity feed items');

  // Insert notifications
  console.log('Inserting notifications...');
  const notifications = [
    { title: 'New Lead', message: 'Hot lead detected from website', type: 'lead' },
    { title: 'Automation Triggered', message: 'Email to CRM automation ran successfully', type: 'automation' },
    { title: 'Tool Connection Failed', message: 'Slack API connection error', type: 'error' },
  ];

  for (const notif of notifications) {
    await connection.execute(
      'INSERT INTO notifications (userId, title, message, type, isRead, createdAt) VALUES (?, ?, ?, ?, ?, NOW())',
      [userId, notif.title, notif.message, notif.type, false]
    );
  }
  console.log('Inserted 3 notifications');

  console.log('\n✅ Database seeded successfully!');
  console.log(`User ID: ${userId}`);
  console.log('Data inserted:');
  console.log('  - 1 user');
  console.log('  - 12 messages');
  console.log('  - 8 tool integrations');
  console.log('  - 6 automations');
  console.log('  - 4 agents');
  console.log('  - 7 activity feed items');
  console.log('  - 3 notifications');

} catch (error) {
  console.error('Error seeding database:', error);
  process.exit(1);
} finally {
  await connection.end();
}
