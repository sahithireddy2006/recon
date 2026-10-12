"use client";

import React, { useState } from "react";
import {
  User,
  Shield,
  Bell,
  Palette,
  LogOut,
  Save,
  Check,
  Download,
  AlertTriangle,
} from "lucide-react";
import { useLMSStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const {
    currentUser,
    updateUserProfile,
    themeMode,
    toggleTheme,
    currentRole,
  } = useLMSStore();

  const [activeTab, setActiveTab] = useState<"account" | "privacy" | "notifications" | "appearance">("account");
  const [formData, setFormData] = useState({
    name: currentUser.name,
    handle: currentUser.handle,
    email: currentUser.email,
    bio: currentUser.bio,
    department: currentUser.department,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Privacy toggles
  const [isPublic, setIsPublic] = useState(currentUser.isPublic);
  const [showRatingPublic, setShowRatingPublic] = useState(true);
  const [showHeatmapPublic, setShowHeatmapPublic] = useState(true);

  // Notification toggles
  const [contestAlerts, setContestAlerts] = useState(true);
  const [testReminders, setTestReminders] = useState(true);
  const [announcements, setAnnouncements] = useState(true);

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: formData.name,
      handle: formData.handle,
      bio: formData.bio,
      department: formData.department,
      isPublic,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExportData = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(currentUser, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `recon_lms_profile_${currentUser.handle}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#282F40]">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="yellow" size="sm">PREFERENCES</Badge>
            <span className="font-mono text-xs text-[#8E95A5]">
              Configuration & Account Telemetry
            </span>
          </div>
          <h1 className="font-display font-black text-2xl lg:text-3xl uppercase tracking-tight text-white mt-1">
            System Settings
          </h1>
        </div>

        {savedSuccess && (
          <div className="p-2 bg-[#00E599] text-black font-mono text-xs font-bold uppercase border border-black flex items-center gap-1.5">
            <Check className="w-4 h-4" />
            <span>Preferences Saved Successfully</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b-2 border-[#282F40] bg-[#12151D] p-1 font-mono text-xs overflow-x-auto">
        <button
          onClick={() => setActiveTab("account")}
          className={cn(
            "px-4 py-2.5 font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 brutal-btn",
            activeTab === "account"
              ? "bg-[#FFE600] text-black border border-black shadow-[2px_2px_0px_#000]"
              : "text-[#8E95A5] hover:text-white"
          )}
        >
          <User className="w-4 h-4" />
          <span>Account & Identity</span>
        </button>

        <button
          onClick={() => setActiveTab("privacy")}
          className={cn(
            "px-4 py-2.5 font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 brutal-btn",
            activeTab === "privacy"
              ? "bg-[#FFE600] text-black border border-black shadow-[2px_2px_0px_#000]"
              : "text-[#8E95A5] hover:text-white"
          )}
        >
          <Shield className="w-4 h-4" />
          <span>Privacy & Visibility</span>
        </button>

        <button
          onClick={() => setActiveTab("notifications")}
          className={cn(
            "px-4 py-2.5 font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 brutal-btn",
            activeTab === "notifications"
              ? "bg-[#FFE600] text-black border border-black shadow-[2px_2px_0px_#000]"
              : "text-[#8E95A5] hover:text-white"
          )}
        >
          <Bell className="w-4 h-4" />
          <span>Notification Alerts</span>
        </button>

        <button
          onClick={() => setActiveTab("appearance")}
          className={cn(
            "px-4 py-2.5 font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 brutal-btn",
            activeTab === "appearance"
              ? "bg-[#FFE600] text-black border border-black shadow-[2px_2px_0px_#000]"
              : "text-[#8E95A5] hover:text-white"
          )}
        >
          <Palette className="w-4 h-4" />
          <span>Appearance</span>
        </button>
      </div>

      {/* TAB: ACCOUNT */}
      {activeTab === "account" && (
        <form onSubmit={handleSaveAccount} className="space-y-6">
          <div className="bg-[#12151D] border-2 border-[#282F40] p-6 space-y-4">
            <h3 className="font-display font-bold text-base uppercase text-white tracking-wider border-b border-[#282F40] pb-2">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-mono text-xs uppercase text-[#8E95A5] font-bold">
                  Full Display Name:
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-xs uppercase text-[#8E95A5] font-bold">
                  Contest Handle:
                </label>
                <Input
                  value={formData.handle}
                  onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-xs uppercase text-[#8E95A5] font-bold">
                  Academic Email (Official):
                </label>
                <Input value={formData.email} disabled className="opacity-60" />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-xs uppercase text-[#8E95A5] font-bold">
                  Department / School:
                </label>
                <Input
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <label className="font-mono text-xs uppercase text-[#8E95A5] font-bold">
                Bio & Research Interests:
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
                className="w-full p-3 bg-[#0D1017] text-white border-2 border-[#282F40] focus:border-[#FF5C58] font-mono text-xs outline-none"
              />
            </div>
          </div>

          {/* Password Section (Applicable for Teacher / Admin accounts) */}
          <div className="bg-[#12151D] border-2 border-[#282F40] p-6 space-y-4">
            <h3 className="font-display font-bold text-base uppercase text-white tracking-wider border-b border-[#282F40] pb-2">
              Authentication Credentials
            </h3>
            <p className="font-mono text-xs text-[#8E95A5]">
              {currentRole === "student"
                ? "Your student account is authenticated via Google OAuth. Password management is handled by your Google organization account."
                : "Enter current and new password to update administrative credentials."}
            </p>

            {currentRole !== "student" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-xs uppercase text-[#8E95A5]">Current Password</label>
                  <Input type="password" placeholder="••••••••••••" />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-xs uppercase text-[#8E95A5]">New Password</label>
                  <Input type="password" placeholder="••••••••••••" />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="primary" size="md">
              <Save className="w-4 h-4 mr-1.5" />
              Save Account Preferences
            </Button>
          </div>
        </form>
      )}

      {/* TAB: PRIVACY */}
      {activeTab === "privacy" && (
        <div className="space-y-6">
          <div className="bg-[#12151D] border-2 border-[#282F40] p-6 space-y-4">
            <h3 className="font-display font-bold text-base uppercase text-white tracking-wider border-b border-[#282F40] pb-2">
              Profile Privacy Controls
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-4 bg-[#0B0D10] border-2 border-[#282F40] flex items-center justify-between">
                <div>
                  <div className="font-bold text-white uppercase">Public Student Profile</div>
                  <div className="text-[#8E95A5] text-[11px] mt-0.5">
                    Allow other students in the university to view your solved questions and achievements.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPublic(!isPublic)}
                  className={cn(
                    "px-3 py-1 font-bold uppercase border brutal-btn",
                    isPublic ? "bg-[#00E599] text-black border-black" : "bg-[#1A1F2B] text-white border-white/40"
                  )}
                >
                  {isPublic ? "ENABLED" : "DISABLED"}
                </button>
              </div>

              <div className="p-4 bg-[#0B0D10] border-2 border-[#282F40] flex items-center justify-between">
                <div>
                  <div className="font-bold text-white uppercase">Show Contest Rating on Leaderboard</div>
                  <div className="text-[#8E95A5] text-[11px] mt-0.5">
                    Display your official rating tier on global contest standings.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowRatingPublic(!showRatingPublic)}
                  className={cn(
                    "px-3 py-1 font-bold uppercase border brutal-btn",
                    showRatingPublic ? "bg-[#00E599] text-black border-black" : "bg-[#1A1F2B] text-white border-white/40"
                  )}
                >
                  {showRatingPublic ? "ENABLED" : "DISABLED"}
                </button>
              </div>

              <div className="p-4 bg-[#0B0D10] border-2 border-[#282F40] flex items-center justify-between">
                <div>
                  <div className="font-bold text-white uppercase">Show Activity Heatmap</div>
                  <div className="text-[#8E95A5] text-[11px] mt-0.5">
                    Display your 60-day study consistency matrix on public profile.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowHeatmapPublic(!showHeatmapPublic)}
                  className={cn(
                    "px-3 py-1 font-bold uppercase border brutal-btn",
                    showHeatmapPublic ? "bg-[#00E599] text-black border-black" : "bg-[#1A1F2B] text-white border-white/40"
                  )}
                >
                  {showHeatmapPublic ? "ENABLED" : "DISABLED"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: NOTIFICATIONS */}
      {activeTab === "notifications" && (
        <div className="space-y-6">
          <div className="bg-[#12151D] border-2 border-[#282F40] p-6 space-y-4">
            <h3 className="font-display font-bold text-base uppercase text-white tracking-wider border-b border-[#282F40] pb-2">
              Notification Preferences
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-4 bg-[#0B0D10] border-2 border-[#282F40] flex items-center justify-between">
                <div>
                  <div className="font-bold text-white uppercase">Weekly Contest Reminders (1h before round)</div>
                  <div className="text-[#8E95A5] text-[11px] mt-0.5">
                    Receive urgent notification before Wednesday & Saturday rounds start.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setContestAlerts(!contestAlerts)}
                  className={cn(
                    "px-3 py-1 font-bold uppercase border brutal-btn",
                    contestAlerts ? "bg-[#FFE600] text-black border-black" : "bg-[#1A1F2B] text-white border-white/40"
                  )}
                >
                  {contestAlerts ? "ON" : "OFF"}
                </button>
              </div>

              <div className="p-4 bg-[#0B0D10] border-2 border-[#282F40] flex items-center justify-between">
                <div>
                  <div className="font-bold text-white uppercase">Course Assessment Due Alerts</div>
                  <div className="text-[#8E95A5] text-[11px] mt-0.5">
                    Alerts for upcoming tests, quizzes, and submission deadlines.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setTestReminders(!testReminders)}
                  className={cn(
                    "px-3 py-1 font-bold uppercase border brutal-btn",
                    testReminders ? "bg-[#FFE600] text-black border-black" : "bg-[#1A1F2B] text-white border-white/40"
                  )}
                >
                  {testReminders ? "ON" : "OFF"}
                </button>
              </div>

              <div className="p-4 bg-[#0B0D10] border-2 border-[#282F40] flex items-center justify-between">
                <div>
                  <div className="font-bold text-white uppercase">Academic System Announcements</div>
                  <div className="text-[#8E95A5] text-[11px] mt-0.5">
                    Platform maintenance and university academic alerts.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAnnouncements(!announcements)}
                  className={cn(
                    "px-3 py-1 font-bold uppercase border brutal-btn",
                    announcements ? "bg-[#FFE600] text-black border-black" : "bg-[#1A1F2B] text-white border-white/40"
                  )}
                >
                  {announcements ? "ON" : "OFF"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: APPEARANCE */}
      {activeTab === "appearance" && (
        <div className="space-y-6">
          <div className="bg-[#12151D] border-2 border-[#282F40] p-6 space-y-4">
            <h3 className="font-display font-bold text-base uppercase text-white tracking-wider border-b border-[#282F40] pb-2">
              Neo-Brutalist Theme Contrast
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  if (themeMode !== "dark") toggleTheme();
                }}
                className={cn(
                  "theme-preview-dark p-5 text-left border-2 transition-all flex flex-col justify-between h-44 brutal-btn relative",
                  themeMode === "dark"
                    ? "border-white shadow-[4px_4px_0px_#FFFFFF]"
                    : "border-[#4A5568] hover:border-white opacity-85 hover:opacity-100"
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="font-display font-black text-sm uppercase tracking-wide text-white preview-title">
                      Dark Brutalism (Default)
                    </div>
                    {themeMode === "dark" ? (
                      <span className="px-2 py-0.5 bg-[#00E599] text-black font-mono font-bold text-[10px] uppercase border border-black shrink-0">
                        ACTIVE
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-[#282F40] text-white font-mono text-[10px] uppercase border border-white/20 shrink-0">
                        SELECT
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-xs text-[#9DA7BC] leading-relaxed preview-desc">
                    Deep charcoal canvas, electric accents, maximum night contrast.
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex gap-2">
                    <span className="w-4 h-4 bg-[#FF5C58] border border-black" />
                    <span className="w-4 h-4 bg-[#FFE600] border border-black" />
                    <span className="w-4 h-4 bg-[#2D7FF9] border border-black" />
                  </div>
                  <span className="font-mono text-[10px] text-[#8E95A5] uppercase">
                    CANVAS #0B0D10
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (themeMode !== "light") toggleTheme();
                }}
                className={cn(
                  "theme-preview-light p-5 text-left border-2 transition-all flex flex-col justify-between h-44 brutal-btn relative",
                  themeMode === "light"
                    ? "border-black shadow-[4px_4px_0px_#000000]"
                    : "border-neutral-400 hover:border-black opacity-95 hover:opacity-100"
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="font-display font-black text-sm uppercase tracking-wide text-black preview-title">
                      High-Contrast Light
                    </div>
                    {themeMode === "light" ? (
                      <span className="px-2 py-0.5 bg-[#FFE600] text-black font-mono font-black text-[10px] uppercase border border-black shrink-0">
                        ACTIVE
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-black text-white font-mono text-[10px] uppercase border border-black shrink-0">
                        SELECT
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-xs text-[#4A5568] leading-relaxed preview-desc">
                    Off-white paper surface with heavy 2px black editorial ink borders.
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-black/10">
                  <div className="flex gap-2">
                    <span className="w-4 h-4 bg-[#FF5C58] border border-black" />
                    <span className="w-4 h-4 bg-[#FFE600] border border-black" />
                    <span className="w-4 h-4 bg-[#2D7FF9] border border-black" />
                  </div>
                  <span className="font-mono text-[10px] text-[#4A5568] uppercase">
                    CANVAS #F4F4F0
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ACCOUNT ACTIONS FOOTER */}
      <div className="p-6 bg-[#12151D] border-2 border-[#282F40] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-display font-bold text-sm uppercase text-white">
            Data Portability & Session Management
          </h4>
          <p className="font-mono text-xs text-[#8E95A5] mt-0.5">
            Download your raw academic records and performance telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="w-4 h-4 mr-1.5" />
            Export My Data (JSON)
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              if (confirm("Sign out of RECON LMS?")) {
                window.location.href = "/login";
              }
            }}
          >
            <LogOut className="w-4 h-4 mr-1.5" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
