"use client";

import React, { useState, use } from "react";
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
  Sparkles,
} from "lucide-react";
import { useLMSStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ContestProblem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ contestId: string }>;
}

export default function ContestArenaPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { contestId } = resolvedParams;

  const { contests, submitContestCode } = useLMSStore();
  const contest = contests.find((c) => c.id === contestId);
  if (!contest) return notFound();

  const [selectedProblemIndex, setSelectedProblemIndex] = useState<string>("B");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("cpp");
  const [userCode, setUserCode] = useState<string>("");
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<{
    passed: boolean;
    message: string;
    points: number;
  } | null>(null);

  const activeProblem: ContestProblem =
    contest.problems.find((p) => p.index === selectedProblemIndex) ||
    contest.problems[0] || {
      id: "fallback",
      contestId: contest.id,
      index: "A",
      title: "Problem Statement",
      difficulty: "Easy",
      points: 500,
      timeLimitSec: 1.0,
      memoryLimitMB: 256,
      description: "Problem description will appear here.",
      inputFormat: "Input details",
      outputFormat: "Output details",
      sampleTests: [],
      starterCode: {},
    };

  // Sync starter code when problem or language changes
  React.useEffect(() => {
    const code =
      activeProblem.starterCode[selectedLanguage] ||
      activeProblem.starterCode.cpp ||
      `// Write solution for Problem ${activeProblem.index}: ${activeProblem.title}\n#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // Optimal algorithm goes here\n    return 0;\n}`;
    setUserCode(code);
    setSubmissionResult(null);
    setTestOutput(null);
  }, [activeProblem, selectedLanguage]);

  const handleRunSamples = () => {
    setIsRunningTests(true);
    setTestOutput(null);
    setTimeout(() => {
      setIsRunningTests(false);
      setTestOutput(
        "✓ Sample Test 1 Passed (0.012s)\n✓ Sample Test 2 Passed (0.014s)\n\nAll sample cases produced expected output."
      );
    }, 600);
  };

  const handleSubmit = () => {
    setIsRunningTests(true);
    setTimeout(() => {
      setIsRunningTests(false);
      const res = submitContestCode(
        contest.id,
        activeProblem.id,
        userCode,
        selectedLanguage
      );
      setSubmissionResult(res);
    }, 1000);
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto flex flex-col h-[calc(100vh-6rem)]">
      {/* Arena Navigation Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-[#282F40] shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/contests"
            className="p-1.5 bg-[#12151D] border border-[#282F40] hover:border-white text-[#8E95A5] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.2 bg-[#FF5C58] text-white font-mono font-bold text-[10px] uppercase">
                ARENA
              </span>
              <span className="font-mono text-xs text-white font-bold">
                {contest.title}
              </span>
            </div>
          </div>
        </div>

        {/* Live Timer & Stats */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-[#0B0D10] border-2 border-[#282F40] flex items-center gap-2 font-mono text-xs">
            <Clock className="w-3.5 h-3.5 text-[#FF5C58]" />
            <span className="text-[#8E95A5]">Time Remaining:</span>
            <span className="font-bold text-white">01:42:18</span>
          </div>

          <Link href="/contests?tab=leaderboard">
            <Button variant="outline" size="sm" className="font-mono text-xs">
              <Trophy className="w-3.5 h-3.5 mr-1" />
              Leaderboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Problem Tabs Navigation */}
      <div className="flex border-b-2 border-[#282F40] bg-[#12151D] shrink-0 overflow-x-auto">
        {contest.problems.map((prob) => {
          const isSelected = prob.index === selectedProblemIndex;
          return (
            <button
              key={prob.id}
              onClick={() => setSelectedProblemIndex(prob.index)}
              className={cn(
                "px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all border-r border-[#282F40] flex items-center gap-2 shrink-0",
                isSelected
                  ? "bg-[#FFE600] text-black border-b-2 border-black"
                  : "text-[#8E95A5] hover:text-white hover:bg-[#1A1F2B]"
              )}
            >
              <span>Problem {prob.index}</span>
              {prob.solved && (
                <span className="px-1 py-0.2 bg-[#00E599] text-black text-[9px]">
                  AC
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Split Main Workspace (Left: Statement, Right: Code IDE) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0 overflow-hidden">
        {/* LEFT COLUMN: Problem Statement */}
        <div className="bg-[#12151D] border-2 border-[#282F40] p-6 overflow-y-auto space-y-4">
          <div className="border-b-2 border-[#282F40] pb-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 bg-[#282F40] text-white font-mono text-xs font-bold">
                TASK {activeProblem.index} · {activeProblem.points} POINTS
              </span>
              <span
                className={cn(
                  "font-mono text-xs font-bold",
                  activeProblem.difficulty === "Easy"
                    ? "text-[#00E599]"
                    : activeProblem.difficulty === "Medium"
                    ? "text-[#FFE600]"
                    : "text-[#FF5C58]"
                )}
              >
                {activeProblem.difficulty} Difficulty
              </span>
            </div>
            <h2 className="font-display font-black text-xl text-white">
              {activeProblem.title}
            </h2>
            <div className="flex items-center gap-4 font-mono text-[11px] text-[#8E95A5]">
              <span>Time Limit: <strong className="text-white">{activeProblem.timeLimitSec}s</strong></span>
              <span>Memory: <strong className="text-white">{activeProblem.memoryLimitMB}MB</strong></span>
            </div>
          </div>

          {/* Statement Text */}
          <div className="space-y-3 font-mono text-xs text-[#DCE2EE] leading-relaxed">
            <div className="text-[#8E95A5] uppercase font-bold text-[11px]">
              Problem Statement:
            </div>
            <p className="whitespace-pre-line">{activeProblem.description}</p>

            <div className="pt-2 text-[#8E95A5] uppercase font-bold text-[11px]">
              Input Specification:
            </div>
            <p className="whitespace-pre-line">{activeProblem.inputFormat}</p>

            <div className="pt-2 text-[#8E95A5] uppercase font-bold text-[11px]">
              Output Specification:
            </div>
            <p className="whitespace-pre-line">{activeProblem.outputFormat}</p>
          </div>

          {/* Sample Test Cases */}
          <div className="space-y-3 pt-2">
            <div className="text-[#8E95A5] uppercase font-bold font-mono text-[11px]">
              Sample Test Cases:
            </div>

            {activeProblem.sampleTests.map((sample, sIndex) => (
              <div
                key={sIndex}
                className="bg-[#0B0D10] border-2 border-[#282F40] p-3 space-y-2 font-mono text-xs"
              >
                <div className="flex items-center justify-between text-[#8E95A5] text-[10px] pb-1 border-b border-[#282F40]">
                  <span>SAMPLE #{sIndex + 1}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(sample.input)}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    <Copy className="w-3 h-3" />
                    Copy Input
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-[10px] text-[#8E95A5] uppercase">Input:</div>
                    <pre className="p-2 bg-[#141822] text-[#00E599] border border-[#282F40] whitespace-pre overflow-x-auto">
                      {sample.input}
                    </pre>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#8E95A5] uppercase">Output:</div>
                    <pre className="p-2 bg-[#141822] text-white border border-[#282F40] whitespace-pre overflow-x-auto">
                      {sample.output}
                    </pre>
                  </div>
                </div>

                {sample.explanation && (
                  <p className="text-[11px] text-[#8E95A5] pt-1">
                    <strong>Note:</strong> {sample.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Code Editor & Execution Panel */}
        <div className="bg-[#12151D] border-2 border-[#282F40] flex flex-col overflow-hidden">
          {/* Editor Header */}
          <div className="p-3 bg-[#1A1F2B] border-b-2 border-[#282F40] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#FFE600]" />
              <span className="font-mono text-xs font-bold uppercase text-white">
                Solution Code Editor
              </span>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1 border border-[#384156] bg-[#0B0D10] p-0.5 font-mono text-xs">
              {(["cpp", "python", "typescript"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={cn(
                    "px-2 py-0.5 uppercase tracking-wider transition-colors",
                    selectedLanguage === lang
                      ? "bg-[#FFE600] text-black font-bold"
                      : "text-[#8E95A5] hover:text-white"
                  )}
                >
                  {lang === "cpp" ? "C++ 20" : lang === "python" ? "Python 3" : "TS"}
                </button>
              ))}
            </div>
          </div>

          {/* Code Textarea */}
          <div className="flex-1 relative bg-[#090B0F] p-4 min-h-[220px]">
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="w-full h-full bg-transparent text-[#00E599] font-mono text-xs outline-none resize-none leading-relaxed"
              spellCheck={false}
              autoComplete="off"
            />
          </div>

          {/* Test Runner & Submissions Panel */}
          <div className="p-4 bg-[#141822] border-t-2 border-[#282F40] space-y-3 shrink-0">
            {/* Output terminal */}
            {testOutput && (
              <div className="p-3 bg-[#0B0D10] border border-[#282F40] font-mono text-xs text-[#00E599] whitespace-pre-line">
                {testOutput}
              </div>
            )}

            {/* Submission result banner */}
            {submissionResult && (
              <div
                className={cn(
                  "p-3 border-2 font-mono text-xs flex items-center justify-between",
                  submissionResult.passed
                    ? "bg-[#00E599]/10 border-[#00E599] text-[#00E599]"
                    : "bg-[#FF5C58]/10 border-[#FF5C58] text-[#FF5C58]"
                )}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="font-bold uppercase">
                    {submissionResult.message}
                  </span>
                </div>
                <Badge variant="green" size="sm">
                  +{submissionResult.points} PTS
                </Badge>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <span className="font-mono text-xs text-[#8E95A5]">
                Compiled against GCC 13.2 / Python 3.12
              </span>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRunSamples}
                  disabled={isRunningTests}
                >
                  <Play className="w-3.5 h-3.5 mr-1" />
                  Run Sample Tests
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  onClick={handleSubmit}
                  disabled={isRunningTests}
                >
                  <Send className="w-3.5 h-3.5 mr-1" />
                  {isRunningTests ? "Evaluating..." : "Submit Solution →"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
