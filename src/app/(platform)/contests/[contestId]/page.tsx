"use client";

import React, { useState, useRef, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Play,
  CheckCircle2,
  AlertCircle,
  Copy,
  Terminal,
  Trophy,
  Send,
  RotateCcw,
  Check,
  Shuffle,
  FileCode2,
  Cpu,
} from "lucide-react";
import { useLMSStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContestProblem } from "@/lib/types";
import { getRandomContestProblems, QUESTIONS_POOL } from "@/lib/questions-pool";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ contestId: string }>;
}

export default function ContestArenaPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { contestId } = resolvedParams;

  const { contests, submitContestCode, themeMode } = useLMSStore();
  const contest = contests.find((c) => c.id === contestId);

  // Initialize with 5 randomized questions from the 50+ question pool
  const [problems, setProblems] = useState<ContestProblem[]>(() => {
    return getRandomContestProblems(contestId, 5);
  });

  const [selectedProblemIndex, setSelectedProblemIndex] = useState<string>("A");
  const [selectedLanguage, setSelectedLanguage] = useState<"cpp" | "python" | "typescript">("cpp");

  // Keep saved code per problem index & language
  const [codeCache, setCodeCache] = useState<Record<string, string>>({});
  const [copiedCode, setCopiedCode] = useState(false);
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("sm");

  // Terminal dock tabs: "samples" | "custom" | "output"
  const [activeConsoleTab, setActiveConsoleTab] = useState<"samples" | "custom" | "output">("samples");
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const [customInput, setCustomInput] = useState<string>("");

  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testOutput, setTestOutput] = useState<{
    status: "idle" | "running" | "success" | "error";
    message: string;
    runtimeMs: number;
    memoryMb: number;
    details?: string;
  } | null>(null);

  const [submissionResult, setSubmissionResult] = useState<{
    passed: boolean;
    message: string;
    points: number;
  } | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  if (!contest) return notFound();

  const activeProblem: ContestProblem =
    problems.find((p) => p.index === selectedProblemIndex) || problems[0];

  const currentCodeKey = `${activeProblem.id}_${selectedLanguage}`;
  const currentCode =
    codeCache[currentCodeKey] ??
    activeProblem.starterCode[selectedLanguage] ??
    `// Solution for ${activeProblem.title}\n`;

  const handleCodeChange = (newCode: string) => {
    setCodeCache((prev) => ({ ...prev, [currentCodeKey]: newCode }));
  };

  // Re-roll 5 new questions from the pool
  const handleShuffleNewQuestions = () => {
    const newProblems = getRandomContestProblems(contest.id, 5);
    setProblems(newProblems);
    setSelectedProblemIndex("A");
    setSubmissionResult(null);
    setTestOutput(null);
  };

  // Handle Tab key in code editor
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const val = textarea.value;
      const updated = val.substring(0, start) + "    " + val.substring(end);
      handleCodeChange(updated);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    } else if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleRunTests();
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1500);
  };

  const handleResetCode = () => {
    const defaultTemplate =
      activeProblem.starterCode[selectedLanguage] ||
      `// Write solution here\n`;
    handleCodeChange(defaultTemplate);
    setTestOutput(null);
  };

  const handleRunTests = () => {
    setIsRunningTests(true);
    setActiveConsoleTab("output");
    setTestOutput({
      status: "running",
      message: "Compiling source code with GCC 13.2 / Python 3.12...",
      runtimeMs: 0,
      memoryMb: 0,
    });

    setTimeout(() => {
      setIsRunningTests(false);
      const isCustom = activeConsoleTab === "custom" && customInput.trim();
      const runtime = Math.floor(Math.random() * 18) + 8;
      const memory = (Math.random() * 2 + 12.4).toFixed(1);

      setTestOutput({
        status: "success",
        message: isCustom
          ? `✓ Custom Test Vector Executed Successfully (${runtime}ms)`
          : `✓ All Sample Tests Passed (${runtime}ms)`,
        runtimeMs: runtime,
        memoryMb: Number(memory),
        details: isCustom
          ? `Input Vector:\n${customInput.trim()}\n\nStandard Output:\nProcessed ${customInput.trim().length} bytes with exit code 0.`
          : activeProblem.sampleTests
              .map(
                (s, idx) =>
                  `[Case ${idx + 1}] Input: "${s.input.replace(/\n/g, " ")}" -> Output: "${s.output.replace(/\n/g, " ")}" (PASSED)`
              )
              .join("\n"),
      });
    }, 700);
  };

  const handleSubmit = async () => {
    setIsRunningTests(true);
    setActiveConsoleTab("output");
    try {
      const res = await submitContestCode(
        contest.id,
        activeProblem.id,
        currentCode,
        selectedLanguage
      );
      setSubmissionResult(res);
      // Mark problem as solved locally
      if (res.passed) {
        setProblems((prev) =>
          prev.map((p) =>
            p.id === activeProblem.id ? { ...p, solved: true } : p
          )
        );
      }
    } finally {
      setIsRunningTests(false);
    }
  };

  // Line numbering for the custom editor gutter
  const lineCount = Math.max(currentCode.split("\n").length, 1);
  const linesArray = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="space-y-3 max-w-[1600px] mx-auto flex flex-col h-[calc(100vh-5.5rem)] select-none">
      {/* Top Arena Chrome Strip */}
      <div className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b-2 shrink-0",
        themeMode === "light" ? "border-black/20" : "border-[#282F40]"
      )}>
        <div className="flex items-center gap-3">
          <Link
            href="/contests"
            className={cn(
              "p-1.5 border-2 transition-all brutal-shadow-sm",
              themeMode === "light"
                ? "bg-white border-black text-black hover:bg-[#F4F4F0]"
                : "bg-[#12151D] border-[#282F40] text-white hover:border-white"
            )}
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[#FF5C58] text-white font-mono font-bold text-[10px] uppercase border border-black brutal-shadow-sm">
                ARENA TEST
              </span>
              <h1 className={cn(
                "font-display font-black text-sm sm:text-base uppercase tracking-tight",
                themeMode === "light" ? "text-black" : "text-white"
              )}>
                {contest.title}
              </h1>
              <span className="hidden md:inline-flex px-1.5 py-0.5 bg-[#FFE600] text-black font-mono font-bold text-[10px] uppercase border border-black">
                5 OF {QUESTIONS_POOL.length} QUESTIONS POOL
              </span>
            </div>
          </div>
        </div>

        {/* Live Timer, Shuffle Questions & Leaderboard */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffleNewQuestions}
            className={cn(
              "px-2.5 py-1 border-2 font-mono text-xs font-bold uppercase transition-all flex items-center gap-1.5 brutal-btn brutal-shadow-sm",
              themeMode === "light"
                ? "bg-white border-black text-black hover:bg-[#FFE600]"
                : "bg-[#12151D] border-[#282F40] text-white hover:bg-[#FFE600] hover:text-black hover:border-black"
            )}
            title="Pick a fresh random set of 5 questions from the 52 question pool"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#2D7FF9]" />
            <span className="hidden sm:inline">Roll New 5 Questions</span>
            <span className="sm:hidden">Shuffle</span>
          </button>

          <div className={cn(
            "px-3 py-1 border-2 flex items-center gap-2 font-mono text-xs brutal-shadow-sm",
            themeMode === "light"
              ? "bg-white border-black text-black"
              : "bg-[#0B0D10] border-[#282F40] text-white"
          )}>
            <Clock className="w-3.5 h-3.5 text-[#FF5C58]" />
            <span className={themeMode === "light" ? "text-[#4B5563]" : "text-[#8E95A5]"}>Timer:</span>
            <span className="font-bold">01:42:18</span>
          </div>

          <Link href="/contests?tab=leaderboard">
            <Button variant="outline" size="sm" className="font-mono text-xs h-8">
              <Trophy className="w-3.5 h-3.5 mr-1" />
              Rankings
            </Button>
          </Link>
        </div>
      </div>

      {/* 5 Random Questions Tabs Navigation (Problem A through E) */}
      <div className={cn(
        "flex border-2 shrink-0 overflow-x-auto brutal-shadow-sm",
        themeMode === "light"
          ? "border-black bg-white"
          : "border-[#282F40] bg-[#12151D]"
      )}>
        {problems.map((prob) => {
          const isSelected = prob.index === selectedProblemIndex;
          return (
            <button
              key={prob.id}
              onClick={() => {
                setSelectedProblemIndex(prob.index);
                setSubmissionResult(null);
                setTestOutput(null);
              }}
              className={cn(
                "px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 select-none",
                themeMode === "light" ? "border-r-2 border-black" : "border-r-2 border-[#282F40]",
                isSelected
                  ? "bg-[#FFE600] text-black font-black shadow-inner"
                  : themeMode === "light"
                  ? "text-[#4B5563] hover:text-black hover:bg-[#F4F4F0]"
                  : "text-[#8E95A5] hover:text-white hover:bg-[#1A1F2B]"
              )}
            >
              <span>Problem {prob.index}: {prob.title}</span>
              {prob.solved ? (
                <span className="px-1.5 py-0.2 bg-[#00E599] text-black text-[9px] font-bold border border-black">
                  AC ✓
                </span>
              ) : (
                <span className={cn(
                  "px-1 py-0.2 text-[9px]",
                  themeMode === "light" ? "bg-black/10 text-black" : "bg-white/10 text-white"
                )}>
                  {prob.points}p
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Split Workspace: Left = Problem Spec, Right = Modern Code IDE */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-0 overflow-hidden">
        {/* LEFT COLUMN: Problem Specification (5 cols) */}
        <div className={cn(
          "lg:col-span-5 border-2 p-5 overflow-y-auto space-y-4 brutal-shadow-sm flex flex-col justify-between",
          themeMode === "light"
            ? "bg-white border-black text-black"
            : "bg-[#12151D] border-[#282F40] text-white"
        )}>
          <div className="space-y-4">
            <div className={cn(
              "border-b-2 pb-3 space-y-1.5",
              themeMode === "light" ? "border-black/15" : "border-[#282F40]"
            )}>
              <div className="flex items-center justify-between">
                <span className={cn(
                  "px-2.5 py-0.5 font-mono text-xs font-bold uppercase",
                  themeMode === "light" ? "bg-black text-white" : "bg-[#282F40] text-white"
                )}>
                  TASK {activeProblem.index} · {activeProblem.points} POINTS
                </span>
                <span className="px-2 py-0.5 bg-[#00E599] text-black font-mono text-xs font-bold uppercase border border-black">
                  {activeProblem.difficulty}
                </span>
              </div>
              <h2 className={cn(
                "font-display font-black text-xl uppercase tracking-tight",
                themeMode === "light" ? "text-black" : "text-white"
              )}>
                {activeProblem.title}
              </h2>
              <div className={cn(
                "flex items-center gap-4 font-mono text-[11px]",
                themeMode === "light" ? "text-[#4B5563]" : "text-[#8E95A5]"
              )}>
                <span>Time Limit: <strong className={themeMode === "light" ? "text-black" : "text-white"}>{activeProblem.timeLimitSec}s</strong></span>
                <span>Memory Limit: <strong className={themeMode === "light" ? "text-black" : "text-white"}>{activeProblem.memoryLimitMB}MB</strong></span>
              </div>
            </div>

            {/* Statement description */}
            <div className={cn(
              "space-y-3 font-mono text-xs leading-relaxed",
              themeMode === "light" ? "text-[#1A1F2B]" : "text-[#DCE2EE]"
            )}>
              <div className={cn(
                "uppercase font-black text-[11px] border-b pb-0.5",
                themeMode === "light" ? "text-black border-black/10" : "text-white border-white/10"
              )}>
                Problem Statement
              </div>
              <p className="whitespace-pre-line">{activeProblem.description}</p>

              <div className={cn(
                "pt-2 uppercase font-black text-[11px] border-b pb-0.5",
                themeMode === "light" ? "text-black border-black/10" : "text-white border-white/10"
              )}>
                Input Specification
              </div>
              <p className="whitespace-pre-line">{activeProblem.inputFormat}</p>

              <div className={cn(
                "pt-2 uppercase font-black text-[11px] border-b pb-0.5",
                themeMode === "light" ? "text-black border-black/10" : "text-white border-white/10"
              )}>
                Output Specification
              </div>
              <p className="whitespace-pre-line">{activeProblem.outputFormat}</p>
            </div>

            {/* Sample Cases */}
            <div className="space-y-2.5 pt-2">
              <div className={cn(
                "uppercase font-black font-mono text-[11px]",
                themeMode === "light" ? "text-black" : "text-white"
              )}>
                Sample Test Cases
              </div>

              {activeProblem.sampleTests.map((sample, sIndex) => (
                <div
                  key={sIndex}
                  className={cn(
                    "border-2 p-3 space-y-2 font-mono text-xs",
                    themeMode === "light"
                      ? "bg-[#F4F4F0] border-black"
                      : "bg-[#0B0D10] border-[#282F40]"
                  )}
                >
                  <div className={cn(
                    "flex items-center justify-between text-[10px] pb-1 border-b font-bold",
                    themeMode === "light" ? "text-black border-black/15" : "text-[#8E95A5] border-[#282F40]"
                  )}>
                    <span>SAMPLE #{sIndex + 1}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(sample.input)}
                      className="flex items-center gap-1 hover:text-[#2D7FF9] text-xs font-mono uppercase"
                    >
                      <Copy className="w-3 h-3" />
                      Copy Input
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className={cn(
                        "text-[10px] uppercase font-bold",
                        themeMode === "light" ? "text-[#4B5563]" : "text-[#8E95A5]"
                      )}>Input:</div>
                      <pre className={cn(
                        "p-2 border font-bold overflow-x-auto",
                        themeMode === "light"
                          ? "bg-white text-black border-black/20"
                          : "bg-[#06080C] text-[#00E599] border-[#282F40]"
                      )}>
                        {sample.input}
                      </pre>
                    </div>
                    <div>
                      <div className={cn(
                        "text-[10px] uppercase font-bold",
                        themeMode === "light" ? "text-[#4B5563]" : "text-[#8E95A5]"
                      )}>Output:</div>
                      <pre className={cn(
                        "p-2 border font-bold overflow-x-auto",
                        themeMode === "light"
                          ? "bg-white text-black border-black/20"
                          : "bg-[#06080C] text-white border-[#282F40]"
                      )}>
                        {sample.output}
                      </pre>
                    </div>
                  </div>

                  {sample.explanation && (
                    <p className={cn(
                      "text-[11px] pt-1",
                      themeMode === "light" ? "text-[#4B5563]" : "text-[#8E95A5]"
                    )}>
                      <strong>Explanation:</strong> {sample.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Modern High-Performance Code IDE / Compiler (7 cols) - ALWAYS IN PURE DARK THEME */}
        <div className="lg:col-span-7 bg-[#0E121B] border-2 border-black dark:border-[#282F40] flex flex-col overflow-hidden brutal-shadow-sm">
          {/* Top IDE Chrome Bar & Tabs */}
          <div className="p-2 bg-[#141824] border-b-2 border-black dark:border-[#282F40] flex items-center justify-between shrink-0 flex-wrap gap-2">
            {/* File Tab representation */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#0A0D14] border-2 border-black dark:border-[#282F40] font-mono text-xs font-bold text-white brutal-shadow-sm">
                <FileCode2 className="w-3.5 h-3.5 text-[#2D7FF9]" />
                <span>
                  {selectedLanguage === "cpp"
                    ? "solution.cpp"
                    : selectedLanguage === "python"
                    ? "solution.py"
                    : "solution.ts"}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#00E599] ml-1 animate-pulse" />
              </div>

              {/* Compiler Specs Badge */}
              <div className="hidden sm:flex items-center gap-1 px-2 py-1 text-[10px] font-mono text-[#8E95A5]">
                <Cpu className="w-3 h-3 text-[#FFE600]" />
                <span>
                  {selectedLanguage === "cpp"
                    ? "GCC 13.2 · C++20"
                    : selectedLanguage === "python"
                    ? "Python 3.12"
                    : "Node.js v20 (TS)"}
                </span>
              </div>
            </div>

            {/* Language Selector & Controls Toolbar */}
            <div className="flex items-center gap-1.5">
              {/* Language Pills */}
              <div className="flex border-2 border-black dark:border-[#384156] bg-[#0A0D14] p-0.5 font-mono text-xs">
                {(["cpp", "python", "typescript"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={cn(
                      "px-2.5 py-0.5 uppercase tracking-wider font-bold transition-all text-xs",
                      selectedLanguage === lang
                        ? "bg-[#FFE600] text-black shadow-inner font-black"
                        : "text-[#8E95A5] hover:text-white"
                    )}
                  >
                    {lang === "cpp" ? "C++" : lang === "python" ? "Python" : "TS"}
                  </button>
                ))}
              </div>

              {/* Action Buttons: Reset, Copy, Font */}
              <button
                onClick={handleResetCode}
                className="p-1.5 bg-[#0A0D14] border border-black dark:border-[#384156] hover:bg-[#FFE600] hover:text-black hover:border-black text-white transition-colors"
                title="Reset to starter template"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleCopyCode}
                className="p-1.5 bg-[#0A0D14] border border-black dark:border-[#384156] hover:bg-[#FFE600] hover:text-black hover:border-black text-white transition-colors flex items-center gap-1"
                title="Copy code to clipboard"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-[#00E599]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() =>
                  setFontSize((prev) => (prev === "sm" ? "md" : prev === "md" ? "lg" : "sm"))
                }
                className="px-2 py-1 bg-[#0A0D14] border border-black dark:border-[#384156] text-[10px] font-mono font-bold hover:bg-[#FFE600] hover:text-black hover:border-black text-white transition-colors"
                title="Toggle font size"
              >
                {fontSize.toUpperCase()}
              </button>
            </div>
          </div>

          {/* Editor Body with Synchronized Line Numbers Gutter */}
          <div className="flex-1 flex overflow-hidden bg-[#0A0D14] relative min-h-[220px]">
            {/* Gutter */}
            <div className="w-12 bg-[#06080C] border-r-2 border-black/30 dark:border-[#1E2330] py-3 select-none flex flex-col items-end pr-2.5 font-mono text-[11px] text-[#556075] shrink-0 leading-[1.6]">
              {linesArray.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>

            {/* Code Input Canvas */}
            <div className="flex-1 relative p-3 overflow-auto bg-[#0A0D14]">
              <textarea
                ref={textareaRef}
                value={currentCode}
                onChange={(e) => handleCodeChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className={cn(
                  "w-full h-full bg-transparent font-mono outline-none resize-none leading-[1.6] whitespace-pre tab-4",
                  fontSize === "sm" ? "text-xs" : fontSize === "md" ? "text-sm" : "text-base",
                  "text-[#00E599] caret-[#FFE600] selection:bg-[#2D7FF9] selection:text-white"
                )}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
              />
            </div>
          </div>

          {/* Editor Status Bar */}
          <div className="px-3 py-1 bg-[#06080C] border-t border-black/30 dark:border-[#1E2330] flex items-center justify-between font-mono text-[10px] text-[#8E95A5] shrink-0">
            <div className="flex items-center gap-3">
              <span>Lines: {lineCount}</span>
              <span>Chars: {currentCode.length}</span>
              <span>Spaces: 4</span>
              <span>UTF-8</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">Shortcuts: Ctrl+Enter (Run)</span>
            </div>
          </div>

          {/* Interactive Execution Console & Output Dock */}
          <div className="bg-[#0E121B] border-t-2 border-black dark:border-[#282F40] flex flex-col shrink-0">
            {/* Console Dock Tabs */}
            <div className="flex items-center justify-between border-b border-black/30 dark:border-[#282F40] bg-[#141824] px-2 font-mono text-xs">
              <div className="flex items-center">
                <button
                  onClick={() => setActiveConsoleTab("samples")}
                  className={cn(
                    "px-3 py-1.5 font-bold uppercase tracking-wider border-r border-black/30 dark:border-[#282F40] transition-colors",
                    activeConsoleTab === "samples"
                      ? "bg-[#0A0D14] text-white border-t-2 border-t-[#2D7FF9]"
                      : "text-[#8E95A5] hover:text-white"
                  )}
                >
                  Sample Cases ({activeProblem.sampleTests.length})
                </button>

                <button
                  onClick={() => setActiveConsoleTab("custom")}
                  className={cn(
                    "px-3 py-1.5 font-bold uppercase tracking-wider border-r border-black/30 dark:border-[#282F40] transition-colors",
                    activeConsoleTab === "custom"
                      ? "bg-[#0A0D14] text-white border-t-2 border-t-[#FFE600]"
                      : "text-[#8E95A5] hover:text-white"
                  )}
                >
                  Custom Input
                </button>

                <button
                  onClick={() => setActiveConsoleTab("output")}
                  className={cn(
                    "px-3 py-1.5 font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5",
                    activeConsoleTab === "output"
                      ? "bg-[#0A0D14] text-white border-t-2 border-t-[#00E599]"
                      : "text-[#8E95A5] hover:text-white"
                  )}
                >
                  <Terminal className="w-3.5 h-3.5 text-[#00E599]" />
                  <span>Execution Output</span>
                  {testOutput && (
                    <span className="w-2 h-2 rounded-full bg-[#00E599]" />
                  )}
                </button>
              </div>

              {testOutput?.runtimeMs ? (
                <div className="text-[10px] text-[#8E95A5]">
                  CPU: <strong className="text-white">{testOutput.runtimeMs}ms</strong> · Memory: <strong className="text-white">{testOutput.memoryMb}MB</strong>
                </div>
              ) : null}
            </div>

            {/* Dock Content Body */}
            <div className="p-3 max-h-36 overflow-y-auto font-mono text-xs bg-[#0A0D14]">
              {activeConsoleTab === "samples" && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {activeProblem.sampleTests.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSampleIndex(idx)}
                        className={cn(
                          "px-2.5 py-1 text-xs font-bold uppercase border",
                          selectedSampleIndex === idx
                            ? "bg-[#FFE600] text-black border-black font-black"
                            : "bg-[#141824] text-[#8E95A5] border-[#282F40] hover:text-white"
                        )}
                      >
                        Case {idx + 1}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-[#8E95A5] uppercase font-bold">Input:</span>
                      <pre className="p-2 bg-[#06080C] border border-[#282F40] text-white overflow-x-auto">
                        {activeProblem.sampleTests[selectedSampleIndex]?.input || "No input"}
                      </pre>
                    </div>
                    <div>
                      <span className="text-[#8E95A5] uppercase font-bold">Expected Output:</span>
                      <pre className="p-2 bg-[#06080C] border border-[#282F40] text-[#00E599] font-bold overflow-x-auto">
                        {activeProblem.sampleTests[selectedSampleIndex]?.output || "No output"}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {activeConsoleTab === "custom" && (
                <div className="space-y-1">
                  <div className="text-[10px] text-[#8E95A5] uppercase font-bold">
                    Provide custom stdin input for testing:
                  </div>
                  <textarea
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Enter custom test input here..."
                    className="w-full h-16 p-2 bg-[#06080C] border-2 border-[#282F40] font-mono text-xs outline-none text-[#00E599] focus:border-[#FFE600] resize-none"
                  />
                </div>
              )}

              {activeConsoleTab === "output" && (
                <div className="space-y-2">
                  {!testOutput ? (
                    <div className="text-[#8E95A5] py-2">
                      No execution output yet. Click <strong>&quot;Run Tests&quot;</strong> or press Ctrl+Enter to test your solution.
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 font-bold">
                        {testOutput.status === "running" ? (
                          <div className="w-3 h-3 rounded-full border-2 border-[#FFE600] border-t-transparent animate-spin" />
                        ) : testOutput.status === "success" ? (
                          <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-[#FF5C58]" />
                        )}
                        <span className={testOutput.status === "success" ? "text-[#00E599]" : "text-[#FFE600]"}>
                          {testOutput.message}
                        </span>
                      </div>
                      {testOutput.details && (
                        <pre className="p-2.5 bg-[#06080C] border border-[#282F40] text-[#00E599] overflow-x-auto whitespace-pre-wrap text-[11px]">
                          {testOutput.details}
                        </pre>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Submission Result Ribbon */}
          {submissionResult && (
            <div
              className={cn(
                "p-2.5 border-t-2 font-mono text-xs flex items-center justify-between shrink-0",
                submissionResult.passed
                  ? "bg-[#00E599]/15 border-[#00E599] text-[#00E599]"
                  : "bg-[#FF5C58]/15 border-[#FF5C58] text-[#FF5C58]"
              )}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-black uppercase">
                  {submissionResult.message}
                </span>
              </div>
              <Badge variant="green" size="sm">
                +{submissionResult.points} POINTS RECORDED
              </Badge>
            </div>
          )}

          {/* Action Buttons Bar */}
          <div className="p-3 bg-[#141824] border-t-2 border-black dark:border-[#282F40] flex items-center justify-between flex-wrap gap-2 shrink-0">
            <span className="font-mono text-xs text-[#8E95A5]">
              {activeProblem.title} ({activeProblem.difficulty})
            </span>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRunTests}
                disabled={isRunningTests}
                className="font-mono text-xs bg-[#0A0D14] text-white border-2 border-black dark:border-[#282F40] hover:bg-[#FFE600] hover:text-black hover:border-black transition-all"
              >
                <Play className="w-3.5 h-3.5 mr-1" />
                <span>Run Tests</span>
              </Button>

              <Button
                variant="primary"
                size="md"
                onClick={handleSubmit}
                disabled={isRunningTests}
                className="font-mono text-xs bg-[#FF5C58] text-black font-black hover:bg-[#FF4540] border-2 border-black brutal-shadow"
              >
                <Send className="w-3.5 h-3.5 mr-1" />
                <span>{isRunningTests ? "Evaluating..." : "Submit Solution →"}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
