import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Phone, MapPin, Briefcase, Calendar } from "lucide-react";

export default function MyProfile() {
  const { user } = useAuth();
  const fullName = user?.user_metadata?.full_name || "Employee Name";

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <Card className="p-6 border-0 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full stat-card-gradient flex items-center justify-center">
            <span className="text-primary-foreground text-2xl font-bold">
              {fullName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{fullName}</h2>
            <p className="text-sm text-muted-foreground">Senior Analyst · Finance Department</p>
            <p className="text-xs text-muted-foreground mt-1">Employee ID: EMP-2024-0142</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-5 border-0 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> Employment
          </h3>
          <div className="space-y-3 text-sm">
            <Row label="Department" value="Finance" />
            <Row label="Position" value="Senior Analyst" />
            <Row label="Manager" value="Adebayo Okafor" />
            <Row label="Date of Joining" value="Mar 15, 2022" />
            <Row label="Employment Type" value="Full-time" />
          </div>
        </Card>

        <Card className="p-5 border-0 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Mail className="w-4 h-4" /> Contact
          </h3>
          <div className="space-y-3 text-sm">
            <Row label="Email" value={user?.email || "employee@company.com"} />
            <Row label="Phone" value="+234 803 123 4567" />
            <Row label="Address" value="12 Adeola Odeku St, Victoria Island, Lagos" />
            <Row label="Emergency Contact" value="Jane Doe · +234 802 987 6543" />
          </div>
        </Card>
      </div>

      <Card className="p-5 border-0 shadow-sm">
        <h3 className="font-semibold text-foreground mb-4">Update Personal Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" defaultValue="+234 803 123 4567" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" defaultValue="12 Adeola Odeku St, VI, Lagos" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="ec-name">Emergency Contact Name</Label>
            <Input id="ec-name" defaultValue="Jane Doe" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="ec-phone">Emergency Contact Phone</Label>
            <Input id="ec-phone" defaultValue="+234 802 987 6543" className="mt-1.5" />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className="font-medium text-foreground text-right">{value}</span>
    </div>
  );
}
