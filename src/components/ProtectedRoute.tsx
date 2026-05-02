import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  children: React.ReactNode;
  /** Roles allowed to access this route. If omitted, any authenticated user. */
  allow?: Array<"admin" | "hr_staff" | "employee">;
}

export default function ProtectedRoute({ children, allow }: Props) {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-lg accent-gradient flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Auto-route by role if user lands on a section they shouldn't access
  if (allow && role && !allow.includes(role)) {
    const target = role === "employee" ? "/me" : "/";
    if (location.pathname !== target) {
      return <Navigate to={target} replace />;
    }
  }

  return <>{children}</>;
}
