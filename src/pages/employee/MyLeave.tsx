import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays, CheckCircle2, Clock, XCircle } from "lucide-react";
import { toast } from "sonner";

const balances = [
  { type: "Annual", taken: 12, total: 30, color: "stat-card-gradient" },
  { type: "Sick", taken: 4, total: 20, color: "info-gradient" },
  { type: "Personal", taken: 2, total: 10, color: "warning-gradient" },
  { type: "Maternity/Paternity", taken: 0, total: 90, color: "success-gradient" },
];

const history = [
  { type: "Annual", from: "Feb 14", to: "Feb 18", days: 5, status: "Approved" },
  { type: "Sick", from: "Jan 22", to: "Jan 23", days: 2, status: "Approved" },
  { type: "Personal", from: "Mar 18", to: "Mar 19", days: 2, status: "Pending" },
  { type: "Annual", from: "Dec 24", to: "Dec 31", days: 6, status: "Approved" },
];

export default function MyLeave() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-foreground">Leave Management</h2>
          <p className="text-sm text-muted-foreground">Apply for and track your leave requests</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Apply for Leave"}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 border-0 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">New Leave Request</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Leave Type</Label>
              <Select defaultValue="annual">
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">Annual Leave</SelectItem>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="personal">Personal Leave</SelectItem>
                  <SelectItem value="maternity">Maternity/Paternity</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="from">From</Label>
              <Input type="date" id="from" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="to">To</Label>
              <Input type="date" id="to" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="contact">Emergency Contact</Label>
              <Input id="contact" placeholder="+234..." className="mt-1.5" />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="reason">Reason</Label>
              <Textarea id="reason" placeholder="Brief reason for leave..." className="mt-1.5" rows={3} />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button
              onClick={() => {
                toast.success("Leave request submitted for approval");
                setShowForm(false);
              }}
            >
              Submit Request
            </Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {balances.map((b) => {
          const remaining = b.total - b.taken;
          const pct = (b.taken / b.total) * 100;
          return (
            <Card key={b.type} className="p-5 border-0 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-foreground">{b.type}</p>
                <CalendarDays className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold text-foreground">{remaining} <span className="text-sm font-normal text-muted-foreground">days left</span></p>
              <div className="w-full h-1.5 bg-secondary rounded-full mt-3 overflow-hidden">
                <div className={`h-full ${b.color}`} style={{ width: `${pct}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{b.taken} of {b.total} used</p>
            </Card>
          );
        })}
      </div>

      <Card className="p-5 border-0 shadow-sm">
        <h3 className="font-semibold text-foreground mb-4">Request History</h3>
        <div className="space-y-2">
          {history.map((h, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-3">
                {h.status === "Approved" ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : h.status === "Pending" ? (
                  <Clock className="w-5 h-5 text-warning" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive" />
                )}
                <div>
                  <p className="text-sm font-medium text-foreground">{h.type} · {h.days} day(s)</p>
                  <p className="text-xs text-muted-foreground">{h.from} → {h.to}</p>
                </div>
              </div>
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  h.status === "Approved"
                    ? "bg-success/10 text-success"
                    : h.status === "Pending"
                    ? "bg-warning/10 text-warning"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {h.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
