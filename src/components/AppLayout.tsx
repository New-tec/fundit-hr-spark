import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  DollarSign,
  UserPlus,
  Target,
  GraduationCap,
  HandCoins,
  FileText,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Users, label: "Employees", path: "/employees" },
  { icon: CalendarDays, label: "Leave", path: "/leave" },
  { icon: DollarSign, label: "Payroll", path: "/payroll" },
  { icon: UserPlus, label: "Recruitment", path: "/recruitment" },
  { icon: Target, label: "Performance", path: "/performance" },
  { icon: GraduationCap, label: "Training", path: "/training" },
  { icon: HandCoins, label: "Loans", path: "/loans" },
  { icon: FileText, label: "Documents", path: "/documents" },
  { icon: BarChart3, label: "Reports", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-[72px]" : "w-[260px]"
        } bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 ease-in-out shrink-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-16 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded-lg accent-gradient flex items-center justify-center shrink-0">
            <span className="text-accent-foreground font-bold text-sm">F</span>
          </div>
          {!collapsed && (
            <span className="font-bold text-lg text-sidebar-primary tracking-tight">
              FUNDiT <span className="text-sidebar-muted font-normal text-sm">HRM</span>
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
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
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <div className="px-3 py-3 border-t border-sidebar-border">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 w-full transition-colors"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shrink-0">
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              {navItems.find((i) => i.path === location.pathname)?.label || "Page"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full stat-card-gradient flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-semibold">AO</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-foreground">Akinsola O.</p>
                <p className="text-xs text-muted-foreground">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
