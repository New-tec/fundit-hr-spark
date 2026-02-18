import { Card } from "@/components/ui/card";
import {
  Users,
  UserPlus,
  CalendarDays,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const stats = [
  { label: "Total Employees", value: "54", change: "+3", trend: "up", icon: Users, gradient: "stat-card-gradient" },
  { label: "New Hires", value: "2", change: "This month", trend: "neutral", icon: UserPlus, gradient: "success-gradient" },
  { label: "On Leave", value: "4", change: "Active", trend: "neutral", icon: CalendarDays, gradient: "warning-gradient" },
  { label: "Payroll Due", value: "₦12.4M", change: "In 5 days", trend: "neutral", icon: DollarSign, gradient: "info-gradient" },
];

const headcountData = [
  { month: "Aug", count: 45 },
  { month: "Sep", count: 47 },
  { month: "Oct", count: 48 },
  { month: "Nov", count: 50 },
  { month: "Dec", count: 51 },
  { month: "Jan", count: 52 },
  { month: "Feb", count: 54 },
];

const departmentData = [
  { name: "Finance", value: 18 },
  { name: "Oil & Marine", value: 22 },
  { name: "Energy/RE", value: 14 },
];

const COLORS = ["hsl(213, 72%, 16%)", "hsl(0, 70%, 48%)", "hsl(38, 92%, 50%)"];

const leaveData = [
  { type: "Annual", taken: 12, remaining: 28 },
  { type: "Sick", taken: 4, remaining: 16 },
  { type: "Maternity", taken: 1, remaining: 2 },
  { type: "Comp.", taken: 2, remaining: 8 },
];

const recentActivity = [
  { text: "Adebayo Johnson submitted leave request", time: "2 hours ago", icon: CalendarDays },
  { text: "Payroll for January processed successfully", time: "1 day ago", icon: CheckCircle2 },
  { text: "New employee Chioma Eze onboarded", time: "3 days ago", icon: UserPlus },
  { text: "Performance reviews due for Q1", time: "5 days ago", icon: Clock },
  { text: "Loan request approved for Tunde Bello", time: "1 week ago", icon: DollarSign },
];

const pendingApprovals = [
  { name: "Fatima Yusuf", type: "Leave Request", days: "5 days annual leave", status: "pending" },
  { name: "Emeka Obi", type: "Loan Request", days: "₦500,000", status: "pending" },
  { name: "Grace Adeyemi", type: "Expense Claim", days: "₦45,000", status: "pending" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Welcome back, Akinsola 👋</h2>
        <p className="text-muted-foreground mt-1">Here's what's happening across your client companies today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-5 border-0 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  {stat.trend === "up" && <TrendingUp className="w-3.5 h-3.5 text-success" />}
                  {stat.trend === "down" && <TrendingDown className="w-3.5 h-3.5 text-destructive" />}
                  <span className="text-xs text-muted-foreground">{stat.change}</span>
                </div>
              </div>
              <div className={`w-11 h-11 rounded-xl ${stat.gradient} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Headcount trend */}
        <Card className="col-span-2 p-5 border-0 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Headcount Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={headcountData}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(213, 72%, 16%)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(213, 72%, 16%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(213, 20%, 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(213, 10%, 47%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(213, 10%, 47%)" />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="hsl(213, 72%, 16%)" fill="url(#colorCount)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Department distribution */}
        <Card className="p-5 border-0 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">By Client Industry</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={departmentData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={4}>
                {departmentData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {departmentData.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-muted-foreground">{d.name}</span>
                </div>
                <span className="font-medium text-foreground">{d.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Leave overview */}
        <Card className="p-5 border-0 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Leave Overview</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={leaveData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(213, 20%, 90%)" />
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(213, 10%, 47%)" />
              <YAxis dataKey="type" type="category" tick={{ fontSize: 11 }} stroke="hsl(213, 10%, 47%)" width={60} />
              <Tooltip />
              <Bar dataKey="taken" fill="hsl(0, 70%, 48%)" radius={[0, 4, 4, 0]} barSize={14} name="Taken" />
              <Bar dataKey="remaining" fill="hsl(213, 72%, 16%)" radius={[0, 4, 4, 0]} barSize={14} name="Remaining" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Pending approvals */}
        <Card className="p-5 border-0 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Pending Approvals</h3>
            <span className="text-xs font-medium bg-accent/10 text-accent px-2 py-1 rounded-full">
              {pendingApprovals.length} pending
            </span>
          </div>
          <div className="space-y-3">
            {pendingApprovals.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.type} · {item.days}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent activity */}
        <Card className="p-5 border-0 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-foreground">{item.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
