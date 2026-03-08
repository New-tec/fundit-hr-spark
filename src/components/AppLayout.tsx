import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useOrg, OrgId, ORG_CONFIGS } from "@/contexts/OrganizationContext";
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
  Clock,
  LogOut as ExitIcon,
  TrendingUp,
  Megaphone,
  UserCheck,
  GitBranch,
  ShieldAlert,
  Check,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Users, label: "Employees", path: "/employees" },
  { icon: Clock, label: "Attendance", path: "/attendance" },
  { icon: CalendarDays, label: "Leave", path: "/leave" },
  { icon: DollarSign, label: "Payroll", path: "/payroll" },
  { icon: UserPlus, label: "Recruitment", path: "/recruitment" },
  { icon: Target, label: "Performance", path: "/performance" },
  { icon: GraduationCap, label: "Training", path: "/training" },
  { icon: TrendingUp, label: "Promotions", path: "/promotion" },
  { icon: UserCheck, label: "Confirmation", path: "/confirmation" },
  { icon: HandCoins, label: "Loans", path: "/loans" },
  { icon: GitBranch, label: "Approvals", path: "/approval-workflow" },
  { icon: ShieldAlert, label: "Grievances", path: "/grievances" },
  { icon: ExitIcon, label: "Exit Mgmt", path: "/exit-management" },
  { icon: Megaphone, label: "Announcements", path: "/announcements" },
  { icon: FileText, label: "Documents", path: "/documents" },
  { icon: BarChart3, label: "Reports", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const ORG_LIST = Object.values(ORG_CONFIGS);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user, role, signOut } = useAuth();
  const { org, orgConfig, setOrg } = useOrg();
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
              {orgConfig && (
                <span className="text-sidebar-muted text-[10px] leading-tight block mt-0.5 truncate">
                  {orgConfig.subtext}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Org badge (collapsed) */}
        {collapsed && orgConfig && (
          <div className="flex justify-center py-2 border-b border-sidebar-border">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center accent-gradient">
              <Building2 className="w-3.5 h-3.5 text-accent-foreground" />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
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
                <item.icon className="shrink-0 w-[18px] h-[18px]" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* ── Org Switcher ── */}
        <div className="border-t border-sidebar-border">
          {!collapsed && (
            <div className="px-4 pt-3 pb-1">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-muted">
                Organisations
              </p>
            </div>
          )}
          <div className="px-3 pb-3 space-y-0.5">
            {ORG_LIST.map((o) => (
              <button
                key={o.id}
                onClick={() => setOrg(o.id as OrgId)}
                title={o.name}
                className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-left transition-colors hover:bg-sidebar-accent/50 ${
                  org === o.id ? "bg-sidebar-accent/30" : ""
                }`}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center accent-gradient shrink-0">
                  <span className="text-accent-foreground font-black text-xs">{o.initial}</span>
                </div>
                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-sidebar-primary truncate">{o.label}</p>
                    <p className="text-[9px] text-sidebar-muted truncate leading-tight">{o.subtext}</p>
                  </div>
                )}
                {!collapsed && org === o.id && (
                  <Check className="w-3 h-3 text-sidebar-accent-foreground shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Collapse toggle */}
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

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
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
                <span className="text-primary-foreground text-sm font-semibold">
                  {user?.user_metadata?.full_name?.charAt(0)?.toUpperCase() ||
                    user?.email?.charAt(0)?.toUpperCase() ||
                    "U"}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-foreground">
                  {user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User"}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {role === "admin" ? "Admin" : "HR Staff"}
                </p>
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

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
