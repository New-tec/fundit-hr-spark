import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCheck, Clock, CheckCircle2, AlertCircle, CalendarDays, Star } from "lucide-react";
import { useState } from "react";

const confirmations = [
  { id: 1, name: "Ngozi Okwu", role: "Logistics Lead", department: "Supply Chain", startDate: "2026-01-05", probationEnd: "2026-04-05", daysLeft: 35, score: 4.1, status: "Due Soon", lineManager: "Emeka Obi", notes: "Consistent performance. Recommended for confirmation." },
  { id: 2, name: "Chioma Eze", role: "Marine Engineer", department: "Operations", startDate: "2026-01-20", probationEnd: "2026-04-20", daysLeft: 50, score: 4.5, status: "In Probation", lineManager: "Tunde Bello", notes: "Excellent technical skills and team collaboration." },
  { id: 3, name: "Uche Nnamdi", role: "Business Analyst", department: "Strategy", startDate: "2025-12-01", probationEnd: "2026-03-01", daysLeft: 0, status: "Overdue", lineManager: "Adebayo Johnson", notes: "Pending manager's final review." },
  { id: 4, name: "Yemi Adegoke", role: "Account Officer", department: "Finance", startDate: "2025-11-01", probationEnd: "2026-02-01", daysLeft: 0, status: "Confirmed", lineManager: "Ibrahim Musa", notes: "Successfully confirmed. Excellent performance throughout probation." },
  { id: 5, name: "Bisi Okafor", role: "Content Strategist", department: "Marketing", startDate: "2025-10-15", probationEnd: "2026-01-15", daysLeft: 0, status: "Confirmed", lineManager: "Fatima Yusuf", notes: "Confirmed with commendation." },
];

const statusStyle: Record<string, string> = {
  "In Probation": "bg-info/10 text-info",
  "Due Soon": "bg-warning/10 text-warning",
  "Overdue": "bg-destructive/10 text-destructive",
  "Confirmed": "bg-success/10 text-success",
};

const stats = [
  { label: "On Probation", value: "3", gradient: "info-gradient", icon: Clock },
  { label: "Due This Month", value: "2", gradient: "warning-gradient", icon: CalendarDays },
  { label: "Overdue", value: "1", gradient: "accent-gradient", icon: AlertCircle },
  { label: "Confirmed YTD", value: "8", gradient: "success-gradient", icon: CheckCircle2 },
];

export default function Confirmation() {
  const [selected, setSelected] = useState<number | null>(null);
  const detail = confirmations.find(c => c.id === selected);

  const probationMonths = 3;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Staff Confirmation</h2>
          <p className="text-muted-foreground">Manage probationary periods and staff confirmations</p>
        </div>
        <Button className="bg-primary text-primary-foreground gap-2">
          <UserCheck className="w-4 h-4" /> Confirm Staff
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <Card key={s.label} className="p-4 border-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${s.gradient} flex items-center justify-center`}>
                <s.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* List */}
        <div className="lg:col-span-2 space-y-3">
          {confirmations.map(c => {
            const totalDays = probationMonths * 30;
            const elapsed = totalDays - c.daysLeft;
            const pct = Math.min(100, (elapsed / totalDays) * 100);
            return (
              <Card
                key={c.id}
                onClick={() => setSelected(c.id === selected ? null : c.id)}
                className={`p-4 border-0 shadow-sm cursor-pointer hover:shadow-md transition-all ${selected === c.id ? "ring-2 ring-primary" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full stat-card-gradient flex items-center justify-center shrink-0">
                      <span className="text-primary-foreground text-xs font-bold">
                        {c.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.role} · {c.department}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className={`${statusStyle[c.status]} border-0 text-xs shrink-0`}>{c.status}</Badge>
                </div>
                <div className="mt-3 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Probation Progress</span>
                    <span className="text-foreground font-medium">
                      {c.status === "Confirmed" ? "Completed" : c.daysLeft > 0 ? `${c.daysLeft} days left` : "Awaiting confirmation"}
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all ${c.status === "Confirmed" ? "bg-success" : c.status === "Overdue" ? "bg-destructive" : "bg-primary"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>Start: {c.startDate}</span>
                  <span>End: {c.probationEnd}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-warning text-warning" />
                    <span className="font-medium text-foreground">{c.score}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Detail */}
        <Card className="border-0 shadow-sm p-5 h-fit">
          {detail ? (
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Confirmation Details</h3>
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl">
                <div className="w-12 h-12 rounded-full stat-card-gradient flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">{detail.name.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{detail.name}</p>
                  <p className="text-xs text-muted-foreground">{detail.role}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Department</span><span className="font-medium">{detail.department}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Start Date</span><span className="font-medium">{detail.startDate}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Probation Ends</span><span className="font-medium">{detail.probationEnd}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Line Manager</span><span className="font-medium">{detail.lineManager}</span></div>
                <div className="flex justify-between items-center"><span className="text-muted-foreground">Status</span>
                  <Badge variant="secondary" className={`${statusStyle[detail.status]} border-0 text-xs`}>{detail.status}</Badge>
                </div>
                <div className="flex justify-between items-center"><span className="text-muted-foreground">Performance</span>
                  <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-warning text-warning" /><span className="font-medium">{detail.score}/5.0</span></div>
                </div>
              </div>
              <div className="p-3 bg-secondary/30 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Manager Notes</p>
                <p className="text-sm text-foreground">{detail.notes}</p>
              </div>
              {detail.status !== "Confirmed" && (
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-primary text-primary-foreground">Confirm</Button>
                  <Button size="sm" variant="outline" className="flex-1">Extend</Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-10 space-y-3">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">Select a record</p>
              <p className="text-xs text-muted-foreground">Click on an employee to view confirmation details.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
