import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/_core/hooks/useAuth";
import { Bell, User, Lock, LogOut } from "lucide-react";

export default function Settings() {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-2">Manage your account, preferences, and notification settings.</p>
      </div>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Account Information
          </CardTitle>
          <CardDescription>Your profile details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              defaultValue={user?.name || ""}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              defaultValue={user?.email || ""}
              className="mt-2"
              disabled
            />
            <p className="text-xs text-slate-500 mt-2">Email cannot be changed</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Control how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">In-App Notifications</p>
              <p className="text-sm text-slate-600">Receive notifications within the app</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">Email Notifications</p>
              <p className="text-sm text-slate-600">Receive notifications via email</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">Automation Alerts</p>
              <p className="text-sm text-slate-600">Get notified when automations trigger</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">Agent Completions</p>
              <p className="text-sm text-slate-600">Get notified when agents complete tasks</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">Integration Failures</p>
              <p className="text-sm text-slate-600">Get notified when tool connections fail</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Save Preferences</Button>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Security
          </CardTitle>
          <CardDescription>Manage your security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium text-slate-900 mb-2">Two-Factor Authentication</p>
            <p className="text-sm text-slate-600 mb-4">Add an extra layer of security to your account</p>
            <Button variant="outline">Enable 2FA</Button>
          </div>
          <div className="pt-4 border-t border-slate-200">
            <p className="font-medium text-slate-900 mb-2">Active Sessions</p>
            <p className="text-sm text-slate-600 mb-4">Manage your active login sessions</p>
            <Button variant="outline">View Sessions</Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-900">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium text-slate-900 mb-2">Sign Out</p>
            <p className="text-sm text-slate-600 mb-4">Sign out from all devices</p>
            <Button
              variant="destructive"
              onClick={logout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
          <div className="pt-4 border-t border-red-200">
            <p className="font-medium text-slate-900 mb-2">Delete Account</p>
            <p className="text-sm text-slate-600 mb-4">Permanently delete your account and all data</p>
            <Button variant="destructive" className="opacity-50 cursor-not-allowed" disabled>
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
