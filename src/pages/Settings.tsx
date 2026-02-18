import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, Building2, Bell, Shield, Globe } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground">Manage your HRM system configuration</p>
      </div>

      {/* Company info */}
      <Card className="p-6 border-0 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl stat-card-gradient flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Company Information</h3>
            <p className="text-sm text-muted-foreground">Update your organization details</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Company Name</Label>
            <Input defaultValue="FUNDiT Finance Company Limited" className="mt-1" />
          </div>
          <div>
            <Label>Industry</Label>
            <Input defaultValue="Finance / HR Outsourcing" className="mt-1" />
          </div>
          <div>
            <Label>Email</Label>
            <Input defaultValue="hr@fundit.com.ng" className="mt-1" />
          </div>
          <div>
            <Label>Phone</Label>
            <Input defaultValue="+234 708 642 9380" className="mt-1" />
          </div>
        </div>
        <Button className="bg-primary text-primary-foreground mt-4">Save Changes</Button>
      </Card>

      {/* Notifications */}
      <Card className="p-6 border-0 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl info-gradient flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Notifications</h3>
            <p className="text-sm text-muted-foreground">Configure notification preferences</p>
          </div>
        </div>
        <div className="space-y-4">
          {["Email notifications for leave requests", "SMS alerts for payroll processing", "Push notifications for approvals", "Weekly digest reports"].map((label) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{label}</span>
              <Switch defaultChecked />
            </div>
          ))}
        </div>
      </Card>

      {/* Security */}
      <Card className="p-6 border-0 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl accent-gradient flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Security</h3>
            <p className="text-sm text-muted-foreground">Authentication and access control settings</p>
          </div>
        </div>
        <div className="space-y-4">
          {["Two-factor authentication (2FA)", "SSO Integration", "Audit trail logging", "Session timeout after inactivity"].map((label) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{label}</span>
              <Switch defaultChecked />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
