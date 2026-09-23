import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "outline"
    | "ghost"
    | "destructive"
    | "white";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-bold tracking-wide uppercase transition-all duration-75 select-none disabled:opacity-50 disabled:pointer-events-none brutal-btn cursor-pointer";

    const variantStyles = {
      primary:
        "bg-[#FF5C58] text-white border-2 border-black hover:bg-[#FF4540] brutal-shadow",
      secondary:
        "bg-[#FFE600] text-black border-2 border-black hover:bg-[#F2DA00] brutal-shadow",
      accent:
        "bg-[#2D7FF9] text-white border-2 border-black hover:bg-[#1E6DE0] brutal-shadow",
      white:
        "bg-[#FFFFFF] text-black border-2 border-black hover:bg-[#F0F0EB] brutal-shadow",
      outline:
        "bg-transparent text-white border-2 border-[#384156] hover:border-white hover:bg-white/5",
      ghost:
        "bg-transparent text-[#9DA7BC] hover:text-white hover:bg-[#1A1F2B]",
      destructive:
        "bg-[#1A1112] text-[#FF5C58] border-2 border-[#FF5C58] hover:bg-[#FF5C58] hover:text-white brutal-shadow",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-xs font-bold gap-2",
      lg: "h-12 px-6 text-sm font-extrabold gap-2.5",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
