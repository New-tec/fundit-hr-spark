import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, LogIn, LogOut, CalendarDays, TrendingUp, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const attendanceRecords = [
  { id: 1, name: "Adebayo Johnson", date: "2026-03-01", clockIn: "08:02", clockOut: "17:15", hours: "9h 13m", status: "Present" },
  { id: 2, name: "Chioma Eze", date: "2026-03-01", clockIn: "08:45", clockOut: "17:00", hours: "8h 15m", status: "Present" },
  { id: 3, name: "Tunde Bello", date: "2026-03-01", clockIn: "09:30", clockOut: "17:00", hours: "7h 30m", status: "Late" },
  { id: 4, name: "Fatima Yusuf", date: "2026-03-01", clockIn: "-", clockOut: "-", hours: "-", status: "Absent" },
  { id: 5, name: "Emeka Obi", date: "2026-03-01", clockIn: "07:58", clockOut: "17:20", hours: "9h 22m", status: "Present" },
  { id: 6, name: "Grace Adeyemi", date: "2026-03-01", clockIn: "08:10", clockOut: "17:05", hours: "8h 55m", status: "Present" },
  { id: 7, name: "Ibrahim Musa", date: "2026-03-01", clockIn: "09:15", clockOut: "17:00", hours: "7h 45m", status: "Late" },
];

const weeklyData = [
  { day: "Mon", present: 50, absent: 2, late: 2 },
  { day: "Tue", present: 51, absent: 1, late: 2 },
  { day: "Wed", present: 48, absent: 3, late: 3 },
  { day: "Thu", present: 52, absent: 1, late: 1 },
  { day: "Fri", present: 49, absent: 2, late: 3 },
];

const statusStyle: Record<string, string> = {
  "Present": "bg-success/10 text-success",
  "Late": "bg-warning/10 text-warning",
  "Absent": "bg-destructive/10 text-destructive",
};

export default function Attendance() {
  const { user } = useAuth();
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<string | null>(null);
  const [clockOutTime, setClockOutTime] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [elapsed, setElapsed] = useState<string>("—");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (clockedIn && clockInTime) {
      const interval = setInterval(() => {
        const [h, m, s] = clockInTime.split(":").map(Number);
        const start = new Date();
        start.setHours(h, m, s);
        const diff = Math.floor((new Date().getTime() - start.getTime()) / 1000);
        const hrs = Math.floor(diff / 3600);
        const mins = Math.floor((diff % 3600) / 60);
        const secs = diff % 60;
        setElapsed(`${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [clockedIn, clockInTime]);

  const handleClockIn = () => {
    const t = currentTime.toTimeString().slice(0, 8);
    setClockInTime(t);
    setClockedIn(true);
  };

  const handleClockOut = () => {
    const t = currentTime.toTimeString().slice(0, 8);
    setClockOutTime(t);
    setClockedIn(false);
    setElapsed("—");
  };

  const name = user?.user_metadata?.full_name || "User";
  const dateStr = currentTime.toLocaleDateString("en-NG", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const timeStr = currentTime.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const summary = [
    { label: "Present Today", value: "50", icon: CheckCircle2, gradient: "success-gradient" },
    { label: "Late Arrivals", value: "3", icon: Clock, gradient: "warning-gradient" },
    { label: "Absent Today", value: "4", icon: AlertCircle, gradient: "accent-gradient" },
    { label: "Attendance Rate", value: "92%", icon: TrendingUp, gradient: "stat-card-gradient" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Attendance</h2>
        <p className="text-muted-foreground">Track daily attendance and working hours</p>
      </div>

      {/* Clock In/Out Panel */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="p-6 stat-card-gradient">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="text-center sm:text-left">
              <p className="text-primary-foreground/70 text-sm">{dateStr}</p>
              <p className="text-primary-foreground font-bold text-4xl tracking-wider mt-1 font-mono">{timeStr}</p>
              <p className="text-primary-foreground/80 text-sm mt-1">Welcome, <span className="font-semibold">{name}</span></p>
            </div>
            <div className="flex-1 sm:flex justify-end gap-4 flex">
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                {!clockedIn && !clockOutTime && (
                  <Button
                    onClick={handleClockIn}
                    className="bg-success text-primary-foreground gap-2 px-8 h-12 text-base font-semibold shadow-lg hover:bg-success/90"
                  >
                    <LogIn className="w-5 h-5" /> Clock In
                  </Button>
                )}
                {clockedIn && (
                  <>
                    <div className="text-center">
                      <p className="text-primary-foreground/70 text-xs">Time Elapsed</p>
                      <p className="text-primary-foreground font-mono font-bold text-xl">{elapsed}</p>
                    </div>
                    <Button
                      onClick={handleClockOut}
                      className="bg-accent text-accent-foreground gap-2 px-8 h-12 text-base font-semibold shadow-lg hover:bg-accent/90"
                    >
                      <LogOut className="w-5 h-5" /> Clock Out
                    </Button>
                  </>
                )}
                {!clockedIn && clockOutTime && (
                  <div className="text-center space-y-1">
                    <div className="flex items-center gap-2 text-primary-foreground">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      <span className="font-semibold">Shift Complete</span>
                    </div>
                    <p className="text-primary-foreground/70 text-xs">In: {clockInTime} &nbsp;|&nbsp; Out: {clockOutTime}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {clockedIn && clockInTime && (
            <div className="mt-4 pt-4 border-t border-primary/30 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-primary-foreground/80 text-sm">Clocked in at <span className="font-semibold text-primary-foreground">{clockInTime}</span></span>
            </div>
          )}
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map(s => (
          <Card key={s.label} className="p-4 border-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${s.gradient} flex items-center justify-center`}>
                <s.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Weekly overview */}
        <Card className="border-0 shadow-sm p-5">
          <h3 className="font-semibold text-foreground mb-4">This Week's Overview</h3>
          <div className="space-y-3">
            {weeklyData.map(d => (
              <div key={d.day} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-foreground">{d.day}</span>
                  <span className="text-muted-foreground">{d.present} present · {d.late} late · {d.absent} absent</span>
                </div>
                <div className="flex gap-0.5 h-2 rounded-full overflow-hidden">
                  <div className="bg-success h-full" style={{ width: `${(d.present / 54) * 100}%` }} />
                  <div className="bg-warning h-full" style={{ width: `${(d.late / 54) * 100}%` }} />
                  <div className="bg-destructive h-full" style={{ width: `${(d.absent / 54) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-success" /><span className="text-muted-foreground">Present</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-warning" /><span className="text-muted-foreground">Late</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-destructive" /><span className="text-muted-foreground">Absent</span></div>
          </div>
        </Card>

        {/* Today's attendance */}
        <Card className="lg:col-span-2 border-0 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Today's Attendance Log</h3>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">March 1, 2026</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <th className="px-4 py-3">Employee</th>
                  <th className="px-4 py-3">Clock In</th>
                  <th className="px-4 py-3">Clock Out</th>
                  <th className="px-4 py-3">Hours</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {attendanceRecords.map(rec => (
                  <tr key={rec.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{rec.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground font-mono">{rec.clockIn}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground font-mono">{rec.clockOut}</td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{rec.hours}</td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className={`${statusStyle[rec.status]} border-0`}>{rec.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
