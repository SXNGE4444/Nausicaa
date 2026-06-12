# Nausicaa - Open Source AI-Powered Productivity OS for Africa

**Built by [Blanco Studio](https://blancostudio.com)**

![Nausicaa](./client/public/nausicaa-logo.png)

Nausicaa is a comprehensive, open-source AI-powered productivity and automation platform designed specifically for African businesses. Connect everything, automate anything, and run your business OS with intelligent agents, unified communications, and powerful automations.

## 🌍 Why Nausicaa for Africa?

- **African-First Design**: Built with South African market in mind (ZAR currency, Paystack, Flutterwave)
- **Offline-Ready**: Works with limited connectivity
- **Local Payment Support**: Integrated with African payment gateways
- **Open Source**: Free to use, modify, and deploy
- **Community-Driven**: Built for African entrepreneurs and teams

## ✨ Features

### 🏠 Dashboard
- Real-time metrics and KPIs
- Activity feed and quick actions
- Revenue intelligence module
- Professional Nexus OS-inspired design

### 📬 Unified Inbox
- Multi-channel message aggregation (Gmail, WhatsApp, LinkedIn, Slack, Discord)
- AI-powered lead detection
- Intelligent message prioritization
- AI-drafted replies
- Lead conversion workflows

### 🔧 Tool Integrations
- 8+ pre-built integrations
- API Key Vault with encryption
- Integration marketplace
- Real-time sync status monitoring
- Easy connect/disconnect workflows

### ⚡ Automation Hub
- Visual automation builder
- 6 pre-built templates
- Workflow marketplace
- Enable/disable toggles
- Trigger-action configuration

### 🤖 AI Agents
- Real-time LLM chat interface
- 4 specialized agents (Sales, Support, Content, Data)
- Message history and streaming
- Agent performance metrics
- Custom agent creation

### 📊 Revenue Intelligence
- Analytics dashboard
- 4 built-in modules (Cold Email Audits, Coaching Notes, LinkedIn Tactics, AI Workflow Usage)
- Performance metrics and trends
- Export functionality

### 👥 Workspaces
- Team management
- Workspace settings
- Privacy controls
- Member permissions

### 🗺️ Community Roadmap
- Feature voting system
- Public roadmap tracking
- Community engagement
- Feature request submissions

## 🚀 Quick Start

### Prerequisites
- Node.js 22+
- pnpm 10+
- MySQL/TiDB database

### Installation

```bash
# Clone the repository
git clone https://github.com/blancostudio/nausicaa.git
cd nausicaa

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run database migrations
pnpm drizzle-kit generate
pnpm drizzle-kit migrate

# Start development server
pnpm dev
```

Visit `http://localhost:3000` in your browser.

### Production Build

```bash
pnpm build
pnpm start
```

## 🔌 Integrations

### Supported Platforms
- **Email**: Gmail, Outlook
- **Chat**: WhatsApp Business, Slack, Discord
- **CRM**: HubSpot, Pipedrive
- **Payments**: Stripe, Paystack, Flutterwave
- **Social**: LinkedIn, Instagram
- **Productivity**: ClickUp, Asana, Notion

### Adding New Integrations

See `docs/INTEGRATIONS.md` for detailed integration development guide.

## 🏗️ Architecture

```
nausicaa/
├── client/                 # React 19 + Tailwind 4 frontend
│   ├── src/
│   │   ├── pages/         # Feature pages
│   │   ├── components/    # Reusable UI components
│   │   ├── lib/           # Utilities and helpers
│   │   └── contexts/      # React contexts
│   └── public/            # Static assets
├── server/                 # Express + tRPC backend
│   ├── routers.ts         # tRPC procedures
│   ├── db.ts              # Database queries
│   └── _core/             # Core infrastructure
├── drizzle/               # Database schema and migrations
├── shared/                # Shared types and constants
└── storage/               # S3 storage helpers
```

## 🔐 Security

- OAuth 2.0 authentication via Manus
- Encrypted API key storage
- Role-based access control (RBAC)
- SQL injection prevention via Drizzle ORM
- CORS protection
- Rate limiting ready

## 📚 Documentation

- [Getting Started Guide](./docs/GETTING_STARTED.md)
- [API Documentation](./docs/API.md)
- [Integration Development](./docs/INTEGRATIONS.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Contributing Guide](./CONTRIBUTING.md)

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

## 📦 Tech Stack

### Frontend
- React 19
- Tailwind CSS 4
- shadcn/ui components
- Framer Motion for animations
- TanStack React Query
- Wouter for routing

### Backend
- Express.js
- tRPC for type-safe APIs
- Drizzle ORM
- MySQL/TiDB
- Node.js

### Infrastructure
- Vite for bundling
- TypeScript for type safety
- Vitest for testing
- Docker ready

## 🌐 Deployment

### Manus Platform (Recommended for Africa)
```bash
# Push to Manus
git push manus main
```

### Docker
```bash
docker build -t nausicaa .
docker run -p 3000:3000 nausicaa
```

### Traditional Hosting
See `docs/DEPLOYMENT.md` for detailed instructions.

## 💰 Pricing

**Nausicaa is 100% free and open-source.**

- No licensing fees
- No usage limits
- No data restrictions
- Self-hosted or cloud-hosted

## 🤝 Contributing

We welcome contributions from the African tech community!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## 📄 License

Nausicaa is licensed under the **MIT License** - see [LICENSE](./LICENSE) file for details.

## 🙋 Support

- **Documentation**: [docs/](./docs/)
- **Issues**: [GitHub Issues](https://github.com/blancostudio/nausicaa/issues)
- **Discussions**: [GitHub Discussions](https://github.com/blancostudio/nausicaa/discussions)
- **Email**: support@blancostudio.com

## 🎯 Roadmap

- [ ] Mobile app (iOS/Android)
- [ ] Advanced workflow visualization
- [ ] Multi-language support (Swahili, Hausa, French)
- [ ] Offline-first capabilities
- [ ] Advanced AI model customization
- [ ] Real-time collaboration features
- [ ] Advanced analytics and reporting
- [ ] Marketplace for community extensions

## 👏 Credits

**Built by [Blanco Studio](https://blancostudio.com)**

Nausicaa is built with ❤️ for African entrepreneurs and teams.

## 📞 Contact

- **Website**: https://blancostudio.com
- **Twitter**: [@blancostudio](https://twitter.com/blancostudio)
- **LinkedIn**: [Blanco Studio](https://linkedin.com/company/blancostudio)
- **Email**: hello@blancostudio.com

---

**Made with ❤️ for Africa | Open Source | Free Forever**
