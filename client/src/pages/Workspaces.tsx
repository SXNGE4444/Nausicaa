import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Users, Settings, Trash2, Lock } from "lucide-react";

const WORKSPACES = [
  {
    id: 1,
    name: "Sales Team",
    description: "Sales pipeline and lead management",
    members: 8,
    role: "Admin",
    created: "2 months ago",
  },
  {
    id: 2,
    name: "Marketing Hub",
    description: "Campaign management and analytics",
    members: 5,
    role: "Owner",
    created: "1 month ago",
  },
  {
    id: 3,
    name: "Support Team",
    description: "Customer support and ticket management",
    members: 12,
    role: "Member",
    created: "3 weeks ago",
  },
];

export default function Workspaces() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Workspaces</h1>
          <p className="text-slate-600 mt-2">Organize teams and manage access across your organization.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Workspace
        </Button>
      </div>

      {/* Workspaces List */}
      <div className="space-y-4">
        {WORKSPACES.map((workspace) => (
          <Card key={workspace.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">{workspace.name}</h3>
                    <Badge className={workspace.role === "Owner" ? "bg-purple-100 text-purple-700 border-0" : workspace.role === "Admin" ? "bg-blue-100 text-blue-700 border-0" : "bg-slate-100 text-slate-700 border-0"}>
                      {workspace.role}
                    </Badge>
                  </div>
                  <p className="text-slate-600 mb-4">{workspace.description}</p>
                  <div className="flex gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600">{workspace.members} members</span>
                    </div>
                    <div className="text-slate-600">Created {workspace.created}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Users className="w-4 h-4" />
                  </Button>
                  {workspace.role === "Owner" && (
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Workspace Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Workspace Settings</CardTitle>
          <CardDescription>Manage workspace-wide settings and permissions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-semibold text-slate-900 mb-2">Privacy & Permissions</h3>
            <p className="text-sm text-slate-600 mb-4">Control who can access this workspace</p>
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-slate-400" />
              <div className="flex-1">
                <p className="font-medium text-slate-900">Private Workspace</p>
                <p className="text-sm text-slate-600">Only invited members can access</p>
              </div>
              <Button variant="outline">Edit</Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Data & Integrations</h3>
            <p className="text-sm text-slate-600 mb-4">Manage workspace data and connected tools</p>
            <Button variant="outline" className="w-full">Manage Integrations</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
