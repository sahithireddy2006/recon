import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "dark" | "dark-elevated" | "light" | "coral" | "yellow" | "blue";
  hasShadow?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "dark", hasShadow = false, children, ...props }, ref) => {
    const variantStyles = {
      dark: "bg-[#12151D] text-[#EDEDED] border-2 border-[#282F40]",
      "dark-elevated": "bg-[#1A1F2B] text-[#EDEDED] border-2 border-[#384156]",
      light: "bg-[#FFFFFF] text-[#0A0D12] border-2 border-black",
      coral: "bg-[#FF5C58] text-white border-2 border-black",
      yellow: "bg-[#FFE600] text-black border-2 border-black",
      blue: "bg-[#2D7FF9] text-white border-2 border-black",
    };

    const shadowStyles = hasShadow
      ? variant === "light" || variant === "yellow"
        ? "brutal-shadow"
        : "brutal-shadow"
      : "";

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden transition-all duration-75",
          variantStyles[variant],
          shadowStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("p-5 border-b-2 border-current/15 flex flex-col gap-1.5", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "font-display text-lg font-bold uppercase tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-5", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "p-5 border-t-2 border-current/15 flex items-center justify-between",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
