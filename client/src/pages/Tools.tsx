import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, CheckCircle2, AlertCircle, Search, Plus, Zap } from "lucide-react";
import { trpc } from "@/lib/trpc";

const SA_TOOLS = [
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    category: "messaging",
    icon: "💬",
    status: "connected",
    features: ["Send messages", "Receive messages", "Media sharing"],
    users: 1200,
    description: "WhatsApp Business API for South African businesses",
  },
  {
    id: "slack",
    name: "Slack",
    category: "messaging",
    icon: "🔗",
    status: "disconnected",
    features: ["Send messages", "Create channels", "Notifications"],
    users: 890,
    description: "Team communication and collaboration",
  },
  {
    id: "gmail",
    name: "Gmail",
    category: "email",
    icon: "📧",
    status: "connected",
    features: ["Send emails", "Receive emails", "Labels"],
    users: 2100,
    description: "Email automation and management",
  },
  {
    id: "paystack",
    name: "Paystack",
    category: "payment",
    icon: "🏦",
    status: "connected",
    features: ["Payments", "Transfers", "Settlements"],
    users: 450,
    description: "South African payment processing",
  },
  {
    id: "flutterwave",
    name: "Flutterwave",
    category: "payment",
    icon: "🌍",
    status: "disconnected",
    features: ["Payments", "Transfers", "Collections"],
    users: 320,
    description: "Pan-African payment platform",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "crm",
    icon: "📊",
    status: "disconnected",
    features: ["Contacts", "Deals", "Emails"],
    users: 670,
    description: "CRM and marketing automation",
  },
];

const CATEGORIES = ["all", "messaging", "email", "payment", "crm"];

export default function Tools() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [connectedTools, setConnectedTools] = useState(["whatsapp", "gmail", "paystack"]);

  const filteredTools = SA_TOOLS.filter((tool) => {
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleConnect = (toolId: string) => {
    if (!connectedTools.includes(toolId)) {
      setConnectedTools([...connectedTools, toolId]);
    }
  };

  const handleDisconnect = (toolId: string) => {
    setConnectedTools(connectedTools.filter((id) => id !== toolId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Tool Integrations</h1>
        <p className="text-slate-600 mt-2">Connect your favorite tools and unify your workspace</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Connected Tools" value={connectedTools.length.toString()} icon="🔗" />
        <StatCard label="Available Tools" value={SA_TOOLS.length.toString()} icon="📦" />
        <StatCard label="Active Users" value="6.6K" icon="👥" />
        <StatCard label="Healthy Connections" value="24" icon="✅" />
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search tools..."
              className="flex-1 border-0 bg-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid grid-cols-5 w-full">
              {CATEGORIES.map((cat) => (
                <TabsTrigger key={cat} value={cat} className="capitalize text-xs">
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardHeader>
      </Card>

      {/* Tools Grid */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Available Integrations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => (
            <Card key={tool.id} className={connectedTools.includes(tool.id) ? "border-green-200 bg-green-50" : ""}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{tool.icon}</span>
                    <div>
                      <CardTitle className="text-base">{tool.name}</CardTitle>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {tool.category}
                      </Badge>
                    </div>
                  </div>
                  {connectedTools.includes(tool.id) && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-600">{tool.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-1">
                  {tool.features.slice(0, 2).map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Users */}
                <p className="text-xs text-slate-500">{tool.users.toLocaleString()} users</p>

                {/* Action Button */}
                {connectedTools.includes(tool.id) ? (
                  <Button
                    variant="outline"
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDisconnect(tool.id)}
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => handleConnect(tool.id)}>
                    Connect
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* API Key Vault */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            API Key Vault
          </CardTitle>
          <CardDescription>Store, manage, and secure your API keys in one encrypted vault.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add API Key
            </Button>
          </div>
          <div className="space-y-2">
            {connectedTools.map((toolId) => {
              const tool = SA_TOOLS.find((t) => t.id === toolId);
              return (
                <div key={toolId} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{tool?.icon}</span>
                    <div>
                      <p className="font-medium text-sm">{tool?.name}</p>
                      <p className="text-xs text-slate-500">••••••••••••••••</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-xs">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs text-red-600 hover:text-red-700">
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Security Features */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-900">Enterprise-Grade Security</CardTitle>
          <CardDescription>All API keys are encrypted and never exposed in lists.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              End-to-end Encryption
            </li>
            <li className="flex items-center gap-2 text-sm text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Zero-knowledge Architecture
            </li>
            <li className="flex items-center gap-2 text-sm text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Role-based Access Control
            </li>
            <li className="flex items-center gap-2 text-sm text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Audit Logs & Monitoring
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">{label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">{value}</p>
          </div>
          <span className="text-2xl">{icon}</span>
        </div>
      </CardContent>
    </Card>
  );
}
