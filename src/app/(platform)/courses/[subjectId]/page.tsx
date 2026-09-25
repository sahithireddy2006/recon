"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  BookOpen,
  FileText,
  HelpCircle,
  Download,
  Clock,
  Check,
  Play,
  RotateCcw,
  Sparkles,
  Lock,
  Unlock,
  AlertCircle,
} from "lucide-react";
import { useLMSStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Lesson, SubjectTest } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ subjectId: string }>;
}

export default function SubjectWorkspacePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { subjectId } = resolvedParams;

  const {
    subjects,
    markLessonComplete,
    submitTestScore,
    currentRole,
  } = useLMSStore();

  const [activeTab, setActiveTab] = useState<"lessons" | "materials" | "tests">("lessons");
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Test Runner state
  const [activeTest, setActiveTest] = useState<SubjectTest | null>(null);
  const [testAnswers, setTestAnswers] = useState<Record<string, number>>({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [testScoreResult, setTestScoreResult] = useState<{
    score: number;
    passed: boolean;
    total: number;
  } | null>(null);

  const subject = subjects.find((s) => s.id === subjectId);
  if (!subject) return notFound();

  const isTeacherOrAdmin = currentRole === "teacher" || currentRole === "admin";
  const completedLessonsCount = subject.lessons.filter((l) => l.completed).length;

  // Handle test submission
  const handleTestSubmit = () => {
    if (!activeTest) return;
    let correct = 0;
    activeTest.questions.forEach((q) => {
      if (testAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    const calculatedScore = Math.round((correct / activeTest.questions.length) * 100);
    const passed = calculatedScore >= activeTest.passingScore;

    setTestScoreResult({
      score: calculatedScore,
      passed,
      total: activeTest.questions.length,
    });
    setTestSubmitted(true);
    submitTestScore(subject.id, activeTest.id, calculatedScore);
  };

  const startTest = (test: SubjectTest) => {
    setActiveTest(test);
    setTestAnswers({});
    setTestSubmitted(false);
    setTestScoreResult(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Back Link & Header */}
      <div>
        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8E95A5] hover:text-white uppercase tracking-wider mb-3 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Courses</span>
        </Link>

        <div className="bg-[#12151D] border-2 border-white brutal-shadow p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b-2 border-[#282F40]">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 bg-[#FF5C58] text-white font-mono font-bold text-xs uppercase">
                  {subject.code}
                </span>
                <span className="font-mono text-xs text-[#8E95A5]">
                  TERM {subject.semester} · {subject.credits} CREDITS
                </span>
                <Badge variant={subject.progressPercent === 100 ? "green" : "yellow"} size="sm">
                  {subject.progressPercent}% MASTERY
                </Badge>
              </div>

              <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                {subject.name}
              </h1>

              <p className="font-mono text-xs text-[#9DA7BC] max-w-3xl leading-relaxed">
                {subject.description}
              </p>
            </div>

            <div className="p-4 bg-[#0B0D10] border-2 border-[#282F40] min-w-[240px] space-y-2 font-mono">
              <div className="flex items-center justify-between text-xs text-[#8E95A5]">
                <span>Course Instructor:</span>
                <span className="text-[#00E599] font-bold">ONLINE</span>
              </div>
              <div className="font-display font-bold text-sm text-white">
                {subject.instructorName}
              </div>
              <div className="text-[11px] text-[#8E95A5] truncate">
                {subject.instructorEmail}
              </div>
              {isTeacherOrAdmin && (
                <div className="mt-2 pt-2 border-t border-[#282F40] text-[10px] text-[#2D7FF9] font-bold">
                  ✓ INSTRUCTOR EDIT ACCESS ENABLED
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar Strip */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-4">
              <span className="text-[#8E95A5]">
                Completed Lessons: <strong className="text-white">{completedLessonsCount}/{subject.lessons.length}</strong>
              </span>
              <span className="text-[#8E95A5]">
                Assessments: <strong className="text-white">{subject.tests.length}</strong>
              </span>
            </div>

            <div className="w-full sm:w-64 bg-[#0B0D10] h-3 border border-[#282F40]">
              <div
                className="bg-[#FFE600] h-full transition-all"
                style={{ width: `${subject.progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b-2 border-[#282F40] bg-[#12151D] p-1 font-mono text-xs">
        <button
          onClick={() => setActiveTab("lessons")}
          className={cn(
            "px-5 py-2.5 font-bold uppercase tracking-wider transition-all flex items-center gap-2 brutal-btn",
            activeTab === "lessons"
              ? "bg-[#FFE600] text-black border border-black shadow-[2px_2px_0px_#000]"
              : "text-[#8E95A5] hover:text-white"
          )}
        >
          <BookOpen className="w-4 h-4" />
          <span>Syllabus & Lessons ({subject.lessons.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("materials")}
          className={cn(
            "px-5 py-2.5 font-bold uppercase tracking-wider transition-all flex items-center gap-2 brutal-btn",
            activeTab === "materials"
              ? "bg-[#FFE600] text-black border border-black shadow-[2px_2px_0px_#000]"
              : "text-[#8E95A5] hover:text-white"
          )}
        >
          <FileText className="w-4 h-4" />
          <span>Study Materials ({subject.materials.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("tests")}
          className={cn(
            "px-5 py-2.5 font-bold uppercase tracking-wider transition-all flex items-center gap-2 brutal-btn",
            activeTab === "tests"
              ? "bg-[#FFE600] text-black border border-black shadow-[2px_2px_0px_#000]"
              : "text-[#8E95A5] hover:text-white"
          )}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Assessments & Tests ({subject.tests.length})</span>
        </button>
      </div>

      {/* TAB 1: LESSONS & MODULES */}
      {activeTab === "lessons" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-base uppercase text-white tracking-wider">
              Module Curriculum Breakdown
            </h2>
            <span className="font-mono text-xs text-[#8E95A5]">
              Click any lesson to open full notes and code
            </span>
          </div>

          <div className="space-y-3">
            {subject.lessons.map((lesson, idx) => (
              <div
                key={lesson.id}
                className={cn(
                  "p-4 border-2 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4",
                  lesson.completed
                    ? "bg-[#12151D] border-[#282F40]"
                    : "bg-[#161B26] border-white/70 hover:border-[#FFE600] brutal-shadow-sm"
                )}
              >
                <div className="flex items-start gap-3.5">
                  <button
                    onClick={() => markLessonComplete(subject.id, lesson.id)}
                    className={cn(
                      "w-7 h-7 flex items-center justify-center border-2 mt-0.5 shrink-0 transition-colors brutal-btn",
                      lesson.completed
                        ? "bg-[#00E599] border-black text-black"
                        : "bg-[#0B0D10] border-[#384156] text-[#8E95A5] hover:border-white"
                    )}
                    title={lesson.completed ? "Completed" : "Mark as completed"}
                  >
                    {lesson.completed ? <Check className="w-4 h-4 stroke-[3]" /> : <span className="font-mono text-xs">{idx + 1}</span>}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase text-[#8E95A5] tracking-wider">
                        {lesson.module}
                      </span>
                      {lesson.completed && (
                        <span className="px-1.5 py-0.2 bg-[#00E599]/20 border border-[#00E599] text-[#00E599] font-mono text-[9px] font-bold">
                          COMPLETED
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-base text-white mt-0.5">
                      {lesson.title}
                    </h3>
                    <p className="font-mono text-xs text-[#9DA7BC] mt-1 max-w-2xl">
                      {lesson.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                  <span className="font-mono text-xs text-[#8E95A5] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{lesson.durationMinutes} min</span>
                  </span>

                  <Button
                    variant={lesson.completed ? "outline" : "secondary"}
                    size="sm"
                    onClick={() => setSelectedLesson(lesson)}
                  >
                    <span>{lesson.completed ? "Review Lesson" : "Study Lesson"}</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: STUDY MATERIALS */}
      {activeTab === "materials" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-base uppercase text-white tracking-wider">
              Downloadable Academic Materials & Formulae
            </h2>
            <span className="font-mono text-xs text-[#8E95A5]">
              Verified by Course Instructor
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subject.materials.map((mat) => (
              <div
                key={mat.id}
                className="p-5 bg-[#12151D] border-2 border-[#282F40] hover:border-white transition-all space-y-3 brutal-shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <Badge variant="yellow" size="sm">
                      {mat.category}
                    </Badge>
                    <span className="font-mono text-xs text-[#8E95A5]">
                      {mat.fileSize}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-white mt-2">
                    {mat.title}
                  </h3>
                  <div className="flex items-center justify-between font-mono text-[11px] text-[#8E95A5] mt-2 pt-2 border-t border-[#282F40]">
                    <span>Uploaded: {mat.uploadDate}</span>
                    <span>{mat.downloads} Downloads</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => alert(`Simulated downloading: ${mat.title}`)}
                >
                  <Download className="w-4 h-4" />
                  <span>Download Document ({mat.fileSize})</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ASSESSMENTS & TESTS */}
      {activeTab === "tests" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-base uppercase text-white tracking-wider">
              Course Assessments & Graded Quizzes
            </h2>
            <span className="font-mono text-xs text-[#8E95A5]">
              Timed MCQ & Conceptual Questions
            </span>
          </div>

          <div className="space-y-4">
            {subject.tests.map((test) => (
              <div
                key={test.id}
                className="p-6 bg-[#12151D] border-2 border-[#282F40] hover:border-white transition-all brutal-shadow-sm"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-[#FF5C58] text-white font-mono font-bold text-[10px] uppercase">
                        QUIZ
                      </span>
                      {test.completed && (
                        <span className="px-2 py-0.5 bg-[#00E599] text-black font-mono font-bold text-[10px] uppercase">
                          PASSED: {test.userScore}%
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-lg text-white">
                      {test.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-[#8E95A5]">
                      <span>Duration: <strong className="text-white">{test.durationMinutes} mins</strong></span>
                      <span>Questions: <strong className="text-white">{test.questions.length} MCQs</strong></span>
                      <span>Passing Threshold: <strong className="text-white">{test.passingScore}%</strong></span>
                      <span>Attempts: <strong className="text-white">{isTeacherOrAdmin ? "Unlimited (Instructor)" : `${test.maxAttempts} max`}</strong></span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-3">
                    {test.completed && test.userScore !== undefined ? (
                      <div className="text-right font-mono mr-2">
                        <div className="text-[10px] text-[#8E95A5] uppercase">Your Grade</div>
                        <div className="font-display font-black text-2xl text-[#00E599]">
                          {test.userScore}%
                        </div>
                      </div>
                    ) : null}

                    <Button
                      variant={test.completed ? "outline" : "secondary"}
                      size="md"
                      onClick={() => startTest(test)}
                    >
                      <span>{test.completed ? "Retake Assessment" : "Start Assessment Now"}</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: LESSON VIEWER */}
      {selectedLesson && (
        <Modal
          isOpen={!!selectedLesson}
          onClose={() => setSelectedLesson(null)}
          title={selectedLesson.title}
          description={`${selectedLesson.module} · ${selectedLesson.durationMinutes} min reading`}
          maxWidth="4xl"
        >
          <div className="space-y-6">
            <div className="p-4 bg-[#0B0D10] border border-[#282F40] font-mono text-xs text-[#9DA7BC]">
              <strong className="text-white uppercase block mb-1">Lesson Overview:</strong>
              {selectedLesson.summary}
            </div>

            <div className="prose prose-invert max-w-none text-sm font-sans space-y-4 text-[#DCE2EE]">
              <div className="whitespace-pre-line leading-relaxed font-mono text-xs">
                {selectedLesson.content}
              </div>
            </div>

            {selectedLesson.codeSnippet && (
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs text-[#8E95A5]">
                  <span>Canonical Implementation ({selectedLesson.codeLanguage?.toUpperCase()}):</span>
                  <span>Read-only reference</span>
                </div>
                <pre className="p-4 bg-[#0B0D10] border-2 border-[#282F40] font-mono text-xs text-[#00E599] overflow-x-auto">
                  <code>{selectedLesson.codeSnippet}</code>
                </pre>
              </div>
            )}

            <div className="pt-4 border-t-2 border-[#282F40] flex items-center justify-between">
              <span className="font-mono text-xs text-[#8E95A5]">
                Status: {selectedLesson.completed ? "Completed" : "In Progress"}
              </span>

              <Button
                variant={selectedLesson.completed ? "outline" : "primary"}
                size="md"
                onClick={() => {
                  markLessonComplete(subject.id, selectedLesson.id);
                  setSelectedLesson(null);
                }}
              >
                {selectedLesson.completed ? "Keep as Completed" : "Mark Lesson as Completed ✓"}
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL: TEST RUNNER */}
      {activeTest && (
        <Modal
          isOpen={!!activeTest}
          onClose={() => setActiveTest(null)}
          title={`Assessment: ${activeTest.title}`}
          description={`Time limit: ${activeTest.durationMinutes} mins · Pass criteria: ${activeTest.passingScore}%`}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            {/* If test was submitted, show scorecard */}
            {testSubmitted && testScoreResult ? (
              <div className="p-6 bg-[#0B0D10] border-2 border-white space-y-4 text-center">
                <div className="font-mono text-xs uppercase text-[#8E95A5]">
                  Assessment Result
                </div>
                <div className="font-display font-black text-4xl text-white">
                  {testScoreResult.score}%
                </div>
                <div
                  className={cn(
                    "inline-block px-3 py-1 font-mono text-xs font-bold uppercase",
                    testScoreResult.passed
                      ? "bg-[#00E599] text-black"
                      : "bg-[#FF5C58] text-white"
                  )}
                >
                  {testScoreResult.passed ? "PASSED THRESHOLD" : "DID NOT PASS"}
                </div>
                <p className="font-mono text-xs text-[#8E95A5]">
                  Score recorded in your academic profile. You can retake to improve standing.
                </p>

                <div className="pt-3 flex justify-center gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setActiveTest(null)}
                  >
                    Close & Return to Subject
                  </Button>
                </div>
              </div>
            ) : (
              /* Active test form */
              <div className="space-y-6">
                {activeTest.questions.map((q, qIndex) => (
                  <div
                    key={q.id}
                    className="p-4 bg-[#0B0D10] border-2 border-[#282F40] space-y-3"
                  >
                    <div className="flex items-center justify-between font-mono text-xs text-[#8E95A5]">
                      <span>QUESTION {qIndex + 1} OF {activeTest.questions.length}</span>
                      <span>Single Choice</span>
                    </div>

                    <p className="font-display font-bold text-sm text-white">
                      {q.question}
                    </p>

                    <div className="space-y-2 pt-1">
                      {q.options.map((opt, optIndex) => {
                        const isSelected = testAnswers[q.id] === optIndex;
                        return (
                          <label
                            key={optIndex}
                            onClick={() =>
                              setTestAnswers((prev) => ({
                                ...prev,
                                [q.id]: optIndex,
                              }))
                            }
                            className={cn(
                              "flex items-center gap-3 p-3 border cursor-pointer font-mono text-xs transition-all",
                              isSelected
                                ? "bg-[#FFE600] text-black font-bold border-black brutal-shadow-sm"
                                : "bg-[#161B26] text-white border-[#282F40] hover:border-white"
                            )}
                          >
                            <input
                              type="radio"
                              name={q.id}
                              checked={isSelected}
                              onChange={() => {}}
                              className="accent-black"
                            />
                            <span>{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t-2 border-[#282F40] flex items-center justify-between">
                  <div className="font-mono text-xs text-[#8E95A5]">
                    {Object.keys(testAnswers).length} of {activeTest.questions.length} answered
                  </div>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleTestSubmit}
                    disabled={Object.keys(testAnswers).length === 0}
                  >
                    Submit Assessment Now →
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
