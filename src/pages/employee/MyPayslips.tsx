import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

const payslips = [
  { month: "January 2026", gross: 580000, net: 485000, date: "Jan 31, 2026" },
  { month: "December 2025", gross: 620000, net: 515000, date: "Dec 31, 2025" },
  { month: "November 2025", gross: 580000, net: 485000, date: "Nov 30, 2025" },
  { month: "October 2025", gross: 580000, net: 485000, date: "Oct 31, 2025" },
];

const breakdown = [
  { label: "Basic Salary", value: 350000 },
  { label: "Housing Allowance", value: 120000 },
  { label: "Transport Allowance", value: 60000 },
  { label: "Performance Bonus", value: 50000 },
];

const deductions = [
  { label: "PAYE Tax", value: 58000 },
  { label: "Pension (8%)", value: 28000 },
  { label: "NHF (2.5%)", value: 8750 },
  { label: "Loan Repayment", value: 250 },
];

const fmt = (n: number) => `₦${n.toLocaleString()}`;

export default function MyPayslips() {
  const totalEarnings = breakdown.reduce((s, b) => s + b.value, 0);
  const totalDeductions = deductions.reduce((s, d) => s + d.value, 0);
  const net = totalEarnings - totalDeductions;

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 border-0 shadow-sm">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-sm text-muted-foreground">Latest Payslip</p>
            <h2 className="text-xl font-bold text-foreground">January 2026</h2>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" /> Download PDF
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Earnings</h4>
            <div className="space-y-2">
              {breakdown.map((b) => (
                <div key={b.label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{b.label}</span>
                  <span className="font-medium text-foreground">{fmt(b.value)}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm pt-2 border-t border-border">
                <span className="font-semibold text-foreground">Gross Total</span>
                <span className="font-bold text-success">{fmt(totalEarnings)}</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Deductions</h4>
            <div className="space-y-2">
              {deductions.map((d) => (
                <div key={d.label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{d.label}</span>
                  <span className="font-medium text-foreground">{fmt(d.value)}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm pt-2 border-t border-border">
                <span className="font-semibold text-foreground">Total Deductions</span>
                <span className="font-bold text-destructive">{fmt(totalDeductions)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 pt-5 border-t border-border flex justify-between items-center">
          <span className="font-semibold text-foreground">Net Pay</span>
          <span className="text-2xl font-bold text-foreground">{fmt(net)}</span>
        </div>
      </Card>

      <Card className="p-5 border-0 shadow-sm">
        <h3 className="font-semibold text-foreground mb-4">Payslip History</h3>
        <div className="space-y-2">
          {payslips.map((p) => (
            <div key={p.month} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{p.month}</p>
                  <p className="text-xs text-muted-foreground">Issued {p.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{fmt(p.net)}</p>
                  <p className="text-xs text-muted-foreground">Net pay</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
