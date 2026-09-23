export type UserRole = "student" | "teacher" | "admin";

export interface User {
  id: string;
  name: string;
  handle: string;
  role: UserRole;
  email: string;
  avatar: string;
  bio: string;
  rating: number;
  maxRating: number;
  streak: number;
  solvedCount: number;
  isPublic: boolean;
  semester: number;
  department: string;
  bestRank: number;
  accuracy: number;
}

export interface Lesson {
  id: string;
  subjectId: string;
  title: string;
  module: string;
  order: number;
  durationMinutes: number;
  completed: boolean;
  summary: string;
  content: string;
  codeSnippet?: string;
  codeLanguage?: string;
}

export interface StudyMaterial {
  id: string;
  subjectId: string;
  title: string;
  category: "PDF Notes" | "Lecture Slides" | "Cheat Sheet" | "Formula Guide" | "Reference Spec";
  fileSize: string;
  uploadDate: string;
  downloads: number;
  url: string;
}

export interface TestQuestion {
  id: string;
  question: string;
  codeBlock?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface SubjectTest {
  id: string;
  subjectId: string;
  title: string;
  durationMinutes: number;
  passingScore: number;
  maxAttempts: number;
  completed: boolean;
  userScore?: number;
  questions: TestQuestion[];
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  semester: number;
  credits: number;
  instructorName: string;
  instructorEmail: string;
  description: string;
  progressPercent: number;
  color: "coral" | "yellow" | "blue" | "charcoal";
  lessons: Lesson[];
  materials: StudyMaterial[];
  tests: SubjectTest[];
}

export interface ContestProblem {
  id: string;
  contestId: string;
  index: "A" | "B" | "C" | "D" | "E";
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
  timeLimitSec: number;
  memoryLimitMB: number;
  description: string;
  inputFormat: string;
  outputFormat: string;
  sampleTests: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: Record<string, string>;
  solved?: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  handle: string;
  rating: number;
  solvedCount: number;
  penaltyTime: number;
  problemStatus: Record<
    string,
    {
      solved: boolean;
      points: number;
      timeMinutes: number;
      attempts: number;
    }
  >;
}

export interface Contest {
  id: string;
  title: string;
  code: string;
  type: "Weekly Contest" | "Bi-Weekly Speedrun" | "Semester Championship";
  status: "active" | "upcoming" | "past";
  startTime: string;
  endTime: string;
  durationMinutes: number;
  participantsCount: number;
  problemsCount: number;
  registered: boolean;
  problems: ContestProblem[];
  leaderboard: LeaderboardEntry[];
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  read: boolean;
  type: "test" | "contest" | "announcement" | "course";
  link: string;
}

export interface HeatmapDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface RatingHistoryPoint {
  contestTitle: string;
  date: string;
  rating: number;
  delta: number;
  rank: number;
}
