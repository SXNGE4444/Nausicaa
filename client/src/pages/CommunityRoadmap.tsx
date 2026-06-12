import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageSquare, Share2, CheckCircle, Clock, AlertCircle } from "lucide-react";

const ROADMAP_ITEMS = [
  {
    id: 1,
    title: "Advanced Workflow Builder",
    description: "Visual workflow editor with drag-and-drop interface",
    status: "in-progress",
    votes: 342,
    comments: 28,
    eta: "Q3 2026",
  },
  {
    id: 2,
    title: "Mobile App Launch",
    description: "Native iOS and Android applications",
    status: "planned",
    votes: 521,
    comments: 45,
    eta: "Q4 2026",
  },
  {
    id: 3,
    title: "AI Model Customization",
    description: "Fine-tune AI agents for specific use cases",
    status: "in-progress",
    votes: 298,
    comments: 19,
    eta: "Q3 2026",
  },
  {
    id: 4,
    title: "Multi-Language Support",
    description: "Support for 20+ languages globally",
    status: "planned",
    votes: 187,
    comments: 12,
    eta: "Q4 2026",
  },
  {
    id: 5,
    title: "Real-time Collaboration",
    description: "Live collaboration features for teams",
    status: "completed",
    votes: 412,
    comments: 34,
    eta: "Shipped",
  },
  {
    id: 6,
    title: "Advanced Analytics",
    description: "Deep-dive analytics and reporting",
    status: "completed",
    votes: 289,
    comments: 22,
    eta: "Shipped",
  },
];

const STATUS_CONFIG = {
  completed: { icon: CheckCircle, label: "Completed", color: "bg-green-100 text-green-700" },
  "in-progress": { icon: Clock, label: "In Progress", color: "bg-blue-100 text-blue-700" },
  planned: { icon: AlertCircle, label: "Planned", color: "bg-slate-100 text-slate-700" },
};

export default function CommunityRoadmap() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Community Roadmap</h1>
        <p className="text-slate-600 mt-2">Vote on features and see what's coming to Nausicaa</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 border-b border-slate-200">
        {["All", "Completed", "In Progress", "Planned"].map((tab) => (
          <button
            key={tab}
            className="pb-3 px-4 font-medium border-b-2 transition border-transparent text-slate-600 hover:text-slate-900"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Roadmap Items */}
      <div className="space-y-4">
        {ROADMAP_ITEMS.map((item) => {
          const statusConfig = STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG];
          const StatusIcon = statusConfig.icon;

          return (
            <Card key={item.id} className="hover:shadow-md transition">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                      <Badge className={statusConfig.color}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusConfig.label}
                      </Badge>
                    </div>
                    <p className="text-slate-600 mb-4">{item.description}</p>
                    <div className="flex gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">{item.votes} votes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">{item.comments} comments</span>
                      </div>
                      <div className="text-slate-600">ETA: {item.eta}</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4" />
                      Vote
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Suggest Feature */}
      <Card>
        <CardHeader>
          <CardTitle>Suggest a Feature</CardTitle>
          <CardDescription>Have an idea? Let us know what you'd like to see in Nausicaa</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full bg-blue-600 hover:bg-blue-700">Submit Feature Request</Button>
        </CardContent>
      </Card>
    </div>
  );
}
