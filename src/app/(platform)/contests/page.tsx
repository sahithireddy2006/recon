"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Clock,
  Users,
  Award,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Play,
  ArrowRight,
  Flame,
} from "lucide-react";
import { useLMSStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { formatRating, cn } from "@/lib/utils";
import { MOCK_RATING_HISTORY } from "@/lib/mock-data";

export default function ContestsPage() {
  const { contests, currentUser, registerForContest } = useLMSStore();
  const [activeTab, setActiveTab] = useState<"active" | "upcoming" | "past" | "leaderboard">("active");

  const ratingInfo = formatRating(currentUser.rating);
  const activeContests = contests.filter((c) => c.status === "active");
  const upcomingContests = contests.filter((c) => c.status === "upcoming");
  const pastContests = contests.filter((c) => c.status === "past");

  // Leaderboard from active contest
  const liveLeaderboard = activeContests[0]?.leaderboard || [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-[#282F40]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#FFE600] text-black font-mono font-bold text-xs uppercase tracking-wider">
              COMPETITIVE ARENA
            </span>
            <span className="font-mono text-xs text-[#8E95A5]">
              Bi-Weekly Cadence: Wednesday & Saturday 18:00 UTC
            </span>
          </div>
          <h1 className="font-display font-black text-2xl lg:text-3xl uppercase tracking-tight text-white mt-1">
            Contests & Rating Hub
          </h1>
          <p className="font-mono text-xs text-[#9DA7BC] mt-0.5">
            Algorithmic speedruns, rating milestones, and Codeforces-inspired penalty scoring.
          </p>
        </div>

        {/* User Rating Badge Card */}
        <div className="p-3 bg-[#12151D] border-2 border-[#282F40] flex items-center gap-4">
          <div className="text-right font-mono">
            <div className="text-[10px] uppercase text-[#8E95A5]">Your Handle</div>
            <div className={cn("font-bold text-sm", ratingInfo.colorClass)}>
              @{currentUser.handle}
            </div>
          </div>
          <div className="p-2 bg-[#0B0D10] border border-[#282F40] text-center font-mono">
            <div className="text-[9px] uppercase text-[#8E95A5]">Current Rating</div>
            <div className="font-display font-black text-lg text-white">
              {currentUser.rating}
            </div>
            <div className={cn("text-[9px] uppercase font-bold", ratingInfo.colorClass)}>
              {ratingInfo.tier}
            </div>
          </div>
        </div>
      </div>

      {/* RATING HISTORY & CONTEST SCHEDULE BANNER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rating Trajectory Chart Card */}
        <div className="lg:col-span-2 p-5 bg-[#12151D] border-2 border-white brutal-shadow-white space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#FFE600]" />
              <h2 className="font-display font-bold text-base uppercase text-white tracking-wider">
                Rating Trajectory (Past 8 Rounds)
              </h2>
            </div>
            <span className="font-mono text-xs text-[#00E599] font-bold">
              +322 Lifetime Net Delta
            </span>
          </div>

          {/* SVG Rating Graph */}
          <div className="p-4 bg-[#0B0D10] border-2 border-[#282F40]">
            <div className="h-44 w-full flex items-end gap-2 sm:gap-4 relative pt-6 pb-2">
              {/* Reference Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="border-b border-dashed border-white w-full text-[9px] font-mono pl-1">1800 (Expert)</div>
                <div className="border-b border-dashed border-white w-full text-[9px] font-mono pl-1">1600 (Candidate)</div>
                <div className="border-b border-dashed border-white w-full text-[9px] font-mono pl-1">1400 (Specialist)</div>
              </div>

              {MOCK_RATING_HISTORY.map((item, idx) => {
                const heightPercent = Math.min(100, Math.max(20, ((item.rating - 1350) / (1850 - 1350)) * 100));
                const itemRating = formatRating(item.rating);

                return (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center justify-end h-full group relative z-10"
                  >
                    {/* Tooltip on hover */}
                    <div className="absolute -top-12 bg-black text-white p-1.5 border border-white text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20 brutal-shadow-sm">
                      <div>{item.contestTitle}</div>
                      <div className="font-bold text-[#FFE600]">{item.rating} ({item.delta >= 0 ? `+${item.delta}` : item.delta})</div>
                      <div className="text-[#8E95A5]">Rank #{item.rank}</div>
                    </div>

                    <div className="font-mono text-[9px] text-[#8E95A5] mb-1 font-bold group-hover:text-white">
                      {item.rating}
                    </div>

                    <div
                      className="w-full bg-[#282F40] group-hover:bg-[#FF5C58] border border-black transition-all"
                      style={{ height: `${heightPercent}%` }}
                    />

                    <div className="font-mono text-[9px] text-[#8E95A5] mt-1 truncate">
                      {item.date}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Schedule & Rules Card */}
        <div className="p-5 bg-[#12151D] border-2 border-[#282F40] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#FF5C58]" />
              <h2 className="font-display font-bold text-base uppercase text-white tracking-wider">
                Rating Tiers System
              </h2>
            </div>
            <p className="font-mono text-xs text-[#9DA7BC] leading-relaxed">
              Based on the international competitive coding distribution. Rating updates immediately upon round conclusion.
            </p>

            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex items-center justify-between p-1.5 bg-[#0B0D10] border border-[#282F40]">
                <span className="text-[#FF0000] font-bold">Grandmaster</span>
                <span className="text-[#8E95A5]">2400+</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-[#0B0D10] border border-[#282F40]">
                <span className="text-[#FF8C00] font-bold">Master</span>
                <span className="text-[#8E95A5]">2100 - 2399</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-[#0B0D10] border border-[#282F40]">
                <span className="text-[#AA00AA] font-bold">Candidate Master</span>
                <span className="text-[#8E95A5]">1900 - 2099</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-[#0B0D10] border border-[#282F40]">
                <span className="text-[#2D7FF9] font-bold">Expert (You)</span>
                <span className="text-[#8E95A5]">1600 - 1899</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-[#0B0D10] border border-[#282F40]">
                <span className="text-[#03A89E] font-bold">Specialist</span>
                <span className="text-[#8E95A5]">1400 - 1599</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-[#0B0D10] border border-[#282F40]">
                <span className="text-[#00C853] font-bold">Pupil</span>
                <span className="text-[#8E95A5]">1200 - 1399</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#0B0D10] border border-[#282F40] font-mono text-[11px] text-[#8E95A5]">
            💡 Penalty: 20 minutes for every incorrect submission before acceptance.
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b-2 border-[#282F40] bg-[#12151D] p-1 font-mono text-xs">
        <button
          onClick={() => setActiveTab("active")}
          className={cn(
            "px-5 py-2.5 font-bold uppercase tracking-wider transition-all flex items-center gap-2 brutal-btn",
            activeTab === "active"
              ? "bg-[#FFE600] text-black border border-black shadow-[2px_2px_0px_#000]"
              : "text-[#8E95A5] hover:text-white"
          )}
        >
          <span>Active Contests ({activeContests.length})</span>
          <span className="w-2 h-2 rounded-none bg-[#FF5C58] animate-ping" />
        </button>

        <button
          onClick={() => setActiveTab("upcoming")}
          className={cn(
            "px-5 py-2.5 font-bold uppercase tracking-wider transition-all flex items-center gap-2 brutal-btn",
            activeTab === "upcoming"
              ? "bg-[#FFE600] text-black border border-black shadow-[2px_2px_0px_#000]"
              : "text-[#8E95A5] hover:text-white"
          )}
        >
          <span>Upcoming Schedule ({upcomingContests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("past")}
          className={cn(
            "px-5 py-2.5 font-bold uppercase tracking-wider transition-all flex items-center gap-2 brutal-btn",
            activeTab === "past"
              ? "bg-[#FFE600] text-black border border-black shadow-[2px_2px_0px_#000]"
              : "text-[#8E95A5] hover:text-white"
          )}
        >
          <span>Archive ({pastContests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("leaderboard")}
          className={cn(
            "px-5 py-2.5 font-bold uppercase tracking-wider transition-all flex items-center gap-2 brutal-btn",
            activeTab === "leaderboard"
              ? "bg-[#FFE600] text-black border border-black shadow-[2px_2px_0px_#000]"
              : "text-[#8E95A5] hover:text-white"
          )}
        >
          <Trophy className="w-4 h-4" />
          <span>Live Leaderboard</span>
        </button>
      </div>

      {/* TAB: ACTIVE CONTESTS */}
      {activeTab === "active" && (
        <div className="space-y-4">
          {activeContests.map((contest) => (
            <div
              key={contest.id}
              className="p-6 bg-[#12151D] border-2 border-white brutal-shadow space-y-5"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b-2 border-[#282F40]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#FF5C58] text-white font-mono font-bold text-xs uppercase animate-pulse">
                      ● LIVE NOW
                    </span>
                    <span className="font-mono text-xs text-[#FFE600] font-bold">
                      {contest.type}
                    </span>
                  </div>
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white">
                    {contest.title}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="p-2.5 bg-[#0B0D10] border border-[#282F40] font-mono text-xs">
                    <span className="text-[#8E95A5]">Duration: </span>
                    <strong className="text-white">{contest.durationMinutes} mins</strong>
                  </div>
                  <div className="p-2.5 bg-[#0B0D10] border border-[#282F40] font-mono text-xs">
                    <span className="text-[#8E95A5]">Coders: </span>
                    <strong className="text-white">{contest.participantsCount}</strong>
                  </div>
                  <div className="p-2.5 bg-[#0B0D10] border border-[#282F40] font-mono text-xs">
                    <span className="text-[#8E95A5]">Problems: </span>
                    <strong className="text-white">{contest.problemsCount} Tasks</strong>
                  </div>
                </div>
              </div>

              {/* Problems list */}
              <div className="space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[#8E95A5] font-bold">
                  Problem Set:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {contest.problems.map((prob) => (
                    <Link
                      key={prob.id}
                      href={`/contests/${contest.id}?problem=${prob.index}`}
                      className={cn(
                        "p-3.5 border-2 transition-all group flex flex-col justify-between",
                        prob.solved
                          ? "bg-[#00E599]/10 border-[#00E599]"
                          : "bg-[#0B0D10] border-[#282F40] hover:border-white"
                      )}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-display font-black text-sm text-white group-hover:text-[#FFE600]">
                            Problem {prob.index}
                          </span>
                          <span className="font-mono text-[10px] text-[#8E95A5]">
                            {prob.points} pts
                          </span>
                        </div>
                        <div className="font-display font-bold text-xs text-white mt-1 line-clamp-1">
                          {prob.title}
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#282F40] flex items-center justify-between font-mono text-[10px]">
                        <span
                          className={cn(
                            prob.difficulty === "Easy"
                              ? "text-[#00E599]"
                              : prob.difficulty === "Medium"
                              ? "text-[#FFE600]"
                              : "text-[#FF5C58]"
                          )}
                        >
                          {prob.difficulty}
                        </span>
                        <span>{prob.solved ? "✓ SOLVED" : "Unsolved"}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="font-mono text-xs text-[#8E95A5]">
                  Your current rank in this round: <strong className="text-[#FFE600]">#14</strong> (1 solved, 16 min penalty)
                </div>
                <Link href={`/contests/${contest.id}`}>
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    <span>Enter Live Problem Arena</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB: UPCOMING */}
      {activeTab === "upcoming" && (
        <div className="space-y-4">
          {upcomingContests.map((contest) => (
            <div
              key={contest.id}
              className="p-6 bg-[#12151D] border-2 border-[#282F40] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <Badge variant="blue" size="sm">UPCOMING ROUND</Badge>
                <h3 className="font-display font-bold text-xl text-white mt-1">
                  {contest.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-[#8E95A5] mt-2">
                  <span>Starts: <strong className="text-white">Saturday 14:00 UTC</strong></span>
                  <span>Duration: <strong className="text-white">{contest.durationMinutes} min</strong></span>
                  <span>Registered: <strong className="text-white">{contest.participantsCount} coders</strong></span>
                </div>
              </div>

              <Button
                variant={contest.registered ? "outline" : "secondary"}
                size="md"
                onClick={() => registerForContest(contest.id)}
              >
                {contest.registered ? "✓ Registered" : "Register For Contest"}
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* TAB: PAST */}
      {activeTab === "past" && (
        <div className="space-y-4">
          {pastContests.map((contest) => (
            <div
              key={contest.id}
              className="p-5 bg-[#12151D] border-2 border-[#282F40] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <Badge variant="default" size="sm">ARCHIVED ROUND</Badge>
                <h3 className="font-display font-bold text-lg text-white mt-1">
                  {contest.title}
                </h3>
                <div className="font-mono text-xs text-[#8E95A5] mt-1">
                  1,412 Participants · 4 Problems · Rated for Div 1 + Div 2
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  View Final Scoreboard
                </Button>
                <Button variant="ghost" size="sm">
                  Practice Problems
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB: CODEFORCES-STYLE LEADERBOARD */}
      {activeTab === "leaderboard" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-base uppercase text-white tracking-wider">
                Live Contest Standings: Weekly Algo Challenge #48
              </h2>
              <p className="font-mono text-xs text-[#8E95A5]">
                Tiebreakers calculated via total penalty time in minutes.
              </p>
            </div>
            <Badge variant="coral" size="sm">LIVE METRICS</Badge>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>Coder / Handle</TableHead>
                <TableHead className="w-24">Rating</TableHead>
                <TableHead className="w-20 text-center">Solved</TableHead>
                <TableHead className="w-24 text-right">Penalty</TableHead>
                <TableHead className="w-20 text-center">Prob A</TableHead>
                <TableHead className="w-20 text-center">Prob B</TableHead>
                <TableHead className="w-20 text-center">Prob C</TableHead>
                <TableHead className="w-20 text-center">Prob D</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {liveLeaderboard.map((entry) => {
                const userRating = formatRating(entry.rating);
                const isCurrentUser = entry.userId === currentUser.id;

                return (
                  <TableRow
                    key={entry.userId}
                    className={isCurrentUser ? "bg-[#FFE600]/10 border-l-4 border-l-[#FFE600]" : ""}
                  >
                    <TableCell className="font-bold text-white">
                      #{entry.rank}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={cn("font-bold", userRating.colorClass)}>
                          {entry.handle}
                        </span>
                        {isCurrentUser && (
                          <span className="px-1.5 py-0.2 bg-[#FFE600] text-black font-mono font-bold text-[9px]">
                            YOU
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className={cn("font-bold", userRating.colorClass)}>
                      {entry.rating}
                    </TableCell>
                    <TableCell className="text-center font-bold text-[#00E599]">
                      {entry.solvedCount}
                    </TableCell>
                    <TableCell className="text-right text-[#8E95A5]">
                      {entry.penaltyTime}m
                    </TableCell>

                    {/* Problem A */}
                    <TableCell className="text-center">
                      {entry.problemStatus["A"]?.solved ? (
                        <span className="text-[#00E599] font-bold">
                          +{entry.problemStatus["A"].attempts}
                        </span>
                      ) : (
                        <span className="text-[#606775]">—</span>
                      )}
                    </TableCell>

                    {/* Problem B */}
                    <TableCell className="text-center">
                      {entry.problemStatus["B"]?.solved ? (
                        <span className="text-[#00E599] font-bold">
                          +{entry.problemStatus["B"].attempts}
                        </span>
                      ) : (
                        <span className="text-[#606775]">—</span>
                      )}
                    </TableCell>

                    {/* Problem C */}
                    <TableCell className="text-center">
                      {entry.problemStatus["C"]?.solved ? (
                        <span className="text-[#00E599] font-bold">
                          +{entry.problemStatus["C"].attempts}
                        </span>
                      ) : (
                        <span className="text-[#606775]">—</span>
                      )}
                    </TableCell>

                    {/* Problem D */}
                    <TableCell className="text-center">
                      {entry.problemStatus["D"]?.solved ? (
                        <span className="text-[#00E599] font-bold">
                          +{entry.problemStatus["D"].attempts}
                        </span>
                      ) : (
                        <span className="text-[#606775]">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
