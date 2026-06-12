import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, LogOut, Settings, User, Bell, Inbox, Zap, Bot } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import DashboardLayout from "@/components/DashboardLayout";

/**
 * Home page with authentication flow
 * Shows login screen when not authenticated, dashboard when authenticated
 */
export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [, navigate] = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-slate-600">Loading Nausicaa...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user?.name || "User"}! 👋</h1>
            <p className="text-slate-600 mt-2">One open-source workspace for your tools, messages, automations, agents and dashboards.</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            title="Connected Tools"
            value="28"
            change="+12%"
            icon="🔗"
            description="vs last 7 days"
          />
          <MetricCard
            title="Messages Synced"
            value="12,480"
            change="+18%"
            icon="💬"
            description="vs last 7 days"
          />
          <MetricCard
            title="Active Automations"
            value="54"
            change="+8%"
            icon="⚙️"
            description="vs last 7 days"
          />
          <MetricCard
            title="Agents Running"
            value="9"
            change="+13%"
            icon="🤖"
            description="vs last 7 days"
          />
        </div>

        {/* Product Promise Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <PromiseCard
            title="Connect Everything"
            description="Integrate your favorite tools and unify your data in one powerful workspace."
            icon={<Inbox className="w-6 h-6" />}
            color="blue"
          />
          <PromiseCard
            title="Automate Anything"
            description="Build workflows, automate repetitive tasks, and scale without limits."
            icon={<Zap className="w-6 h-6" />}
            color="green"
          />
          <PromiseCard
            title="Run Your Business OS"
            description="Get full visibility, make smarter decisions, and grow with confidence."
            icon={<Bot className="w-6 h-6" />}
            color="purple"
          />
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <QuickActionButton label="Connect your first tool" icon="🔗" onClick={() => navigate("/tools")} />
              <QuickActionButton label="Add an API key" icon="🔑" onClick={() => navigate("/tools")} />
              <QuickActionButton label="Open unified inbox" icon="📧" onClick={() => navigate("/inbox")} />
              <QuickActionButton label="Create automation" icon="⚙️" onClick={() => navigate("/automations")} />
              <QuickActionButton label="Launch an agent" icon="🤖" onClick={() => navigate("/agents")} />
              <QuickActionButton label="View dashboards" icon="📊" onClick={() => navigate("/")} />
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Activity</CardTitle>
            <CardDescription>Recent events and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <ActivityItem
                title="WhatsApp lead converted to CRM"
                description="New contact added to HubSpot"
                time="10:24 AM"
              />
              <ActivityItem
                title="ClickUp task created from Gmail"
                description="Task created: 'Follow up with Design Team'"
                time="08:41 AM"
              />
              <ActivityItem
                title="Obsidian note synced to workspace"
                description="Note 'Q2 Planning' synced successfully"
                time="08:36 AM"
              />
              <ActivityItem
                title="Weekly pipeline summary generated"
                description="AI report ready — 215 deals analysed"
                time="07:58 AM"
              />
              <ActivityItem
                title="Slack message from #sales"
                description="New inbound lead from website"
                time="07:32 AM"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

/**
 * Login Screen Component
 */
function LoginScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Branding */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-lg">
            <img
              src="/manus-storage/nausicaa_logo_mark_23f30261.png"
              alt="Nausicaa Logo"
              className="w-16 h-16"
            />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-slate-900">Nausicaa</h1>
            <p className="text-slate-600">Your AI-powered productivity OS</p>
          </div>
        </div>

        {/* Value Proposition */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-3">
            <CardTitle className="text-center text-2xl">Welcome to Nausicaa</CardTitle>
            <CardDescription className="text-center text-base">
              Connect everything. Automate anything. Run your business OS.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Features List */}
            <div className="space-y-4">
              <FeatureItem icon="🔗" title="Unified Inbox" description="All your messages in one place" />
              <FeatureItem icon="⚙️" title="Smart Automations" description="Build workflows without code" />
              <FeatureItem icon="🤖" title="AI Agents" description="Intelligent task execution" />
              <FeatureItem icon="🛠️" title="Tool Integrations" description="Connect your favorite tools" />
            </div>

            {/* Login Button */}
            <Button
              onClick={() => {
                window.location.href = getLoginUrl();
              }}
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg"
            >
              Sign in with Manus
            </Button>

            {/* Footer Text */}
            <p className="text-center text-xs text-slate-500">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardContent>
        </Card>

        {/* Tagline */}
        <p className="text-center text-slate-600 text-sm">
          Built by Blanco Studio · Open-source AI-powered workspace systems for serious builders and businesses
        </p>
      </div>
    </div>
  );
}

/**
 * Metric Card Component
 */
function MetricCard({
  title,
  value,
  change,
  icon,
  description,
}: {
  title: string;
  value: string;
  change: string;
  icon: string;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
            <p className="text-xs text-green-600 font-semibold mt-2">{change} {description}</p>
          </div>
          <div className="text-3xl">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Promise Card Component
 */
function PromiseCard({
  title,
  description,
  icon,
  color,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: "blue" | "green" | "purple";
}) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
  };

  return (
    <Card className={`border ${colorClasses[color]}`}>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${colorClasses[color]} bg-opacity-20`}>{icon}</div>
          <div>
            <h3 className="font-semibold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-600 mt-1">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Quick Action Button Component
 */
function QuickActionButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: string;
  onClick: () => void;
}) {
  return (
    <Button
      variant="outline"
      className="h-auto py-4 px-3 flex flex-col items-center gap-2 text-center hover:bg-blue-50 hover:border-blue-300"
      onClick={onClick}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-xs font-medium">{label}</span>
    </Button>
  );
}

/**
 * Activity Item Component
 */
function ActivityItem({
  title,
  description,
  time,
}: {
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex items-start gap-3 pb-3 border-b border-slate-200 last:border-0 last:pb-0">
      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-slate-900 text-sm">{title}</p>
        <p className="text-xs text-slate-600 mt-1">{description}</p>
      </div>
      <p className="text-xs text-slate-500 flex-shrink-0">{time}</p>
    </div>
  );
}

/**
 * Feature Item Component
 */
function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="font-medium text-slate-900">{title}</p>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </div>
  );
}
