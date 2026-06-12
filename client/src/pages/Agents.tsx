import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Bot, Send, Plus } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";

export default function Agents() {
  const [selectedAgent, setSelectedAgent] = useState<number | null>(1);
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: "Hello! I'm the Inbox Triage Agent. I can help you organize and prioritize your messages. What would you like me to help with?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const agentChatMutation = trpc.agents.chat.useMutation();

  const handleSendMessage = async () => {
    if (!input.trim() || !selectedAgent || isLoading) return;

    // Add user message to UI
    const userMessage = input;
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      // Call backend LLM
      const response = await agentChatMutation.mutateAsync({
        agentId: selectedAgent,
        message: userMessage,
      });

      if (response.success) {
        setMessages((prev) => [...prev, { role: "assistant", content: response.message }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, I encountered an error processing your message." },
        ]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">AI Agents</h1>
        <p className="text-slate-600 mt-2">Interact with AI-powered agents for intelligent task execution.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Agents List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Available Agents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <AgentListItem
                id={1}
                name="Inbox Triage Agent"
                status="active"
                selected={selectedAgent === 1}
                onClick={() => {
                  setSelectedAgent(1);
                  setMessages([
                    {
                      role: "assistant",
                      content: "Hello! I'm the Inbox Triage Agent. I can help you organize and prioritize your messages. What would you like me to help with?",
                    },
                  ]);
                }}
              />
              <AgentListItem
                id={2}
                name="Sales Agent"
                status="active"
                selected={selectedAgent === 2}
                onClick={() => {
                  setSelectedAgent(2);
                  setMessages([
                    {
                      role: "assistant",
                      content: "Hi! I'm the Sales Agent. I can help you manage leads and sales pipeline interactions. How can I assist?",
                    },
                  ]);
                }}
              />
              <AgentListItem
                id={3}
                name="Proposal Agent"
                status="idle"
                selected={selectedAgent === 3}
                onClick={() => {
                  setSelectedAgent(3);
                  setMessages([
                    {
                      role: "assistant",
                      content: "I'm the Proposal Agent. I can help you generate and manage proposal documents. What would you like to work on?",
                    },
                  ]);
                }}
              />
              <AgentListItem
                id={4}
                name="Research Agent"
                status="active"
                selected={selectedAgent === 4}
                onClick={() => {
                  setSelectedAgent(4);
                  setMessages([
                    {
                      role: "assistant",
                      content: "I'm the Research Agent. I can help you conduct web research and analyze PDFs. What would you like me to research?",
                    },
                  ]);
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="flex flex-col h-[600px]">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                {selectedAgent === 1 && "Inbox Triage Agent"}
                {selectedAgent === 2 && "Sales Agent"}
                {selectedAgent === 3 && "Proposal Agent"}
                {selectedAgent === 4 && "Research Agent"}
              </CardTitle>
              <CardDescription>Real-time conversation with AI</CardDescription>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-slate-100 text-slate-900 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg rounded-bl-none">
                    <Spinner className="w-4 h-4" />
                  </div>
                </div>
              )}
            </CardContent>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Send a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !isLoading) handleSendMessage();
                  }}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? <Spinner className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Agent Details Grid */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">All Agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AgentCard
            name="Inbox Triage Agent"
            description="Automatically categorizes and prioritizes incoming messages"
            status="active"
            domain="Inbox History"
            onClick={() => setSelectedAgent(1)}
          />
          <AgentCard
            name="Sales Agent"
            description="Manages leads and sales pipeline interactions"
            status="active"
            domain="CRM & Interactions"
            onClick={() => setSelectedAgent(2)}
          />
          <AgentCard
            name="Proposal Agent"
            description="Generates and manages proposal documents"
            status="idle"
            domain="Proposals & Docs"
            onClick={() => setSelectedAgent(3)}
          />
          <AgentCard
            name="Research Agent"
            description="Conducts web research and PDF analysis"
            status="active"
            domain="Web & PDFs"
            onClick={() => setSelectedAgent(4)}
          />
        </div>
      </div>
    </div>
  );
}

function AgentListItem({
  id,
  name,
  status,
  selected,
  onClick,
}: {
  id: number;
  name: string;
  status: "active" | "idle" | "error";
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg border transition ${
        selected
          ? "border-blue-600 bg-blue-50"
          : "border-slate-200 hover:bg-slate-50"
      }`}
    >
      <p className={`font-medium ${selected ? "text-blue-900" : "text-slate-900"}`}>{name}</p>
      <Badge
        className={`mt-2 ${
          status === "active"
            ? "bg-green-100 text-green-700"
            : status === "idle"
              ? "bg-slate-100 text-slate-700"
              : "bg-red-100 text-red-700"
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    </button>
  );
}

function AgentCard({
  name,
  description,
  status,
  domain,
  onClick,
}: {
  name: string;
  description: string;
  status: "active" | "idle" | "error";
  domain: string;
  onClick: () => void;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-semibold text-slate-900">{name}</p>
            <p className="text-sm text-slate-600 mt-2">{description}</p>
          </div>
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
        </div>
        <p className="text-xs text-slate-600 mt-4 pt-4 border-t border-slate-200">{domain}</p>
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-4"
          onClick={onClick}
        >
          Open Chat
        </Button>
      </CardContent>
    </Card>
  );
}
