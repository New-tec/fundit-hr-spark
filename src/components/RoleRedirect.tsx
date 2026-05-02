import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Wraps the HR/Admin section. If the signed-in user has the `employee` role,
 * redirect them to the employee portal instead of the HR dashboard.
 */
export default function RoleRedirect({ children }: { children: React.ReactNode }) {
  const { role, loading } = useAuth();

  if (loading) return null;

  if (role === "employee") {
    return <Navigate to="/me" replace />;
  }

  return <>{children}</>;
}
