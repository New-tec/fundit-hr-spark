import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, PieChart, TrendingUp, Users } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

const attritionData = [
  { month: "Sep", hires: 3, exits: 1 },
  { month: "Oct", hires: 2, exits: 0 },
  { month: "Nov", hires: 4, exits: 1 },
  { month: "Dec", hires: 1, exits: 2 },
  { month: "Jan", hires: 2, exits: 0 },
  { month: "Feb", hires: 1, exits: 0 },
];

const payrollTrend = [
  { month: "Sep", amount: 10.2 },
  { month: "Oct", amount: 10.8 },
  { month: "Nov", amount: 11.5 },
  { month: "Dec", amount: 12.1 },
  { month: "Jan", amount: 12.0 },
  { month: "Feb", amount: 12.4 },
];

const reportCards = [
  { title: "Headcount Report", description: "Employee distribution across clients", icon: Users },
  { title: "Turnover Analytics", description: "Attrition rates and trends", icon: TrendingUp },
  { title: "Payroll Summary", description: "Monthly payroll breakdowns", icon: BarChart3 },
  { title: "Leave Utilization", description: "Leave balances and usage", icon: PieChart },
];

export default function Reports() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reports & Analytics</h2>
          <p className="text-muted-foreground">Real-time dashboards and custom reports</p>
        </div>
        <Button variant="outline" className="gap-2"><Download className="w-4 h-4" /> Export All</Button>
      </div>

      {/* Quick reports */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {reportCards.map((r) => (
          <Card key={r.title} className="p-5 border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mb-3">
              <r.icon className="w-5 h-5 text-foreground" />
            </div>
            <h4 className="font-semibold text-foreground text-sm">{r.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{r.description}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Hires vs exits */}
        <Card className="p-5 border-0 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Hires vs Exits</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={attritionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(213, 20%, 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(213, 10%, 47%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(213, 10%, 47%)" />
              <Tooltip />
              <Bar dataKey="hires" fill="hsl(213, 72%, 16%)" radius={[4, 4, 0, 0]} barSize={20} name="Hires" />
              <Bar dataKey="exits" fill="hsl(0, 70%, 48%)" radius={[4, 4, 0, 0]} barSize={20} name="Exits" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Payroll trend */}
        <Card className="p-5 border-0 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Payroll Trend (₦M)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={payrollTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(213, 20%, 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(213, 10%, 47%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(213, 10%, 47%)" />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="hsl(152, 60%, 40%)" strokeWidth={2} dot={{ r: 4, fill: "hsl(152, 60%, 40%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
