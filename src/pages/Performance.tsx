import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Star, TrendingUp, AlertTriangle } from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";

const radarData = [
  { subject: "Communication", A: 85 },
  { subject: "Technical", A: 78 },
  { subject: "Leadership", A: 70 },
  { subject: "Teamwork", A: 90 },
  { subject: "Initiative", A: 75 },
  { subject: "Reliability", A: 88 },
];

const reviews = [
  { name: "Adebayo Johnson", score: 4.2, status: "Completed", department: "Finance", date: "2026-01-15" },
  { name: "Chioma Eze", score: 3.8, status: "In Progress", department: "Operations", date: "2026-02-10" },
  { name: "Tunde Bello", score: 4.5, status: "Completed", department: "Consulting", date: "2026-01-20" },
  { name: "Emeka Obi", score: 3.2, status: "PIP", department: "HSE", date: "2026-02-01" },
  { name: "Grace Adeyemi", score: 4.0, status: "Pending", department: "Real Estate", date: "2026-02-18" },
];

const goals = [
  { title: "Complete ISO certification training", progress: 80, assignee: "Emeka Obi" },
  { title: "Reduce loan processing time by 20%", progress: 55, assignee: "Ibrahim Musa" },
  { title: "Onboard 5 new clients", progress: 40, assignee: "Team" },
];

export default function Performance() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Performance Management</h2>
          <p className="text-muted-foreground">Track appraisals, goals, and improvement plans</p>
        </div>
        <Button className="bg-primary text-primary-foreground gap-2">
          <Target className="w-4 h-4" /> New Review Cycle
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Radar chart */}
        <Card className="p-5 border-0 shadow-sm">
          <h3 className="font-semibold text-foreground mb-2">Avg. Competency Scores</h3>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(213, 20%, 90%)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
              <Radar dataKey="A" stroke="hsl(213, 72%, 16%)" fill="hsl(213, 72%, 16%)" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* Goals */}
        <Card className="p-5 border-0 shadow-sm col-span-2">
          <h3 className="font-semibold text-foreground mb-4">Active Goals</h3>
          <div className="space-y-4">
            {goals.map((g, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground">{g.title}</p>
                  <span className="text-xs text-muted-foreground">{g.assignee}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-secondary rounded-full h-2">
                    <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${g.progress}%` }} />
                  </div>
                  <span className="text-xs font-medium text-foreground w-10 text-right">{g.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Reviews table */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Performance Reviews</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reviews.map((r, i) => (
                <tr key={i} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{r.name}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{r.department}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                      <span className="text-sm font-medium text-foreground">{r.score}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{r.date}</td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary" className={`border-0 gap-1 ${
                      r.status === "Completed" ? "bg-success/10 text-success" :
                      r.status === "PIP" ? "bg-destructive/10 text-destructive" :
                      r.status === "In Progress" ? "bg-info/10 text-info" :
                      "bg-warning/10 text-warning"
                    }`}>
                      {r.status === "PIP" && <AlertTriangle className="w-3 h-3" />}
                      {r.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
