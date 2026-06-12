import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, Zap, Star } from "lucide-react";

export default function Automations() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Automation Hub</h1>
          <p className="text-slate-600 mt-2">Build, run, install, and sell automations from one command center.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Automation
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Active Automations" value="54" />
        <StatCard label="Successful Runs Today" value="1,284" />
        <StatCard label="Error Alerts" value="3" />
        <StatCard label="Installed Templates" value="21" />
      </div>

      {/* Your Automations */}
      <Card>
        <CardHeader>
          <CardTitle>Your Automations</CardTitle>
          <CardDescription>Manage your active workflows</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <AutomationItem
              name="New Lead from Inbox → CRM"
              trigger="New Email Gmail"
              action="Create Lead HubSpot"
              status="active"
            />
            <AutomationItem
              name="Gmail Reply → ClickUp Task"
              trigger="Email Reply Gmail"
              action="Create Task ClickUp"
              status="active"
            />
            <AutomationItem
              name="LinkedIn Comment → Lead Record"
              trigger="New Comment LinkedIn"
              action="Create Lead HubSpot"
              status="active"
            />
            <AutomationItem
              name="Obsidian Note → Project Task"
              trigger="New Note Obsidian"
              action="Create Task ClickUp"
              status="paused"
            />
            <AutomationItem
              name="Dashboard Alert → WhatsApp Notification"
              trigger="Alert Trigger Nexus OS"
              action="Send Message WhatsApp"
              status="active"
            />
          </div>
        </CardContent>
      </Card>

      {/* Automation Marketplace */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Automation Marketplace</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MarketplaceCard
            name="Lead Inbox to CRM Flow"
            category="Sales"
            price="Free"
            installs="12.4K"
            rating="4.8"
          />
          <MarketplaceCard
            name="AI Cold Email Audit Flow"
            category="Marketing"
            price="$9"
            installs="8.7K"
            rating="4.7"
          />
          <MarketplaceCard
            name="Social DM to Sales Pipeline Flow"
            category="Sales"
            price="$7"
            installs="6.1K"
            rating="4.9"
          />
          <MarketplaceCard
            name="Obsidian Knowledge Sync Flow"
            category="Productivity"
            price="Free"
            installs="4.2K"
            rating="4.8"
          />
        </div>
      </div>

      {/* Agent Hub */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Hub</CardTitle>
          <CardDescription>AI-powered agents for automation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <AgentItem name="Inbox Triage Agent" status="active" domain="Inbox History" />
            <AgentItem name="Sales Agent" status="active" domain="CRM & Interactions" />
            <AgentItem name="Proposal Agent" status="idle" domain="Proposals & Docs" />
            <AgentItem name="Research Agent" status="active" domain="Web & PDFs" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm font-medium text-slate-600">{label}</p>
        <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
      </CardContent>
    </Card>
  );
}

function AutomationItem({
  name,
  trigger,
  action,
  status,
}: {
  name: string;
  trigger: string;
  action: string;
  status: "active" | "paused" | "disabled";
}) {
  return (
    <div className="flex items-start justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
      <div className="flex-1">
        <p className="font-semibold text-slate-900">{name}</p>
        <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
          <span>Trigger: {trigger}</span>
          <span>→</span>
          <span>Action: {action}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge
          className={
            status === "active"
              ? "bg-green-100 text-green-700 border-0"
              : status === "paused"
                ? "bg-orange-100 text-orange-700 border-0"
                : "bg-slate-100 text-slate-700 border-0"
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
        <Switch defaultChecked={status === "active"} />
      </div>
    </div>
  );
}

function MarketplaceCard({
  name,
  category,
  price,
  installs,
  rating,
}: {
  name: string;
  category: string;
  price: string;
  installs: string;
  rating: string;
}) {
  return (
    <Card className="hover:shadow-lg transition">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-semibold text-slate-900">{name}</p>
            <p className="text-xs text-slate-600 mt-1">{category}</p>
          </div>
          <Badge variant="outline">{price}</Badge>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
          <div className="text-sm text-slate-600">
            <p className="font-medium">{installs} installs</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Install
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function AgentItem({
  name,
  status,
  domain,
}: {
  name: string;
  status: "active" | "idle" | "error";
  domain: string;
}) {
  return (
    <div className="flex items-start justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
      <div className="flex-1">
        <p className="font-semibold text-slate-900">{name}</p>
        <p className="text-sm text-slate-600 mt-1">{domain}</p>
      </div>
      <div className="flex items-center gap-3">
        <Badge
          className={
            status === "active"
              ? "bg-green-100 text-green-700 border-0"
              : status === "idle"
                ? "bg-slate-100 text-slate-700 border-0"
                : "bg-red-100 text-red-700 border-0"
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
        <Button variant="outline" size="sm">
          Run Agent
        </Button>
      </div>
    </div>
  );
}
