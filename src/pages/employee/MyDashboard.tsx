import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  DollarSign,
  HandCoins,
  GraduationCap,
  Megaphone,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const quickStats = [
  { label: "Leave Balance", value: "18", sub: "days remaining", icon: CalendarDays, gradient: "stat-card-gradient" },
  { label: "Hours This Month", value: "142", sub: "of 168 hrs", icon: Clock, gradient: "info-gradient" },
  { label: "Latest Payslip", value: "₦485K", sub: "Jan 2026", icon: DollarSign, gradient: "success-gradient" },
  { label: "Active Loan", value: "₦120K", sub: "balance", icon: HandCoins, gradient: "warning-gradient" },
];

const myRequests = [
  { type: "Leave Request", detail: "5 days · Annual", status: "Approved", tone: "success" },
  { type: "Loan Request", detail: "₦200,000 · Personal", status: "Pending", tone: "warning" },
  { type: "Expense Claim", detail: "₦18,500 · Travel", status: "Approved", tone: "success" },
];

const upcoming = [
  { icon: GraduationCap, title: "Compliance Training", when: "Tomorrow · 10:00 AM" },
  { icon: CalendarDays, title: "Performance Review", when: "Mar 15 · 2:00 PM" },
  { icon: Megaphone, title: "Town Hall Meeting", when: "Mar 20 · 4:00 PM" },
];

const announcements = [
  { title: "Q1 bonus processing this week", time: "2 hours ago" },
  { title: "New health insurance provider effective April", time: "Yesterday" },
  { title: "Office closed on Public Holiday", time: "3 days ago" },
];

export default function MyDashboard() {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(" ")[0] || "there";

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Hi {firstName} 👋</h2>
          <p className="text-muted-foreground mt-1">Here's everything happening with your account.</p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/me/leave"
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Apply for Leave
          </Link>
          <Link
            to="/me/attendance"
            className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
          >
            Clock In/Out
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((s) => (
          <Card key={s.label} className="p-5 border-0 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
              </div>
              <div className={`w-11 h-11 rounded-xl ${s.gradient} flex items-center justify-center`}>
                <s.icon className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5 border-0 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">My Recent Requests</h3>
            <Link to="/me/leave" className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {myRequests.map((r, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  {r.tone === "success" ? (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-warning" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.type}</p>
                    <p className="text-xs text-muted-foreground">{r.detail}</p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    r.tone === "success"
                      ? "bg-success/10 text-success"
                      : "bg-warning/10 text-warning"
                  }`}
                >
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 border-0 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Upcoming</h3>
          <div className="space-y-3">
            {upcoming.map((u, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <u.icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{u.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{u.when}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5 border-0 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Announcements</h3>
          <Link
            to="/me/announcements"
            className="text-xs text-primary font-medium flex items-center gap-1 hover:underline"
          >
            View all <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {announcements.map((a, i) => (
            <div key={i} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
              <Megaphone className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-foreground">{a.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
