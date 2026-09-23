import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full h-11 px-3.5 bg-[#0D1017] text-white border-2 border-[#282F40] placeholder:text-[#656E82] font-mono text-sm transition-colors duration-75 outline-none focus:border-[#FF5C58] focus:bg-[#121620] disabled:opacity-50 disabled:cursor-not-allowed",
          error && "border-[#FF5C58] bg-[#FF5C58]/5",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
