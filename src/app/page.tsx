"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Flame,
  Trophy,
  BookOpen,
  BarChart3,
  CheckCircle2,
  Users,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Clock,
  Code2,
  FileText,
  ChevronRight,
  Terminal,
  Activity,
} from "lucide-react";
import { useLMSStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const { isAuthenticated, currentUser } = useLMSStore();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [heroTestStatus, setHeroTestStatus] = useState<string>("Ready to test");

  const academicSteps = [
    {
      step: 1,
      name: "Semester",
      detail: "Term 1 through 8 structured academic sequence",
      code: "SEM 04",
      highlight: "Enrolled in 4 Core Modules",
    },
    {
      step: 2,
      name: "Subject",
      detail: "Department-governed course curriculum",
      code: "CS201",
      highlight: "Data Structures & Algorithms",
    },
    {
      step: 3,
      name: "Modules & Lessons",
      detail: "Theory, proofs, asymptotic complexity & code",
      code: "MOD 04",
      highlight: "Self-Balancing Trees & Dynamic Programming",
    },
    {
      step: 4,
      name: "Study Materials",
      detail: "Instructor notes, formula guides, cheat sheets",
      code: "DOCS",
      highlight: "Graph Flow Spec & Complexity Green Sheets",
    },
    {
      step: 5,
      name: "Assessments",
      detail: "Timed quizzes, MCQs, and instant scorecards",
      code: "TESTS",
      highlight: "88% Avg Pass Rate · Threshold 70%",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#EDEDED] flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      {/* 1. TOP EDITORIAL CHROME BAR */}
      <header className="sticky top-0 z-40 w-full h-18 bg-[#12151D] border-b-2 border-white px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#FF5C58] text-black flex items-center justify-center font-display font-black text-xl border-2 border-black brutal-shadow-sm">
            R
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-lg tracking-tight uppercase text-white leading-none">
              RECON <span className="text-[#FFE600]">// LMS</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#8E95A5]">
              Academic & Competitive Platform
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <div className="hidden sm:flex items-center border-2 border-[#282F40] bg-[#0D1017] px-2.5 py-1 font-mono text-xs">
                <span className="text-[#8E95A5] text-[10px] uppercase mr-1.5">USER:</span>
                <span className="text-[#FFE600] font-bold">@{currentUser.handle}</span>
              </div>
              <Link href="/dashboard">
                <Button variant="secondary" size="sm" className="font-black text-black">
                  <span>Enter LMS</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Log In
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="secondary" size="sm" className="font-black text-black">
                  <span>Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative px-4 sm:px-8 py-16 lg:py-24 border-b-2 border-white brutal-grid-bg overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Top Ticker Pills */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="px-3 py-1 bg-[#FF5C58] text-white font-bold uppercase border-2 border-black brutal-shadow-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-none bg-white animate-ping" />
              WEEKLY CONTEST #48 LIVE NOW
            </span>
            <span className="px-3 py-1 bg-[#0B0D10] text-[#FFE600] border-2 border-[#282F40] font-bold uppercase">
              1,284 PARTICIPATING CODERS
            </span>
            <span className="px-3 py-1 bg-[#0B0D10] text-[#00E599] border-2 border-[#282F40] font-bold uppercase hidden sm:inline-block">
              TERM 4 ENROLLMENTS ACTIVE
            </span>
          </div>

          {/* Oversized Dominant Headline */}
          <div className="space-y-4 max-w-5xl">
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter text-white leading-[0.95]">
              ONE PLACE TO LEARN.
              <br />
              <span className="text-[#FFE600] inline-block">ONE PLACE TO COMPETE.</span>
              <br />
              <span className="text-[#FF5C58] inline-block">ONE PLACE TO IMPROVE.</span>
            </h1>

            <p className="font-mono text-sm sm:text-base text-[#DCE2EE] max-w-2xl leading-relaxed pt-2">
              A serious university-grade Learning Management System engineered with strict Neo-Brutalist discipline. Zero generic templates. Built for structured computer science curricula, real-time code assessments, and high-frequency rating rounds.
            </p>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Link href={isAuthenticated ? "/dashboard" : "/login"}>
              <Button variant="primary" size="lg" className="w-full sm:w-auto text-white">
                <span>{isAuthenticated ? "Go to Your Dashboard" : "Access Student & Instructor Portal"}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <Link href="/contests">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto text-black">
                <Trophy className="w-4 h-4 mr-2" />
                <span>Explore Live Contest Round</span>
              </Button>
            </Link>

            {!isAuthenticated && (
              <Link href="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <span>Sign In / Register</span>
                </Button>
              </Link>
            )}
          </div>

          {/* Interactive Hero Widget: Live LMS Experience Showcase */}
          <div className="pt-8">
            <div className="bg-[#12151D] border-2 border-white brutal-shadow-white p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Live Problem Solver Preview */}
              <div className="lg:col-span-7 bg-[#090B0F] border-2 border-[#282F40] p-4 font-mono text-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#282F40]">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#FFE600]" />
                    <span className="font-bold text-white uppercase">
                      CS201 · Live Submission Engine
                    </span>
                  </div>
                  <span className="text-[#8E95A5]">GCC 13.2 · C++20</span>
                </div>

                <pre className="text-[#00E599] leading-relaxed overflow-x-auto">
                  <code>{`// Task: Balanced Subtree Partition (Div 1)
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> tree_sz(n + 1, 1);
    // Depth-first subtree calculation
    cout << "STATUS: VERIFYING TEST VECTORS..." << endl;
    return 0;
}`}</code>
                </pre>

                <div className="pt-2 flex items-center justify-between border-t border-[#282F40]">
                  <span className="text-[#8E95A5]">{heroTestStatus}</span>
                  <button
                    onClick={() => {
                      setHeroTestStatus("Executing 18 test cases...");
                      setTimeout(() => {
                        setHeroTestStatus("✓ ALL 18 TESTS PASSED (0.02s, 14MB) · ACCEPTED");
                      }, 700);
                    }}
                    className="px-3 py-1 bg-[#FFE600] text-black font-bold uppercase border border-black brutal-shadow-sm brutal-btn"
                  >
                    Simulate Execution ▶
                  </button>
                </div>
              </div>

              {/* Right Column: Live Telemetry Cards */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
                <div className="p-4 bg-[#FF5C58] text-white border-2 border-black brutal-shadow-sm space-y-1">
                  <div className="font-mono text-[10px] uppercase font-bold text-black">
                    Live Leaderboard Standing
                  </div>
                  <div className="font-display font-black text-2xl uppercase">
                    Alex Chen · Rank #14
                  </div>
                  <div className="font-mono text-xs text-black/80 font-bold">
                    Rating: 1742 (Expert) · 18-Day Streak 🔥
                  </div>
                </div>

                <div className="p-4 bg-[#FFE600] text-black border-2 border-black brutal-shadow-sm space-y-1">
                  <div className="font-mono text-[10px] uppercase font-bold">
                    Academic Progression
                  </div>
                  <div className="font-display font-black text-2xl uppercase">
                    Term 4: 68% Mastered
                  </div>
                  <div className="font-mono text-xs font-bold">
                    Next: Binary Search Trees — Lesson 4
                  </div>
                </div>

                <div className="p-3 bg-[#0B0D10] border-2 border-[#282F40] flex items-center justify-between font-mono text-xs">
                  <span className="text-[#8E95A5]">Passing Threshold:</span>
                  <span className="text-[#00E599] font-bold">75% On Tests</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT OVERVIEW: 4 NEO-BRUTALIST COLOR BLOCKS */}
      <section id="overview" className="px-4 sm:px-8 py-20 border-b-2 border-white bg-[#0E1118]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-2">
            <span className="px-2.5 py-0.5 bg-[#FFE600] text-black font-mono font-bold text-xs uppercase tracking-wider inline-block">
              PLATFORM PILLARS
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
              Core Architectural Capabilities
            </h2>
            <p className="font-mono text-xs text-[#8E95A5] max-w-xl">
              Engineered as four cohesive pillars that connect coursework directly to algorithmic competency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Block 1: LEARN (Coral) */}
            <div className="bg-[#FF5C58] text-white border-2 border-black brutal-shadow p-6 flex flex-col justify-between space-y-8">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-display font-black text-xl border border-black">
                  01
                </div>
                <h3 className="font-display font-black text-2xl uppercase tracking-tight leading-none text-white">
                  Academic Learning
                </h3>
                <p className="font-mono text-xs text-black/90 leading-relaxed font-medium">
                  Semester-based academic hierarchy from Semester 1 to 8. Complete with module breakdown, instructor notes, downloadable cheat sheets, and verified code implementations.
                </p>
              </div>
              <div className="font-mono text-xs text-black font-bold uppercase tracking-wider border-t border-black/30 pt-3 flex items-center justify-between">
                <span>CS Curricula</span>
                <span>→</span>
              </div>
            </div>

            {/* Block 2: PRACTICE (Yellow) */}
            <div className="bg-[#FFE600] text-black border-2 border-black brutal-shadow p-6 flex flex-col justify-between space-y-8">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-display font-black text-xl border border-black">
                  02
                </div>
                <h3 className="font-display font-black text-2xl uppercase tracking-tight leading-none">
                  Timed Assessments
                </h3>
                <p className="font-mono text-xs text-black/90 leading-relaxed font-medium">
                  Rigorous MCQ quizzes and algorithmic proofs with countdown clocks, pass/fail thresholds, and instant grading telemetry stored on permanent student transcripts.
                </p>
              </div>
              <div className="font-mono text-xs text-black font-bold uppercase tracking-wider border-t border-black/30 pt-3 flex items-center justify-between">
                <span>Quiz Engine</span>
                <span>→</span>
              </div>
            </div>

            {/* Block 3: COMPETE (Blue) */}
            <div className="bg-[#2D7FF9] text-white border-2 border-black brutal-shadow p-6 flex flex-col justify-between space-y-8">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-display font-black text-xl border border-black">
                  03
                </div>
                <h3 className="font-display font-black text-2xl uppercase tracking-tight leading-none text-white">
                  Contest Arena
                </h3>
                <p className="font-mono text-xs text-white/90 leading-relaxed font-medium">
                  Two weekly rated contests. Codeforces-style rating ladder from Newbie to Grandmaster. Problem solver with real-time testcase execution and penalty time scoring.
                </p>
              </div>
              <div className="font-mono text-xs text-white font-bold uppercase tracking-wider border-t border-white/30 pt-3 flex items-center justify-between">
                <span>Weekly Cadence</span>
                <span>→</span>
              </div>
            </div>

            {/* Block 4: TRACK (White) */}
            <div className="bg-[#FFFFFF] text-black border-2 border-black brutal-shadow p-6 flex flex-col justify-between space-y-8">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-display font-black text-xl border border-black">
                  04
                </div>
                <h3 className="font-display font-black text-2xl uppercase tracking-tight leading-none">
                  Telemetry & Reports
                </h3>
                <p className="font-mono text-xs text-black/80 leading-relaxed font-medium">
                  60-day interactive study activity heatmap, streak flame tracker, subject mastery analysis, accuracy trends, and public or private social profiles.
                </p>
              </div>
              <div className="font-mono text-xs text-black font-bold uppercase tracking-wider border-t border-black/30 pt-3 flex items-center justify-between">
                <span>Personal Data</span>
                <span>→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ACADEMIC STRUCTURE VISUALIZER */}
      <section id="curriculum" className="px-4 sm:px-8 py-20 border-b-2 border-white bg-[#0B0D10]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 bg-[#FF5C58] text-white font-mono font-bold text-xs uppercase tracking-wider inline-block">
                HIERARCHY VISUALIZER
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
                Academic Progression Model
              </h2>
              <p className="font-mono text-xs text-[#8E95A5]">
                How learning flows from institutional degree structure down to individual assessment questions.
              </p>
            </div>
            <Link href="/courses">
              <Button variant="outline" size="sm">
                Explore Full Course Catalog →
              </Button>
            </Link>
          </div>

          {/* Interactive 5-Step Pipeline */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {academicSteps.map((item) => (
              <button
                key={item.step}
                onClick={() => setActiveStep(item.step)}
                className={cn(
                  "p-5 text-left border-2 transition-all flex flex-col justify-between h-48 brutal-btn",
                  activeStep === item.step
                    ? "bg-[#FFE600] text-black border-black brutal-shadow font-black"
                    : "bg-[#12151D] text-white border-[#282F40] hover:border-white"
                )}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase">
                      Step 0{item.step}
                    </span>
                    <span className="font-mono text-[10px] px-1.5 py-0.2 bg-black text-white font-bold">
                      {item.code}
                    </span>
                  </div>
                  <div className="font-display font-black text-lg uppercase mt-3">
                    {item.name}
                  </div>
                </div>

                <div className="font-mono text-xs mt-2 pt-2 border-t border-current/20">
                  {item.highlight}
                </div>
              </button>
            ))}
          </div>

          {/* Step Detail Box */}
          <div className="p-6 bg-[#12151D] border-2 border-white brutal-shadow space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 bg-[#FF5C58] text-white font-mono text-xs font-bold uppercase">
                  ACTIVE PREVIEW
                </span>
                <span className="font-display font-bold text-lg text-white uppercase">
                  {academicSteps[activeStep - 1].name} Dimension
                </span>
              </div>
              <span className="font-mono text-xs text-[#FFE600]">
                {academicSteps[activeStep - 1].code}
              </span>
            </div>

            <p className="font-mono text-xs text-[#DCE2EE] leading-relaxed">
              {academicSteps[activeStep - 1].detail}. Students unlock curriculum modules progressively by passing previous quizzes, while instructors have instantaneous review access across all 8 terms.
            </p>
          </div>
        </div>
      </section>

      {/* 5. COMPETITIVE CONTESTS & ARENA SECTION */}
      <section id="contests" className="px-4 sm:px-8 py-20 border-b-2 border-white bg-[#0E1118]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 bg-[#FFE600] text-black font-mono font-bold text-xs uppercase tracking-wider inline-block">
                WEEKLY CONTESTS
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
                Bi-Weekly Algorithmic Arena
              </h2>
              <p className="font-mono text-xs text-[#8E95A5]">
                Two live rounds every week. International Codeforces rating standards and live penalty leaderboards.
              </p>
            </div>
            <Link href="/contests">
              <Button variant="primary" size="md">
                <span>View Live Scoreboard</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>

          {/* Leaderboard Table Mockup */}
          <div className="bg-[#12151D] border-2 border-white brutal-shadow p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#282F40]">
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-[#FFE600]" />
                <span className="font-display font-bold text-sm uppercase text-white">
                  Round #48 Standings Snippet
                </span>
              </div>
              <span className="font-mono text-xs text-[#00E599] font-bold">
                1,284 Active Contestants
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-[#282F40] text-[#8E95A5] uppercase text-[10px]">
                    <th className="py-2.5 px-3">Rank</th>
                    <th className="py-2.5 px-3">Coder Handle</th>
                    <th className="py-2.5 px-3">Rating Tier</th>
                    <th className="py-2.5 px-3 text-center">Solved</th>
                    <th className="py-2.5 px-3 text-right">Penalty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#282F40]">
                  <tr className="bg-[#0B0D10]">
                    <td className="py-2.5 px-3 font-bold text-[#FFE600]">#1</td>
                    <td className="py-2.5 px-3 font-bold text-[#FF0000]">tourist_fan</td>
                    <td className="py-2.5 px-3 text-[#FF0000] font-bold">2840 Grandmaster</td>
                    <td className="py-2.5 px-3 text-center text-[#00E599] font-bold">4 / 4</td>
                    <td className="py-2.5 px-3 text-right text-[#8E95A5]">98 min</td>
                  </tr>
                  <tr className="bg-[#0B0D10]">
                    <td className="py-2.5 px-3 font-bold text-[#FFE600]">#2</td>
                    <td className="py-2.5 px-3 font-bold text-[#FF8C00]">algo_slayer</td>
                    <td className="py-2.5 px-3 text-[#FF8C00] font-bold">2490 Master</td>
                    <td className="py-2.5 px-3 text-center text-[#00E599] font-bold">4 / 4</td>
                    <td className="py-2.5 px-3 text-right text-[#8E95A5]">114 min</td>
                  </tr>
                  <tr className="bg-[#FFE600]/10 border-l-4 border-l-[#FFE600]">
                    <td className="py-2.5 px-3 font-bold text-white">#14</td>
                    <td className="py-2.5 px-3 font-bold text-[#2D7FF9]">alex_chen (You)</td>
                    <td className="py-2.5 px-3 text-[#2D7FF9] font-bold">1742 Expert</td>
                    <td className="py-2.5 px-3 text-center text-[#00E599] font-bold">1 / 4</td>
                    <td className="py-2.5 px-3 text-right text-[#8E95A5]">16 min</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ROLE & PLATFORM SECTION */}
      <section id="roles" className="px-4 sm:px-8 py-20 border-b-2 border-white bg-[#0B0D10]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-2">
            <span className="px-2.5 py-0.5 bg-[#2D7FF9] text-white font-mono font-bold text-xs uppercase tracking-wider inline-block">
              ROLE ARCHITECTURE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
              Tailored for Students, Instructors & Administrators
            </h2>
            <p className="font-mono text-xs text-[#8E95A5]">
              Shared visual DNA with strictly separated permission tiers and purpose-built toolsets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Student Role */}
            <div className="p-6 bg-[#12151D] border-2 border-[#282F40] space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="yellow" size="sm">STUDENT EXPERIENCE</Badge>
                <GraduationCap className="w-5 h-5 text-[#FFE600]" />
              </div>
              <h3 className="font-display font-black text-xl uppercase text-white">
                Structured Mastery
              </h3>
              <ul className="space-y-2 font-mono text-xs text-[#9DA7BC]">
                <li className="flex items-center gap-2">✓ 1-Click Institutional Google OAuth login</li>
                <li className="flex items-center gap-2">✓ Dynamic learning continuation cards</li>
                <li className="flex items-center gap-2">✓ Timed assessment engine with retakes</li>
                <li className="flex items-center gap-2">✓ Competitive rating ladder & public profile</li>
              </ul>
              <Link href="/dashboard" className="block pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  Explore Student View
                </Button>
              </Link>
            </div>

            {/* Instructor Role */}
            <div className="p-6 bg-[#12151D] border-2 border-[#282F40] space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="blue" size="sm">INSTRUCTOR EXPERIENCE</Badge>
                <BookOpen className="w-5 h-5 text-[#2D7FF9]" />
              </div>
              <h3 className="font-display font-black text-xl uppercase text-white">
                Curriculum Governance
              </h3>
              <ul className="space-y-2 font-mono text-xs text-[#9DA7BC]">
                <li className="flex items-center gap-2">✓ All 8 academic semesters unlocked</li>
                <li className="flex items-center gap-2">✓ Unlimited test attempts for question testing</li>
                <li className="flex items-center gap-2">✓ Study materials & PDF lecture upload</li>
                <li className="flex items-center gap-2">✓ Cohort grade distributions & pass rates</li>
              </ul>
              <Link href="/dashboard" className="block pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  Explore Instructor View
                </Button>
              </Link>
            </div>

            {/* Admin Role */}
            <div className="p-6 bg-[#12151D] border-2 border-[#282F40] space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="coral" size="sm">ADMIN CONSOLE</Badge>
                <ShieldCheck className="w-5 h-5 text-[#FF5C58]" />
              </div>
              <h3 className="font-display font-black text-xl uppercase text-white">
                Operations Console
              </h3>
              <ul className="space-y-2 font-mono text-xs text-[#9DA7BC]">
                <li className="flex items-center gap-2">✓ User directory provisioning & suspension</li>
                <li className="flex items-center gap-2">✓ Course code & credit weighting CRUD</li>
                <li className="flex items-center gap-2">✓ Contest problem scheduling & judge nodes</li>
                <li className="flex items-center gap-2">✓ Real-time audit logs & telemetry stream</li>
              </ul>
              <Link href="/admin" className="block pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  Explore Admin Panel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL HIGH IMPACT CTA */}
      <section className="px-4 sm:px-8 py-20 border-b-2 border-white bg-[#FF5C58] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="px-3 py-1 bg-black text-white font-mono text-xs font-bold uppercase tracking-wider inline-block">
            ACADEMIC EXCELLENCE MEETS CODEFORCES SPEED
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tighter text-white leading-tight">
            Ready to elevate your academic and competitive velocity?
          </h2>
          <p className="font-mono text-xs sm:text-sm text-black/90 max-w-2xl mx-auto font-medium">
            Jump directly into your enrolled semester courses or enter the live algorithmic contest arena right now.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={isAuthenticated ? "/dashboard" : "/login"}>
              <Button variant="secondary" size="lg" className="text-black font-black">
                <span>{isAuthenticated ? "Enter LMS Dashboard" : "Sign In via Institutional Portal"}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href={isAuthenticated ? "/contests" : "/login"}>
              <Button variant="white" size="lg" className="text-black font-bold">
                {isAuthenticated ? "Go to Live Contest Arena" : "1-Click Demo Profiles"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. STRUCTURED NEO-BRUTALIST FOOTER */}
      <footer className="p-8 sm:p-12 bg-[#0B0D10] text-[#8E95A5] font-mono text-xs border-t-2 border-white">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
            <div className="space-y-3 sm:col-span-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#FF5C58] text-black flex items-center justify-center font-display font-black text-xs border border-black">
                  R
                </div>
                <span className="font-display font-black text-sm uppercase text-white tracking-wider">
                  RECON LMS // SYSTEM SPECIFICATION
                </span>
              </div>
              <p className="text-[#8E95A5] max-w-md leading-relaxed">
                Neo-Brutalist Academic Learning Management System & Algorithmic Competition Arena. High-contrast typography, strict 0px geometry, zero decorative SaaS fluff.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-white uppercase tracking-wider">
                Platform Direct Links
              </div>
              <div className="space-y-1 flex flex-col">
                <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
                <Link href="/courses" className="hover:text-white">Courses & Syllabi</Link>
                <Link href="/contests" className="hover:text-white">Contests & Ratings</Link>
                <Link href="/reports" className="hover:text-white">Reports & Telemetry</Link>
                <Link href="/admin" className="hover:text-white">Admin Operations</Link>
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-white uppercase tracking-wider">
                System Status
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span>Judge Clusters:</span>
                  <span className="text-[#00E599] font-bold">ONLINE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Assessment Engine:</span>
                  <span className="text-[#00E599] font-bold">NOMINAL</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Current Version:</span>
                  <span className="text-white font-bold">v2.4.0 (PROD)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#282F40] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <div>
              © 2026 RECON ACADEMIC FOUNDATION. ALL RIGHTS RESERVED.
            </div>
            <div className="flex gap-4">
              <span className="text-[#FFE600]">NEO-BRUTALIST DESIGN SYSTEM</span>
              <span>·</span>
              <span>STRICT 0PX GEOMETRY</span>
              <span>·</span>
              <span>HIGH CONTRAST</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
