"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  ShieldCheck,
  UserPlus,
  LogIn,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Lock,
  User,
} from "lucide-react";
import { useLMSStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useLMSStore();

  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Login Form
  const [loginIdentifier, setLoginIdentifier] = useState("sahana@student.recon.edu");
  const [loginPassword, setLoginPassword] = useState("password123");

  // Registration Form (Unique Student)
  const [regName, setRegName] = useState("");
  const [regHandle, setRegHandle] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regDepartment, setRegDepartment] = useState("Computer Science & Engineering");
  const [regSemester, setRegSemester] = useState(4);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const res = await login(loginIdentifier, loginPassword);
    setIsLoading(false);

    if (res.success) {
      router.push("/dashboard");
    } else {
      setErrorMessage(res.error || "Invalid email or password.");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const res = await register({
      name: regName,
      handle: regHandle,
      email: regEmail,
      password: regPassword,
      department: regDepartment,
      semester: regSemester,
    });
    setIsLoading(false);

    if (res.success) {
      setSuccessMessage("Account created successfully! Redirecting to your dashboard...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    } else {
      setErrorMessage(res.error || "Registration failed.");
    }
  };

  // 1-Click Demo Pre-Fill
  const handleDemoSignIn = async (email: string, pass: string, targetPath: string = "/dashboard") => {
    setErrorMessage(null);
    setIsLoading(true);
    const res = await login(email, pass);
    setIsLoading(false);
    if (res.success) {
      router.push(targetPath);
    } else {
      setErrorMessage(res.error || "Failed demo sign-in.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#EDEDED] flex flex-col justify-between p-4 sm:p-8 brutal-grid-bg">
      {/* Top Bar */}
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full pb-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-[#FF5C58] text-black flex items-center justify-center font-display font-black text-xl border-2 border-black brutal-shadow-sm group-hover:bg-[#FFE600] transition-colors">
            R
          </div>
          <span className="font-display font-black text-lg tracking-tight uppercase text-white group-hover:text-[#FF5C58] transition-colors">
            RECON <span className="text-[#FFE600]">// LMS</span>
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8E95A5] hover:text-white uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing Page</span>
        </Link>
      </div>

      {/* Main Split Authentication Card */}
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-0 border-2 border-white brutal-shadow-white bg-[#12151D] my-auto">
        {/* Left Column: Platform Manifesto & Neon DB status (5 cols) */}
        <div className="lg:col-span-5 p-8 bg-[#0D1017] border-b-2 lg:border-b-0 lg:border-r-2 border-[#282F40] flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <span className="px-2.5 py-0.5 bg-[#FF5C58] text-white font-mono font-bold text-xs uppercase tracking-wider inline-block">
              INSTITUTIONAL GATEWAY
            </span>

            <h1 className="font-display font-black text-3xl uppercase tracking-tight text-white leading-tight">
              One place to learn.
              <br />
              <span className="text-[#FFE600]">One place to compete.</span>
              <br />
              <span className="text-[#2D7FF9]">One place to improve.</span>
            </h1>

            <p className="font-mono text-xs text-[#9DA7BC] leading-relaxed">
              Every student and instructor possesses a unique identity and verified academic record, synchronized directly with live Neon PostgreSQL.
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-[#12151D] border border-[#282F40] flex items-center justify-between">
              <span className="text-[#8E95A5]">Database Engine:</span>
              <span className="text-[#00E599] font-bold">Neon Serverless Postgres</span>
            </div>
            <div className="p-3 bg-[#12151D] border border-[#282F40] flex items-center justify-between">
              <span className="text-[#8E95A5]">Authentication:</span>
              <span className="text-[#FFE600] font-bold">Bcrypt Credentials + Sessions</span>
            </div>
          </div>
        </div>

        {/* Right Column: Authentication Form (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          {/* Mode Switch Tabs (Log In vs Create Account) */}
          <div className="flex border-2 border-[#282F40] bg-[#0B0D10] p-1 font-mono text-xs">
            <button
              onClick={() => {
                setAuthMode("login");
                setErrorMessage(null);
              }}
              className={cn(
                "flex-1 py-2.5 font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 brutal-btn",
                authMode === "login"
                  ? "bg-[#FFE600] text-black border border-black shadow-[2px_2px_0px_#000]"
                  : "text-[#8E95A5] hover:text-white"
              )}
            >
              <LogIn className="w-4 h-4" />
              <span>Log In</span>
            </button>

            <button
              onClick={() => {
                setAuthMode("register");
                setErrorMessage(null);
              }}
              className={cn(
                "flex-1 py-2.5 font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 brutal-btn",
                authMode === "register"
                  ? "bg-[#FF5C58] text-white border border-black shadow-[2px_2px_0px_#000]"
                  : "text-[#8E95A5] hover:text-white"
              )}
            >
              <UserPlus className="w-4 h-4" />
              <span>Register New Student</span>
            </button>
          </div>

          {/* Error / Success Banners */}
          {errorMessage && (
            <div className="p-3 bg-[#FF5C58]/15 border-2 border-[#FF5C58] text-[#FF5C58] font-mono text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-[#00E599]/15 border-2 border-[#00E599] text-[#00E599] font-mono text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* TAB 1: LOGIN FORM */}
          {authMode === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h2 className="font-display font-black text-xl uppercase tracking-tight text-white">
                    Sign In to Your Account
                  </h2>
                  <span className="font-mono text-[10px] text-[#00E599] font-bold">
                    ALL ROLES
                  </span>
                </div>
                <p className="font-mono text-xs text-[#8E95A5]">
                  Enter your registered institutional email or unique handle.
                </p>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-xs uppercase text-[#8E95A5] font-bold">
                  Email or Handle
                </label>
                <Input
                  type="text"
                  placeholder="e.g. sahana or sahana@student.recon.edu"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-xs uppercase text-[#8E95A5] font-bold">
                    Password
                  </label>
                  <span className="font-mono text-[10px] text-[#8E95A5]">
                    Default: password123
                  </span>
                </div>
                <Input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                variant="secondary"
                size="lg"
                className="w-full text-black font-black"
                disabled={isLoading}
              >
                <span>{isLoading ? "Authenticating against Neon DB..." : "Sign In to Platform →"}</span>
              </Button>
            </form>
          )}

          {/* TAB 2: REGISTER NEW UNIQUE STUDENT */}
          {authMode === "register" && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div className="space-y-1">
                <h2 className="font-display font-black text-xl uppercase tracking-tight text-white">
                  Create Unique Student Profile
                </h2>
                <p className="font-mono text-xs text-[#8E95A5]">
                  Creates a distinct scholar record in Neon PostgreSQL with personal ratings and transcripts.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono text-xs uppercase text-[#8E95A5] font-bold">
                    Full Name
                  </label>
                  <Input
                    required
                    placeholder="e.g. Jane Doe"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs uppercase text-[#8E95A5] font-bold">
                    Unique Handle
                  </label>
                  <Input
                    required
                    placeholder="e.g. jane_coder"
                    value={regHandle}
                    onChange={(e) => setRegHandle(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono text-xs uppercase text-[#8E95A5] font-bold">
                    Email Address
                  </label>
                  <Input
                    required
                    type="email"
                    placeholder="e.g. jane@student.recon.edu"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs uppercase text-[#8E95A5] font-bold">
                    Password (Min 6 chars)
                  </label>
                  <Input
                    required
                    type="password"
                    placeholder="••••••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono text-xs uppercase text-[#8E95A5] font-bold">
                    Department
                  </label>
                  <Input
                    value={regDepartment}
                    onChange={(e) => setRegDepartment(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs uppercase text-[#8E95A5] font-bold">
                    Current Term
                  </label>
                  <Input
                    type="number"
                    min={1}
                    max={8}
                    value={regSemester}
                    onChange={(e) => setRegSemester(Number(e.target.value))}
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full text-white font-black mt-2"
                disabled={isLoading}
              >
                <span>{isLoading ? "Provisioning account in Neon DB..." : "Create Student Account & Enter →"}</span>
              </Button>
            </form>
          )}

          {/* 1-CLICK DEMO AUTHENTICATION LINKS */}
          <div className="pt-4 border-t-2 border-[#282F40] space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#8E95A5] font-bold block">
              Instant 1-Click Authenticated Personas:
            </span>
            <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
              <button
                type="button"
                onClick={() =>
                  handleDemoSignIn("sahana@student.recon.edu", "password123", "/dashboard")
                }
                className="p-2 bg-[#FFE600] text-black border border-black font-bold uppercase hover:opacity-90 brutal-btn truncate"
                title="Student Sahana (Rating 1742 Expert)"
              >
                Student Sahana
              </button>
              <button
                type="button"
                onClick={() =>
                  handleDemoSignIn("marcus.vance@faculty.recon.edu", "password123", "/dashboard")
                }
                className="p-2 bg-[#2D7FF9] text-white border border-black font-bold uppercase hover:opacity-90 brutal-btn truncate"
                title="Prof. Marcus Vance (Instructor)"
              >
                Prof. Vance
              </button>
              <button
                type="button"
                onClick={() =>
                  handleDemoSignIn("eleanor.wright@admin.recon.edu", "password123", "/admin")
                }
                className="p-2 bg-[#FF5C58] text-white border border-black font-bold uppercase hover:opacity-90 brutal-btn truncate"
                title="Admin Eleanor Wright"
              >
                Admin Eleanor
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center font-mono text-xs text-[#8E95A5] pt-6">
        RECON ACADEMIC SYSTEMS · POWERED BY NEON POSTGRESQL & NEO-BRUTALIST ARCHITECTURE
      </div>
    </div>
  );
}
