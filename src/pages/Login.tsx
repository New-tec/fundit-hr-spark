import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { LogIn, UserPlus } from "lucide-react";

const nameToEmail = (name: string) =>
  `${name.trim().toLowerCase().replace(/\s+/g, ".")}@fundit.demo`;

export default function Login() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{5}$/.test(pin)) {
      toast.error("Please enter a 5-digit PIN");
      return;
    }
    setLoading(true);
    const email = nameToEmail(fullName);
    const password = pin + "X"; // pad to meet 6-char minimum

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName.trim() },
          },
        });
        if (error) throw error;
        toast.success("Account created! You can now sign in.");
        setIsSignUp(false);
        setPin("");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/", { replace: true });
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sidebar px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Brand */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-xl accent-gradient flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">F</span>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-sidebar-primary">
              FUNDiT <span className="text-sidebar-muted font-normal text-lg">HRM</span>
            </h1>
            <p className="text-sidebar-muted text-sm mt-1">Human Resource Management System</p>
          </div>
        </div>

        <Card className="border-sidebar-border bg-card shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </CardTitle>
            <CardDescription>
              {isSignUp
                ? "Sign up to access the HR portal"
                : "Sign in to your HR portal"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Akinsola Oladipo"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pin">5-Digit PIN</Label>
                <Input
                  id="pin"
                  type="password"
                  inputMode="numeric"
                  maxLength={5}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 5))}
                  placeholder="•••••"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  "Please wait..."
                ) : isSignUp ? (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" /> Create Account
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" /> Sign In
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
              </span>{" "}
              <button
                type="button"
                className="text-primary font-medium hover:underline"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-sidebar-muted">
          © {new Date().getFullYear()} FUNDiT Consulting Limited. All rights reserved.
        </p>
      </div>
    </div>
  );
}
