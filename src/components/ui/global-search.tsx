"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, BookOpen, Trophy, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import { Modal } from "./modal";
import { useLMSStore } from "@/lib/store";

export function GlobalSearchModal() {
  const { isSearchOpen, setIsSearchOpen, subjects, contests } = useLMSStore();
  const [query, setQuery] = useState("");
  const router = useRouter();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const hits: {
      id: string;
      title: string;
      category: "Subject" | "Lesson" | "Material" | "Test" | "Contest";
      subtitle: string;
      url: string;
      icon: React.ComponentType<{ className?: string }>;
    }[] = [];

    // Search subjects
    subjects.forEach((sub) => {
      if (
        sub.name.toLowerCase().includes(q) ||
        sub.code.toLowerCase().includes(q) ||
        sub.description.toLowerCase().includes(q)
      ) {
        hits.push({
          id: `sub_${sub.id}`,
          title: `${sub.code} — ${sub.name}`,
          category: "Subject",
          subtitle: `Semester ${sub.semester} · ${sub.instructorName}`,
          url: `/courses/${sub.id}`,
          icon: BookOpen,
        });
      }

      // Search lessons
      sub.lessons.forEach((les) => {
        if (
          les.title.toLowerCase().includes(q) ||
          les.module.toLowerCase().includes(q) ||
          les.summary.toLowerCase().includes(q)
        ) {
          hits.push({
            id: `les_${les.id}`,
            title: les.title,
            category: "Lesson",
            subtitle: `${sub.code} · ${les.module} · ${les.durationMinutes} min`,
            url: `/courses/${sub.id}?lesson=${les.id}`,
            icon: CheckCircle2,
          });
        }
      });

      // Search materials
      sub.materials.forEach((mat) => {
        if (
          mat.title.toLowerCase().includes(q) ||
          mat.category.toLowerCase().includes(q)
        ) {
          hits.push({
            id: `mat_${mat.id}`,
            title: mat.title,
            category: "Material",
            subtitle: `${sub.code} · ${mat.category} (${mat.fileSize})`,
            url: `/courses/${sub.id}?tab=materials`,
            icon: FileText,
          });
        }
      });

      // Search tests
      sub.tests.forEach((t) => {
        if (t.title.toLowerCase().includes(q)) {
          hits.push({
            id: `t_${t.id}`,
            title: t.title,
            category: "Test",
            subtitle: `${sub.code} · ${t.durationMinutes} min quiz`,
            url: `/courses/${sub.id}?tab=tests&test=${t.id}`,
            icon: CheckCircle2,
          });
        }
      });
    });

    // Search contests
    contests.forEach((c) => {
      if (
        c.title.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q)
      ) {
        hits.push({
          id: `c_${c.id}`,
          title: c.title,
          category: "Contest",
          subtitle: `${c.type} · ${c.durationMinutes} mins · ${c.status.toUpperCase()}`,
          url: `/contests/${c.id}`,
          icon: Trophy,
        });
      }
      c.problems.forEach((p) => {
        if (p.title.toLowerCase().includes(q)) {
          hits.push({
            id: `p_${p.id}`,
            title: `Problem ${p.index}: ${p.title}`,
            category: "Contest",
            subtitle: `${c.title} · ${p.difficulty} (${p.points} pts)`,
            url: `/contests/${c.id}?problem=${p.index}`,
            icon: Trophy,
          });
        }
      });
    });

    return hits.slice(0, 10);
  }, [query, subjects, contests]);

  const handleSelect = (url: string) => {
    setIsSearchOpen(false);
    setQuery("");
    router.push(url);
  };

  return (
    <Modal
      isOpen={isSearchOpen}
      onClose={() => setIsSearchOpen(false)}
      title="Global Search"
      description="Press ESC to close, or click any item to jump directly"
      maxWidth="2xl"
    >
      <div className="space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-[#8E95A5]" />
          <input
            autoFocus
            type="text"
            placeholder="Search subjects, algorithms, notes, tests, or contests..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-12 pl-11 pr-4 bg-[#0D1017] text-white border-2 border-[#282F40] focus:border-[#FFE600] font-mono text-sm outline-none"
          />
        </div>

        {/* Quick Suggestions when empty */}
        {!query && (
          <div className="space-y-2 pt-2">
            <p className="text-[11px] font-mono uppercase text-[#8E95A5] tracking-wider">
              Quick Suggestions
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleSelect("/courses/cs201")}
                className="p-3 text-left bg-[#1A1F2B] hover:bg-[#252B3B] border border-[#282F40] hover:border-[#FF5C58] transition-all group"
              >
                <div className="font-display font-bold text-xs text-white group-hover:text-[#FF5C58]">
                  CS201 Data Structures
                </div>
                <div className="font-mono text-[10px] text-[#8E95A5]">
                  Search trees, graphs, DP
                </div>
              </button>
              <button
                onClick={() => handleSelect("/contests/weekly-48")}
                className="p-3 text-left bg-[#1A1F2B] hover:bg-[#252B3B] border border-[#282F40] hover:border-[#FFE600] transition-all group"
              >
                <div className="font-display font-bold text-xs text-white group-hover:text-[#FFE600]">
                  Weekly Algo #48 (Live)
                </div>
                <div className="font-mono text-[10px] text-[#8E95A5]">
                  4 Problems · Live Leaderboard
                </div>
              </button>
              <button
                onClick={() => handleSelect("/courses/cs203")}
                className="p-3 text-left bg-[#1A1F2B] hover:bg-[#252B3B] border border-[#282F40] hover:border-[#2D7FF9] transition-all group"
              >
                <div className="font-display font-bold text-xs text-white group-hover:text-[#2D7FF9]">
                  CS203 Database Systems
                </div>
                <div className="font-mono text-[10px] text-[#8E95A5]">
                  B+ Trees, 2PL, ACID
                </div>
              </button>
              <button
                onClick={() => handleSelect("/reports")}
                className="p-3 text-left bg-[#1A1F2B] hover:bg-[#252B3B] border border-[#282F40] hover:border-white transition-all group"
              >
                <div className="font-display font-bold text-xs text-white group-hover:text-white">
                  Personal Analytics
                </div>
                <div className="font-mono text-[10px] text-[#8E95A5]">
                  Streak, Heatmap & Rating
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {query && (
          <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
            {results.length === 0 ? (
              <div className="p-8 text-center bg-[#0D1017] border border-[#282F40]">
                <p className="font-mono text-sm text-[#8E95A5]">
                  NO MATCHES FOUND FOR &quot;{query}&quot;
                </p>
                <p className="font-mono text-xs text-[#606775] mt-1">
                  Try searching &quot;trees&quot;, &quot;contest&quot;, or &quot;CS201&quot;
                </p>
              </div>
            ) : (
              results.map((hit) => {
                const Icon = hit.icon;
                return (
                  <button
                    key={hit.id}
                    onClick={() => handleSelect(hit.url)}
                    className="w-full flex items-center justify-between p-3 bg-[#1A1F2B] hover:bg-[#252B3B] border border-[#282F40] hover:border-white text-left transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-[#0D1017] border border-[#384156] group-hover:border-white text-white">
                        <Icon className="w-4 h-4 text-[#FFE600]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-sm text-white group-hover:text-[#FFE600]">
                            {hit.title}
                          </span>
                          <span className="px-1.5 py-0.2 bg-[#0D1017] border border-[#384156] text-[9px] font-mono uppercase text-[#8E95A5]">
                            {hit.category}
                          </span>
                        </div>
                        <div className="font-mono text-xs text-[#8E95A5] mt-0.5">
                          {hit.subtitle}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8E95A5] group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
