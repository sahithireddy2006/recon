"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Flame,
  Trophy,
  CheckCircle2,
  Clock,
  BookOpen,
  Calendar,
  AlertCircle,
  FileCheck,
} from "lucide-react";
import { useLMSStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatRating } from "@/lib/utils";

export default function DashboardPage() {
  const {
    currentUser,
    currentRole,
    selectedSemester,
    setSelectedSemester,
    subjects,
    contests,
  } = useLMSStore();

  const ratingInfo = formatRating(currentUser.rating);
  const activeContest = contests.find((c) => c.status === "active") || contests[0];

  // Primary subject to continue
  const primarySubject = subjects[0];
  const nextIncompleteLesson =
    primarySubject?.lessons.find((l) => !l.completed) ||
    primarySubject?.lessons[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome & Role Status Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-[#282F40]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#FFE600] text-black font-mono font-bold text-xs uppercase tracking-wider">
              {currentRole.toUpperCase()} PORTAL
            </span>
            <span className="font-mono text-xs text-[#8E95A5]">
              Semester {selectedSemester} · Fall 2026
            </span>
          </div>
          <h1 className="font-display font-black text-2xl lg:text-3xl uppercase tracking-tight text-white mt-1">
            Welcome back, {currentUser.name}
          </h1>
          <p className="font-mono text-xs text-[#9DA7BC] mt-0.5">
            {currentRole === "teacher"
              ? "All academic modules and grading telemetry unlocked."
              : currentRole === "admin"
              ? "Platform operations, audit logs, and curriculum management enabled."
              : "Here is your immediate academic roadmap and competitive standing."}
          </p>
        </div>

        {/* Semester Quick Filter */}
        <div className="flex items-center gap-1 border-2 border-[#282F40] bg-[#12151D] p-1 self-start md:self-auto">
          <span className="font-mono text-[10px] uppercase text-[#8E95A5] px-2">
            Term:
          </span>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <button
              key={sem}
              onClick={() => setSelectedSemester(sem)}
              className={`w-7 h-7 text-xs font-mono font-bold transition-all brutal-btn ${
                selectedSemester === sem
                  ? "bg-[#FF5C58] text-white border border-black shadow-[2px_2px_0px_#000]"
                  : "text-[#8E95A5] hover:text-white hover:bg-[#1A1F2B]"
              }`}
            >
              {sem}
            </button>
          ))}
        </div>
      </div>

      {/* 1. HERO: "WHAT DO I NEED TO DO NEXT?" */}
      <div className="relative bg-[#FF5C58] text-white border-2 border-black brutal-shadow p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-black text-white font-mono text-[11px] font-bold uppercase tracking-wider">
                Priority Action
              </span>
              <span className="font-mono text-xs text-black/80 font-bold uppercase">
                {primarySubject.code} · {primarySubject.name}
              </span>
            </div>

            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white leading-none">
                Continue Learning: {nextIncompleteLesson?.title}
              </h2>
              <p className="text-xs text-black/90 font-mono mt-2 font-medium">
                {nextIncompleteLesson?.module} · {nextIncompleteLesson?.durationMinutes} mins remaining · {primarySubject.progressPercent}% course completion
              </p>
            </div>

            {/* Course Progress bar */}
            <div className="w-full bg-black/30 h-3 border border-black/40 overflow-hidden">
              <div
                className="bg-[#FFE600] h-full border-r border-black transition-all duration-300"
                style={{ width: `${primarySubject.progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <Link
              href={`/courses/${primarySubject.id}?lesson=${nextIncompleteLesson?.id}`}
            >
              <Button
                variant="secondary"
                size="lg"
                className="w-full text-black font-black"
              >
                <span>Resume Lesson Now</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link href={`/courses/${primarySubject.id}`}>
              <Button
                variant="white"
                size="md"
                className="w-full text-black font-bold"
              >
                View Full Syllabus
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. STATS QUAD BAR */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Streak */}
        <Card variant="dark" hasShadow className="p-4">
          <div className="flex items-center justify-between text-[#8E95A5] font-mono text-[10px] uppercase">
            <span>Daily Streak</span>
            <Flame className="w-4 h-4 text-[#FF5C58] fill-[#FF5C58]" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="font-display font-black text-2xl text-white">
              {currentUser.streak}
            </span>
            <span className="font-mono text-xs text-[#FFE600]">DAYS</span>
          </div>
          <div className="mt-1 font-mono text-[10px] text-[#00E599]">
            Active consistency: 94%
          </div>
        </Card>

        {/* Rating */}
        <Card variant="dark" hasShadow className="p-4">
          <div className="flex items-center justify-between text-[#8E95A5] font-mono text-[10px] uppercase">
            <span>Contest Rating</span>
            <Trophy className="w-4 h-4 text-[#FFE600]" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="font-display font-black text-2xl text-white">
              {currentUser.rating}
            </span>
            <span className={`font-mono text-xs font-bold ${ratingInfo.colorClass}`}>
              {ratingInfo.tier}
            </span>
          </div>
          <div className="mt-1 font-mono text-[10px] text-[#8E95A5]">
            Best Rank: #{currentUser.bestRank}
          </div>
        </Card>

        {/* Solved Problems */}
        <Card variant="dark" hasShadow className="p-4">
          <div className="flex items-center justify-between text-[#8E95A5] font-mono text-[10px] uppercase">
            <span>Solved Questions</span>
            <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="font-display font-black text-2xl text-white">
              {currentUser.solvedCount}
            </span>
            <span className="font-mono text-xs text-[#8E95A5]">SOLVED</span>
          </div>
          <div className="mt-1 font-mono text-[10px] text-[#2D7FF9]">
            Accuracy: {currentUser.accuracy}%
          </div>
        </Card>

        {/* Current Term Subjects */}
        <Card variant="dark" hasShadow className="p-4">
          <div className="flex items-center justify-between text-[#8E95A5] font-mono text-[10px] uppercase">
            <span>Active Subjects</span>
            <BookOpen className="w-4 h-4 text-[#2D7FF9]" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="font-display font-black text-2xl text-white">
              {subjects.length}
            </span>
            <span className="font-mono text-xs text-[#8E95A5]">COURSES</span>
          </div>
          <div className="mt-1 font-mono text-[10px] text-[#FFE600]">
            16 Total Academic Credits
          </div>
        </Card>
      </div>

      {/* 3. TWO-COLUMN: LIVE CONTEST ARENA & UPCOMING ASSESSMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Weekly Contest Banner */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#12151D] border-2 border-white brutal-shadow-white p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#282F40]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#00E599] text-black font-mono font-bold text-[10px] uppercase tracking-wider animate-pulse">
                    ● ROUND IN PROGRESS
                  </span>
                  <span className="font-mono text-xs text-[#FFE600] font-bold">
                    {activeContest.code}
                  </span>
                </div>
                <h3 className="font-display font-black text-xl uppercase tracking-tight text-white mt-1">
                  {activeContest.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 bg-[#0B0D10] border border-[#384156] px-3 py-1.5 font-mono text-xs">
                <Clock className="w-4 h-4 text-[#FF5C58]" />
                <span className="text-[#8E95A5]">Closes in:</span>
                <span className="font-bold text-white">01h 44m</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-4 border-b-2 border-[#282F40] text-center font-mono">
              <div className="p-3 bg-[#0B0D10] border border-[#282F40]">
                <div className="text-[10px] text-[#8E95A5] uppercase">Your Standing</div>
                <div className="font-display font-bold text-lg text-[#FFE600]">#14</div>
                <div className="text-[9px] text-[#8E95A5]">of 1,284 coders</div>
              </div>
              <div className="p-3 bg-[#0B0D10] border border-[#282F40]">
                <div className="text-[10px] text-[#8E95A5] uppercase">Solved</div>
                <div className="font-display font-bold text-lg text-[#00E599]">1 / 4</div>
                <div className="text-[9px] text-[#8E95A5]">Prob A Accepted</div>
              </div>
              <div className="p-3 bg-[#0B0D10] border border-[#282F40]">
                <div className="text-[10px] text-[#8E95A5] uppercase">Target Next</div>
                <div className="font-display font-bold text-lg text-[#2D7FF9]">Prob B</div>
                <div className="text-[9px] text-[#8E95A5]">1000 Points</div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="font-mono text-xs text-[#8E95A5]">
                Ranking criteria: Solved problems count + Codeforces penalty time.
              </div>
              <Link href={`/contests/${activeContest.id}`}>
                <Button variant="secondary" size="md">
                  <span>Enter Contest Arena</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Subjects Progress Matrix */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white">
                Enrolled Subjects (Semester {selectedSemester})
              </h3>
              <Link
                href="/courses"
                className="font-mono text-xs text-[#FFE600] hover:underline uppercase tracking-wider font-bold"
              >
                View All Courses →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {subjects.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/courses/${sub.id}`}
                  className="p-4 bg-[#12151D] hover:bg-[#1A1F2B] border-2 border-[#282F40] hover:border-white transition-all group brutal-shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#1A1F2B] border border-[#384156] text-[#FFE600] group-hover:border-[#FFE600]">
                        {sub.code}
                      </span>
                      <span className="font-mono text-xs text-[#8E95A5]">
                        {sub.credits} CREDITS
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-sm text-white group-hover:text-[#FFE600] mt-2 line-clamp-1">
                      {sub.name}
                    </h4>
                    <p className="font-mono text-[11px] text-[#8E95A5] mt-1 line-clamp-1">
                      Instructor: {sub.instructorName}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#282F40] space-y-1.5">
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="text-[#8E95A5]">Progress</span>
                      <span className="font-bold text-white">{sub.progressPercent}%</span>
                    </div>
                    <div className="w-full bg-[#0B0D10] h-2 border border-[#282F40]">
                      <div
                        className="bg-[#2D7FF9] h-full"
                        style={{ width: `${sub.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Upcoming Tests & Recent Results */}
        <div className="space-y-4">
          <div className="bg-[#12151D] border-2 border-[#282F40] p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#282F40]">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#FFE600]" />
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white">
                  Assessment Watch
                </h3>
              </div>
              <Badge variant="outline" size="sm">2 PENDING</Badge>
            </div>

            {/* Test items */}
            <div className="space-y-3">
              <div className="p-3 bg-[#0B0D10] border border-[#282F40] space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="coral" size="sm">SPEED QUIZ</Badge>
                  <span className="font-mono text-[10px] text-[#FF5C58] font-bold">
                    DUE TODAY 23:59
                  </span>
                </div>
                <div className="font-display font-bold text-xs text-white">
                  CS201: Amortized Analysis & Dynamic Programming
                </div>
                <div className="font-mono text-[10px] text-[#8E95A5]">
                  20 mins · 2 Attempts Allowed · Pass: 75%
                </div>
                <Link href="/courses/cs201?tab=tests">
                  <Button variant="primary" size="sm" className="w-full mt-2">
                    Take Assessment Now
                  </Button>
                </Link>
              </div>

              <div className="p-3 bg-[#0B0D10] border border-[#282F40] space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="yellow" size="sm">MID-TERM</Badge>
                  <span className="font-mono text-[10px] text-[#8E95A5]">
                    Sep 28 · 10:00 AM
                  </span>
                </div>
                <div className="font-display font-bold text-xs text-white">
                  CS202: Pipelining & Cache Organization Quiz
                </div>
                <div className="font-mono text-[10px] text-[#8E95A5]">
                  25 mins · 1 Attempt Only
                </div>
                <Link href="/courses/cs202?tab=tests">
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Review Syllabus Topics
                  </Button>
                </Link>
              </div>
            </div>

            {/* Recent Graded Scorecards */}
            <div className="pt-3 border-t-2 border-[#282F40]">
              <div className="font-display font-bold text-xs uppercase tracking-wider text-[#8E95A5] mb-2">
                Recent Graded Scorecards
              </div>
              <div className="space-y-2">
                <div className="p-2.5 bg-[#1A1F2B] border border-[#282F40] flex items-center justify-between">
                  <div>
                    <div className="font-display font-bold text-xs text-white">
                      CS203: ACID & 2PL Exam
                    </div>
                    <div className="font-mono text-[10px] text-[#00E599]">
                      PASSED · 94 / 100
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-[#00E599] text-black font-mono font-black text-xs">
                    GRADE A
                  </span>
                </div>

                <div className="p-2.5 bg-[#1A1F2B] border border-[#282F40] flex items-center justify-between">
                  <div>
                    <div className="font-display font-bold text-xs text-white">
                      CS201: Trees & Heaps Quiz
                    </div>
                    <div className="font-mono text-[10px] text-[#00E599]">
                      PASSED · 88 / 100
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-[#00E599] text-black font-mono font-black text-xs">
                    GRADE B+
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
