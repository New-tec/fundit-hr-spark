import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, LogIn, LogOut } from "lucide-react";

const recentLogs = [
  { date: "Mar 12, 2026", in: "08:55", out: "17:32", hours: "8h 37m", status: "On Time" },
  { date: "Mar 11, 2026", in: "09:08", out: "17:45", hours: "8h 37m", status: "Late" },
  { date: "Mar 10, 2026", in: "08:50", out: "17:30", hours: "8h 40m", status: "On Time" },
  { date: "Mar 9, 2026", in: "08:48", out: "17:28", hours: "8h 40m", status: "On Time" },
  { date: "Mar 8, 2026", in: "—", out: "—", hours: "—", status: "Weekend" },
];

export default function MyAttendance() {
  const [clockedIn, setClockedIn] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const elapsed = startTime
    ? Math.floor((now.getTime() - startTime.getTime()) / 1000)
    : 0;
  const hh = String(Math.floor(elapsed / 3600)).padStart(2, "0");
  const mm = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 border-0 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              {now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </p>
            <p className="text-3xl font-bold text-foreground mt-1 font-mono">
              {clockedIn ? `${hh}:${mm}:${ss}` : now.toLocaleTimeString()}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {clockedIn ? "Currently clocked in" : "Not clocked in"}
            </p>
          </div>
          {clockedIn ? (
            <Button
              variant="destructive"
              size="lg"
              onClick={() => {
                setClockedIn(false);
                setStartTime(null);
              }}
            >
              <LogOut className="w-4 h-4 mr-2" /> Clock Out
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={() => {
                setClockedIn(true);
                setStartTime(new Date());
              }}
            >
              <LogIn className="w-4 h-4 mr-2" /> Clock In
            </Button>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="This Week" value="34h 12m" sub="of 40 hrs" />
        <StatCard label="This Month" value="142h 45m" sub="of 168 hrs" />
        <StatCard label="Late Arrivals" value="2" sub="this month" />
      </div>

      <Card className="p-5 border-0 shadow-sm">
        <h3 className="font-semibold text-foreground mb-4">Recent Attendance</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-border">
                <th className="py-2 font-medium">Date</th>
                <th className="py-2 font-medium">Clock In</th>
                <th className="py-2 font-medium">Clock Out</th>
                <th className="py-2 font-medium">Hours</th>
                <th className="py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentLogs.map((l, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="py-3 text-foreground">{l.date}</td>
                  <td className="py-3 text-muted-foreground">{l.in}</td>
                  <td className="py-3 text-muted-foreground">{l.out}</td>
                  <td className="py-3 text-foreground">{l.hours}</td>
                  <td className="py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        l.status === "On Time"
                          ? "bg-success/10 text-success"
                          : l.status === "Late"
                          ? "bg-warning/10 text-warning"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {l.status}
                    </span>
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

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <Card className="p-5 border-0 shadow-sm">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
    </Card>
  );
}
