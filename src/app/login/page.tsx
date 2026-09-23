"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  ShieldCheck,
  BookOpenCheck,
  ArrowRight,
  Flame,
  Trophy,
  Lock,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { useLMSStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const { setRole } = useLMSStore();

  const [activeTab, setActiveTab] = useState<"student" | "faculty">("student");
  const [facultyEmail, setFacultyEmail] = useState("marcus.vance@faculty.recon.edu");
  const [facultyPassword, setFacultyPassword] = useState("••••••••••••");
  const [facultyRole, setFacultyRole] = useState<"teacher" | "admin">("teacher");
  const [isLoading, setIsLoading] = useState(false);

  const handleStudentGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setRole("student");
      router.push("/dashboard");
    }, 600);
  };

  const handleFacultyLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setRole(facultyRole);
      if (facultyRole === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }, 600);
  };

  const handleQuickDemoLogin = (role: "student" | "teacher" | "admin") => {
    setRole(role);
    if (role === "admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
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
            RECON <span className="text-[#8E95A5] text-xs font-mono font-normal">// LMS</span>
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
        {/* Left Manifesto Column (5 cols) */}
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
              RECON combines academic curriculum governance with high-frequency algorithmic contests and real-time student telemetry.
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-[#12151D] border border-[#282F40] flex items-center justify-between">
              <span className="text-[#8E95A5]">Active Contest:</span>
              <span className="text-[#00E599] font-bold">Round #48 Live</span>
            </div>
            <div className="p-3 bg-[#12151D] border border-[#282F40] flex items-center justify-between">
              <span className="text-[#8E95A5]">Judging Engine:</span>
              <span className="text-[#FFE600] font-bold">0.02s Mean Latency</span>
            </div>
          </div>
        </div>

        {/* Right Authentication Form Column (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          {/* Portal Switch Tabs */}
          <div className="flex border-2 border-[#282F40] bg-[#0B0D10] p-1 font-mono text-xs">
            <button
              onClick={() => setActiveTab("student")}
              className={cn(
                "flex-1 py-2.5 font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 brutal-btn",
                activeTab === "student"
                  ? "bg-[#FFE600] text-black border border-black shadow-[2px_2px_0px_#000]"
                  : "text-[#8E95A5] hover:text-white"
              )}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student Portal</span>
            </button>

            <button
              onClick={() => setActiveTab("faculty")}
              className={cn(
                "flex-1 py-2.5 font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 brutal-btn",
                activeTab === "faculty"
                  ? "bg-[#2D7FF9] text-white border border-black shadow-[2px_2px_0px_#000]"
                  : "text-[#8E95A5] hover:text-white"
              )}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Faculty & Admin</span>
            </button>
          </div>

          {/* TAB 1: STUDENT GOOGLE LOGIN */}
          {activeTab === "student" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="font-display font-black text-xl uppercase tracking-tight text-white">
                  Student Single Sign-On
                </h2>
                <p className="font-mono text-xs text-[#8E95A5] leading-relaxed">
                  No manual student registration required. Access your semester courses, assessments, and contest rating directly using your institutional Google Workspace account.
                </p>
              </div>

              {/* Google Button */}
              <button
                type="button"
                onClick={handleStudentGoogleLogin}
                disabled={isLoading}
                className="w-full py-4 px-6 bg-white text-black border-2 border-black font-display font-black text-sm uppercase tracking-wide flex items-center justify-center gap-3 brutal-shadow hover:bg-[#F2F2ED] transition-all brutal-btn cursor-pointer"
              >
                {/* Google Logo SVG */}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.15z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>{isLoading ? "Authenticating..." : "Continue with Google Workspace"}</span>
              </button>

              <div className="p-3 bg-[#0B0D10] border border-[#282F40] font-mono text-[11px] text-[#8E95A5]">
                🔒 OAuth 2.0 PKCE secured with university domain verification.
              </div>
            </div>
          )}

          {/* TAB 2: FACULTY & ADMIN DIRECT CREDENTIALS */}
          {activeTab === "faculty" && (
            <form onSubmit={handleFacultyLogin} className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h2 className="font-display font-black text-xl uppercase tracking-tight text-white">
                    Faculty & Admin Credentials
                  </h2>
                  <span className="font-mono text-[10px] text-[#FF5C58] font-bold">
                    RESTRICTED
                  </span>
                </div>
                <p className="font-mono text-xs text-[#8E95A5]">
                  Accounts created manually by Academic Administration. Public registration is permanently closed.
                </p>
              </div>

              {/* Role selector */}
              <div className="grid grid-cols-2 gap-2 font-mono text-xs pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setFacultyRole("teacher");
                    setFacultyEmail("marcus.vance@faculty.recon.edu");
                  }}
                  className={cn(
                    "p-2.5 border font-bold uppercase transition-all",
                    facultyRole === "teacher"
                      ? "bg-[#2D7FF9] text-white border-black brutal-shadow-sm"
                      : "bg-[#0B0D10] text-[#8E95A5] border-[#282F40]"
                  )}
                >
                  Instructor / Teacher
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFacultyRole("admin");
                    setFacultyEmail("eleanor.wright@admin.recon.edu");
                  }}
                  className={cn(
                    "p-2.5 border font-bold uppercase transition-all",
                    facultyRole === "admin"
                      ? "bg-[#FF5C58] text-white border-black brutal-shadow-sm"
                      : "bg-[#0B0D10] text-[#8E95A5] border-[#282F40]"
                  )}
                >
                  Platform Admin
                </button>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-xs uppercase text-[#8E95A5]">Institutional Email</label>
                <Input
                  type="email"
                  value={facultyEmail}
                  onChange={(e) => setFacultyEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-xs uppercase text-[#8E95A5]">Password</label>
                <Input
                  type="password"
                  value={facultyPassword}
                  onChange={(e) => setFacultyPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                variant={facultyRole === "admin" ? "primary" : "accent"}
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                <span>{isLoading ? "Verifying..." : `Sign In as ${facultyRole.toUpperCase()} →`}</span>
              </Button>
            </form>
          )}

          {/* QUICK DEMO EVALUATOR LINKS */}
          <div className="pt-4 border-t-2 border-[#282F40] space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#8E95A5] font-bold block">
              1-Click Demo Evaluation Sign-In:
            </span>
            <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("student")}
                className="p-2 bg-[#FFE600] text-black border border-black font-bold uppercase hover:opacity-90 brutal-btn"
              >
                Student Alex
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("teacher")}
                className="p-2 bg-[#2D7FF9] text-white border border-black font-bold uppercase hover:opacity-90 brutal-btn"
              >
                Prof. Vance
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("admin")}
                className="p-2 bg-[#FF5C58] text-white border border-black font-bold uppercase hover:opacity-90 brutal-btn"
              >
                Admin Eleanor
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center font-mono text-xs text-[#8E95A5] pt-6">
        RECON ACADEMIC SYSTEMS · POWERED BY NEO-BRUTALIST ARCHITECTURE
      </div>
    </div>
  );
}
