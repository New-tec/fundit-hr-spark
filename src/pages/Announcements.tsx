import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Plus, Pin, Users, Globe, CalendarDays, Eye } from "lucide-react";
import { useState } from "react";

const announcements = [
  {
    id: 1,
    title: "Annual Performance Review – Q1 2026",
    body: "All employees are required to complete their self-appraisal forms by March 15th, 2026. Line managers should review and submit final ratings by March 22nd. HR will schedule one-on-one sessions thereafter.",
    author: "HR Department",
    date: "2026-02-28",
    audience: "All Employees",
    category: "HR Notice",
    pinned: true,
    views: 52,
  },
  {
    id: 2,
    title: "New Health Insurance Policy – Effective April 2026",
    body: "We are pleased to announce an upgrade to our group health insurance plan. The new policy covers dental, optical, and maternity at no additional cost. Details have been shared via email.",
    author: "Admin",
    date: "2026-02-25",
    audience: "All Employees",
    category: "Benefits",
    pinned: true,
    views: 48,
  },
  {
    id: 3,
    title: "Office Closure – Public Holiday Reminder",
    body: "Please note that the office will be closed on March 18th, 2026 in observance of the public holiday. All employees are to resume normal working hours on March 19th.",
    author: "Admin",
    date: "2026-02-22",
    audience: "All Employees",
    category: "General",
    pinned: false,
    views: 54,
  },
  {
    id: 4,
    title: "Finance Team – Budget Submission Deadline",
    body: "All department heads should submit their Q2 budget proposals to the Finance team by March 10th, 2026. Please use the updated budget template shared last week.",
    author: "Finance Department",
    date: "2026-02-20",
    audience: "Department Heads",
    category: "Finance",
    pinned: false,
    views: 18,
  },
  {
    id: 5,
    title: "IT System Maintenance – Saturday March 7",
    body: "The IT team will be performing scheduled maintenance on Saturday, March 7th between 10PM and 2AM. Email services and the HR portal may be briefly unavailable during this window.",
    author: "IT Department",
    date: "2026-02-18",
    audience: "All Employees",
    category: "IT Notice",
    pinned: false,
    views: 40,
  },
];

const categoryStyle: Record<string, string> = {
  "HR Notice": "bg-primary/10 text-primary",
  "Benefits": "bg-success/10 text-success",
  "General": "bg-secondary text-muted-foreground",
  "Finance": "bg-warning/10 text-warning",
  "IT Notice": "bg-info/10 text-info",
};

export default function Announcements() {
  const [selected, setSelected] = useState<number | null>(announcements[0].id);
  const detail = announcements.find(a => a.id === selected);
  const pinned = announcements.filter(a => a.pinned);
  const regular = announcements.filter(a => !a.pinned);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Announcements</h2>
          <p className="text-muted-foreground">Company-wide and targeted communications</p>
        </div>
        <Button className="bg-primary text-primary-foreground gap-2">
          <Plus className="w-4 h-4" /> New Announcement
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* List */}
        <div className="lg:col-span-1 space-y-4">
          {/* Pinned */}
          {pinned.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2 px-1">
                <Pin className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">Pinned</span>
              </div>
              <div className="space-y-2">
                {pinned.map(a => (
                  <Card
                    key={a.id}
                    onClick={() => setSelected(a.id)}
                    className={`p-3 border-0 shadow-sm cursor-pointer hover:shadow-md transition-all ${selected === a.id ? "ring-2 ring-primary" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground line-clamp-1">{a.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{a.date}</p>
                      </div>
                      <Badge variant="secondary" className={`${categoryStyle[a.category]} border-0 text-xs shrink-0`}>{a.category}</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
          {/* Regular */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">Recent</p>
            <div className="space-y-2">
              {regular.map(a => (
                <Card
                  key={a.id}
                  onClick={() => setSelected(a.id)}
                  className={`p-3 border-0 shadow-sm cursor-pointer hover:shadow-md transition-all ${selected === a.id ? "ring-2 ring-primary" : ""}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground line-clamp-1">{a.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{a.date}</p>
                    </div>
                    <Badge variant="secondary" className={`${categoryStyle[a.category]} border-0 text-xs shrink-0`}>{a.category}</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Detail view */}
        <Card className="lg:col-span-2 border-0 shadow-sm overflow-hidden">
          {detail ? (
            <div className="flex flex-col h-full">
              <div className="p-5 border-b border-border">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    {detail.pinned && <Pin className="w-4 h-4 text-accent shrink-0" />}
                    <h3 className="text-lg font-bold text-foreground">{detail.title}</h3>
                  </div>
                  <Badge variant="secondary" className={`${categoryStyle[detail.category]} border-0 shrink-0`}>{detail.category}</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full stat-card-gradient flex items-center justify-center">
                      <span className="text-primary-foreground text-[9px] font-bold">{detail.author[0]}</span>
                    </div>
                    <span>{detail.author}</span>
                  </div>
                  <div className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" /><span>{detail.date}</span></div>
                  <div className="flex items-center gap-1">
                    {detail.audience === "All Employees" ? <Globe className="w-3.5 h-3.5" /> : <Users className="w-3.5 h-3.5" />}
                    <span>{detail.audience}</span>
                  </div>
                  <div className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /><span>{detail.views} views</span></div>
                </div>
              </div>
              <div className="p-5 flex-1">
                <p className="text-sm text-foreground leading-relaxed">{detail.body}</p>
              </div>
              <div className="p-5 border-t border-border flex gap-2">
                <Button size="sm" variant="outline">Edit</Button>
                <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">Delete</Button>
                <Button size="sm" className="ml-auto bg-primary text-primary-foreground gap-1.5">
                  <Pin className="w-3.5 h-3.5" /> {detail.pinned ? "Unpin" : "Pin"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-full py-20 space-y-3">
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                <Megaphone className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">Select an announcement</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
