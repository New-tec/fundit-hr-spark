import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HandCoins, CheckCircle2, Clock } from "lucide-react";
import { toast } from "sonner";

const activeLoan = {
  type: "Personal Loan",
  amount: 500000,
  balance: 120000,
  monthly: 25000,
  remaining: 5,
  total: 20,
};

const history = [
  { type: "Personal", amount: 500000, status: "Active", date: "Sep 2025" },
  { type: "Salary Advance", amount: 100000, status: "Repaid", date: "Mar 2025" },
  { type: "Personal", amount: 300000, status: "Repaid", date: "Jan 2024" },
];

const fmt = (n: number) => `₦${n.toLocaleString()}`;

export default function MyLoans() {
  const [showForm, setShowForm] = useState(false);
  const repaidPct = ((activeLoan.amount - activeLoan.balance) / activeLoan.amount) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-foreground">Loans</h2>
          <p className="text-sm text-muted-foreground">Apply for and track your loan requests</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Request Loan"}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 border-0 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">New Loan Request</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Loan Type</Label>
              <Select defaultValue="personal">
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal Loan</SelectItem>
                  <SelectItem value="advance">Salary Advance</SelectItem>
                  <SelectItem value="education">Education Loan</SelectItem>
                  <SelectItem value="medical">Medical Loan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="amt">Amount (₦)</Label>
              <Input id="amt" type="number" placeholder="200000" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="months">Repayment Period (months)</Label>
              <Input id="months" type="number" placeholder="12" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="monthly">Monthly Deduction (₦)</Label>
              <Input id="monthly" type="number" placeholder="auto-calc" className="mt-1.5" />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="reason">Purpose</Label>
              <Textarea id="reason" placeholder="What is the loan for?" rows={3} className="mt-1.5" />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button
              onClick={() => {
                toast.success("Loan request submitted for review");
                setShowForm(false);
              }}
            >
              Submit Request
            </Button>
          </div>
        </Card>
      )}

      <Card className="p-6 border-0 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Active Loan</p>
            <h3 className="text-lg font-bold text-foreground mt-1">{activeLoan.type}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl warning-gradient flex items-center justify-center">
            <HandCoins className="w-5 h-5 text-primary-foreground" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <Stat label="Loan Amount" value={fmt(activeLoan.amount)} />
          <Stat label="Outstanding" value={fmt(activeLoan.balance)} />
          <Stat label="Monthly" value={fmt(activeLoan.monthly)} />
          <Stat label="Remaining" value={`${activeLoan.remaining} of ${activeLoan.total}`} />
        </div>
        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Repayment Progress</span>
            <span>{repaidPct.toFixed(0)}%</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full success-gradient" style={{ width: `${repaidPct}%` }} />
          </div>
        </div>
      </Card>

      <Card className="p-5 border-0 shadow-sm">
        <h3 className="font-semibold text-foreground mb-4">Loan History</h3>
        <div className="space-y-2">
          {history.map((h, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-3">
                {h.status === "Repaid" ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : (
                  <Clock className="w-5 h-5 text-warning" />
                )}
                <div>
                  <p className="text-sm font-medium text-foreground">{h.type} · {fmt(h.amount)}</p>
                  <p className="text-xs text-muted-foreground">{h.date}</p>
                </div>
              </div>
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  h.status === "Repaid"
                    ? "bg-success/10 text-success"
                    : "bg-warning/10 text-warning"
                }`}
              >
                {h.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-base font-bold text-foreground mt-0.5">{value}</p>
    </div>
  );
}
