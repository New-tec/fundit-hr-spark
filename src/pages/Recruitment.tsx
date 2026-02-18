import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Briefcase, Users, Clock, Eye } from "lucide-react";

const stats = [
  { label: "Open Positions", value: "3", icon: Briefcase, gradient: "stat-card-gradient" },
  { label: "Total Applicants", value: "18", icon: Users, gradient: "info-gradient" },
  { label: "In Review", value: "7", icon: Clock, gradient: "warning-gradient" },
  { label: "Hired This Month", value: "1", icon: UserPlus, gradient: "success-gradient" },
];

const openings = [
  { id: 1, title: "Finance Analyst", client: "FUNDiT", applicants: 8, stage: "Interviewing", posted: "2026-01-28" },
  { id: 2, title: "Marine Technician", client: "Oil & Marine Co", applicants: 6, stage: "Screening", posted: "2026-02-05" },
  { id: 3, title: "Property Valuer", client: "Energy Solutions", applicants: 4, stage: "Open", posted: "2026-02-12" },
];

const pipeline = [
  { stage: "Applied", count: 18, color: "bg-muted" },
  { stage: "Screening", count: 7, color: "bg-info" },
  { stage: "Interview", count: 4, color: "bg-warning" },
  { stage: "Offer", count: 2, color: "bg-success" },
  { stage: "Hired", count: 1, color: "bg-primary" },
];

export default function Recruitment() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Recruitment</h2>
          <p className="text-muted-foreground">Track job openings and applicant pipeline</p>
        </div>
        <Button className="bg-primary text-primary-foreground gap-2">
          <UserPlus className="w-4 h-4" /> Post Job
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5 border-0 shadow-sm">
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

      {/* Pipeline */}
      <Card className="p-5 border-0 shadow-sm">
        <h3 className="font-semibold text-foreground mb-4">Hiring Pipeline</h3>
        <div className="flex items-end gap-2 h-32">
          {pipeline.map((p) => (
            <div key={p.stage} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-sm font-bold text-foreground">{p.count}</span>
              <div className={`w-full ${p.color} rounded-t-lg transition-all`} style={{ height: `${(p.count / 18) * 100}%`, minHeight: 8 }} />
              <span className="text-xs text-muted-foreground">{p.stage}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Job openings */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Open Positions</h3>
        </div>
        <div className="divide-y divide-border">
          {openings.map((job) => (
            <div key={job.id} className="p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors">
              <div>
                <p className="font-medium text-foreground">{job.title}</p>
                <p className="text-sm text-muted-foreground">{job.client} · Posted {job.posted}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{job.applicants} applicants</p>
                  <Badge variant="secondary" className="bg-info/10 text-info border-0 text-xs">{job.stage}</Badge>
                </div>
                <Button variant="outline" size="sm" className="gap-1"><Eye className="w-3.5 h-3.5" /> View</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
