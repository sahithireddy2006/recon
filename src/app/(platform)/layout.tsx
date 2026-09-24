"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  BarChart3,
  User as UserIcon,
  Settings,
  ShieldCheck,
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
  Flame,
  ChevronRight,
  Sparkles,
  LogOut,
  ShieldAlert,
} from "lucide-react";
import { useLMSStore } from "@/lib/store";
import { GlobalSearchModal } from "@/components/ui/global-search";
import { NotificationDrawer } from "@/components/ui/notification-drawer";
import { formatRating, cn } from "@/lib/utils";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    currentUser,
    currentRole,
    isAuthenticated,
    isLoadingSession,
    logout,
    setIsSearchOpen,
    setIsNotificationDrawerOpen,
    unreadNotificationsCount,
    themeMode,
    toggleTheme,
    selectedSemester,
  } = useLMSStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authentication Guard: if not authenticated, redirect to /login
  useEffect(() => {
    if (!isLoadingSession && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoadingSession, isAuthenticated, router]);

  const ratingInfo = formatRating(currentUser?.rating || 1200);

  // Only show Admin Panel if user actually holds 'admin' role
  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: "Courses",
      href: "/courses",
      icon: BookOpen,
      badge: `SEM ${selectedSemester}`,
    },
    {
      label: "Contests",
      href: "/contests",
      icon: Trophy,
      badge: "LIVE #48",
      badgeColor: "bg-[#FFE600] text-black",
    },
    {
      label: "Reports",
      href: "/reports",
      icon: BarChart3,
      badge: null,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: UserIcon,
      badge: null,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
      badge: null,
    },
    ...(currentUser?.role === "admin"
      ? [
          {
            label: "Admin Panel",
            href: "/admin",
            icon: ShieldCheck,
            badge: "ADMIN",
            badgeColor: "bg-[#FF5C58] text-white",
          },
        ]
      : []),
  ];

  // Loading state while checking session
  if (isLoadingSession) {
    return (
      <div className="min-h-screen bg-[#0B0D10] flex items-center justify-center p-6 text-white font-mono text-xs">
        <div className="p-8 bg-[#12151D] border-2 border-white brutal-shadow-white space-y-4 max-w-sm text-center">
          <div className="w-10 h-10 bg-[#FF5C58] text-black border-2 border-black mx-auto flex items-center justify-center font-display font-black text-xl">
            R
          </div>
          <div className="font-display font-black uppercase text-base text-white tracking-wider">
            AUTHENTICATING SESSION...
          </div>
          <p className="text-[#8E95A5] text-xs">
            Verifying institutional credentials with Neon PostgreSQL.
          </p>
        </div>
      </div>
    );
  }

  // Not logged in: blocked from viewing platform
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0D10] text-[#EDEDED]">
      {/* Top Chrome Bar */}
      <header className="sticky top-0 z-40 w-full h-16 bg-[#12151D] border-b-2 border-[#282F40] flex items-center justify-between px-4 lg:px-6">
        {/* Left: Mobile hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 bg-[#1A1F2B] border border-[#282F40] text-white hover:bg-[#252B3B]"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#FF5C58] text-black flex items-center justify-center font-display font-black text-lg border-2 border-black brutal-shadow-sm group-hover:bg-[#FFE600] transition-colors">
              R
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-base tracking-tighter text-white uppercase group-hover:text-[#FF5C58] transition-colors">
                RECON <span className="text-[#8E95A5] text-xs font-mono font-normal">// LMS</span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#8E95A5] hidden sm:block">
                Academic & Arena Platform
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Quick Search Trigger */}
        <div className="flex items-center">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#0B0D10] border-2 border-[#282F40] hover:border-white text-[#8E95A5] hover:text-white transition-all text-xs font-mono select-none brutal-btn"
          >
            <Search className="w-3.5 h-3.5 text-[#FFE600]" />
            <span>Quick Search...</span>
          </button>
        </div>

        {/* Right: Actions, Notifications, User Profile & Log Out */}
        <div className="flex items-center gap-2">
          {/* Notification Button */}
          <button
            onClick={() => setIsNotificationDrawerOpen(true)}
            className="relative p-2 bg-[#0B0D10] border-2 border-[#282F40] hover:border-white text-white transition-colors brutal-btn"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF5C58] text-white text-[9px] font-mono font-bold flex items-center justify-center border border-black animate-pulse">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 bg-[#0B0D10] border-2 border-[#282F40] hover:border-[#FFE600] text-white transition-colors brutal-btn"
            title="Toggle theme contrast"
          >
            {themeMode === "dark" ? (
              <Sun className="w-4 h-4 text-[#FFE600]" />
            ) : (
              <Moon className="w-4 h-4 text-[#2D7FF9]" />
            )}
          </button>

          {/* User Profile Quick Link */}
          <Link
            href="/profile"
            className="flex items-center gap-2 pl-2 border-l border-[#282F40] hover:opacity-90"
          >
            <div className="w-8 h-8 border-2 border-black overflow-hidden bg-[#2D7FF9] shrink-0 brutal-shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="font-display font-bold text-xs uppercase leading-tight text-white">
                {currentUser.name}
              </span>
              <span className={cn("font-mono text-[10px] font-bold", ratingInfo.colorClass)}>
                {currentUser.rating} · {ratingInfo.tier}
              </span>
            </div>
          </Link>

          {/* Explicit Sign Out Button */}
          <button
            onClick={logout}
            className="px-2.5 py-1.5 bg-[#0B0D10] border-2 border-[#282F40] hover:border-[#FF5C58] hover:text-[#FF5C58] text-[#8E95A5] transition-colors font-mono text-xs uppercase font-bold flex items-center gap-1.5 brutal-btn ml-1"
            title="Sign out of your account"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex w-full">
        {/* Left Desktop Sidebar - Sticky and locked to viewport height so bottom widgets remain permanently visible */}
        <aside className="hidden lg:flex w-64 flex-col bg-[#12151D] border-r-2 border-[#282F40] p-4 shrink-0 sticky top-16 h-[calc(100vh-4rem)] z-30 justify-between">
          <div className="space-y-4 overflow-y-auto overflow-x-hidden flex-1 min-h-0 pr-1">
            {/* Academic Status Card */}
            <div className="p-3 bg-[#0B0D10] border-2 border-[#282F40]">
              <div className="flex items-center justify-between font-mono text-[10px] text-[#8E95A5] uppercase">
                <span>Account Status</span>
                <span className="text-[#00E599] font-bold">VERIFIED</span>
              </div>
              <div className="mt-1 font-display font-bold text-sm text-white">
                {currentUser.department}
              </div>
              <div className="mt-2 flex items-center justify-between text-xs font-mono text-[#DCE2EE]">
                <span>Semester:</span>
                <span className="px-1.5 py-0.2 bg-[#FFE600] text-black font-bold">
                  TERM {selectedSemester}
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 font-display font-bold text-xs uppercase tracking-wide border-2 transition-all",
                      isActive
                        ? "bg-[#FF5C58] text-white border-black brutal-shadow-sm translate-x-1"
                        : "text-[#9DA7BC] hover:text-white bg-transparent border-transparent hover:border-[#282F40] hover:bg-[#1A1F2B]"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={cn(
                          "px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase",
                          item.badgeColor || "bg-[#282F40] text-[#DCE2EE]"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Sidebar Widgets - Permanently anchored to bottom-left */}
          <div className="space-y-2.5 pt-3 border-t-2 border-[#282F40] shrink-0 mt-3">
            {/* Daily Streak Flame */}
            <div className="p-2.5 bg-[#1A1F2B] border-2 border-[#282F40] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-[#FF5C58] border border-black flex items-center justify-center text-white shrink-0">
                  <Flame className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <div className="font-display font-black text-sm text-white">
                    {currentUser.streak} DAYS
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-[#8E95A5]">
                    Daily Streak
                  </div>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-[#FFE600]" />
            </div>

            {/* Contest Rating Widget */}
            <div className="p-2.5 bg-[#0B0D10] border-2 border-[#282F40]">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#8E95A5]">
                <span>Contest Rating</span>
                <span className={cn("font-bold", ratingInfo.colorClass)}>
                  {ratingInfo.tier}
                </span>
              </div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="font-mono text-xl font-bold text-white">
                  {currentUser.rating}
                </span>
                <span className="font-mono text-[10px] text-[#8E95A5]">
                  Peak: {currentUser.maxRating}
                </span>
              </div>
              <div className="mt-1 text-[10px] font-mono text-[#00E599] flex items-center gap-1">
                <span>Top #{currentUser.bestRank} rank</span>
                <span>·</span>
                <span>{currentUser.solvedCount} Solved</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/80"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-72 bg-[#12151D] border-r-2 border-white p-4 flex flex-col justify-between z-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b-2 border-[#282F40]">
                  <span className="font-display font-black text-lg text-white">
                    RECON LMS
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 bg-[#1A1F2B] border border-white text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center justify-between px-3 py-2.5 font-display font-bold text-sm uppercase tracking-wide border-2",
                          isActive
                            ? "bg-[#FF5C58] text-white border-black brutal-shadow-sm"
                            : "text-[#9DA7BC] hover:text-white bg-[#0D1017] border-[#282F40]"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="p-3 bg-[#0B0D10] border border-[#282F40] text-center font-mono text-xs">
                <p className="text-[#8E95A5]">Logged in as:</p>
                <p className="font-bold text-white uppercase">{currentUser.name}</p>
                <p className="text-[10px] text-[#FFE600] uppercase font-bold mt-1">
                  ROLE: {currentRole}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Center Page Content Area */}
        <main className="flex-1 flex flex-col min-w-0 p-4 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Global Modals */}
      <GlobalSearchModal />
      <NotificationDrawer />
    </div>
  );
}
