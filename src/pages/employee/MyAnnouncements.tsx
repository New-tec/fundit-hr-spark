import { Card } from "@/components/ui/card";
import { Megaphone, Pin } from "lucide-react";

const announcements = [
  {
    title: "Q1 Performance Bonus Processing",
    body: "Q1 performance bonuses will be paid alongside the March payroll. Eligible employees will receive notification via email by March 25.",
    author: "HR Department",
    time: "2 hours ago",
    pinned: true,
  },
  {
    title: "New Health Insurance Provider Effective April 1",
    body: "We are excited to announce a partnership with HealthCare Plus. Enrollment forms will be sent out next week. All current coverage remains active until April 1.",
    author: "Benefits Team",
    time: "Yesterday",
    pinned: true,
  },
  {
    title: "Office Closure - Public Holiday",
    body: "All offices will be closed on Friday for the public holiday. Operations resume Monday at 8:00 AM.",
    author: "Admin",
    time: "3 days ago",
    pinned: false,
  },
  {
    title: "Annual Company Retreat: Save the Date",
    body: "Mark your calendars! The annual company retreat is scheduled for May 18-20 at the Eko Hotel & Suites. More details to follow.",
    author: "Executive Office",
    time: "1 week ago",
    pinned: false,
  },
  {
    title: "New Learning Platform Launch",
    body: "Our new internal learning platform is now live. Access 200+ courses across compliance, technical skills, and leadership tracks via the Trainings page.",
    author: "L&D Team",
    time: "2 weeks ago",
    pinned: false,
  },
];

export default function MyAnnouncements() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-foreground">Announcements</h2>
        <p className="text-sm text-muted-foreground">Stay up to date with company news</p>
      </div>

      <div className="space-y-4">
        {announcements.map((a, i) => (
          <Card key={i} className="p-5 border-0 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg accent-gradient flex items-center justify-center shrink-0">
                <Megaphone className="w-5 h-5 text-accent-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{a.title}</h3>
                    {a.pinned && (
                      <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                        <Pin className="w-2.5 h-2.5" /> Pinned
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{a.time}</span>
                </div>
                <p className="text-sm text-foreground/80 mt-2 leading-relaxed">{a.body}</p>
                <p className="text-xs text-muted-foreground mt-3">— {a.author}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
