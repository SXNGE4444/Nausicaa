# Nausicaa - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 22+
- pnpm 10+
- Git
- A code editor (VS Code recommended)

### Step 1: Clone the Repository
```bash
git clone https://github.com/blancostudio/nausicaa.git
cd nausicaa
```

### Step 2: Install Dependencies
```bash
pnpm install
```

### Step 3: Set Up Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local` and add:
```
DATABASE_URL=mysql://user:password@localhost:3306/nausicaa
VITE_APP_ID=your_manus_app_id
OAUTH_SERVER_URL=https://api.manus.im
JWT_SECRET=your_jwt_secret
```

### Step 4: Set Up Database
```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

### Step 5: Start Development Server
```bash
pnpm dev
```

Visit `http://localhost:3000` in your browser.

---

## 📁 Project Structure

```
nausicaa/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Feature pages
│   │   ├── components/    # Reusable components
│   │   └── lib/           # Utilities
│   └── public/            # Static files
├── server/                 # Express backend
│   ├── routers.ts         # API endpoints
│   ├── db.ts              # Database queries
│   └── _core/             # Core infrastructure
├── drizzle/               # Database schema
├── docs/                  # Documentation
└── README.md              # Project overview
```

---

## 🔧 Common Commands

### Development
```bash
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Run production build
```

### Testing
```bash
pnpm test             # Run tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Generate coverage report
```

### Database
```bash
pnpm drizzle-kit generate    # Generate migrations
pnpm drizzle-kit migrate     # Run migrations
pnpm drizzle-kit studio     # Open Drizzle Studio
```

### Code Quality
```bash
pnpm format           # Format code
pnpm lint             # Check for errors
pnpm check            # TypeScript check
```

---

## 🎨 Key Features

### Dashboard
- Real-time metrics
- Activity feed
- Quick actions
- Revenue intelligence

### Unified Inbox
- Multi-channel messages
- Lead detection
- AI-assisted replies
- Priority filters

### Tool Integrations
- 8+ pre-built integrations
- API Key Vault
- Integration marketplace
- Real-time sync

### Automation Hub
- Visual builder
- 6 templates
- Workflow marketplace
- Enable/disable toggles

### AI Agents
- Real-time chat
- 4 specialized agents
- Message history
- Performance metrics

### Revenue Intelligence
- Analytics dashboard
- 4 built-in modules
- Performance tracking
- Export functionality

---

## 🔐 Authentication

Nausicaa uses Manus OAuth for authentication. Users log in with their Manus account.

### To Test Locally
1. Create a Manus account at https://manus.im
2. Create an OAuth application
3. Add credentials to `.env.local`
4. Click "Login" on the app

---

## 📚 Documentation

- **[README.md](./README.md)** - Project overview
- **[PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)** - Launch checklist
- **[IMPLEMENTATION_PRIORITY.md](./IMPLEMENTATION_PRIORITY.md)** - Priority list
- **[docs/](./docs/)** - Detailed documentation

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Database Connection Error
- Check DATABASE_URL in .env.local
- Ensure database server is running
- Verify credentials are correct

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### TypeScript Errors
```bash
# Check TypeScript
pnpm check

# Fix TypeScript errors
pnpm format
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/blancostudio/nausicaa/issues)
- **Discussions**: [GitHub Discussions](https://github.com/blancostudio/nausicaa/discussions)
- **Email**: support@blancostudio.com

---

## 📄 License

MIT License - See [LICENSE](./LICENSE) file

---

**Built by Blanco Studio | Open Source for Africa | Made with ❤️**
