import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Inbox as InboxIcon, Mail, MessageCircle, AlertCircle, Search, Star, Archive, Trash2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

const SAMPLE_MESSAGES = [
  {
    id: 1,
    sender: "John Dlamini",
    channel: "WhatsApp",
    preview: "Hi, I'm interested in your services. Can we discuss pricing?",
    isLead: true,
    time: "10:34 AM",
    unread: true,
    priority: "high",
  },
  {
    id: 2,
    sender: "Sarah Johnson",
    channel: "Gmail",
    preview: "RE: Project proposal - attached is the updated timeline",
    isLead: false,
    time: "09:12 AM",
    unread: false,
    priority: "medium",
  },
  {
    id: 3,
    sender: "Thabo Mkhize",
    channel: "LinkedIn",
    preview: "Great article! Would love to connect and discuss opportunities",
    isLead: true,
    time: "08:45 AM",
    unread: true,
    priority: "high",
  },
  {
    id: 4,
    sender: "Nomsa Zwane",
    channel: "WhatsApp",
    preview: "Thanks for the quote. Can you send the invoice?",
    isLead: false,
    time: "Yesterday",
    unread: false,
    priority: "medium",
  },
];

export default function Inbox() {
  const [selectedMessage, setSelectedMessage] = useState<(typeof SAMPLE_MESSAGES)[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const { data: messages } = trpc.messages.list.useQuery({ limit: 50 });

  const filteredMessages = SAMPLE_MESSAGES.filter((msg) => {
    const matchesSearch =
      msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && msg.unread) ||
      (filter === "leads" && msg.isLead) ||
      (filter === "hot" && msg.priority === "high");
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Unified Inbox</h1>
        <p className="text-slate-600 mt-2">Handle your messages, leads, and AI-assisted replies in one place.</p>
      </div>

      {/* Channel Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ChannelCard channel="Gmail" unread={12} status="Connected" icon="📧" />
        <ChannelCard channel="WhatsApp Business" unread={8} status="Connected" icon="💬" />
        <ChannelCard channel="LinkedIn DM" unread={5} status="Connected" icon="💼" />
      </div>

      {/* Lead Detection */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-green-600" />
            Lead Detection — Live
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-900">
              Hot leads detected today: <span className="text-green-600 font-bold">6</span>
            </p>
            <p className="text-sm font-medium text-slate-900">
              Messages needing follow-up: <span className="text-orange-600 font-bold">14</span>
            </p>
            <p className="text-sm font-medium text-slate-900">
              AI draft replies ready: <span className="text-blue-600 font-bold">9</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Messages Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters */}
        <div>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { id: "all", label: "All Messages", count: 156 },
                { id: "unread", label: "Unread", count: 23 },
                { id: "leads", label: "Leads", count: 12 },
                { id: "hot", label: "Hot Leads", count: 3 },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition text-sm ${
                    filter === f.id
                      ? "bg-blue-100 text-blue-900 font-medium"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <span>{f.label}</span>
                  <Badge variant="secondary" className="text-xs">
                    {f.count}
                  </Badge>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Messages List */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search messages..."
                  className="flex-1 border-0 bg-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <CardTitle>Messages ({filteredMessages.length})</CardTitle>
              <CardDescription>Click a message to view details and AI-assisted reply</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() => setSelectedMessage(msg)}
                      className={`p-4 rounded-lg border cursor-pointer transition ${
                        selectedMessage?.id === msg.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      } ${msg.unread ? "bg-blue-50" : ""}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                          {msg.sender.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className={`font-medium ${msg.unread ? "font-bold" : ""} text-slate-900`}>
                              {msg.sender}
                            </p>
                            {msg.isLead && <Badge className="bg-green-100 text-green-700 border-0 text-xs">Lead</Badge>}
                            {msg.priority === "high" && (
                              <Badge className="bg-red-100 text-red-700 border-0 text-xs">Hot</Badge>
                            )}
                            <span className="text-xs text-slate-500 ml-auto">{msg.channel}</span>
                          </div>
                          <p className="text-sm text-slate-600 truncate">{msg.preview}</p>
                          <p className="text-xs text-slate-500 mt-1">{msg.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-slate-500 py-8">No messages found</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Message Detail */}
          {selectedMessage && (
            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                      {selectedMessage.sender.charAt(0)}
                    </div>
                    <div>
                      <CardTitle>{selectedMessage.sender}</CardTitle>
                      <CardDescription>{selectedMessage.channel} • {selectedMessage.time}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Star className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Archive className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-slate-900">{selectedMessage.preview}</p>
                </div>

                {/* AI Draft Reply */}
                <div className="space-y-2">
                  <p className="font-medium text-sm text-slate-700">AI Draft Reply:</p>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-slate-700">
                      Thank you for reaching out! I'd be happy to discuss how we can help you with your needs. Let me know your availability for a quick call this week, and I'll send over some information about our services and pricing.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="bg-blue-600 hover:bg-blue-700">Send Reply</Button>
                  <Button variant="outline">Edit Draft</Button>
                  <Button variant="outline">Create Task</Button>
                  <Button variant="outline">Add to CRM</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function ChannelCard({ channel, unread, status, icon }: { channel: string; unread: number; status: string; icon: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">{channel}</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">{unread} unread</p>
            <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">
              {status}
            </Badge>
          </div>
          <div className="text-3xl">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}
