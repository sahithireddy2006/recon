"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UserPlus,
  LogIn,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";
import { useLMSStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const ACADEMIC_DEPARTMENTS = [
  "Computer Science & Engineering",
  "Electrical & Computer Engineering",
  "Mathematics & Computing",
  "Information Technology",
  "Software Engineering",
  "Artificial Intelligence & Data Science",
];

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useLMSStore();

  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Password visibility toggles
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);

  // Production Login Form (empty credentials by default)
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Production Student Registration Form
  const [regName, setRegName] = useState("");
  const [regHandle, setRegHandle] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regDepartment, setRegDepartment] = useState("Computer Science & Engineering");
  const [regSemester, setRegSemester] = useState(1);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!loginIdentifier.trim() || !loginPassword) {
      setErrorMessage("Please enter both your email/handle and password.");
      return;
    }

    setIsLoading(true);
    const res = await login(loginIdentifier.trim(), loginPassword);
    setIsLoading(false);

    if (res.success && res.user) {
      setSuccessMessage("Authentication successful. Redirecting to your portal...");
      setTimeout(() => {
        if (res.user?.role === "admin") {
          router.push("/admin");
        } else if (res.user?.role === "teacher") {
          router.push("/courses");
        } else {
          router.push("/dashboard");
        }
      }, 500);
    } else {
      setErrorMessage(res.error || "Invalid email, handle, or password.");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (regPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters in length.");
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter.");
      return;
    }

    const cleanHandle = regHandle.trim().toLowerCase().replace(/[^a-z0-9_]/g, "");
    if (cleanHandle.length < 3) {
      setErrorMessage("Handle must be at least 3 characters and contain only letters, numbers, and underscores.");
      return;
    }

    setIsLoading(true);
    const res = await register({
      name: regName.trim(),
      handle: cleanHandle,
      email: regEmail.trim(),
      password: regPassword,
      department: regDepartment,
      semester: regSemester,
    });
    setIsLoading(false);

    if (res.success) {
      setSuccessMessage("Student account registered successfully! Redirecting to dashboard...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 700);
    } else {
      setErrorMessage(res.error || "Registration failed. Please review your details.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#EDEDED] flex flex-col justify-between p-4 sm:p-8 brutal-grid-bg">
      {/* Top Chrome Bar */}
      <div className="flex items-center justify-between max-w-6xl mx-auto w-full pb-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-[#FF5C58] text-black flex items-center justify-center font-display font-black text-xl border-2 border-black brutal-shadow-sm group-hover:bg-[#FFE600] transition-colors">
            R
          </div>
          <span className="font-display font-black text-lg tracking-tight uppercase text-white group-hover:text-[#FF5C58] transition-colors">
            RECON <span className="text-[#FFE600]">{"//"} LMS</span>
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8E95A5] hover:text-white uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Split Authentication Card */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-0 border-2 border-white brutal-shadow-white bg-[#12151D] my-auto">
        {/* Left Column: Academic Institutional Architecture (5 cols) */}
        <div className="lg:col-span-5 p-8 bg-[#0D1017] border-b-2 lg:border-b-0 lg:border-r-2 border-[#282F40] flex flex-col justify-center space-y-8">
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
          </div>
        </div>

        {/* Right Column: Authentication Form (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          {/* Mode Switch Tabs (Log In vs Student Register) */}
          <div className="flex border-2 border-[#282F40] bg-[#0B0D10] p-1 font-mono text-xs">
            <button
              onClick={() => {
                setAuthMode("login");
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={cn(
                "flex-1 py-2.5 font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 brutal-btn",
                authMode === "login"
                  ? "bg-[#FFE600] text-black border border-black shadow-[2px_2px_0px_#000]"
                  : "text-[#8E95A5] hover:text-white"
              )}
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>

            <button
              onClick={() => {
                setAuthMode("register");
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={cn(
                "flex-1 py-2.5 font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 brutal-btn",
                authMode === "register"
                  ? "bg-[#FF5C58] text-white border border-black shadow-[2px_2px_0px_#000]"
                  : "text-[#8E95A5] hover:text-white"
              )}
            >
              <UserPlus className="w-4 h-4" />
              <span>Student Registration</span>
            </button>
          </div>

          {/* Feedback Banners */}
          {errorMessage && (
            <div className="p-3.5 bg-[#FF5C58]/15 border-2 border-[#FF5C58] text-[#FF5C58] font-mono text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 bg-[#00E599]/15 border-2 border-[#00E599] text-[#00E599] font-mono text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* TAB 1: PRODUCTION LOGIN FORM */}
          {authMode === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <div>
                  <h2 className="font-display font-black text-xl uppercase tracking-tight text-white">
                    Sign In to Portal
                  </h2>
                </div>
                <p className="font-mono text-xs text-[#8E95A5]">
                  Enter your registered institutional email or unique handle.
                </p>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-xs uppercase text-[#8E95A5] font-bold flex items-center justify-between">
                  <span>Email or Handle</span>
                </label>
                <Input
                  type="text"
                  placeholder="e.g. username or user@institution.edu"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-xs uppercase text-[#8E95A5] font-bold">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Input
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="Enter your account password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E95A5] hover:text-white"
                    aria-label={showLoginPassword ? "Hide password" : "Show password"}
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="secondary"
                size="lg"
                className="w-full text-black font-black mt-2"
                disabled={isLoading}
              >
                <span>{isLoading ? "Verifying Credentials..." : "Sign In to Platform →"}</span>
              </Button>
            </form>
          )}

          {/* TAB 2: CLEAN STUDENT REGISTRATION FORM */}
          {authMode === "register" && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <h2 className="font-display font-black text-xl uppercase tracking-tight text-white">
                  Student Registration
                </h2>
                <p className="font-mono text-xs text-[#8E95A5]">
                  Open self-service enrollment for students. Create your scholar profile to start coursework.
                </p>
              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono text-xs uppercase text-[#8E95A5] font-bold">
                    Full Legal Name
                  </label>
                  <Input
                    required
                    placeholder="e.g. Alexander Vance"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs uppercase text-[#8E95A5] font-bold">
                    Unique Username / Handle
                  </label>
                  <Input
                    required
                    placeholder="e.g. alex_coder"
                    value={regHandle}
                    onChange={(e) => setRegHandle(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-xs uppercase text-[#8E95A5] font-bold">
                  Student Email Address
                </label>
                <Input
                  required
                  type="email"
                  placeholder="e.g. alex@student.recon.edu or personal@email.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono text-xs uppercase text-[#8E95A5] font-bold">
                    Academic Department
                  </label>
                  <select
                    value={regDepartment}
                    onChange={(e) => setRegDepartment(e.target.value)}
                    className="w-full h-10 px-3 bg-[#0B0D10] border-2 border-[#282F40] text-white font-mono text-xs focus:border-[#FFE600] outline-none"
                  >
                    {ACADEMIC_DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs uppercase text-[#8E95A5] font-bold">
                    Enrolled Semester
                  </label>
                  <select
                    value={regSemester}
                    onChange={(e) => setRegSemester(Number(e.target.value))}
                    className="w-full h-10 px-3 bg-[#0B0D10] border-2 border-[#282F40] text-white font-mono text-xs focus:border-[#FFE600] outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <option key={sem} value={sem}>
                        Term {sem} (Semester {sem})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono text-xs uppercase text-[#8E95A5] font-bold">
                    Password (Min 6 chars)
                  </label>
                  <div className="relative">
                    <Input
                      required
                      type={showRegPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E95A5] hover:text-white"
                    >
                      {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs uppercase text-[#8E95A5] font-bold">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Input
                      required
                      type={showRegConfirmPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E95A5] hover:text-white"
                    >
                      {showRegConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full text-white font-black mt-2"
                disabled={isLoading}
              >
                <span>{isLoading ? "Creating Student Account..." : "Create Student Account & Enter →"}</span>
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
