import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BookOpen, Award, Clock, Plus } from "lucide-react";

const stats = [
  { label: "Active Courses", value: "6", icon: BookOpen, gradient: "stat-card-gradient" },
  { label: "Enrolled", value: "32", icon: GraduationCap, gradient: "info-gradient" },
  { label: "Completed", value: "18", icon: Award, gradient: "success-gradient" },
  { label: "Expiring Certs", value: "3", icon: Clock, gradient: "accent-gradient" },
];

const courses = [
  { title: "Workplace Safety & HSE", category: "Compliance", enrolled: 12, completed: 8, duration: "4 hours" },
  { title: "Financial Analysis Fundamentals", category: "Skills", enrolled: 8, completed: 5, duration: "6 hours" },
  { title: "Leadership Development Program", category: "Leadership", enrolled: 5, completed: 2, duration: "10 hours" },
  { title: "Anti-Money Laundering (AML)", category: "Compliance", enrolled: 15, completed: 12, duration: "3 hours" },
  { title: "Marine Operations Safety", category: "Safety", enrolled: 6, completed: 3, duration: "5 hours" },
  { title: "New Employee Orientation", category: "Onboarding", enrolled: 2, completed: 0, duration: "2 hours" },
];

const certifications = [
  { name: "HSE Level 3", holder: "Emeka Obi", expires: "2026-03-15", status: "Expiring Soon" },
  { name: "AML Certification", holder: "Ibrahim Musa", expires: "2026-04-01", status: "Valid" },
  { name: "Marine Safety", holder: "Chioma Eze", expires: "2026-02-28", status: "Expiring Soon" },
];

export default function Training() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Training & Development</h2>
          <p className="text-muted-foreground">Manage courses, certifications, and learning paths</p>
        </div>
        <Button className="bg-primary text-primary-foreground gap-2">
          <Plus className="w-4 h-4" /> Add Course
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5 border-0 shadow-sm">
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

      {/* Courses grid */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Training Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((c, i) => (
            <Card key={i} className="p-5 border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <Badge variant="secondary" className="bg-secondary text-foreground text-xs">{c.category}</Badge>
                <span className="text-xs text-muted-foreground">{c.duration}</span>
              </div>
              <h4 className="font-semibold text-foreground mb-3">{c.title}</h4>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>{c.enrolled} enrolled</span>
                <span>{c.completed}/{c.enrolled} completed</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-1.5">
                <div className="h-1.5 rounded-full bg-primary" style={{ width: `${(c.completed / c.enrolled) * 100}%` }} />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Certification Tracking</h3>
        </div>
        <div className="divide-y divide-border">
          {certifications.map((cert, i) => (
            <div key={i} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{cert.name}</p>
                <p className="text-sm text-muted-foreground">{cert.holder} · Expires {cert.expires}</p>
              </div>
              <Badge variant="secondary" className={`border-0 ${cert.status === "Expiring Soon" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"}`}>
                {cert.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
