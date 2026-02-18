import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Plus, CheckCircle2, XCircle, Clock } from "lucide-react";

const leaveRequests = [
  { id: 1, name: "Fatima Yusuf", type: "Annual Leave", from: "2026-02-20", to: "2026-02-25", days: 5, status: "Pending", reason: "Family vacation" },
  { id: 2, name: "Adebayo Johnson", type: "Sick Leave", from: "2026-02-17", to: "2026-02-18", days: 2, status: "Approved", reason: "Medical appointment" },
  { id: 3, name: "Emeka Obi", type: "Compassionate", from: "2026-02-15", to: "2026-02-17", days: 3, status: "Approved", reason: "Family emergency" },
  { id: 4, name: "Grace Adeyemi", type: "Study Leave", from: "2026-03-01", to: "2026-03-05", days: 5, status: "Pending", reason: "Professional exam" },
  { id: 5, name: "Tunde Bello", type: "Annual Leave", from: "2026-03-10", to: "2026-03-14", days: 5, status: "Rejected", reason: "Personal time" },
];

const leaveBalance = [
  { type: "Annual", total: 20, used: 8, color: "stat-card-gradient" },
  { type: "Sick", total: 10, used: 3, color: "accent-gradient" },
  { type: "Maternity", total: 90, used: 0, color: "warning-gradient" },
  { type: "Compassionate", total: 5, used: 2, color: "info-gradient" },
];

const statusConfig: Record<string, { icon: typeof Clock; className: string }> = {
  Pending: { icon: Clock, className: "bg-warning/10 text-warning" },
  Approved: { icon: CheckCircle2, className: "bg-success/10 text-success" },
  Rejected: { icon: XCircle, className: "bg-destructive/10 text-destructive" },
};

export default function Leave() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Leave Management</h2>
          <p className="text-muted-foreground">Track and manage employee leave requests</p>
        </div>
        <Button className="bg-primary text-primary-foreground gap-2">
          <Plus className="w-4 h-4" /> New Request
        </Button>
      </div>

      {/* Balance cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {leaveBalance.map((lb) => (
          <Card key={lb.type} className="p-4 border-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${lb.color} flex items-center justify-center`}>
                <CalendarDays className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{lb.type} Leave</p>
                <p className="text-lg font-bold text-foreground">{lb.total - lb.used}<span className="text-sm font-normal text-muted-foreground">/{lb.total}</span></p>
              </div>
            </div>
            <div className="mt-3 w-full bg-secondary rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full bg-primary"
                style={{ width: `${(lb.used / lb.total) * 100}%` }}
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Requests table */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Recent Requests</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Days</th>
                <th className="px-4 py-3">Reason</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {leaveRequests.map((req) => {
                const sc = statusConfig[req.status];
                return (
                  <tr key={req.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{req.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{req.type}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{req.from} → {req.to}</td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{req.days}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{req.reason}</td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className={`${sc.className} border-0 gap-1`}>
                        <sc.icon className="w-3 h-3" /> {req.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      {req.status === "Pending" && (
                        <div className="flex gap-2">
                          <button className="text-xs px-2.5 py-1 rounded bg-primary text-primary-foreground font-medium">Approve</button>
                          <button className="text-xs px-2.5 py-1 rounded bg-secondary text-foreground font-medium">Reject</button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
