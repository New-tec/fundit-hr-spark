import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Clock, CheckCircle2, PlayCircle } from "lucide-react";

const trainings = [
  { title: "Cybersecurity Awareness 2026", category: "Compliance", duration: "45 min", status: "Required", due: "Mar 31, 2026", progress: 0 },
  { title: "Anti-Money Laundering (AML)", category: "Compliance", duration: "1.5 hrs", status: "In Progress", due: "Apr 15, 2026", progress: 40 },
  { title: "Effective Communication Skills", category: "Soft Skills", duration: "2 hrs", status: "Optional", due: "—", progress: 0 },
  { title: "Excel for Finance Professionals", category: "Technical", duration: "4 hrs", status: "Completed", due: "Feb 12, 2026", progress: 100 },
  { title: "Leadership Fundamentals", category: "Career", duration: "3 hrs", status: "Completed", due: "Jan 28, 2026", progress: 100 },
];

const statusStyle: Record<string, string> = {
  Required: "bg-destructive/10 text-destructive",
  "In Progress": "bg-warning/10 text-warning",
  Optional: "bg-secondary text-muted-foreground",
  Completed: "bg-success/10 text-success",
};

export default function MyTrainings() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-foreground">My Trainings</h2>
        <p className="text-sm text-muted-foreground">Continue learning and complete required courses</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat icon={GraduationCap} label="Assigned" value="5" gradient="stat-card-gradient" />
        <Stat icon={CheckCircle2} label="Completed" value="2" gradient="success-gradient" />
        <Stat icon={Clock} label="In Progress" value="1" gradient="warning-gradient" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trainings.map((t) => (
          <Card key={t.title} className="p-5 border-0 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{t.category}</p>
                <h3 className="font-semibold text-foreground mt-1">{t.title}</h3>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${statusStyle[t.status]}`}>
                {t.status}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {t.duration}</span>
              {t.due !== "—" && <span>Due {t.due}</span>}
            </div>
            {t.progress > 0 && t.progress < 100 && (
              <div className="mb-3">
                <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full stat-card-gradient" style={{ width: `${t.progress}%` }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{t.progress}% complete</p>
              </div>
            )}
            <Button
              variant={t.status === "Completed" ? "outline" : "default"}
              size="sm"
              className="w-full"
            >
              {t.status === "Completed" ? (
                <>View Certificate</>
              ) : t.status === "In Progress" ? (
                <><PlayCircle className="w-4 h-4 mr-2" /> Continue</>
              ) : (
                <><PlayCircle className="w-4 h-4 mr-2" /> Start</>
              )}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value, gradient }: { icon: any; label: string; value: string; gradient: string }) {
  return (
    <Card className="p-5 border-0 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
        </div>
        <div className={`w-11 h-11 rounded-xl ${gradient} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>
    </Card>
  );
}
