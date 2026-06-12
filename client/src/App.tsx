import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Dashboard from "./pages/Dashboard";
import Inbox from "./pages/Inbox";
import ToolIntegrations from "./pages/ToolIntegrations";
import AutomationHub from "./pages/AutomationHub";
import Agents from "./pages/Agents";
import RevenueIntelligence from "./pages/RevenueIntelligence";
import Workspaces from "./pages/Workspaces";
import CommunityRoadmap from "./pages/CommunityRoadmap";
import Settings from "./pages/Settings";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Dashboard} />
      <Route path={"/inbox"} component={Inbox} />
      <Route path={"/tools"} component={ToolIntegrations} />
      <Route path={"/automations"} component={AutomationHub} />
      <Route path={"/agents"} component={Agents} />
      <Route path={"/revenue-intelligence"} component={RevenueIntelligence} />
      <Route path={"/workspaces"} component={Workspaces} />
      <Route path={"/community-roadmap"} component={CommunityRoadmap} />
      <Route path={"/settings"} component={Settings} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
