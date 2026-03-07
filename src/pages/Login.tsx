import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { LogIn, UserPlus, Building2, ChevronDown } from "lucide-react";
import { useOrg, OrgId, ORG_CONFIGS } from "@/contexts/OrganizationContext";

const nameToEmail = (name: string) =>
  `${name.trim().toLowerCase().replace(/\s+/g, ".")}@fundit.demo`;

const ORG_OPTIONS: { id: OrgId; name: string; subtext: string }[] = [
  { id: "fundit", name: "FUNDiT", subtext: "People | Performance | Progress" },
  { id: "capitalcorp", name: "CAPITALCORP", subtext: "Finance | Energy | Real Estate" },
  { id: "swiftbanq", name: "SWIFTBANQ", subtext: "Digital Banking & Fintech" },
];

export default function Login() {
  const navigate = useNavigate();
  const { setOrg } = useOrg();
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedOrg, setSelectedOrg] = useState<OrgId>("fundit");
  const [orgOpen, setOrgOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Preview theme on org selection
  useEffect(() => {
    document.documentElement.setAttribute("data-org", selectedOrg);
  }, [selectedOrg]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 5) {
      toast.error("Password must be at least 5 characters");
      return;
    }
    setLoading(true);
    const email = nameToEmail(fullName);
    const supaPassword = password.length < 6 ? password + "X" : password;

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password: supaPassword,
          options: { data: { full_name: fullName.trim() } },
        });
        if (error) throw error;
        toast.success("Account created! You can now sign in.");
        setIsSignUp(false);
        setPassword("");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password: supaPassword });
        if (error) throw error;
        setOrg(selectedOrg);
        navigate("/", { replace: true });
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const currentOrg = ORG_OPTIONS.find((o) => o.id === selectedOrg)!;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 login-bg-gradient" />
      <div className="absolute inset-0 login-mesh-overlay" />

      {/* Floating orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full login-orb-1 blur-3xl opacity-30 animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full login-orb-2 blur-3xl opacity-25 animate-[pulse_10s_ease-in-out_infinite_2s]" />
      <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] rounded-full login-orb-3 blur-3xl opacity-20 animate-[pulse_12s_ease-in-out_infinite_4s]" />

      <div className="relative z-10 w-full max-w-[440px] animate-[fade-in_0.5s_ease-out_forwards]">
        {/* Brand header */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl login-logo-bg flex items-center justify-center shadow-2xl">
              <span className="font-black text-3xl login-logo-text">F</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full login-badge flex items-center justify-center shadow-lg">
              <Building2 className="w-3 h-3 login-badge-icon" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-black tracking-tight login-brand-text">
              FUNDiT <span className="login-hrm-text font-medium text-lg">HRM</span>
            </h1>
            <p className="text-sm mt-1 login-tagline-text font-medium tracking-wide">
              People. Performance. Progress.
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="login-card rounded-2xl shadow-2xl overflow-hidden">
          {/* Card top accent bar */}
          <div className="h-1 login-accent-bar" />

          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold login-card-title">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="text-sm login-card-subtitle mt-1">
                {isSignUp ? "Sign up to access the HR portal" : "Sign in to your HR portal"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wider login-label">
                  Full Name
                </Label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Akinsola Oladipo"
                  required
                  className="login-input h-11"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wider login-label">
                  Password
                </Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="login-input h-11"
                />
              </div>

              {/* Organization selector */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wider login-label">
                  Organization
                </Label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOrgOpen(!orgOpen)}
                    className="login-org-trigger w-full h-11 flex items-center justify-between px-3 rounded-md border text-sm transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded login-org-icon-bg flex items-center justify-center shrink-0">
                        <span className="text-xs font-black login-org-icon-text">
                          {currentOrg.name.charAt(0)}
                        </span>
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-sm login-org-name">{currentOrg.name}</p>
                        <p className="text-xs login-org-sub">{currentOrg.subtext}</p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 login-org-chevron transition-transform ${orgOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {orgOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 login-org-dropdown rounded-md border shadow-xl z-50 overflow-hidden">
                      {ORG_OPTIONS.map((org) => (
                        <button
                          key={org.id}
                          type="button"
                          onClick={() => {
                            setSelectedOrg(org.id);
                            setOrgOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-all login-org-option ${
                            selectedOrg === org.id ? "login-org-option-active" : ""
                          }`}
                        >
                          <div className="w-7 h-7 rounded login-org-icon-bg flex items-center justify-center shrink-0">
                            <span className="text-xs font-black login-org-icon-text">
                              {org.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-bold text-sm login-org-name">{org.name}</p>
                            <p className="text-xs login-org-sub">{org.subtext}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 login-btn font-bold text-sm tracking-wide mt-2"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Please wait...
                  </span>
                ) : isSignUp ? (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" /> Create Account
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" /> Sign In to {currentOrg.name}
                  </>
                )}
              </Button>
            </form>

            <div className="mt-5 text-center text-sm">
              <span className="login-card-subtitle">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
              </span>{" "}
              <button
                type="button"
                className="login-link font-semibold hover:underline transition-all"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setPassword("");
                }}
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs login-footer-text mt-6">
          © {new Date().getFullYear()} FUNDiT Consulting Limited. All rights reserved.
        </p>
      </div>
    </div>
  );
}
