"use client";

import React from "react";
import { useLMSStore } from "@/lib/store";
import { UserRole } from "@/lib/types";
import { cn } from "@/lib/utils";
import { GraduationCap, BookOpenCheck, ShieldAlert } from "lucide-react";

export function RoleSwitcher() {
  const { currentRole, setRole, currentUser } = useLMSStore();

  const roles: {
    id: UserRole;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
  }[] = [
    {
      id: "student",
      label: "Student",
      icon: GraduationCap,
      accentColor: "bg-[#FFE600] text-black",
    },
    {
      id: "teacher",
      label: "Teacher",
      icon: BookOpenCheck,
      accentColor: "bg-[#2D7FF9] text-white",
    },
    {
      id: "admin",
      label: "Admin",
      icon: ShieldAlert,
      accentColor: "bg-[#FF5C58] text-white",
    },
  ];

  return (
    <div className="flex items-center border-2 border-[#282F40] bg-[#0D1017] p-0.5 select-none">
      <span className="px-2 font-mono text-[10px] uppercase tracking-wider text-[#8E95A5] hidden md:inline-block border-r border-[#282F40]">
        Role:
      </span>
      <div className="flex items-center gap-0.5">
        {roles.map((r) => {
          const Icon = r.icon;
          const isActive = currentRole === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className={cn(
                "px-2.5 py-1 text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 brutal-btn",
                isActive
                  ? `${r.accentColor} border border-black shadow-[2px_2px_0px_#000]`
                  : "text-[#8E95A5] hover:text-white hover:bg-[#1A1F2B]"
              )}
              title={`Switch active persona to ${r.label}`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{r.label}</span>
            </button>
          );
        })}
      </div>
      <div className="px-2.5 py-0.5 font-mono text-[11px] text-white border-l border-[#282F40] hidden lg:block">
        <span className="text-[#8E95A5]">Active: </span>
        <span className="font-bold text-[#FFE600]">{currentUser.name}</span>
      </div>
    </div>
  );
}
