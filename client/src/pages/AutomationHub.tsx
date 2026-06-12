import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Search, Plus, Zap, Copy, Trash2, Edit2 } from "lucide-react";

const AUTOMATIONS = [
  {
    id: 1,
    name: "WhatsApp Lead to CRM",
    description: "Automatically add WhatsApp leads to HubSpot CRM",
    trigger: "New WhatsApp message from lead",
    action: "Create contact in HubSpot",
    status: "active",
    runs: 342,
    lastRun: "2 minutes ago",
  },
  {
    id: 2,
    name: "Gmail to Task",
    description: "Convert important emails to tasks in ClickUp",
    trigger: "Email with label 'Action Required'",
    action: "Create task in ClickUp",
    status: "active",
    runs: 156,
    lastRun: "1 hour ago",
  },
  {
    id: 3,
    name: "LinkedIn DM Response",
    description: "Send AI-drafted responses to LinkedIn messages",
    trigger: "New LinkedIn DM",
    action: "Send AI-drafted reply",
    status: "active",
    runs: 89,
    lastRun: "30 minutes ago",
  },
  {
    id: 4,
    name: "Slack Notification",
    description: "Send Slack notifications for high-priority leads",
    trigger: "Lead score > 80",
    action: "Post to #sales-leads",
    status: "inactive",
    runs: 0,
    lastRun: "Never",
  },
];

const TEMPLATES = [
  {
    id: 1,
    name: "Lead Qualification",
    description: "Automatically qualify leads based on criteria",
    icon: "🎯",
    category: "Sales",
  },
  {
    id: 2,
    name: "Customer Onboarding",
    description: "Send onboarding sequence to new customers",
    icon: "🎓",
    category: "Customer Success",
  },
  {
    id: 3,
    name: "Invoice Reminder",
    description: "Send payment reminders for unpaid invoices",
    icon: "💰",
    category: "Finance",
  },
  {
    id: 4,
    name: "Social Media Posting",
    description: "Schedule and post to multiple social channels",
    icon: "📱",
    category: "Marketing",
  },
  {
    id: 5,
    name: "Email Nurture Campaign",
    description: "Automated email sequences for leads",
    icon: "📧",
    category: "Marketing",
  },
  {
    id: 6,
    name: "Support Ticket Routing",
    description: "Route support tickets to appropriate teams",
    icon: "🎫",
    category: "Support",
  },
];

export default function AutomationHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("active");

  const filteredAutomations = AUTOMATIONS.filter(
    (auto) =>
      auto.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedTab === "all" || (selectedTab === "active" && auto.status === "active") || (selectedTab === "inactive" && auto.status === "inactive"))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Automation Hub</h1>
        <p className="text-slate-600 mt-2">Build workflows, automate repetitive tasks, and scale without limits.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200">
        <button
          onClick={() => setSelectedTab("active")}
          className={`pb-3 px-4 font-medium border-b-2 transition ${
            selectedTab === "active"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          Active Automations
        </button>
        <button
          onClick={() => setSelectedTab("inactive")}
          className={`pb-3 px-4 font-medium border-b-2 transition ${
            selectedTab === "inactive"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          Inactive
        </button>
        <button
          onClick={() => setSelectedTab("templates")}
          className={`pb-3 px-4 font-medium border-b-2 transition ${
            selectedTab === "templates"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          Templates & Marketplace
        </button>
      </div>

      {/* Active/Inactive Automations */}
      {(selectedTab === "active" || selectedTab === "inactive") && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 flex-1">
              <Search className="w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search automations..."
                className="border-0 bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Automation
            </Button>
          </div>

          <div className="space-y-3">
            {filteredAutomations.length > 0 ? (
              filteredAutomations.map((auto) => (
                <Card key={auto.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Zap className="w-5 h-5 text-blue-600" />
                          <h3 className="font-semibold text-slate-900">{auto.name}</h3>
                          <Badge className={auto.status === "active" ? "bg-green-100 text-green-700 border-0" : "bg-slate-100 text-slate-700 border-0"}>
                            {auto.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">{auto.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-slate-500">Trigger</p>
                            <p className="font-medium text-slate-900">{auto.trigger}</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Action</p>
                            <p className="font-medium text-slate-900">{auto.action}</p>
                          </div>
                        </div>
                        <div className="flex gap-4 mt-3 text-xs text-slate-500">
                          <span>{auto.runs} runs</span>
                          <span>Last run: {auto.lastRun}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Switch checked={auto.status === "active"} />
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-12 pb-12 text-center">
                  <Zap className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600 mb-4">No {selectedTab === "active" ? "active" : "inactive"} automations yet</p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Automation
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Templates & Marketplace */}
      {selectedTab === "templates" && (
        <div className="space-y-4">
          <p className="text-slate-600">Choose from pre-built templates or create your own automation from scratch</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEMPLATES.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition cursor-pointer">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{template.icon}</div>
                  <h3 className="font-semibold text-slate-900 mb-2">{template.name}</h3>
                  <p className="text-sm text-slate-600 mb-4">{template.description}</p>
                  <Badge variant="outline" className="mb-4">
                    {template.category}
                  </Badge>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Use Template</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
