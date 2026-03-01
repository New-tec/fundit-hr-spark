import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { LogOut, Plus, Search, ClipboardList, UserX, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";

const exits = [
  { id: 1, name: "Chuka Nwosu", role: "Finance Analyst", type: "Resignation", exitDate: "2026-03-15", status: "In Progress", clearance: 3, totalClearance: 6, reason: "Better opportunity" },
  { id: 2, name: "Blessing Taiwo", role: "HR Coordinator", type: "Termination", exitDate: "2026-02-28", status: "Completed", clearance: 6, totalClearance: 6, reason: "Contract ended" },
  { id: 3, name: "Kemi Adewale", role: "Safety Officer", type: "Retirement", exitDate: "2026-04-01", status: "Initiated", clearance: 1, totalClearance: 6, reason: "Age retirement" },
  { id: 4, name: "Daniel Eze", role: "IT Manager", type: "Resignation", exitDate: "2026-03-31", status: "In Progress", clearance: 4, totalClearance: 6, reason: "Relocation" },
];

const clearanceSteps = ["HR", "IT / Assets", "Finance", "Line Manager", "Security", "MD / CEO"];

const stats = [
  { label: "Active Exits", value: "4", icon: UserX, gradient: "accent-gradient" },
  { label: "Pending Clearance", value: "3", icon: Clock, gradient: "warning-gradient" },
  { label: "Completed", value: "12", icon: CheckCircle2, gradient: "success-gradient" },
  { label: "This Month", value: "2", icon: AlertCircle, gradient: "info-gradient" },
];

const statusStyle: Record<string, string> = {
  "Initiated": "bg-info/10 text-info",
  "In Progress": "bg-warning/10 text-warning",
  "Completed": "bg-success/10 text-success",
};

const typeStyle: Record<string, string> = {
  "Resignation": "bg-accent/10 text-accent",
  "Termination": "bg-destructive/10 text-destructive",
  "Retirement": "bg-primary/10 text-primary",
};

export default function ExitManagement() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const filtered = exits.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.type.toLowerCase().includes(search.toLowerCase())
  );
  const detail = exits.find(e => e.id === selected);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Exit Management</h2>
          <p className="text-muted-foreground">Manage employee offboarding and clearance processes</p>
        </div>
        <Button className="bg-primary text-primary-foreground gap-2">
          <Plus className="w-4 h-4" /> Initiate Exit
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
        <Card className="lg:col-span-2 border-0 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search exits..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
            </div>
          </div>
          <div className="divide-y divide-border">
            {filtered.map(exit => (
              <div
                key={exit.id}
                onClick={() => setSelected(exit.id === selected ? null : exit.id)}
                className={`p-4 cursor-pointer hover:bg-secondary/30 transition-colors ${selected === exit.id ? "bg-secondary/50" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full stat-card-gradient flex items-center justify-center shrink-0">
                      <span className="text-primary-foreground text-xs font-semibold">
                        {exit.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{exit.name}</p>
                      <p className="text-xs text-muted-foreground">{exit.role}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="secondary" className={`${typeStyle[exit.type]} border-0 text-xs`}>{exit.type}</Badge>
                    <Badge variant="secondary" className={`${statusStyle[exit.status]} border-0 text-xs`}>{exit.status}</Badge>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Clearance Progress</span>
                    <span>{exit.clearance}/{exit.totalClearance} steps</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full bg-primary transition-all"
                      style={{ width: `${(exit.clearance / exit.totalClearance) * 100}%` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Exit Date: <span className="text-foreground font-medium">{exit.exitDate}</span></p>
              </div>
            ))}
          </div>
        </Card>

        {/* Detail panel */}
        <Card className="border-0 shadow-sm p-5">
          {detail ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full stat-card-gradient flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">{detail.name.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{detail.name}</p>
                  <p className="text-sm text-muted-foreground">{detail.role}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Exit Type</span><span className="font-medium">{detail.type}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Exit Date</span><span className="font-medium">{detail.exitDate}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Reason</span><span className="font-medium">{detail.reason}</span></div>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-3">Clearance Checklist</p>
                <div className="space-y-2">
                  {clearanceSteps.map((step, i) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${i < detail.clearance ? "bg-success" : "bg-secondary"}`}>
                        {i < detail.clearance
                          ? <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                          : <span className="text-xs text-muted-foreground font-medium">{i + 1}</span>
                        }
                      </div>
                      <span className={`text-sm ${i < detail.clearance ? "text-foreground line-through text-muted-foreground" : i === detail.clearance ? "text-foreground font-medium" : "text-muted-foreground"}`}>{step}</span>
                      {i === detail.clearance && <Badge variant="secondary" className="bg-warning/10 text-warning border-0 text-xs ml-auto">Pending</Badge>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1 bg-primary text-primary-foreground">Update</Button>
                <Button size="sm" variant="outline" className="flex-1">Print</Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-10 space-y-3">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                <LogOut className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">Select an exit record</p>
              <p className="text-xs text-muted-foreground">Click on an employee to view their exit details and clearance status.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
