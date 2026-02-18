import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Download, Send, CheckCircle2, Clock } from "lucide-react";

const payrollSummary = [
  { label: "Gross Salary", amount: "₦14,200,000", gradient: "stat-card-gradient" },
  { label: "Total Deductions", amount: "₦1,800,000", gradient: "accent-gradient" },
  { label: "Net Payroll", amount: "₦12,400,000", gradient: "success-gradient" },
  { label: "Pending Payslips", amount: "12", gradient: "warning-gradient" },
];

const payrollRecords = [
  { id: 1, name: "Adebayo Johnson", basic: "₦350,000", allowances: "₦50,000", deductions: "₦45,000", net: "₦355,000", status: "Processed" },
  { id: 2, name: "Chioma Eze", basic: "₦420,000", allowances: "₦60,000", deductions: "₦55,000", net: "₦425,000", status: "Processed" },
  { id: 3, name: "Tunde Bello", basic: "₦380,000", allowances: "₦40,000", deductions: "₦48,000", net: "₦372,000", status: "Pending" },
  { id: 4, name: "Fatima Yusuf", basic: "₦300,000", allowances: "₦35,000", deductions: "₦38,000", net: "₦297,000", status: "Processed" },
  { id: 5, name: "Emeka Obi", basic: "₦400,000", allowances: "₦55,000", deductions: "₦52,000", net: "₦403,000", status: "Pending" },
  { id: 6, name: "Grace Adeyemi", basic: "₦320,000", allowances: "₦30,000", deductions: "₦40,000", net: "₦310,000", status: "Processed" },
];

export default function Payroll() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Payroll</h2>
          <p className="text-muted-foreground">February 2026 payroll cycle</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Download className="w-4 h-4" /> Export</Button>
          <Button className="bg-primary text-primary-foreground gap-2"><Send className="w-4 h-4" /> Run Payroll</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {payrollSummary.map((s) => (
          <Card key={s.label} className="p-5 border-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${s.gradient} flex items-center justify-center`}>
                <DollarSign className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-lg font-bold text-foreground">{s.amount}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Payroll Details</h3>
          <Badge variant="secondary" className="bg-info/10 text-info border-0">Monthly</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Basic Salary</th>
                <th className="px-4 py-3">Allowances</th>
                <th className="px-4 py-3">Deductions</th>
                <th className="px-4 py-3">Net Pay</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {payrollRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{rec.name}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{rec.basic}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{rec.allowances}</td>
                  <td className="px-4 py-3 text-sm text-destructive">{rec.deductions}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-foreground">{rec.net}</td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary" className={`border-0 gap-1 ${rec.status === "Processed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                      {rec.status === "Processed" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {rec.status}
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
