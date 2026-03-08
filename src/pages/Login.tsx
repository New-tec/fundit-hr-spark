import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { LogIn, UserPlus, Check, Eye, EyeOff } from "lucide-react";
import { useOrg, OrgId } from "@/contexts/OrganizationContext";

import funditImg from "@/assets/login-fundit.jpg";
import tesmarineImg from "@/assets/login-tesmarine.jpg";
import capitalcorpImg from "@/assets/login-capitalcorp.jpg";

const nameToEmail = (name: string) =>
  `${name.trim().toLowerCase().replace(/\s+/g, ".")}@fundit.demo`;

interface OrgOption {
  id: OrgId;
  name: string;
  subtext: string;
  image: string;
  accent: string;
  tagline: string;
  stats: { label: string; value: string }[];
}

const ORG_OPTIONS: OrgOption[] = [
  {
    id: "fundit",
    name: "FUNDiT",
    subtext: "People | Performance | Progress",
    image: funditImg,
    accent: "from-red-900/80 via-red-800/60 to-slate-900/90",
    tagline: "Empowering people. Driving performance.",
    stats: [
      { label: "Employees", value: "2,400+" },
      { label: "Departments", value: "18" },
      { label: "Locations", value: "6" },
    ],
  },
  {
    id: "tesmarine",
    name: "TES Marine",
    subtext: "Time Charter | Diving Support | Technical & Logistics",
    image: tesmarineImg,
    accent: "from-teal-900/80 via-teal-800/60 to-slate-900/90",
    tagline: "Navigating excellence across every ocean.",
    stats: [
      { label: "Vessels", value: "34" },
      { label: "Crew", value: "1,200+" },
      { label: "Ports", value: "28" },
    ],
  },
  {
    id: "capitalcorp",
    name: "CAPITALCORP",
    subtext: "Finance | Energy | Real Estate",
    image: capitalcorpImg,
    accent: "from-cyan-900/80 via-blue-900/60 to-slate-900/90",
    tagline: "Capital that moves markets.",
    stats: [
      { label: "AUM", value: "$4.2B" },
      { label: "Portfolio", value: "120+" },
      { label: "Countries", value: "14" },
    ],
  },
];

export default function Login() {
  const navigate = useNavigate();
  const { setOrg } = useOrg();
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<OrgId>("fundit");
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const currentOrg = ORG_OPTIONS.find((o) => o.id === selectedOrg)!;

  useEffect(() => {
    document.documentElement.setAttribute("data-org", selectedOrg);
  }, [selectedOrg]);

  const handleOrgSelect = (id: OrgId) => {
    if (id === selectedOrg) return;
    setTransitioning(true);
    setImageLoaded(false);
    setTimeout(() => {
      setSelectedOrg(id);
      setTransitioning(false);
    }, 300);
  };

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

  return (
    <div className="min-h-screen flex overflow-hidden bg-slate-950">
      {/* LEFT PANEL — Visual */}
      <div className="hidden lg:flex lg:w-[58%] relative overflow-hidden">
        {/* Background image with crossfade */}
        <img
          key={currentOrg.id}
          src={currentOrg.image}
          alt={currentOrg.name}
          onLoad={() => setImageLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            imageLoaded && !transitioning ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${currentOrg.accent} transition-all duration-700`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Top brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <span className="text-white font-black text-lg">{currentOrg.name.charAt(0)}</span>
            </div>
            <div>
              <p className="text-white font-black text-lg tracking-tight leading-none">{currentOrg.name}</p>
              <p className="text-white/60 text-xs mt-0.5">HR Management Portal</p>
            </div>
          </div>

          {/* Center tagline */}
          <div
            className={`transition-all duration-500 ${
              transitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
          >
            <p className="text-white/50 uppercase tracking-[0.3em] text-xs font-semibold mb-4">
              Welcome to
            </p>
            <h1 className="text-5xl font-black text-white leading-tight mb-4 drop-shadow-lg">
              {currentOrg.tagline.split(". ").map((line, i) => (
                <span key={i} className="block">
                  {line}{i < currentOrg.tagline.split(". ").length - 1 ? "." : ""}
                </span>
              ))}
            </h1>
            <p className="text-white/70 text-base font-medium max-w-sm leading-relaxed">
              {currentOrg.subtext}
            </p>
          </div>

          {/* Bottom stats */}
          <div
            className={`transition-all duration-500 delay-100 ${
              transitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
          >
            <div className="flex gap-8 mb-8">
              {currentOrg.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-white font-black text-2xl">{stat.value}</p>
                  <p className="text-white/50 text-xs uppercase tracking-wider mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Org switcher thumbnails */}
            <div className="flex gap-3">
              {ORG_OPTIONS.map((org) => (
                <button
                  key={org.id}
                  onClick={() => handleOrgSelect(org.id)}
                  className={`relative group overflow-hidden rounded-xl transition-all duration-300 ${
                    selectedOrg === org.id
                      ? "ring-2 ring-white w-32 h-16"
                      : "ring-1 ring-white/20 w-16 h-16 hover:ring-white/50 hover:scale-105"
                  }`}
                >
                  <img
                    src={org.image}
                    alt={org.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-black/40 flex items-end p-1.5 transition-opacity ${
                      selectedOrg === org.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <span className="text-white text-[9px] font-bold leading-tight truncate">
                      {org.name}
                    </span>
                  </div>
                  {selectedOrg === org.id && (
                    <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white/90 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-slate-900" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL — Form */}
      <div className="flex-1 lg:w-[42%] flex items-center justify-center bg-slate-950 px-6 py-12 relative overflow-hidden">
        {/* Subtle bg glow */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/3 blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/2 blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative w-full max-w-[400px]">
          {/* Mobile org selector (shown only on small screens) */}
          <div className="lg:hidden mb-8">
            <p className="text-slate-400 text-xs uppercase tracking-widest mb-3 font-semibold">Select Organization</p>
            <div className="flex gap-2">
              {ORG_OPTIONS.map((org) => (
                <button
                  key={org.id}
                  onClick={() => handleOrgSelect(org.id)}
                  className={`flex-1 relative overflow-hidden rounded-xl h-20 transition-all duration-300 ${
                    selectedOrg === org.id
                      ? "ring-2 ring-white scale-105"
                      : "ring-1 ring-white/10 opacity-60 hover:opacity-80"
                  }`}
                >
                  <img src={org.image} alt={org.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 flex items-end p-2">
                    <span className="text-white text-[10px] font-bold leading-tight">{org.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                <span className="text-white font-black text-sm">{currentOrg.name.charAt(0)}</span>
              </div>
              <span className="text-slate-400 text-sm font-medium">{currentOrg.name} HRM</span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight leading-tight mb-2">
              {isSignUp ? "Create your\naccount" : "Welcome\nback"}
            </h2>
            <p className="text-slate-400 text-sm">
              {isSignUp
                ? "Sign up to access the HR portal"
                : `Sign in to ${currentOrg.name} HR portal`}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Full Name
              </Label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Akinsola Oladipo"
                required
                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-white/30 focus:bg-white/8 rounded-xl text-sm transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-white/30 rounded-xl text-sm pr-11 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl font-bold text-sm tracking-wide mt-2 bg-white text-slate-950 hover:bg-white/90 transition-all shadow-lg shadow-white/10"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  Please wait…
                </span>
              ) : isSignUp ? (
                <><UserPlus className="w-4 h-4 mr-2" /> Create Account</>
              ) : (
                <><LogIn className="w-4 h-4 mr-2" /> Sign In</>
              )}
            </Button>
          </form>

          <div className="mt-5 text-center text-sm">
            <span className="text-slate-500">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </span>{" "}
            <button
              type="button"
              className="text-white font-semibold hover:underline transition-all"
              onClick={() => { setIsSignUp(!isSignUp); setPassword(""); }}
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </div>

          <p className="text-center text-xs text-slate-700 mt-10">
            © {new Date().getFullYear()} FUNDiT Consulting Limited. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
