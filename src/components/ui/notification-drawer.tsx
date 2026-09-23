"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Bell, Trophy, FileText, CheckCircle2, Megaphone, Check } from "lucide-react";
import { useLMSStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function NotificationDrawer() {
  const {
    notifications,
    isNotificationDrawerOpen,
    setIsNotificationDrawerOpen,
    markNotificationRead,
    markAllNotificationsRead,
    unreadNotificationsCount,
  } = useLMSStore();

  const [filter, setFilter] = useState<"all" | "test" | "contest" | "course" | "announcement">("all");

  if (!isNotificationDrawerOpen) return null;

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true;
    return n.type === filter;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "contest":
        return <Trophy className="w-4 h-4 text-[#FFE600]" />;
      case "test":
        return <CheckCircle2 className="w-4 h-4 text-[#00E599]" />;
      case "course":
        return <FileText className="w-4 h-4 text-[#2D7FF9]" />;
      default:
        return <Megaphone className="w-4 h-4 text-[#FF5C58]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-[2px]"
        onClick={() => setIsNotificationDrawerOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-[#12151D] text-white border-l-2 border-white flex flex-col z-10 brutal-shadow">
        {/* Header */}
        <div className="p-4 bg-[#FF5C58] text-white border-b-2 border-black flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Bell className="w-5 h-5 text-black fill-black" />
            <div>
              <h2 className="font-display font-black text-lg uppercase tracking-tight text-white">
                Notifications
              </h2>
              <span className="font-mono text-[10px] text-black font-bold uppercase tracking-wider">
                {unreadNotificationsCount} Unread Alerts
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unreadNotificationsCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="px-2 py-1 bg-black text-white hover:bg-white hover:text-black border border-black text-[10px] font-mono uppercase tracking-wider transition-colors brutal-btn flex items-center gap-1"
                title="Mark all as read"
              >
                <Check className="w-3 h-3" />
                Read All
              </button>
            )}
            <button
              onClick={() => setIsNotificationDrawerOpen(false)}
              className="w-8 h-8 flex items-center justify-center bg-black text-white hover:bg-white hover:text-black border border-black transition-colors brutal-btn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-b-2 border-[#282F40] bg-[#1A1F2B] overflow-x-auto text-xs font-mono">
          {(["all", "contest", "test", "course", "announcement"] as const).map(
            (category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={cn(
                  "px-3 py-2 border-r border-[#282F40] uppercase tracking-wider transition-colors whitespace-nowrap",
                  filter === category
                    ? "bg-[#FFE600] text-black font-bold border-b-2 border-black"
                    : "text-[#8E95A5] hover:text-white"
                )}
              >
                {category}
              </button>
            )
          )}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center bg-[#0D1017] border border-[#282F40]">
              <p className="font-mono text-xs text-[#8E95A5]">NO NOTIFICATIONS IN THIS CATEGORY</p>
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markNotificationRead(notif.id)}
                className={cn(
                  "p-3.5 border-2 transition-all group relative cursor-pointer",
                  notif.read
                    ? "bg-[#141822] border-[#252B3B] opacity-75"
                    : "bg-[#1A202D] border-white/60 hover:border-[#FFE600]"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-[#0B0D10] border border-[#384156] mt-0.5">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display font-bold text-xs uppercase text-white truncate">
                        {notif.title}
                      </span>
                      <span className="font-mono text-[9px] text-[#8E95A5] shrink-0">
                        {notif.timeAgo}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-[#9DA7BC] mt-1 line-clamp-2">
                      {notif.description}
                    </p>
                    {notif.link && notif.link !== "#" && (
                      <Link
                        href={notif.link}
                        onClick={() => setIsNotificationDrawerOpen(false)}
                        className="inline-block mt-2 font-mono text-[10px] text-[#FFE600] hover:underline uppercase tracking-wider font-bold"
                      >
                        Open Target →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
