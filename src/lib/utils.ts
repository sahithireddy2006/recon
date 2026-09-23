import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRating(rating: number): {
  tier: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
} {
  if (rating >= 2400) {
    return {
      tier: "Grandmaster",
      colorClass: "text-[#FF0000]",
      bgClass: "bg-[#FF0000]/15",
      borderClass: "border-[#FF0000]",
    };
  }
  if (rating >= 2100) {
    return {
      tier: "Master",
      colorClass: "text-[#FF8C00]",
      bgClass: "bg-[#FF8C00]/15",
      borderClass: "border-[#FF8C00]",
    };
  }
  if (rating >= 1900) {
    return {
      tier: "Candidate Master",
      colorClass: "text-[#AA00AA]",
      bgClass: "bg-[#AA00AA]/15",
      borderClass: "border-[#AA00AA]",
    };
  }
  if (rating >= 1600) {
    return {
      tier: "Expert",
      colorClass: "text-[#2D7FF9]",
      bgClass: "bg-[#2D7FF9]/15",
      borderClass: "border-[#2D7FF9]",
    };
  }
  if (rating >= 1400) {
    return {
      tier: "Specialist",
      colorClass: "text-[#03A89E]",
      bgClass: "bg-[#03A89E]/15",
      borderClass: "border-[#03A89E]",
    };
  }
  if (rating >= 1200) {
    return {
      tier: "Pupil",
      colorClass: "text-[#00C853]",
      bgClass: "bg-[#00C853]/15",
      borderClass: "border-[#00C853]",
    };
  }
  return {
    tier: "Newbie",
    colorClass: "text-[#8E95A5]",
    bgClass: "bg-[#8E95A5]/15",
    borderClass: "border-[#8E95A5]",
  };
}
