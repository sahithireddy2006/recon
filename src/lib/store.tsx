"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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
  setRole: (role: UserRole) => void;
  selectedSemester: number;
  setSelectedSemester: (sem: number) => void;
  subjects: Subject[];
  markLessonComplete: (subjectId: string, lessonId: string) => void;
  submitTestScore: (subjectId: string, testId: string, score: number) => void;
  contests: Contest[];
  registerForContest: (contestId: string) => void;
  submitContestCode: (
    contestId: string,
    problemId: string,
    code: string,
    language: string
  ) => { passed: boolean; message: string; points: number };
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
  updateUserProfile: (data: Partial<User>) => void;
}

const LMSStoreContext = createContext<LMSStoreContextType | undefined>(
  undefined
);

export function LMSProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRoleState] = useState<UserRole>("student");
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS.student);
  const [selectedSemester, setSelectedSemester] = useState<number>(4);
  const [subjects, setSubjects] = useState<Subject[]>(MOCK_SUBJECTS);
  const [contests, setContests] = useState<Contest[]>(MOCK_CONTESTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    MOCK_NOTIFICATIONS
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<"dark" | "light">("dark");

  const setRole = (role: UserRole) => {
    setCurrentRoleState(role);
    setCurrentUser(MOCK_USERS[role] || MOCK_USERS.student);
  };

  const markLessonComplete = (subjectId: string, lessonId: string) => {
    setSubjects((prev) =>
      prev.map((sub) => {
        if (sub.id !== subjectId) return sub;
        const updatedLessons = sub.lessons.map((l) =>
          l.id === lessonId ? { ...l, completed: true } : l
        );
        const completedCount = updatedLessons.filter((l) => l.completed).length;
        const progressPercent = Math.round(
          (completedCount / updatedLessons.length) * 100
        );
        return {
          ...sub,
          lessons: updatedLessons,
          progressPercent,
        };
      })
    );
  };

  const submitTestScore = (
    subjectId: string,
    testId: string,
    score: number
  ) => {
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
  };

  const registerForContest = (contestId: string) => {
    setContests((prev) =>
      prev.map((c) =>
        c.id === contestId
          ? {
              ...c,
              registered: true,
              participantsCount: c.participantsCount + 1,
            }
          : c
      )
    );
  };

  const submitContestCode = (
    contestId: string,
    problemId: string,
    _code: string,
    _language: string
  ) => {
    // In our live interactive arena, simulate test verdicts
    const isAccepted = true;
    if (isAccepted) {
      setContests((prev) =>
        prev.map((c) => {
          if (c.id !== contestId) return c;
          const updatedProblems = c.problems.map((p) =>
            p.id === problemId ? { ...p, solved: true } : p
          );
          // Update leaderboard entry for alex_chen
          const updatedLeaderboard = c.leaderboard.map((lb) => {
            if (lb.userId === currentUser.id) {
              const currentStatus = lb.problemStatus["B"] || {
                solved: true,
                points: 980,
                timeMinutes: 28,
                attempts: 1,
              };
              return {
                ...lb,
                solvedCount: lb.solvedCount + 1,
                rank: Math.max(1, lb.rank - 5),
                problemStatus: {
                  ...lb.problemStatus,
                  B: { ...currentStatus, solved: true, points: 980 },
                },
              };
            }
            return lb;
          });
          return {
            ...c,
            problems: updatedProblems,
            leaderboard: updatedLeaderboard,
          };
        })
      );
      // Boost user rating slightly
      setCurrentUser((prev) => ({
        ...prev,
        solvedCount: prev.solvedCount + 1,
        rating: prev.rating + 28,
      }));
      return {
        passed: true,
        message: "ACCEPTED on 18/18 test cases (0.04s, 12MB). +980 points awarded.",
        points: 980,
      };
    }
    return {
      passed: false,
      message: "Wrong Answer on test 4.",
      points: 0,
    };
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

  const updateUserProfile = (data: Partial<User>) => {
    setCurrentUser((prev) => ({ ...prev, ...data }));
  };

  // Keyboard shortcut: Cmd/Ctrl + K opens global search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <LMSStoreContext.Provider
      value={{
        currentUser,
        currentRole,
        setRole,
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
