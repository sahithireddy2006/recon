"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  Lock,
  Unlock,
  Clock,
  FileText,
  HelpCircle,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { useLMSStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function CoursesPage() {
  const {
    subjects,
    selectedSemester,
    setSelectedSemester,
    currentRole,
  } = useLMSStore();

  const [filter, setFilter] = useState<"all" | "in-progress" | "completed">("all");

  const isTeacherOrAdmin = currentRole === "teacher" || currentRole === "admin";

  const filteredSubjects = subjects.filter((s) => {
    if (filter === "in-progress") return s.progressPercent > 0 && s.progressPercent < 100;
    if (filter === "completed") return s.progressPercent === 100;
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-[#282F40]">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="coral" size="sm">ACADEMIC CURRICULUM</Badge>
            <span className="font-mono text-xs text-[#8E95A5]">
              {isTeacherOrAdmin ? "All Semesters Unlocked (Faculty Mode)" : "Semester 4 Enrolled Courses"}
            </span>
          </div>
          <h1 className="font-display font-black text-2xl lg:text-3xl uppercase tracking-tight text-white mt-1">
            Courses & Syllabus
          </h1>
          <p className="font-mono text-xs text-[#9DA7BC] mt-0.5">
            Strict academic progression: Semester → Subject → Modules → Study Materials → Assessments
          </p>
        </div>

        {/* Role Banner Alert */}
        <div
          className={cn(
            "p-3 border-2 font-mono text-xs max-w-md",
            isTeacherOrAdmin
              ? "bg-[#2D7FF9]/10 border-[#2D7FF9] text-[#2D7FF9]"
              : "bg-[#FFE600]/10 border-[#FFE600] text-[#FFE600]"
          )}
        >
          <div className="flex items-center gap-2 font-bold uppercase">
            {isTeacherOrAdmin ? <Unlock className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
            <span>
              {isTeacherOrAdmin ? "Faculty Access Active" : "Student Progression Mode"}
            </span>
          </div>
          <p className="text-[11px] text-white/80 mt-1">
            {isTeacherOrAdmin
              ? "All 8 semesters unlocked, unlimited test attempts, and instructor review tools enabled."
              : "Completed lessons update progress immediately. Prerequisites must be met."}
          </p>
        </div>
      </div>

      {/* Semester Navigation Bar (Sem 1 to 8) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-[#8E95A5] font-bold">
            Select Academic Semester:
          </span>
          <span className="font-mono text-xs text-[#FFE600] font-bold">
            Active: Term {selectedSemester}
          </span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => {
            const isCurrent = selectedSemester === sem;
            const isUnlocked = isTeacherOrAdmin || sem <= 4;

            return (
              <button
                key={sem}
                onClick={() => setSelectedSemester(sem)}
                className={cn(
                  "p-3 text-center border-2 transition-all flex flex-col items-center justify-center brutal-btn",
                  isCurrent
                    ? "bg-[#FFE600] text-black border-black brutal-shadow font-black"
                    : isUnlocked
                    ? "bg-[#12151D] text-white border-[#282F40] hover:border-white"
                    : "bg-[#0B0D10] text-[#606775] border-[#1C202B] opacity-60"
                )}
              >
                <span className="font-mono text-[9px] uppercase tracking-wider">
                  TERM
                </span>
                <span className="font-display font-black text-xl leading-tight">
                  {sem}
                </span>
                <span className="font-mono text-[9px] mt-0.5">
                  {isUnlocked ? "Available" : "Locked"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-[#12151D] border-2 border-[#282F40]">
        <div className="flex items-center gap-1">
          <span className="font-mono text-xs text-[#8E95A5] uppercase mr-2">Filter:</span>
          {(["all", "in-progress", "completed"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={cn(
                "px-3 py-1 text-xs font-mono uppercase tracking-wider font-bold transition-all",
                filter === mode
                  ? "bg-[#FF5C58] text-white border border-black shadow-[2px_2px_0px_#000]"
                  : "text-[#8E95A5] hover:text-white bg-[#1A1F2B]"
              )}
            >
              {mode}
            </button>
          ))}
        </div>

        <div className="font-mono text-xs text-[#8E95A5]">
          Showing {filteredSubjects.length} of {subjects.length} subjects in Term {selectedSemester}
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSubjects.map((sub) => {
          const completedCount = sub.lessons.filter((l) => l.completed).length;

          return (
            <Card
              key={sub.id}
              variant="dark"
              hasShadow
              className="border-2 border-[#282F40] hover:border-white transition-all flex flex-col justify-between"
            >
              {/* Card Header Strip */}
              <div>
                <div className="p-4 bg-[#1A1F2B] border-b-2 border-[#282F40] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#FF5C58] text-white font-mono font-bold text-xs uppercase">
                      {sub.code}
                    </span>
                    <span className="font-mono text-xs text-[#8E95A5]">
                      {sub.credits} CREDITS
                    </span>
                  </div>
                  <Badge variant={sub.progressPercent === 100 ? "green" : "yellow"} size="sm">
                    {sub.progressPercent === 100 ? "COMPLETED" : "IN PROGRESS"}
                  </Badge>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-display font-black text-xl uppercase tracking-tight text-white hover:text-[#FFE600] transition-colors">
                    <Link href={`/courses/${sub.id}`}>{sub.name}</Link>
                  </h3>
                  <p className="font-mono text-xs text-[#9DA7BC] leading-relaxed line-clamp-2">
                    {sub.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#8E95A5]">
                    <span>Instructor: <span className="text-white font-bold">{sub.instructorName}</span></span>
                    <span>Term {sub.semester}</span>
                  </div>

                  {/* Quantitative Metrics Bar */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#282F40] text-center font-mono">
                    <div className="p-2 bg-[#0B0D10] border border-[#282F40]">
                      <div className="text-[10px] text-[#8E95A5] flex items-center justify-center gap-1">
                        <BookOpen className="w-3 h-3 text-[#2D7FF9]" />
                        <span>Lessons</span>
                      </div>
                      <div className="font-bold text-sm text-white mt-0.5">
                        {completedCount}/{sub.lessons.length}
                      </div>
                    </div>
                    <div className="p-2 bg-[#0B0D10] border border-[#282F40]">
                      <div className="text-[10px] text-[#8E95A5] flex items-center justify-center gap-1">
                        <FileText className="w-3 h-3 text-[#FFE600]" />
                        <span>Materials</span>
                      </div>
                      <div className="font-bold text-sm text-white mt-0.5">
                        {sub.materials.length} Files
                      </div>
                    </div>
                    <div className="p-2 bg-[#0B0D10] border border-[#282F40]">
                      <div className="text-[10px] text-[#8E95A5] flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-[#00E599]" />
                        <span>Tests</span>
                      </div>
                      <div className="font-bold text-sm text-white mt-0.5">
                        {sub.tests.length} Quizzes
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer with Progress & Button */}
              <div className="p-5 pt-0 space-y-3">
                <div className="space-y-1 font-mono">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8E95A5]">Curriculum Mastery</span>
                    <span className="font-bold text-white">{sub.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-[#0B0D10] h-3 border border-[#282F40]">
                    <div
                      className="bg-[#FFE600] h-full transition-all"
                      style={{ width: `${sub.progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <Link href={`/courses/${sub.id}`} className="flex-1">
                    <Button variant="primary" size="md" className="w-full">
                      Open Subject Workspace →
                    </Button>
                  </Link>
                  <Link href={`/courses/${sub.id}?tab=tests`}>
                    <Button variant="outline" size="md">
                      Tests
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
