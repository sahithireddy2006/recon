"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  User,
  UserRole,
  Subject,
  Contest,
  NotificationItem,
} from "./types";
import {
  MOCK_USERS,
  MOCK_SUBJECTS,
  MOCK_CONTESTS,
  MOCK_NOTIFICATIONS,
} from "./mock-data";

interface LMSStoreContextType {
  currentUser: User;
  currentRole: UserRole;
  setRole: (role: UserRole) => Promise<void>;
  login: (identifier: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    name: string;
    handle: string;
    email: string;
    password: string;
    department?: string;
    semester?: number;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  selectedSemester: number;
  setSelectedSemester: (sem: number) => void;
  subjects: Subject[];
  markLessonComplete: (subjectId: string, lessonId: string) => Promise<void>;
  submitTestScore: (subjectId: string, testId: string, score: number) => Promise<void>;
  contests: Contest[];
  registerForContest: (contestId: string) => void;
  submitContestCode: (
    contestId: string,
    problemId: string,
    code: string,
    language: string
  ) => Promise<{ passed: boolean; message: string; points: number }>;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadNotificationsCount: number;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (open: boolean) => void;
  themeMode: "dark" | "light";
  toggleTheme: () => void;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  isDbConnected: boolean;
}

const LMSStoreContext = createContext<LMSStoreContextType | undefined>(undefined);

export function LMSProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS.student);
  const [currentRole, setCurrentRole] = useState<UserRole>("student");
  const [selectedSemester, setSelectedSemester] = useState<number>(4);
  const [subjects, setSubjects] = useState<Subject[]>(MOCK_SUBJECTS);
  const [contests, setContests] = useState<Contest[]>(MOCK_CONTESTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<"dark" | "light">("dark");
  const [isDbConnected, setIsDbConnected] = useState(true);

  // Sync state from active session in Neon DB
  const syncFromSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (!res.ok) return;
      const data = await res.json();
      if (data.authenticated && data.user) {
        setCurrentUser(data.user);
        setCurrentRole(data.user.role);
        setSelectedSemester(data.user.semester || 4);

        // Merge DB-persisted completed lessons
        if (data.completedLessons && Array.isArray(data.completedLessons)) {
          const completedSet = new Set(
            data.completedLessons.map(
              (l: { subjectId: string; lessonId: string }) => `${l.subjectId}_${l.lessonId}`
            )
          );

          setSubjects((prev) =>
            prev.map((sub) => {
              const updatedLessons = sub.lessons.map((les) => ({
                ...les,
                completed: completedSet.has(`${sub.id}_${les.id}`) || les.completed,
              }));
              const count = updatedLessons.filter((l) => l.completed).length;
              return {
                ...sub,
                lessons: updatedLessons,
                progressPercent: Math.round((count / updatedLessons.length) * 100),
              };
            })
          );
        }

        // Merge DB-persisted test scores
        if (data.testAttempts && Array.isArray(data.testAttempts)) {
          const scoreMap = new Map<string, number>();
          data.testAttempts.forEach((t: { testId: string; score: number }) => {
            if (!scoreMap.has(t.testId)) scoreMap.set(t.testId, t.score);
          });

          setSubjects((prev) =>
            prev.map((sub) => ({
              ...sub,
              tests: sub.tests.map((test) =>
                scoreMap.has(test.id)
                  ? { ...test, completed: true, userScore: scoreMap.get(test.id) }
                  : test
              ),
            }))
          );
        }
      }
    } catch (e) {
      console.warn("Could not sync session with Neon DB, using local store:", e);
    }
  }, []);

  useEffect(() => {
    syncFromSession();
  }, [syncFromSession]);

  // Login handler
  const login = async (identifier: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Authentication failed" };
      }
      setCurrentUser(data.user);
      setCurrentRole(data.user.role);
      setSelectedSemester(data.user.semester || 4);
      await syncFromSession();
      return { success: true };
    } catch (err) {
      return { success: false, error: "Network error connecting to database" };
    }
  };

  // Register handler
  const register = async (userData: {
    name: string;
    handle: string;
    email: string;
    password: string;
    department?: string;
    semester?: number;
  }) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Registration failed" };
      }
      setCurrentUser(data.user);
      setCurrentRole(data.user.role);
      setSelectedSemester(data.user.semester || 1);
      await syncFromSession();
      return { success: true };
    } catch (err) {
      return { success: false, error: "Network error during registration" };
    }
  };

  // Logout handler
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      // ignore
    }
    setCurrentRole("student");
    setCurrentUser(MOCK_USERS.student);
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  // Role switcher (switches active demo persona in DB)
  const setRole = async (role: UserRole) => {
    setCurrentRole(role);
    const target = MOCK_USERS[role] || MOCK_USERS.student;
    setCurrentUser(target);
    // Authenticate via DB
    try {
      await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: target.email, password: "password123" }),
      });
      await syncFromSession();
    } catch (e) {
      // ignore
    }
  };

  // Lesson completion (persists directly to Neon DB)
  const markLessonComplete = async (subjectId: string, lessonId: string) => {
    // 1. Optimistic update
    setSubjects((prev) =>
      prev.map((sub) => {
        if (sub.id !== subjectId) return sub;
        const updatedLessons = sub.lessons.map((l) =>
          l.id === lessonId ? { ...l, completed: true } : l
        );
        const count = updatedLessons.filter((l) => l.completed).length;
        return {
          ...sub,
          lessons: updatedLessons,
          progressPercent: Math.round((count / updatedLessons.length) * 100),
        };
      })
    );

    // 2. Persist to Neon DB
    try {
      await fetch("/api/lessons/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjectId, lessonId, userId: currentUser.id }),
      });
    } catch (e) {
      console.error("Failed to persist lesson progress to Neon DB:", e);
    }
  };

  // Test score submission (persists to Neon DB)
  const submitTestScore = async (subjectId: string, testId: string, score: number) => {
    setSubjects((prev) =>
      prev.map((sub) => {
        if (sub.id !== subjectId) return sub;
        return {
          ...sub,
          tests: sub.tests.map((t) =>
            t.id === testId ? { ...t, completed: true, userScore: score } : t
          ),
        };
      })
    );

    try {
      await fetch("/api/tests/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjectId,
          testId,
          score,
          passed: score >= 70,
          userId: currentUser.id,
        }),
      });
    } catch (e) {
      console.error("Failed to persist test attempt to Neon DB:", e);
    }
  };

  // Contest registration
  const registerForContest = (contestId: string) => {
    setContests((prev) =>
      prev.map((c) =>
        c.id === contestId
          ? { ...c, registered: true, participantsCount: c.participantsCount + 1 }
          : c
      )
    );
  };

  // Contest code submission (persists to Neon DB and updates user rating)
  const submitContestCode = async (
    contestId: string,
    problemId: string,
    code: string,
    language: string
  ) => {
    try {
      const res = await fetch("/api/contests/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contestId,
          problemId,
          code,
          language,
          userId: currentUser.id,
        }),
      });
      const data = await res.json();

      if (data.verdict === "ACCEPTED") {
        setContests((prev) =>
          prev.map((c) => {
            if (c.id !== contestId) return c;
            return {
              ...c,
              problems: c.problems.map((p) =>
                p.id === problemId ? { ...p, solved: true } : p
              ),
              leaderboard: c.leaderboard.map((lb) => {
                if (lb.userId === currentUser.id) {
                  return {
                    ...lb,
                    solvedCount: lb.solvedCount + 1,
                    rank: Math.max(1, lb.rank - 4),
                  };
                }
                return lb;
              }),
            };
          })
        );

        setCurrentUser((prev) => ({
          ...prev,
          solvedCount: prev.solvedCount + 1,
          rating: data.updatedRating || prev.rating + 25,
        }));

        return {
          passed: true,
          message: data.message || "ACCEPTED (0.04s, 12MB). +980 points awarded.",
          points: data.points || 980,
        };
      }

      return {
        passed: false,
        message: data.message || "Wrong Answer on test cases.",
        points: 0,
      };
    } catch (e) {
      return {
        passed: false,
        message: "Failed to connect to judging node database.",
        points: 0,
      };
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const updateUserProfile = async (data: Partial<User>) => {
    setCurrentUser((prev) => ({ ...prev, ...data }));
    try {
      await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, userId: currentUser.id }),
      });
    } catch (e) {
      console.error("Failed to update profile in Neon DB:", e);
    }
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <LMSStoreContext.Provider
      value={{
        currentUser,
        currentRole,
        setRole,
        login,
        register,
        logout,
        selectedSemester,
        setSelectedSemester,
        subjects,
        markLessonComplete,
        submitTestScore,
        contests,
        registerForContest,
        submitContestCode,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        unreadNotificationsCount,
        isSearchOpen,
        setIsSearchOpen,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        themeMode,
        toggleTheme,
        updateUserProfile,
        isDbConnected,
      }}
    >
      <div
        className={
          themeMode === "light"
            ? "light-theme min-h-screen bg-[#F4F4F0] text-black"
            : "dark-theme min-h-screen bg-[#0B0D10] text-[#F0F2F5]"
        }
      >
        {children}
      </div>
    </LMSStoreContext.Provider>
  );
}

export function useLMSStore() {
  const context = useContext(LMSStoreContext);
  if (!context) {
    throw new Error("useLMSStore must be used within an LMSProvider");
  }
  return context;
}
