import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Settings, Trash2, CheckCircle2, AlertCircle, Lock } from "lucide-react";

const INTEGRATIONS = [
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    icon: "💬",
    status: "Connected",
    color: "green",
    description: "Send and receive messages from WhatsApp Business",
    features: ["Message sync", "Lead detection", "Auto-replies"],
  },
  {
    id: "slack",
    name: "Slack",
    icon: "🔗",
    status: "Connected",
    color: "green",
    description: "Integrate with Slack for team collaboration",
    features: ["Channel sync", "Notifications", "Workflow automation"],
  },
  {
    id: "gmail",
    name: "Gmail",
    icon: "📧",
    status: "Connected",
    color: "green",
    description: "Sync emails and manage conversations",
    features: ["Email sync", "Label management", "Auto-categorization"],
  },
  {
    id: "stripe",
    name: "Stripe",
    icon: "💳",
    status: "Connected",
    color: "green",
    description: "Accept payments and manage billing",
    features: ["Payment processing", "Invoice tracking", "Subscription management"],
  },
  {
    id: "paystack",
    name: "Paystack",
    icon: "🏦",
    status: "Connected",
    color: "green",
    description: "South African payment processing",
    features: ["Local payments", "ZAR support", "Instant settlement"],
  },
  {
    id: "flutterwave",
    name: "Flutterwave",
    icon: "🌊",
    status: "Rate Limited",
    color: "orange",
    description: "Multi-currency payment gateway",
    features: ["Pan-African payments", "Multiple currencies", "Instant payouts"],
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "💼",
    status: "Not Connected",
    color: "gray",
    description: "Connect with LinkedIn for B2B outreach",
    features: ["Profile sync", "Message automation", "Lead generation"],
  },
  {
    id: "hubspot",
    name: "HubSpot CRM",
    icon: "🎯",
    status: "Not Connected",
    color: "gray",
    description: "Manage contacts and sales pipeline",
    features: ["Contact management", "Deal tracking", "Reporting"],
  },
];

const API_KEYS = [
  { id: 1, name: "Stripe API Key", service: "Stripe", created: "2 months ago", lastUsed: "Today" },
  { id: 2, name: "Paystack Secret", service: "Paystack", created: "1 month ago", lastUsed: "Yesterday" },
  { id: 3, name: "WhatsApp Token", service: "WhatsApp", created: "3 weeks ago", lastUsed: "Today" },
];

export default function ToolIntegrations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("marketplace");

  const filteredIntegrations = INTEGRATIONS.filter((tool) =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Tool Integrations</h1>
        <p className="text-slate-600 mt-2">Connect your favorite tools and unify your data in one powerful workspace.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200">
        <button
          onClick={() => setSelectedTab("marketplace")}
          className={`pb-3 px-4 font-medium border-b-2 transition ${
            selectedTab === "marketplace"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          Marketplace
        </button>
        <button
          onClick={() => setSelectedTab("connected")}
          className={`pb-3 px-4 font-medium border-b-2 transition ${
            selectedTab === "connected"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          Connected Tools
        </button>
        <button
          onClick={() => setSelectedTab("api-keys")}
          className={`pb-3 px-4 font-medium border-b-2 transition ${
            selectedTab === "api-keys"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          API Key Vault
        </button>
      </div>

      {/* Marketplace Tab */}
      {selectedTab === "marketplace" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search integrations..."
              className="border-0 bg-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIntegrations.map((tool) => (
              <Card key={tool.id} className="hover:shadow-lg transition">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{tool.icon}</span>
                    <Badge
                      className={`${
                        tool.color === "green"
                          ? "bg-green-100 text-green-700"
                          : tool.color === "orange"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-slate-100 text-slate-700"
                      } border-0`}
                    >
                      {tool.status}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">{tool.name}</h3>
                  <p className="text-sm text-slate-600 mb-4">{tool.description}</p>
                  <div className="space-y-2 mb-4">
                    {tool.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-xs text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className={`w-full ${
                      tool.status === "Connected"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-slate-200 hover:bg-slate-300 text-slate-900"
                    }`}
                  >
                    {tool.status === "Connected" ? "Manage" : "Connect"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Connected Tools Tab */}
      {selectedTab === "connected" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {INTEGRATIONS.filter((t) => t.status !== "Not Connected").map((tool) => (
              <Card key={tool.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{tool.icon}</span>
                      <div>
                        <h3 className="font-semibold text-slate-900">{tool.name}</h3>
                        <p className="text-sm text-slate-600 mt-1">{tool.description}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-2">
                            {tool.status === "Connected" ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                <span className="text-xs font-medium text-green-600">Connected</span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="w-4 h-4 text-orange-600" />
                                <span className="text-xs font-medium text-orange-600">{tool.status}</span>
                              </>
                            )}
                          </div>
                          <span className="text-xs text-slate-500">Last synced: 2 hours ago</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* API Key Vault Tab */}
      {selectedTab === "api-keys" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-slate-600">Securely manage your API keys and credentials</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add API Key
            </Button>
          </div>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">End-to-end encrypted</p>
                  <p className="text-sm text-blue-700 mt-1">
                    All API keys are encrypted and stored securely. Only you can access them.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {API_KEYS.map((key) => (
              <Card key={key.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">{key.name}</h3>
                      <p className="text-sm text-slate-600 mt-1">{key.service}</p>
                      <div className="flex gap-4 mt-3 text-xs text-slate-500">
                        <span>Created: {key.created}</span>
                        <span>Last used: {key.lastUsed}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
