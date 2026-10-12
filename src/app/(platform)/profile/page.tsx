"use client";

import React from "react";
import Link from "next/link";
import {
  User as UserIcon,
  Trophy,
  Flame,
  Award,
  Lock,
  Globe,
  CheckCircle2,
  Calendar,
  Settings,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useLMSStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatRating, cn } from "@/lib/utils";

export default function ProfilePage() {
  const { currentUser, updateUserProfile } = useLMSStore();
  const ratingInfo = formatRating(currentUser.rating);

  const togglePublic = () => {
    updateUserProfile({ isPublic: !currentUser.isPublic });
  };

  const achievements = [
    {
      title: currentUser.streak >= 1 ? `${currentUser.streak}-Day Study Streak` : "Study Streak Starter",
      description: currentUser.streak >= 7 ? "Consistent daily study progression maintained." : "Complete lessons and assessments daily to build your active streak.",
      date: currentUser.streak > 0 ? "Active" : "Locked",
      icon: Flame,
      color: "bg-[#FF5C58] text-white",
    },
    {
      title: "Problem Solver",
      description: currentUser.solvedCount > 0 ? `Solved ${currentUser.solvedCount} verified algorithmic tasks in live rounds.` : "Solve problems in competitive rounds to earn points.",
      date: currentUser.solvedCount > 0 ? "Unlocked" : "In Progress",
      icon: Star,
      color: "bg-[#2D7FF9] text-white",
    },
    {
      title: "Verified Scholar",
      description: `Officially enrolled in ${currentUser.department || "Academic Engineering"}.`,
      date: "Active",
      icon: Trophy,
      color: "bg-[#FFE600] text-black",
    },
    {
      title: "Arena Contender",
      description: `Current rating ${currentUser.rating} in ${ratingInfo.tier} division.`,
      date: currentUser.rating > 1200 ? "Advanced" : "Entry Tier",
      icon: Award,
      color: "bg-[#00E599] text-black",
    },
  ];


  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Profile Banner */}
      <div className="bg-[#12151D] border-2 border-white brutal-shadow p-6 lg:p-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b-2 border-[#282F40]">
          {/* Avatar and Identity */}
          <div className="flex items-start sm:items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-black overflow-hidden bg-[#2D7FF9] shrink-0 brutal-shadow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                  {currentUser.name}
                </h1>
                <span className={cn("px-2 py-0.5 font-mono text-xs font-bold border border-black", ratingInfo.bgClass, ratingInfo.colorClass)}>
                  {currentUser.rating} · {ratingInfo.tier}
                </span>
              </div>

              <div className="font-mono text-xs text-[#FFE600] font-bold">
                @{currentUser.handle} · {currentUser.email}
              </div>

              <div className="font-mono text-xs text-[#8E95A5]">
                {currentUser.department} · Term {currentUser.semester}
              </div>
            </div>
          </div>

          {/* Visibility Toggle & Edit */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <button
              onClick={togglePublic}
              className={cn(
                "px-3 py-2 border-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 brutal-btn transition-all",
                currentUser.isPublic
                  ? "bg-[#00E599] text-black border-black brutal-shadow-sm"
                  : "bg-[#1A1F2B] text-white border-white/50"
              )}
            >
              {currentUser.isPublic ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span>{currentUser.isPublic ? "PROFILE: PUBLIC" : "PROFILE: PRIVATE"}</span>
            </button>

            <Link href="/settings">
              <Button variant="outline" size="md" className="w-full sm:w-auto">
                <Settings className="w-4 h-4 mr-1.5" />
                Settings
              </Button>
            </Link>
          </div>
        </div>

        {/* Bio */}
        <div className="p-4 bg-[#0B0D10] border-2 border-[#282F40] font-mono text-xs text-[#DCE2EE] leading-relaxed">
          <strong className="text-white uppercase block mb-1">Academic & Competitive Bio:</strong>
          {currentUser.bio}
        </div>

        {/* Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
          <div className="p-3 bg-[#0B0D10] border border-[#282F40]">
            <div className="text-[10px] text-[#8E95A5] uppercase">Contest Rating</div>
            <div className="font-display font-black text-xl text-white mt-0.5">
              {currentUser.rating}
            </div>
            <div className="text-[9px] text-[#8E95A5]">Peak: {currentUser.maxRating}</div>
          </div>

          <div className="p-3 bg-[#0B0D10] border border-[#282F40]">
            <div className="text-[10px] text-[#8E95A5] uppercase">Global Best Rank</div>
            <div className="font-display font-black text-xl text-[#FFE600] mt-0.5">
              #{currentUser.bestRank}
            </div>
            <div className="text-[9px] text-[#8E95A5]">Div 1 Round 46</div>
          </div>

          <div className="p-3 bg-[#0B0D10] border border-[#282F40]">
            <div className="text-[10px] text-[#8E95A5] uppercase">Questions Solved</div>
            <div className="font-display font-black text-xl text-[#00E599] mt-0.5">
              {currentUser.solvedCount}
            </div>
            <div className="text-[9px] text-[#8E95A5]">Accuracy: {currentUser.accuracy}%</div>
          </div>

          <div className="p-3 bg-[#0B0D10] border border-[#282F40]">
            <div className="text-[10px] text-[#8E95A5] uppercase">Active Streak</div>
            <div className="font-display font-black text-xl text-[#FF5C58] mt-0.5 flex items-center justify-center gap-1">
              <Flame className="w-5 h-5 fill-[#FF5C58]" />
              <span>{currentUser.streak}d</span>
            </div>
            <div className="text-[9px] text-[#8E95A5]">Consistent</div>
          </div>
        </div>
      </div>

      {/* ACHIEVEMENTS & MILESTONES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-base uppercase text-white tracking-wider">
            Verified Achievements & Contest Honors
          </h2>
          <span className="font-mono text-xs text-[#8E95A5]">4 Unlocked</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((ach, idx) => {
            const Icon = ach.icon;
            return (
              <div
                key={idx}
                className="p-5 bg-[#12151D] border-2 border-[#282F40] hover:border-white transition-all space-y-3 brutal-shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className={cn("p-2 border border-black", ach.color)}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] text-[#8E95A5]">
                    {ach.date}
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-sm text-white">
                    {ach.title}
                  </h3>
                  <p className="font-mono text-xs text-[#8E95A5] mt-1">
                    {ach.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
