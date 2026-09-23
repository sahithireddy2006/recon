import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "coral"
    | "yellow"
    | "blue"
    | "green"
    | "outline"
    | "dark";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-[#282F40] text-[#DCE2EE] border border-[#444E66]",
    coral: "bg-[#FF5C58] text-white border border-black font-bold",
    yellow: "bg-[#FFE600] text-black border border-black font-bold",
    blue: "bg-[#2D7FF9] text-white border border-black font-bold",
    green: "bg-[#00E599] text-black border border-black font-bold",
    outline: "bg-transparent text-white border border-white/30",
    dark: "bg-[#0B0D10] text-[#8E95A5] border border-[#282F40] font-mono",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px] tracking-wider",
    md: "px-2.5 py-1 text-xs tracking-wide",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-mono uppercase select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
