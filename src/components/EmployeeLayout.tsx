import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useOrg } from "@/contexts/OrganizationContext";
import {
  LayoutDashboard,
  User,
  CalendarDays,
  Clock,
  DollarSign,
  HandCoins,
  GraduationCap,
  Megaphone,
  FileText,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "My Dashboard", path: "/me" },
  { icon: User, label: "My Profile", path: "/me/profile" },
  { icon: Clock, label: "Attendance", path: "/me/attendance" },
  { icon: CalendarDays, label: "Leave", path: "/me/leave" },
  { icon: DollarSign, label: "Payslips", path: "/me/payslips" },
  { icon: HandCoins, label: "Loans", path: "/me/loans" },
  { icon: GraduationCap, label: "Trainings", path: "/me/trainings" },
  { icon: Megaphone, label: "Announcements", path: "/me/announcements" },
  { icon: FileText, label: "Documents", path: "/me/documents" },
];

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user, signOut } = useAuth();
  const { orgConfig } = useOrg();
  const location = useLocation();

  const fullName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Employee";

  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        className={`${
          collapsed ? "w-[72px]" : "w-[260px]"
        } bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 ease-in-out shrink-0`}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-5 h-auto min-h-[72px] py-3 border-b border-sidebar-border">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 accent-gradient">
            <span className="text-accent-foreground font-black text-base">
              {orgConfig ? orgConfig.initial : "F"}
            </span>
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <span className="font-black text-base text-sidebar-primary tracking-tight block leading-tight">
                {orgConfig ? orgConfig.label : "FUNDiT"}
              </span>
              <span className="text-sidebar-muted text-[10px] leading-tight block mt-0.5 truncate">
                Employee Self-Service
              </span>
            </div>
          )}
        </div>

        <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              item.path === "/me"
                ? location.pathname === "/me"
                : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                }`}
              >
                <item.icon className="shrink-0 w-[18px] h-[18px]" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-3 border-t border-sidebar-border">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 w-full transition-colors"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shrink-0">
          <h1 className="text-lg font-semibold text-foreground">
            {navItems.find((i) =>
              i.path === "/me" ? location.pathname === "/me" : location.pathname.startsWith(i.path),
            )?.label || "Employee Portal"}
          </h1>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full stat-card-gradient flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-semibold">
                  {fullName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-foreground">{fullName}</p>
                <p className="text-xs text-muted-foreground">Employee</p>
              </div>
            </div>
            <button
              onClick={signOut}
              className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              title="Sign out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
