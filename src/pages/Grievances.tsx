import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShieldAlert, Search, Plus, AlertTriangle, Scale, CheckCircle2, Clock, FileWarning } from "lucide-react";
import { useState } from "react";

type Case = {
  id: number;
  caseNo: string;
  type: "Grievance" | "Disciplinary";
  name: string;
  role: string;
  subject: string;
  filedDate: string;
  severity: string;
  status: string;
  description: string;
  outcome?: string;
  respondent?: string;
};

const cases: Case[] = [
  {
    id: 1, caseNo: "GRV-001", type: "Grievance", name: "Adebayo Johnson", role: "Finance Analyst",
    subject: "Workplace Harassment", filedDate: "2026-02-20", severity: "High", status: "Under Investigation",
    description: "Employee reports repeated instances of verbal harassment from a senior colleague during team meetings. HR is currently investigating the claim.",
    respondent: "Senior Colleague (name withheld)",
  },
  {
    id: 2, caseNo: "DSC-001", type: "Disciplinary", name: "Tunde Bello", role: "Energy Consultant",
    subject: "Unauthorized Absence", filedDate: "2026-02-15", severity: "Medium", status: "Hearing Scheduled",
    description: "Employee was absent from work for 3 consecutive days without prior notice or approval. A formal disciplinary hearing has been scheduled.",
    outcome: "Warning letter issued. Monitoring for 3 months.",
  },
  {
    id: 3, caseNo: "GRV-002", type: "Grievance", name: "Ngozi Okwu", role: "Logistics Lead",
    subject: "Unfair Performance Rating", filedDate: "2026-02-10", severity: "Medium", status: "Resolved",
    description: "Employee disputes their Q4 performance rating, claiming the criteria were not consistently applied. HR reviewed and adjusted the rating.",
    outcome: "Rating reviewed and updated from 3.2 to 3.8.",
  },
  {
    id: 4, caseNo: "DSC-002", type: "Disciplinary", name: "Ibrahim Musa", role: "Credit Analyst",
    subject: "Data Policy Violation", filedDate: "2026-02-05", severity: "High", status: "Under Investigation",
    description: "Employee allegedly shared confidential client data externally. The case is under investigation by HR and Legal.",
  },
  {
    id: 5, caseNo: "GRV-003", type: "Grievance", name: "Grace Adeyemi", role: "Property Manager",
    subject: "Denied Promotion", filedDate: "2026-01-28", severity: "Low", status: "Closed",
    description: "Employee grieved the denial of a promotion. After review, HR explained the criteria and offered a development plan.",
    outcome: "Development plan accepted. Case closed.",
  },
];

const statusStyle: Record<string, string> = {
  "Under Investigation": "bg-warning/10 text-warning",
  "Hearing Scheduled": "bg-info/10 text-info",
  "Resolved": "bg-success/10 text-success",
  "Closed": "bg-secondary text-muted-foreground",
};

const severityStyle: Record<string, string> = {
  "High": "bg-destructive/10 text-destructive",
  "Medium": "bg-warning/10 text-warning",
  "Low": "bg-success/10 text-success",
};

const typeStyle: Record<string, string> = {
  "Grievance": "bg-info/10 text-info",
  "Disciplinary": "bg-accent/10 text-accent",
};

const stats = [
  { label: "Total Cases", value: String(cases.length), gradient: "stat-card-gradient", icon: FileWarning },
  { label: "Grievances", value: String(cases.filter(c => c.type === "Grievance").length), gradient: "info-gradient", icon: Scale },
  { label: "Disciplinary", value: String(cases.filter(c => c.type === "Disciplinary").length), gradient: "accent-gradient", icon: AlertTriangle },
  { label: "Open Cases", value: String(cases.filter(c => c.status !== "Resolved" && c.status !== "Closed").length), gradient: "warning-gradient", icon: Clock },
];

export default function Grievances() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Grievance" | "Disciplinary">("All");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = cases.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.subject.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || c.type === filter;
    return matchSearch && matchFilter;
  });

  const detail = cases.find(c => c.id === selected);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Grievances & Disciplinary</h2>
          <p className="text-muted-foreground">Manage employee grievances and disciplinary proceedings</p>
        </div>
        <Button className="bg-primary text-primary-foreground gap-2">
          <Plus className="w-4 h-4" /> New Case
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
        {/* Case list */}
        <Card className="lg:col-span-2 border-0 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search cases..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
            </div>
            <div className="flex gap-2">
              {(["All", "Grievance", "Disciplinary"] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="divide-y divide-border">
            {filtered.map(c => (
              <div
                key={c.id}
                onClick={() => setSelected(c.id === selected ? null : c.id)}
                className={`p-4 cursor-pointer hover:bg-secondary/30 transition-colors ${selected === c.id ? "bg-secondary/50" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${c.type === "Grievance" ? "info-gradient" : "accent-gradient"}`}>
                      {c.type === "Grievance" ? <Scale className="w-4 h-4 text-primary-foreground" /> : <AlertTriangle className="w-4 h-4 text-primary-foreground" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-mono text-muted-foreground">{c.caseNo}</p>
                        <Badge variant="secondary" className={`${typeStyle[c.type]} border-0 text-xs`}>{c.type}</Badge>
                      </div>
                      <p className="text-sm font-semibold text-foreground mt-0.5">{c.subject}</p>
                      <p className="text-xs text-muted-foreground">{c.name} · {c.role}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <Badge variant="secondary" className={`${statusStyle[c.status]} border-0 text-xs`}>{c.status}</Badge>
                    <Badge variant="secondary" className={`${severityStyle[c.severity]} border-0 text-xs`}>{c.severity}</Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Filed: {c.filedDate}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Detail */}
        <Card className="border-0 shadow-sm p-5">
          {detail ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-mono text-muted-foreground">{detail.caseNo}</p>
                <Badge variant="secondary" className={`${typeStyle[detail.type]} border-0 text-xs`}>{detail.type}</Badge>
              </div>
              <div>
                <p className="font-bold text-foreground text-base">{detail.subject}</p>
                <Badge variant="secondary" className={`${statusStyle[detail.status]} border-0 text-xs mt-1`}>{detail.status}</Badge>
              </div>
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl">
                <div className="w-10 h-10 rounded-full stat-card-gradient flex items-center justify-center">
                  <span className="text-primary-foreground text-xs font-bold">{detail.name.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{detail.name}</p>
                  <p className="text-xs text-muted-foreground">{detail.role}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Filed</span><span className="font-medium">{detail.filedDate}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Severity</span>
                  <Badge variant="secondary" className={`${severityStyle[detail.severity]} border-0 text-xs`}>{detail.severity}</Badge>
                </div>
                {detail.respondent && <div className="flex justify-between"><span className="text-muted-foreground">Respondent</span><span className="font-medium text-right max-w-[60%]">{detail.respondent}</span></div>}
              </div>
              <div className="p-3 bg-secondary/30 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Description</p>
                <p className="text-sm text-foreground leading-relaxed">{detail.description}</p>
              </div>
              {detail.outcome && (
                <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                  <div className="flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                    <p className="text-xs font-semibold text-success">Outcome</p>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{detail.outcome}</p>
                </div>
              )}
              {(detail.status === "Under Investigation" || detail.status === "Hearing Scheduled") && (
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-primary text-primary-foreground">Update</Button>
                  <Button size="sm" variant="outline" className="flex-1">Close</Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-10 space-y-3">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                <ShieldAlert className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">Select a case</p>
              <p className="text-xs text-muted-foreground">Click on a case to view full details and take action.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
