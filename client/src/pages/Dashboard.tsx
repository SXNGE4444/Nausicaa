import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpRight, ArrowDownRight, Link2, Zap, Bot, MessageSquare, TrendingUp, BarChart3, DollarSign, Mail } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Spinner } from "@/components/ui/spinner";

export default function Dashboard() {
  const { data: messages } = trpc.messages.list.useQuery({ limit: 20 });
  const { data: tools } = trpc.tools.list.useQuery();
  const { data: automations } = trpc.automations.list.useQuery();
  const { data: agents } = trpc.agents.list.useQuery();
  const { data: activity } = trpc.activity.list.useQuery({ limit: 15 });

  const metrics = [
    {
      label: "Connected Tools",
      value: tools?.length || 28,
      change: "+12%",
      trend: "up",
      icon: Link2,
      color: "bg-blue-100",
    },
    {
      label: "Messages Synced",
      value: messages?.length || 12480,
      change: "+18%",
      trend: "up",
      icon: MessageSquare,
      color: "bg-green-100",
    },
    {
      label: "Active Automations",
      value: automations?.filter((a: any) => a.status === "active").length || 54,
      change: "+8%",
      trend: "up",
      icon: Zap,
      color: "bg-purple-100",
    },
    {
      label: "Agents Running",
      value: agents?.length || 9,
      change: "+13%",
      trend: "up",
      icon: Bot,
      color: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-100">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, Alex! 👋</h1>
            <p className="text-slate-600 mb-4">One open-source workspace for your tools, messages, automations, agents and dashboards.</p>
            <p className="text-sm font-semibold text-blue-600">Connect everything. Automate anything. Run your business OS.</p>
          </div>
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
              AM
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          icon="🔗"
          title="Connect Everything"
          description="Integrate your favorite tools and unify your data in one powerful workspace."
        />
        <FeatureCard
          icon="⚡"
          title="Automate Anything"
          description="Build workflows, automate repetitive tasks, and scale without limits."
        />
        <FeatureCard
          icon="🚀"
          title="Run Your Business OS"
          description="Get full visibility, make smarter decisions, and grow with confidence."
        />
      </div>

      {/* Key Metrics */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <Card key={idx} className="hover:shadow-lg transition">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{metric.label}</p>
                      <p className="text-3xl font-bold text-slate-900 mt-2">{metric.value}</p>
                      <div className="flex items-center gap-1 mt-2">
                        {metric.trend === "up" ? (
                          <ArrowUpRight className="w-4 h-4 text-green-600" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-600" />
                        )}
                        <span className={`text-xs font-medium ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                          {metric.change} vs last 7 days
                        </span>
                      </div>
                    </div>
                    <Icon className="w-8 h-8 text-slate-300" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started quickly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                <Link2 className="w-4 h-4 mr-2" />
                Connect your first tool
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Zap className="w-4 h-4 mr-2" />
                Add an API key
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Open unified inbox
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Zap className="w-4 h-4 mr-2" />
                Create automation
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bot className="w-4 h-4 mr-2" />
                Launch an agent
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                View dashboards
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Today's Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Today's Activity</CardTitle>
                  <CardDescription>Your latest actions and events</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-600">
                  View all
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {activity && activity.length > 0 ? (
                <div className="space-y-3">
                  {activity.slice(0, 6).map((item: any, idx: number) => (
                    <ActivityRow key={idx} item={item} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 text-center py-8">No activity yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Revenue Intelligence Module */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Revenue Intelligence Module</CardTitle>
              <CardDescription>Unlock powerful revenue insights and automation</CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-700 border-0">Installed</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600 mb-4">Your first installed module</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricBox icon="📧" label="Cold Email Audits" value="127" change="+23%" />
            <MetricBox icon="📝" label="Coaching Notes" value="34" change="+15%" />
            <MetricBox icon="💼" label="LinkedIn Tactics" value="18" change="+12%" />
            <MetricBox icon="🤖" label="AI Workflow Usage" value="842" change="+31%" />
          </div>
          <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
            Open Revenue Intelligence
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <Card className="hover:shadow-lg transition">
      <CardContent className="pt-6">
        <div className="text-3xl mb-3">{icon}</div>
        <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </CardContent>
    </Card>
  );
}

function ActivityRow({ item }: { item: any }) {
  const getIcon = () => {
    switch (item.type) {
      case "whatsapp":
        return "💬";
      case "gmail":
        return "📧";
      case "automation":
        return "⚙️";
      case "agent":
        return "🤖";
      default:
        return "📢";
    }
  };

  return (
    <div className="flex gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
      <span className="text-lg flex-shrink-0">{getIcon()}</span>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-slate-900 text-sm">{item.title}</p>
        <p className="text-xs text-slate-600 mt-1">{item.description}</p>
        <p className="text-xs text-slate-500 mt-2">{new Date(item.createdAt).toLocaleTimeString()}</p>
      </div>
    </div>
  );
}

function MetricBox({ icon, label, value, change }: { icon: string; label: string; value: string; change: string }) {
  return (
    <div className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-xs text-slate-600 mb-1">{label}</p>
      <p className="text-lg font-bold text-slate-900">{value}</p>
      <p className="text-xs text-green-600 mt-1">{change}</p>
    </div>
  );
}
