import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { OrgProvider } from "@/contexts/OrganizationContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import EmployeeLayout from "./components/EmployeeLayout";
import RoleRedirect from "./components/RoleRedirect";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Leave from "./pages/Leave";
import Payroll from "./pages/Payroll";
import Recruitment from "./pages/Recruitment";
import Performance from "./pages/Performance";
import Training from "./pages/Training";
import Loans from "./pages/Loans";
import Documents from "./pages/Documents";
import Reports from "./pages/Reports";
import SettingsPage from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ExitManagement from "./pages/ExitManagement";
import Attendance from "./pages/Attendance";
import Promotion from "./pages/Promotion";
import Announcements from "./pages/Announcements";
import Confirmation from "./pages/Confirmation";
import ApprovalWorkflow from "./pages/ApprovalWorkflow";
import Grievances from "./pages/Grievances";

// Employee portal pages
import MyDashboard from "./pages/employee/MyDashboard";
import MyProfile from "./pages/employee/MyProfile";
import MyAttendance from "./pages/employee/MyAttendance";
import MyLeave from "./pages/employee/MyLeave";
import MyPayslips from "./pages/employee/MyPayslips";
import MyLoans from "./pages/employee/MyLoans";
import MyTrainings from "./pages/employee/MyTrainings";
import MyAnnouncements from "./pages/employee/MyAnnouncements";
import MyDocuments from "./pages/employee/MyDocuments";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <OrgProvider>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />

              {/* Employee Portal */}
              <Route
                path="/me/*"
                element={
                  <ProtectedRoute allow={["employee", "admin", "hr_staff"]}>
                    <EmployeeLayout>
                      <Routes>
                        <Route path="/" element={<MyDashboard />} />
                        <Route path="/profile" element={<MyProfile />} />
                        <Route path="/attendance" element={<MyAttendance />} />
                        <Route path="/leave" element={<MyLeave />} />
                        <Route path="/payslips" element={<MyPayslips />} />
                        <Route path="/loans" element={<MyLoans />} />
                        <Route path="/trainings" element={<MyTrainings />} />
                        <Route path="/announcements" element={<MyAnnouncements />} />
                        <Route path="/documents" element={<MyDocuments />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </EmployeeLayout>
                  </ProtectedRoute>
                }
              />

              {/* HR / Admin Portal */}
              <Route
                path="/*"
                element={
                  <ProtectedRoute allow={["admin", "hr_staff"]}>
                    <RoleRedirect>
                      <AppLayout>
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/employees" element={<Employees />} />
                          <Route path="/leave" element={<Leave />} />
                          <Route path="/payroll" element={<Payroll />} />
                          <Route path="/recruitment" element={<Recruitment />} />
                          <Route path="/performance" element={<Performance />} />
                          <Route path="/training" element={<Training />} />
                          <Route path="/loans" element={<Loans />} />
                          <Route path="/documents" element={<Documents />} />
                          <Route path="/reports" element={<Reports />} />
                          <Route path="/settings" element={<SettingsPage />} />
                          <Route path="/exit-management" element={<ExitManagement />} />
                          <Route path="/attendance" element={<Attendance />} />
                          <Route path="/promotion" element={<Promotion />} />
                          <Route path="/announcements" element={<Announcements />} />
                          <Route path="/confirmation" element={<Confirmation />} />
                          <Route path="/approval-workflow" element={<ApprovalWorkflow />} />
                          <Route path="/grievances" element={<Grievances />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </AppLayout>
                    </RoleRedirect>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </OrgProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
