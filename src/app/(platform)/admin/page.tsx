"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Users,
  BookOpen,
  Trophy,
  HelpCircle,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Server,
  Trash2,
  Edit2,
  Lock,
} from "lucide-react";
import { useLMSStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
  status: "Active" | "Suspended";
  termOrDept: string;
  lastLogin: string;
}

const INITIAL_USERS: ManagedUser[] = [
  {
    id: "u_1",
    name: "Alex Chen",
    email: "alex.chen@student.recon.edu",
    role: "student",
    status: "Active",
    termOrDept: "Semester 4 (CS)",
    lastLogin: "Just now",
  },
  {
    id: "u_2",
    name: "Dr. Marcus Vance",
    email: "marcus.vance@faculty.recon.edu",
    role: "teacher",
    status: "Active",
    termOrDept: "Faculty of CS",
    lastLogin: "14 mins ago",
  },
  {
    id: "u_3",
    name: "Prof. Elena Rostova",
    email: "elena.rostova@faculty.recon.edu",
    role: "teacher",
    status: "Active",
    termOrDept: "Systems Architecture",
    lastLogin: "2 hours ago",
  },
  {
    id: "u_4",
    name: "Eleanor Wright",
    email: "eleanor.wright@admin.recon.edu",
    role: "admin",
    status: "Active",
    termOrDept: "Platform Operations",
    lastLogin: "1 hour ago",
  },
  {
    id: "u_5",
    name: "Jordan Lee",
    email: "jordan.lee@student.recon.edu",
    role: "student",
    status: "Suspended",
    termOrDept: "Semester 2 (Math)",
    lastLogin: "4 days ago",
  },
];

export default function AdminPage() {
  const { subjects, contests, currentRole, setRole } = useLMSStore();
  const [activeTab, setActiveTab] = useState<"users" | "curriculum" | "contests" | "logs">("users");

  // Users State
  const [userList, setUserList] = useState<ManagedUser[]>(INITIAL_USERS);
  const [userSearch, setUserSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "student" as "student" | "teacher",
    department: "",
  });

  // Fetch real users from Neon DB
  const loadUsersFromDb = React.useCallback(async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        if (data.users && Array.isArray(data.users)) {
          setUserList(
            data.users.map((u: { id: string; name: string; email: string; role: string; department: string; status: string; semester: number }) => ({
              id: u.id,
              name: u.name,
              email: u.email,
              role: u.role as "student" | "teacher" | "admin",
              status: (u.status as "Active" | "Suspended") || "Active",
              termOrDept: u.role === "student" ? `Semester ${u.semester} (${u.department})` : u.department,
              lastLogin: "Active",
            }))
          );
        }
      }
    } catch (e) {
      console.error("Failed to load users from DB:", e);
    }
  }, []);

  React.useEffect(() => {
    loadUsersFromDb();
  }, [loadUsersFromDb]);

  // Curriculum State
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({
    code: "",
    name: "",
    semester: 4,
    credits: 4,
    instructor: "",
  });

  const filteredUsers = userList.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (res.ok) {
        await loadUsersFromDb();
      }
    } catch (e) {
      console.error("Error creating user:", e);
    }

    setIsAddUserOpen(false);
    setNewUser({ name: "", email: "", role: "student", department: "" });
  };

  const toggleUserStatus = async (id: string) => {
    const target = userList.find((u) => u.id === id);
    const nextStatus = target?.status === "Active" ? "Suspended" : "Active";

    setUserList((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: nextStatus } : u))
    );

    try {
      await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: id, status: nextStatus }),
      });
    } catch (e) {
      console.error("Error toggling user status in Neon DB:", e);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Admin Notice Banner if not logged as admin */}
      {currentRole !== "admin" && (
        <div className="p-4 bg-[#FF5C58] text-white border-2 border-black brutal-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-black" />
            <span className="font-mono text-xs font-bold uppercase text-black">
              ADMINISTRATIVE CONTROL PANEL · SWITCH TO ADMIN PERSONA TO ENABLE EDIT ACTIONS
            </span>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setRole("admin")}
            className="text-black"
          >
            Switch to Admin Persona
          </Button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-[#282F40]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#FF5C58] text-white font-mono font-bold text-xs uppercase tracking-wider">
              OPERATIONS CONSOLE
            </span>
            <span className="font-mono text-xs text-[#8E95A5]">
              Governance, Academic Structure & Contest Orchestration
            </span>
          </div>
          <h1 className="font-display font-black text-2xl lg:text-3xl uppercase tracking-tight text-white mt-1">
            Admin Panel
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsAddUserOpen(true)}
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add New User
          </Button>
        </div>
      </div>

      {/* OPERATIONAL METRICS QUAD */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="dark" hasShadow className="p-4">
          <div className="flex items-center justify-between text-[#8E95A5] font-mono text-[10px] uppercase">
            <span>Registered Students</span>
            <Users className="w-4 h-4 text-[#FFE600]" />
          </div>
          <div className="mt-2 font-display font-black text-2xl text-white">
            3,420
          </div>
          <div className="mt-1 font-mono text-[10px] text-[#00E599]">
            +18 enrolled this week
          </div>
        </Card>

        <Card variant="dark" hasShadow className="p-4">
          <div className="flex items-center justify-between text-[#8E95A5] font-mono text-[10px] uppercase">
            <span>Faculty & Teachers</span>
            <ShieldCheck className="w-4 h-4 text-[#2D7FF9]" />
          </div>
          <div className="mt-2 font-display font-black text-2xl text-white">
            48
          </div>
          <div className="mt-1 font-mono text-[10px] text-[#8E95A5]">
            4 Active departments
          </div>
        </Card>

        <Card variant="dark" hasShadow className="p-4">
          <div className="flex items-center justify-between text-[#8E95A5] font-mono text-[10px] uppercase">
            <span>Active Courses</span>
            <BookOpen className="w-4 h-4 text-[#FF5C58]" />
          </div>
          <div className="mt-2 font-display font-black text-2xl text-white">
            {subjects.length}
          </div>
          <div className="mt-1 font-mono text-[10px] text-[#FFE600]">
            Term 1 through 8
          </div>
        </Card>

        <Card variant="dark" hasShadow className="p-4">
          <div className="flex items-center justify-between text-[#8E95A5] font-mono text-[10px] uppercase">
            <span>Live Contest Turnout</span>
            <Trophy className="w-4 h-4 text-[#00E599]" />
          </div>
          <div className="mt-2 font-display font-black text-2xl text-white">
            1,284
          </div>
          <div className="mt-1 font-mono text-[10px] text-[#00E599]">
            Round #48 In Progress
          </div>
        </Card>
      </div>

      {/* TABS */}
      <div className="flex border-b-2 border-[#282F40] bg-[#12151D] p-1 font-mono text-xs overflow-x-auto">
        <button
          onClick={() => setActiveTab("users")}
          className={cn(
            "px-4 py-2.5 font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 brutal-btn",
            activeTab === "users"
              ? "bg-[#FFE600] text-black border border-black shadow-[2px_2px_0px_#000]"
              : "text-[#8E95A5] hover:text-white"
          )}
        >
          <Users className="w-4 h-4" />
          <span>User Directory ({userList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("curriculum")}
          className={cn(
            "px-4 py-2.5 font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 brutal-btn",
            activeTab === "curriculum"
              ? "bg-[#FFE600] text-black border border-black shadow-[2px_2px_0px_#000]"
              : "text-[#8E95A5] hover:text-white"
          )}
        >
          <BookOpen className="w-4 h-4" />
          <span>Academic Curriculum</span>
        </button>

        <button
          onClick={() => setActiveTab("contests")}
          className={cn(
            "px-4 py-2.5 font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 brutal-btn",
            activeTab === "contests"
              ? "bg-[#FFE600] text-black border border-black shadow-[2px_2px_0px_#000]"
              : "text-[#8E95A5] hover:text-white"
          )}
        >
          <Trophy className="w-4 h-4" />
          <span>Contest Governance</span>
        </button>

        <button
          onClick={() => setActiveTab("logs")}
          className={cn(
            "px-4 py-2.5 font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 brutal-btn",
            activeTab === "logs"
              ? "bg-[#FFE600] text-black border border-black shadow-[2px_2px_0px_#000]"
              : "text-[#8E95A5] hover:text-white"
          )}
        >
          <Server className="w-4 h-4" />
          <span>System Audit Logs</span>
        </button>
      </div>

      {/* TAB: USERS DIRECTORY */}
      {activeTab === "users" && (
        <div className="space-y-4">
          {/* Filter and Search Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-[#12151D] border-2 border-[#282F40]">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#8E95A5]" />
              <input
                type="text"
                placeholder="Search by name, email, or handle..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full bg-[#0B0D10] text-white border border-[#282F40] px-3 py-1.5 font-mono text-xs outline-none"
              />
            </div>

            <div className="flex items-center gap-1 font-mono text-xs">
              <span className="text-[#8E95A5] uppercase mr-1">Role:</span>
              {(["all", "student", "teacher", "admin"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={cn(
                    "px-2.5 py-1 uppercase font-bold transition-all",
                    roleFilter === r
                      ? "bg-[#FF5C58] text-white border border-black"
                      : "text-[#8E95A5] hover:text-white bg-[#0B0D10]"
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User & Identity</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="w-28">Role</TableHead>
                <TableHead>Department / Term</TableHead>
                <TableHead className="w-28 text-center">Status</TableHead>
                <TableHead className="w-32 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="font-display font-bold text-white text-xs">
                      {user.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-[#8E95A5]">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "px-2 py-0.5 font-bold uppercase text-[10px]",
                        user.role === "admin"
                          ? "bg-[#FF5C58] text-white"
                          : user.role === "teacher"
                          ? "bg-[#2D7FF9] text-white"
                          : "bg-[#FFE600] text-black"
                      )}
                    >
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-white">
                    {user.termOrDept}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={cn(
                        "px-2 py-0.5 font-bold uppercase text-[10px]",
                        user.status === "Active"
                          ? "bg-[#00E599]/20 text-[#00E599] border border-[#00E599]"
                          : "bg-[#FF5C58]/20 text-[#FF5C58] border border-[#FF5C58]"
                      )}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant={user.status === "Active" ? "outline" : "secondary"}
                      size="sm"
                      onClick={() => toggleUserStatus(user.id)}
                      className="text-[10px]"
                    >
                      {user.status === "Active" ? "Suspend" : "Activate"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* TAB: CURRICULUM */}
      {activeTab === "curriculum" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-sm uppercase text-white tracking-wider">
              Department Subjects & Credit Weightings
            </h3>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsAddSubjectOpen(true)}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add New Course Code
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Code</TableHead>
                <TableHead>Course Title</TableHead>
                <TableHead className="w-20 text-center">Term</TableHead>
                <TableHead className="w-20 text-center">Credits</TableHead>
                <TableHead>Assigned Instructor</TableHead>
                <TableHead className="w-28 text-center">Lessons</TableHead>
                <TableHead className="w-28 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell className="font-bold text-[#FFE600]">
                    {sub.code}
                  </TableCell>
                  <TableCell className="font-bold text-white">
                    {sub.name}
                  </TableCell>
                  <TableCell className="text-center text-white">
                    Sem {sub.semester}
                  </TableCell>
                  <TableCell className="text-center text-[#00E599] font-bold">
                    {sub.credits} CR
                  </TableCell>
                  <TableCell className="text-[#8E95A5]">
                    {sub.instructorName}
                  </TableCell>
                  <TableCell className="text-center text-[#DCE2EE]">
                    {sub.lessons.length} Modules
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="text-[10px]">
                      Edit Syllabus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* TAB: CONTESTS */}
      {activeTab === "contests" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-sm uppercase text-white tracking-wider">
              Scheduled Competitive Rounds
            </h3>
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Schedule New Round
            </Button>
          </div>

          <div className="space-y-3">
            {contests.map((c) => (
              <div
                key={c.id}
                className="p-5 bg-[#12151D] border-2 border-[#282F40] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white font-display text-base">
                      {c.title}
                    </span>
                    <Badge
                      variant={c.status === "active" ? "coral" : c.status === "upcoming" ? "blue" : "default"}
                      size="sm"
                    >
                      {c.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="font-mono text-xs text-[#8E95A5] mt-1">
                    {c.durationMinutes} mins · {c.problemsCount} Problems · {c.participantsCount} Coders registered
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Manage Problem Set
                  </Button>
                  <Button variant="secondary" size="sm">
                    Recalculate Ratings
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: AUDIT LOGS */}
      {activeTab === "logs" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-sm uppercase text-white tracking-wider">
              System Audit & Telemetry Stream
            </h3>
            <span className="font-mono text-xs text-[#00E599] flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-none bg-[#00E599] animate-ping" />
              LIVE TELEMETRY
            </span>
          </div>

          <div className="p-4 bg-[#090B0F] border-2 border-[#282F40] font-mono text-xs space-y-2 text-[#8E95A5] max-h-96 overflow-y-auto">
            <div className="text-white">
              <span className="text-[#00E599]">[15:42:01 UTC]</span> Judge node #3: Accepted solution for task w48_prob_a by alex_chen (0.04s, 12MB).
            </div>
            <div>
              <span className="text-[#FFE600]">[15:39:24 UTC]</span> Auth server: User alex_chen initialized Google OAuth single sign-on session.
            </div>
            <div>
              <span className="text-[#2D7FF9]">[15:30:12 UTC]</span> Assessment engine: Graded CS203 Mid-Term exam for 48 enrolled candidates.
            </div>
            <div>
              <span className="text-[#FF5C58]">[15:15:00 UTC]</span> Contest scheduler: Weekly Algo Challenge #48 round unlocked for submissions.
            </div>
            <div>
              <span className="text-[#8E95A5]">[14:55:18 UTC]</span> Content daemon: Dr. Marcus Vance updated study material &quot;CS201 Lecture Notes&quot;.
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD USER */}
      <Modal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        title="Provision New Platform User"
        description="Creates an authorized account for faculty or student"
        maxWidth="md"
      >
        <form onSubmit={handleCreateUser} className="space-y-4">
          <div className="space-y-1">
            <label className="font-mono text-xs uppercase text-[#8E95A5]">Full Name</label>
            <Input
              required
              placeholder="e.g. Dr. Jordan Rivera"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono text-xs uppercase text-[#8E95A5]">Official Email</label>
            <Input
              required
              type="email"
              placeholder="e.g. jordan.rivera@recon.edu"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono text-xs uppercase text-[#8E95A5]">Role Assignment</label>
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              <button
                type="button"
                onClick={() => setNewUser({ ...newUser, role: "student" })}
                className={cn(
                  "p-2.5 border font-bold uppercase",
                  newUser.role === "student"
                    ? "bg-[#FFE600] text-black border-black"
                    : "bg-[#0B0D10] text-[#8E95A5] border-[#282F40]"
                )}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setNewUser({ ...newUser, role: "teacher" })}
                className={cn(
                  "p-2.5 border font-bold uppercase",
                  newUser.role === "teacher"
                    ? "bg-[#2D7FF9] text-white border-black"
                    : "bg-[#0B0D10] text-[#8E95A5] border-[#282F40]"
                )}
              >
                Teacher / Faculty
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-mono text-xs uppercase text-[#8E95A5]">Department / Term</label>
            <Input
              placeholder="e.g. Department of Computer Science"
              value={newUser.department}
              onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAddUserOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Confirm & Provision User
            </Button>
          </div>
        </form>
      </Modal>

      {/* MODAL: ADD SUBJECT */}
      <Modal
        isOpen={isAddSubjectOpen}
        onClose={() => setIsAddSubjectOpen(false)}
        title="Register New Course Code"
        description="Expand department curriculum catalog"
        maxWidth="md"
      >
        <div className="space-y-4 font-mono text-xs">
          <div className="space-y-1">
            <label className="uppercase text-[#8E95A5]">Course Code</label>
            <Input
              placeholder="e.g. CS305"
              value={newSubject.code}
              onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="uppercase text-[#8E95A5]">Subject Title</label>
            <Input
              placeholder="e.g. Distributed Consensus Systems"
              value={newSubject.name}
              onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="uppercase text-[#8E95A5]">Term Semester</label>
              <Input
                type="number"
                value={newSubject.semester}
                onChange={(e) => setNewSubject({ ...newSubject, semester: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1">
              <label className="uppercase text-[#8E95A5]">Credits</label>
              <Input
                type="number"
                value={newSubject.credits}
                onChange={(e) => setNewSubject({ ...newSubject, credits: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddSubjectOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                alert(`Registered new course code: ${newSubject.code}`);
                setIsAddSubjectOpen(false);
              }}
            >
              Register Course
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
