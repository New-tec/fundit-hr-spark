import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Plus, CheckCircle2, Clock, Star, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const promotions = [
  { id: 1, name: "Adebayo Johnson", from: "Finance Analyst", to: "Senior Finance Analyst", department: "Finance", effectiveDate: "2026-04-01", status: "Approved", rating: 4.8, yrsInRole: 2 },
  { id: 2, name: "Chioma Eze", from: "Marine Engineer", to: "Lead Marine Engineer", department: "Operations", effectiveDate: "2026-03-15", status: "Pending", rating: 4.5, yrsInRole: 3 },
  { id: 3, name: "Emeka Obi", from: "Safety Officer", to: "HSE Manager", department: "HSE", effectiveDate: "2026-05-01", status: "Under Review", rating: 4.2, yrsInRole: 4 },
  { id: 4, name: "Ibrahim Musa", from: "Credit Analyst", to: "Senior Credit Analyst", department: "Finance", effectiveDate: "2026-04-15", status: "Approved", rating: 4.6, yrsInRole: 2 },
  { id: 5, name: "Grace Adeyemi", from: "Property Manager", to: "Head of Real Estate", department: "Real Estate", effectiveDate: "2026-06-01", status: "Pending", rating: 4.3, yrsInRole: 5 },
];

const statusStyle: Record<string, string> = {
  "Approved": "bg-success/10 text-success",
  "Pending": "bg-warning/10 text-warning",
  "Under Review": "bg-info/10 text-info",
  "Rejected": "bg-destructive/10 text-destructive",
};

const stats = [
  { label: "Total Promotions", value: "5", gradient: "stat-card-gradient" },
  { label: "Approved", value: "2", gradient: "success-gradient" },
  { label: "Under Review", value: "1", gradient: "info-gradient" },
  { label: "Pending", value: "2", gradient: "warning-gradient" },
];

export default function Promotion() {
  const [selected, setSelected] = useState<number | null>(null);
  const detail = promotions.find(p => p.id === selected);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Promotions</h2>
          <p className="text-muted-foreground">Track and manage employee career progression</p>
        </div>
        <Button className="bg-primary text-primary-foreground gap-2">
          <Plus className="w-4 h-4" /> New Promotion
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <Card key={s.label} className="p-4 border-0 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${s.gradient} flex items-center justify-center mb-3`}>
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Promotion list */}
        <div className="lg:col-span-2 space-y-3">
          {promotions.map(p => (
            <Card
              key={p.id}
              onClick={() => setSelected(p.id === selected ? null : p.id)}
              className={`p-4 border-0 shadow-sm cursor-pointer hover:shadow-md transition-all ${selected === p.id ? "ring-2 ring-primary" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full stat-card-gradient flex items-center justify-center shrink-0">
                    <span className="text-primary-foreground text-sm font-bold">
                      {p.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{p.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground">{p.from}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-success" />
                      <span className="text-xs font-medium text-success">{p.to}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <Badge variant="secondary" className={`${statusStyle[p.status]} border-0`}>{p.status}</Badge>
                  <span className="text-xs text-muted-foreground">{p.effectiveDate}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-warning text-warning" />
                  <span className="text-xs font-medium text-foreground">{p.rating}</span>
                  <span className="text-xs text-muted-foreground">Performance</span>
                </div>
                <div className="text-xs text-muted-foreground">{p.yrsInRole} yrs in current role</div>
                <div className="text-xs text-muted-foreground">{p.department}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Detail panel */}
        <Card className="border-0 shadow-sm p-5 h-fit">
          {detail ? (
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Promotion Details</h3>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                <div className="w-12 h-12 rounded-full stat-card-gradient flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">{detail.name.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{detail.name}</p>
                  <p className="text-xs text-muted-foreground">{detail.department}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="text-xs text-muted-foreground mb-1">Current Role</p>
                  <p className="text-sm font-medium text-foreground">{detail.from}</p>
                </div>
                <div className="flex justify-center">
                  <div className="w-8 h-8 rounded-full success-gradient flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4 text-primary-foreground" />
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                  <p className="text-xs text-muted-foreground mb-1">Promoted To</p>
                  <p className="text-sm font-medium text-success">{detail.to}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Effective Date</span><span className="font-medium">{detail.effectiveDate}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Status</span>
                  <Badge variant="secondary" className={`${statusStyle[detail.status]} border-0 text-xs`}>{detail.status}</Badge>
                </div>
                <div className="flex justify-between"><span className="text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-warning text-warning" />
                    <span className="font-medium">{detail.rating}/5.0</span>
                  </div>
                </div>
                <div className="flex justify-between"><span className="text-muted-foreground">Years in Role</span><span className="font-medium">{detail.yrsInRole} years</span></div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-primary text-primary-foreground">Approve</Button>
                <Button size="sm" variant="outline" className="flex-1">Review</Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-10 space-y-3">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">Select a record</p>
              <p className="text-xs text-muted-foreground">Click on a promotion to view details.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
