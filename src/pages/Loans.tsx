import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HandCoins, Plus, CheckCircle2, Clock, XCircle } from "lucide-react";

const loanStats = [
  { label: "Active Loans", value: "8", gradient: "stat-card-gradient" },
  { label: "Total Disbursed", value: "₦4.2M", gradient: "success-gradient" },
  { label: "Pending Requests", value: "3", gradient: "warning-gradient" },
  { label: "Monthly Repayments", value: "₦680K", gradient: "info-gradient" },
];

const loans = [
  { id: 1, name: "Tunde Bello", amount: "₦500,000", purpose: "Housing", tenure: "12 months", repaid: "₦125,000", status: "Active", date: "2025-11-01" },
  { id: 2, name: "Adebayo Johnson", amount: "₦300,000", purpose: "Education", tenure: "6 months", repaid: "₦200,000", status: "Active", date: "2025-09-15" },
  { id: 3, name: "Emeka Obi", amount: "₦500,000", purpose: "Medical", tenure: "12 months", repaid: "₦0", status: "Pending", date: "2026-02-14" },
  { id: 4, name: "Grace Adeyemi", amount: "₦200,000", purpose: "Personal", tenure: "6 months", repaid: "₦200,000", status: "Completed", date: "2025-06-01" },
  { id: 5, name: "Ibrahim Musa", amount: "₦400,000", purpose: "Car", tenure: "18 months", repaid: "₦90,000", status: "Active", date: "2026-01-10" },
];

export default function Loans() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Loan Management</h2>
          <p className="text-muted-foreground">Employee loan requests and repayment tracking</p>
        </div>
        <Button className="bg-primary text-primary-foreground gap-2">
          <Plus className="w-4 h-4" /> New Loan Request
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loanStats.map((s) => (
          <Card key={s.label} className="p-5 border-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${s.gradient} flex items-center justify-center`}>
                <HandCoins className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">All Loans</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Purpose</th>
                <th className="px-4 py-3">Tenure</th>
                <th className="px-4 py-3">Repaid</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loans.map((l) => (
                <tr key={l.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{l.name}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-foreground">{l.amount}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{l.purpose}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{l.tenure}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{l.repaid}</td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary" className={`border-0 gap-1 ${
                      l.status === "Active" ? "bg-info/10 text-info" :
                      l.status === "Pending" ? "bg-warning/10 text-warning" :
                      l.status === "Completed" ? "bg-success/10 text-success" :
                      "bg-destructive/10 text-destructive"
                    }`}>
                      {l.status === "Active" && <CheckCircle2 className="w-3 h-3" />}
                      {l.status === "Pending" && <Clock className="w-3 h-3" />}
                      {l.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    {l.status === "Pending" && (
                      <div className="flex gap-2">
                        <button className="text-xs px-2.5 py-1 rounded bg-primary text-primary-foreground font-medium">Approve</button>
                        <button className="text-xs px-2.5 py-1 rounded bg-secondary text-foreground font-medium">Reject</button>
                      </div>
                    )}
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
