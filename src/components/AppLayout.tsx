import { useState, useRef, useEffect } from "react";
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
  Building2,
  ChevronsUpDown,
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
  const [orgPickerOpen, setOrgPickerOpen] = useState(false);
  const { user, role, signOut } = useAuth();
  const { org, orgConfig, setOrg } = useOrg();
  const location = useLocation();
  const pickerRef = useRef<HTMLDivElement>(null);

  // Close picker when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setOrgPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
        <div className="px-3 py-3 border-t border-sidebar-border" ref={pickerRef}>
          <div className="relative">
            <button
              onClick={() => setOrgPickerOpen((v) => !v)}
              title="Switch org"
              className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors ${
                orgPickerOpen ? "bg-sidebar-accent/50" : ""
              }`}
            >
              <Building2 className="w-4 h-4 shrink-0 text-sidebar-muted" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left font-medium text-xs text-sidebar-muted">
                    Switch org
                  </span>
                  <ChevronsUpDown className="w-3.5 h-3.5 text-sidebar-muted shrink-0" />
                </>
              )}
            </button>

            {orgPickerOpen && (
              <div
                className={`absolute bottom-full mb-2 ${
                  collapsed ? "left-full ml-2 w-56" : "left-0 right-0"
                } rounded-xl border border-sidebar-border bg-sidebar shadow-2xl overflow-hidden z-50`}
              >
                <div className="px-3 pt-3 pb-1">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-muted">
                    Organisations
                  </p>
                </div>
                {ORG_LIST.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => {
                      setOrg(o.id as OrgId);
                      setOrgPickerOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-sidebar-accent/50 ${
                      org === o.id ? "bg-sidebar-accent/30" : ""
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center accent-gradient shrink-0">
                      <span className="text-accent-foreground font-black text-xs">{o.initial}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-sidebar-primary truncate">{o.label}</p>
                      <p className="text-[10px] text-sidebar-muted truncate">{o.subtext}</p>
                    </div>
                    {org === o.id && <Check className="w-3.5 h-3.5 text-sidebar-accent-foreground shrink-0" />}
                  </button>
                ))}
                <div className="px-3 py-2 border-t border-sidebar-border">
                  <p className="text-[9px] text-sidebar-muted">Switching won't sign you out</p>
                </div>
              </div>
            )}
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
            {orgConfig && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                <Building2 className="w-3 h-3" />
                {orgConfig.name}
              </span>
            )}
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
