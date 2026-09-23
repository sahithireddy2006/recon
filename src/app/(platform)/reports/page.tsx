"use client";

import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Flame,
  Award,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Activity,
} from "lucide-react";
import { useLMSStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { formatRating, cn } from "@/lib/utils";
import { MOCK_HEATMAP_DATA, MOCK_RATING_HISTORY } from "@/lib/mock-data";

export default function ReportsPage() {
  const { currentUser, subjects } = useLMSStore();
  const ratingInfo = formatRating(currentUser.rating);

  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

  const totalLessons = subjects.reduce((acc, s) => acc + s.lessons.length, 0);
  const completedLessons = subjects.reduce(
    (acc, s) => acc + s.lessons.filter((l) => l.completed).length,
    0
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-[#282F40]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#FFE600] text-black font-mono font-bold text-xs uppercase tracking-wider">
              TELEMETRY & ANALYTICS
            </span>
            <span className="font-mono text-xs text-[#8E95A5]">
              Personal Learning Velocity & Performance Metrics
            </span>
          </div>
          <h1 className="font-display font-black text-2xl lg:text-3xl uppercase tracking-tight text-white mt-1">
            Personal Reports
          </h1>
          <p className="font-mono text-xs text-[#9DA7BC] mt-0.5">
            Holistic data tracking across curriculum mastery, assessment accuracy, study consistency, and contest ratings.
          </p>
        </div>

        <div className="p-3 bg-[#12151D] border-2 border-[#282F40] font-mono text-xs flex items-center gap-4">
          <div>
            <div className="text-[10px] text-[#8E95A5] uppercase">Overall Score</div>
            <div className="font-display font-black text-xl text-[#00E599]">91.4%</div>
          </div>
          <div className="pl-4 border-l border-[#282F40]">
            <div className="text-[10px] text-[#8E95A5] uppercase">Streak Consistency</div>
            <div className="font-display font-black text-xl text-[#FFE600] flex items-center gap-1">
              <Flame className="w-4 h-4 fill-[#FFE600]" />
              <span>{currentUser.streak}d</span>
            </div>
          </div>
        </div>
      </div>

      {/* TOP METRICS QUAD */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="dark" hasShadow className="p-4">
          <div className="flex items-center justify-between text-[#8E95A5] font-mono text-[10px] uppercase">
            <span>Lessons Mastered</span>
            <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5 font-display font-black text-2xl text-white">
            <span>{completedLessons}</span>
            <span className="font-mono text-xs text-[#8E95A5]">/ {totalLessons}</span>
          </div>
          <div className="mt-1 font-mono text-[10px] text-[#2D7FF9]">
            {Math.round((completedLessons / totalLessons) * 100)}% Syllabus Progress
          </div>
        </Card>

        <Card variant="dark" hasShadow className="p-4">
          <div className="flex items-center justify-between text-[#8E95A5] font-mono text-[10px] uppercase">
            <span>Assessment Avg</span>
            <Award className="w-4 h-4 text-[#FFE600]" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5 font-display font-black text-2xl text-white">
            <span>89.2%</span>
          </div>
          <div className="mt-1 font-mono text-[10px] text-[#00E599]">
            Grade Tier: Superior (A)
          </div>
        </Card>

        <Card variant="dark" hasShadow className="p-4">
          <div className="flex items-center justify-between text-[#8E95A5] font-mono text-[10px] uppercase">
            <span>Contest Standing</span>
            <TrendingUp className="w-4 h-4 text-[#2D7FF9]" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5 font-display font-black text-2xl text-white">
            <span>{currentUser.rating}</span>
            <span className={cn("font-mono text-xs font-bold", ratingInfo.colorClass)}>
              {ratingInfo.tier}
            </span>
          </div>
          <div className="mt-1 font-mono text-[10px] text-[#8E95A5]">
            Best Rank: #{currentUser.bestRank}
          </div>
        </Card>

        <Card variant="dark" hasShadow className="p-4">
          <div className="flex items-center justify-between text-[#8E95A5] font-mono text-[10px] uppercase">
            <span>Questions Solved</span>
            <Activity className="w-4 h-4 text-[#FF5C58]" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5 font-display font-black text-2xl text-white">
            <span>{currentUser.solvedCount}</span>
            <span className="font-mono text-xs text-[#8E95A5]">TASKS</span>
          </div>
          <div className="mt-1 font-mono text-[10px] text-[#FFE600]">
            Accuracy: 91.4%
          </div>
        </Card>
      </div>

      {/* 60-DAY STUDY HEATMAP */}
      <div className="p-6 bg-[#12151D] border-2 border-white brutal-shadow space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#FFE600]" />
            <h2 className="font-display font-bold text-base uppercase text-white tracking-wider">
              60-Day Study Activity Matrix
            </h2>
          </div>
          <div className="font-mono text-xs text-[#8E95A5]">
            {hoveredDay ? (
              <span className="text-white font-bold">
                {hoveredDay.date}: {hoveredDay.count} active study hours recorded
              </span>
            ) : (
              <span>Hover over any day to inspect study telemetry</span>
            )}
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="p-4 bg-[#0B0D10] border-2 border-[#282F40] overflow-x-auto">
          <div className="flex gap-1.5 min-w-[500px]">
            {MOCK_HEATMAP_DATA.map((day, dIdx) => {
              const bgColors = [
                "bg-[#1A1F2B]",
                "bg-[#00E599]/30",
                "bg-[#00E599]/60",
                "bg-[#00E599]",
                "bg-[#FFE600]",
              ];

              return (
                <div
                  key={dIdx}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  className={cn(
                    "flex-1 h-10 border border-black cursor-pointer transition-transform hover:scale-110",
                    bgColors[day.level]
                  )}
                  title={`${day.date}: ${day.count} sessions`}
                />
              );
            })}
          </div>

          <div className="flex items-center justify-between font-mono text-[10px] text-[#8E95A5] mt-2 pt-2 border-t border-[#282F40]">
            <span>July 26, 2026</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="w-3 h-3 bg-[#1A1F2B] border border-black" />
              <div className="w-3 h-3 bg-[#00E599]/30 border border-black" />
              <div className="w-3 h-3 bg-[#00E599]/60 border border-black" />
              <div className="w-3 h-3 bg-[#00E599] border border-black" />
              <div className="w-3 h-3 bg-[#FFE600] border border-black" />
              <span>More</span>
            </div>
            <span>September 23, 2026 (Today)</span>
          </div>
        </div>
      </div>

      {/* TWO COLUMN: SUBJECT MASTERY & PROBLEM DISTRIBUTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Mastery Radar */}
        <div className="p-5 bg-[#12151D] border-2 border-[#282F40] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-sm uppercase text-white tracking-wider">
              Subject Mastery & Relative Strength
            </h3>
            <Badge variant="blue" size="sm">TERM 4</Badge>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {subjects.map((sub) => {
              const isStrongest = sub.progressPercent >= 80;
              const needsImprovement = sub.progressPercent < 60;

              return (
                <div key={sub.id} className="space-y-1.5 p-3 bg-[#0B0D10] border border-[#282F40]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{sub.code}: {sub.name}</span>
                      {isStrongest && (
                        <span className="px-1.5 py-0.2 bg-[#00E599] text-black font-bold text-[9px]">
                          STRONGEST
                        </span>
                      )}
                      {needsImprovement && (
                        <span className="px-1.5 py-0.2 bg-[#FF5C58] text-white font-bold text-[9px]">
                          ATTENTION NEEDED
                        </span>
                      )}
                    </div>
                    <span className="font-bold text-white">{sub.progressPercent}%</span>
                  </div>

                  <div className="w-full bg-[#1A1F2B] h-2.5 border border-black">
                    <div
                      className={cn(
                        "h-full",
                        isStrongest
                          ? "bg-[#00E599]"
                          : needsImprovement
                          ? "bg-[#FF5C58]"
                          : "bg-[#FFE600]"
                      )}
                      style={{ width: `${sub.progressPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Problem Solving Breakdown */}
        <div className="p-5 bg-[#12151D] border-2 border-[#282F40] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-sm uppercase text-white tracking-wider">
              Problem Solving Difficulty Breakdown
            </h3>
            <span className="font-mono text-xs text-[#FFE600] font-bold">142 TOTAL</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-[#0B0D10] border border-[#282F40] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[#00E599] font-bold">Easy Difficulty</span>
                <span className="text-white font-bold">78 / 85 (92% Accuracy)</span>
              </div>
              <div className="w-full bg-[#1A1F2B] h-2 border border-black">
                <div className="bg-[#00E599] h-full" style={{ width: "92%" }} />
              </div>
            </div>

            <div className="p-3 bg-[#0B0D10] border border-[#282F40] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[#FFE600] font-bold">Medium Difficulty</span>
                <span className="text-white font-bold">52 / 64 (81% Accuracy)</span>
              </div>
              <div className="w-full bg-[#1A1F2B] h-2 border border-black">
                <div className="bg-[#FFE600] h-full" style={{ width: "81%" }} />
              </div>
            </div>

            <div className="p-3 bg-[#0B0D10] border border-[#282F40] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[#FF5C58] font-bold">Hard / Expert Difficulty</span>
                <span className="text-white font-bold">12 / 21 (57% Accuracy)</span>
              </div>
              <div className="w-full bg-[#1A1F2B] h-2 border border-black">
                <div className="bg-[#FF5C58] h-full" style={{ width: "57%" }} />
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#0B0D10] border border-[#282F40] font-mono text-[11px] text-[#8E95A5]">
            Targeting candidate master: solve 30 more Medium-level graph and DP problems to elevate algorithmic speed.
          </div>
        </div>
      </div>

      {/* ASSESSMENT HISTORY TABLE */}
      <div className="space-y-3">
        <h3 className="font-display font-bold text-sm uppercase text-white tracking-wider">
          Assessment & Quiz Historical Record
        </h3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assessment Title</TableHead>
              <TableHead>Course Code</TableHead>
              <TableHead className="w-28 text-center">Score</TableHead>
              <TableHead className="w-28 text-center">Threshold</TableHead>
              <TableHead className="w-28 text-center">Verdict</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold text-white">
                Transaction Serializability & Normalization Exam
              </TableCell>
              <TableCell className="text-[#FFE600] font-bold">CS203</TableCell>
              <TableCell className="text-center font-bold text-[#00E599]">94%</TableCell>
              <TableCell className="text-center text-[#8E95A5]">75%</TableCell>
              <TableCell className="text-center">
                <span className="px-2 py-0.5 bg-[#00E599] text-black font-bold text-[10px]">
                  PASSED (A)
                </span>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-bold text-white">
                Mid-Term Assessment: Trees, Heaps & Graph Traversal
              </TableCell>
              <TableCell className="text-[#FFE600] font-bold">CS201</TableCell>
              <TableCell className="text-center font-bold text-[#00E599]">88%</TableCell>
              <TableCell className="text-center text-[#8E95A5]">70%</TableCell>
              <TableCell className="text-center">
                <span className="px-2 py-0.5 bg-[#00E599] text-black font-bold text-[10px]">
                  PASSED (B+)
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
