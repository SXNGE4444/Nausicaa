import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Download, Filter } from "lucide-react";

const METRICS = [
  { icon: "📧", label: "Cold Email Audits", value: "127", change: "+23%", trend: "up" },
  { icon: "📝", label: "Coaching Notes", value: "34", change: "+15%", trend: "up" },
  { icon: "💼", label: "LinkedIn Tactics", value: "18", change: "+12%", trend: "up" },
  { icon: "🤖", label: "AI Workflow Usage", value: "842", change: "+31%", trend: "up" },
];

const MODULES = [
  {
    id: 1,
    name: "Cold Email Audits",
    description: "Analyze email campaigns and optimize for better open rates",
    status: "Installed",
    metrics: "127 audits",
  },
  {
    id: 2,
    name: "Coaching Notes",
    description: "Track coaching sessions and generate actionable insights",
    status: "Installed",
    metrics: "34 sessions",
  },
  {
    id: 3,
    name: "LinkedIn Tactics",
    description: "Monitor LinkedIn engagement and optimize outreach",
    status: "Installed",
    metrics: "18 campaigns",
  },
  {
    id: 4,
    name: "AI Workflow Usage",
    description: "Track AI automation usage and ROI",
    status: "Installed",
    metrics: "842 workflows",
  },
];

export default function RevenueIntelligence() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Revenue Intelligence</h1>
        <p className="text-slate-600 mt-2">Get full visibility into your revenue metrics and make smarter decisions.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((metric, idx) => (
          <Card key={idx}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-600">{metric.label}</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{metric.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-medium text-green-600">{metric.change}</span>
                  </div>
                </div>
                <span className="text-2xl">{metric.icon}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Installed Modules */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">Installed Modules</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MODULES.map((module) => (
            <Card key={module.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">{module.name}</h3>
                    <p className="text-sm text-slate-600 mt-1">{module.description}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-0">{module.status}</Badge>
                </div>
                <div className="pt-3 border-t border-slate-200 mt-3">
                  <p className="text-sm font-medium text-slate-900">{module.metrics}</p>
                </div>
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Analytics Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
          <CardDescription>Real-time revenue metrics and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">Analytics visualization coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
