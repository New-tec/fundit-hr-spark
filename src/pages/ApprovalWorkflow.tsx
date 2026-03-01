import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GitBranch, CheckCircle2, XCircle, Clock, ChevronRight, User, MessageSquare } from "lucide-react";
import { useState } from "react";

type WorkflowItem = {
  id: number;
  type: string;
  submittedBy: string;
  role: string;
  details: string;
  submittedDate: string;
  urgency: string;
  status: string;
  steps: { label: string; approver: string; status: string; comment?: string }[];
};

const workflows: WorkflowItem[] = [
  {
    id: 1, type: "Leave Request", submittedBy: "Fatima Yusuf", role: "HR Coordinator",
    details: "5 days Annual Leave – Mar 10 to Mar 14, 2026", submittedDate: "2026-02-28",
    urgency: "Normal", status: "Awaiting Line Manager",
    steps: [
      { label: "Submitted", approver: "Fatima Yusuf", status: "Done", comment: "Requested for family vacation." },
      { label: "Line Manager Review", approver: "Ibrahim Musa", status: "Pending" },
      { label: "HR Approval", approver: "HR Department", status: "Waiting" },
    ]
  },
  {
    id: 2, type: "Loan Request", submittedBy: "Emeka Obi", role: "Safety Officer",
    details: "₦500,000 – Vehicle purchase", submittedDate: "2026-02-25",
    urgency: "High", status: "Awaiting HR",
    steps: [
      { label: "Submitted", approver: "Emeka Obi", status: "Done" },
      { label: "Line Manager Review", approver: "Tunde Bello", status: "Done", comment: "Approved. Employee has clean record." },
      { label: "HR Approval", approver: "HR Department", status: "Pending" },
      { label: "Finance Sign-Off", approver: "Finance Department", status: "Waiting" },
    ]
  },
  {
    id: 3, type: "Expense Claim", submittedBy: "Grace Adeyemi", role: "Property Manager",
    details: "₦45,000 – Site visit expenses", submittedDate: "2026-02-20",
    urgency: "Normal", status: "Approved",
    steps: [
      { label: "Submitted", approver: "Grace Adeyemi", status: "Done" },
      { label: "Line Manager Review", approver: "Adebayo Johnson", status: "Done", comment: "Verified. Expenses within budget." },
      { label: "Finance Approval", approver: "Finance Department", status: "Done", comment: "Payment processed." },
    ]
  },
  {
    id: 4, type: "Training Request", submittedBy: "Ngozi Okwu", role: "Logistics Lead",
    details: "Supply Chain Management Certification", submittedDate: "2026-02-18",
    urgency: "Normal", status: "Rejected",
    steps: [
      { label: "Submitted", approver: "Ngozi Okwu", status: "Done" },
      { label: "Line Manager Review", approver: "Chioma Eze", status: "Rejected", comment: "Budget constraints this quarter." },
    ]
  },
];

const stepStatusStyle: Record<string, { icon: typeof CheckCircle2; color: string; bg: string }> = {
  "Done": { icon: CheckCircle2, color: "text-success", bg: "bg-success" },
  "Pending": { icon: Clock, color: "text-warning", bg: "bg-warning" },
  "Waiting": { icon: Clock, color: "text-muted-foreground", bg: "bg-secondary" },
  "Rejected": { icon: XCircle, color: "text-destructive", bg: "bg-destructive" },
};

const urgencyStyle: Record<string, string> = {
  "High": "bg-accent/10 text-accent",
  "Normal": "bg-secondary text-muted-foreground",
  "Urgent": "bg-destructive/10 text-destructive",
};

const overallStyle: Record<string, string> = {
  "Awaiting Line Manager": "bg-warning/10 text-warning",
  "Awaiting HR": "bg-info/10 text-info",
  "Approved": "bg-success/10 text-success",
  "Rejected": "bg-destructive/10 text-destructive",
};

export default function ApprovalWorkflow() {
  const [selected, setSelected] = useState<number>(1);
  const detail = workflows.find(w => w.id === selected)!;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Approval Workflow</h2>
          <p className="text-muted-foreground">Track requests through the line manager approval chain</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Requests", value: String(workflows.length), gradient: "stat-card-gradient" },
          { label: "Pending Action", value: "2", gradient: "warning-gradient" },
          { label: "Approved", value: "1", gradient: "success-gradient" },
          { label: "Rejected", value: "1", gradient: "accent-gradient" },
        ].map(s => (
          <Card key={s.label} className="p-4 border-0 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${s.gradient} flex items-center justify-center mb-2`}>
              <GitBranch className="w-5 h-5 text-primary-foreground" />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Request list */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">All Requests</p>
          {workflows.map(w => (
            <Card
              key={w.id}
              onClick={() => setSelected(w.id)}
              className={`p-4 border-0 shadow-sm cursor-pointer hover:shadow-md transition-all ${selected === w.id ? "ring-2 ring-primary" : ""}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{w.type}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <User className="w-3 h-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground truncate">{w.submittedBy}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{w.details}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <Badge variant="secondary" className={`${overallStyle[w.status]} border-0 text-xs`}>{w.status}</Badge>
                  <Badge variant="secondary" className={`${urgencyStyle[w.urgency]} border-0 text-xs`}>{w.urgency}</Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{w.submittedDate}</p>
            </Card>
          ))}
        </div>

        {/* Workflow detail */}
        <Card className="lg:col-span-2 border-0 shadow-sm p-5">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="text-lg font-bold text-foreground">{detail.type}</h3>
              <p className="text-sm text-muted-foreground">{detail.details}</p>
            </div>
            <Badge variant="secondary" className={`${overallStyle[detail.status]} border-0`}>{detail.status}</Badge>
          </div>

          <div className="flex items-center gap-4 text-sm mb-6 p-3 bg-secondary/30 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full stat-card-gradient flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-bold">{detail.submittedBy.split(" ").map(n => n[0]).join("")}</span>
              </div>
              <div>
                <p className="font-medium text-foreground text-xs">{detail.submittedBy}</p>
                <p className="text-xs text-muted-foreground">{detail.role}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <div className="text-xs text-muted-foreground">Submitted {detail.submittedDate}</div>
          </div>

          {/* Steps timeline */}
          <div className="relative space-y-0">
            {detail.steps.map((step, i) => {
              const cfg = stepStatusStyle[step.status];
              const isLast = i === detail.steps.length - 1;
              return (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full ${cfg.bg} flex items-center justify-center shrink-0 z-10`}>
                      <cfg.icon className={`w-4 h-4 ${step.status === "Waiting" ? "text-muted-foreground" : "text-primary-foreground"}`} />
                    </div>
                    {!isLast && <div className="w-0.5 flex-1 bg-border my-1" />}
                  </div>
                  <div className={`pb-5 ${isLast ? "" : ""} flex-1`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{step.label}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <User className="w-3 h-3" /> {step.approver}
                        </p>
                      </div>
                      <Badge variant="secondary" className={`${stepStatusStyle[step.status].color} bg-secondary border-0 text-xs`}>{step.status}</Badge>
                    </div>
                    {step.comment && (
                      <div className="mt-2 p-2.5 bg-secondary/50 rounded-lg flex items-start gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                        <p className="text-xs text-muted-foreground">{step.comment}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          {(detail.status === "Awaiting Line Manager" || detail.status === "Awaiting HR") && (
            <div className="flex gap-3 pt-4 border-t border-border mt-2">
              <Button size="sm" className="bg-primary text-primary-foreground gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Approve
              </Button>
              <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10 gap-1.5">
                <XCircle className="w-4 h-4" /> Reject
              </Button>
              <Button size="sm" variant="outline" className="gap-1.5 ml-auto">
                <MessageSquare className="w-4 h-4" /> Comment
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
