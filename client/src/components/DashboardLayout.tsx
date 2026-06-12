import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Bell, Settings, LogOut, Menu, X, Home, Inbox, Link2, Zap, Bot, BarChart3, BookOpen, Users, Compass, Code, MessageSquare, Github } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const SIDEBAR_ITEMS = [
  { icon: Home, label: "Home Command Center", path: "/", section: "main" },
  { icon: Inbox, label: "Unified Inbox", path: "/inbox", section: "main" },
  { icon: Link2, label: "Tool Integrations", path: "/tools", section: "main" },
  { icon: Code, label: "API Key Vault", path: "/api-vault", section: "main" },
  { icon: Zap, label: "Automation Hub", path: "/automations", section: "automation" },
  { icon: BookOpen, label: "Automation Marketplace", path: "/automation-marketplace", section: "automation" },
  { icon: Bot, label: "Agent Hub", path: "/agents", section: "agents" },
  { icon: BarChart3, label: "Dashboards", path: "/dashboards", section: "analytics" },
  { icon: Users, label: "Workspaces", path: "/workspaces", section: "analytics" },
  { icon: Compass, label: "Community Roadmap", path: "/roadmap", section: "community" },
  { icon: MessageSquare, label: "Revenue Intelligence", path: "/revenue-intelligence", section: "community" },
  { icon: Settings, label: "Settings", path: "/settings", section: "settings" },
];

const OPEN_SOURCE_ITEMS = [
  { icon: Github, label: "100% Open Source", description: "Star on GitHub", path: "https://github.com" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [location] = useLocation();
  const logoutMutation = trpc.auth.logout.useMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      logout();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const groupedItems = SIDEBAR_ITEMS.reduce((acc, item) => {
    const section = item.section || "main";
    if (!acc[section]) acc[section] = [];
    acc[section].push(item);
    return acc;
  }, {} as Record<string, typeof SIDEBAR_ITEMS>);

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-white border-r border-slate-200 transition-all duration-300 overflow-hidden flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              N
            </div>
            <div>
              <h1 className="font-bold text-slate-900">Nausicaa</h1>
              <p className="text-xs text-slate-500">South Africa</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {Object.entries(groupedItems).map(([section, items]) => (
            <div key={section}>
              {section !== "main" && (
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 mb-3">
                  {section === "automation" && "Automation"}
                  {section === "agents" && "Agents"}
                  {section === "analytics" && "Analytics"}
                  {section === "community" && "Community"}
                  {section === "settings" && "Settings"}
                </p>
              )}
              <div className="space-y-1">
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.path;
                  return (
                    <a
                      key={item.path}
                      href={item.path}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Open Source */}
        <div className="p-4 border-t border-slate-200">
          <a
            href="https://github.com"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition"
          >
            <Github className="w-5 h-5" />
            <div className="text-sm">
              <p className="font-medium">100% Open Source</p>
              <p className="text-xs text-slate-500">Star on GitHub</p>
            </div>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg transition"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Search across Nausicaa..."
                className="bg-slate-50 border-slate-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m6.364 1.636l-.707-.707M21 12h-1m1.364 6.364l-.707-.707M12 21v-1m-6.364-1.636l.707.707M3 12h1M3.636 5.636l.707.707" />
              </svg>
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition relative">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition">
              <BookOpen className="w-5 h-5 text-slate-600" />
            </button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded-lg transition">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-sm font-medium text-slate-900">{user?.name || "User"}</p>
                    <p className="text-xs text-slate-500">Founder</p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-4 py-3 border-b border-slate-200">
                  <p className="font-medium text-slate-900">{user?.name}</p>
                  <p className="text-sm text-slate-600">{user?.email}</p>
                </div>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Code className="w-4 h-4 mr-2" />
                  API Documentation
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
