import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        // Canonical primary black pill per DESIGN.md
        default:
          "bg-white text-black hover:bg-neutral-200 dark:bg-white dark:text-black dark:hover:bg-neutral-200 shadow-sm font-semibold",
        // Polarity-flipped dark CTA pill
        dark:
          "bg-black text-white hover:bg-neutral-800 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 border border-white/10",
        // Subtle secondary gray pill
        secondary:
          "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 shadow-sm",
        outline:
          "border border-border bg-transparent hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        ghost: "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        link: "text-primary underline-offset-4 hover:underline",
        pill: "bg-white text-black hover:bg-neutral-200 shadow-pill-float font-medium rounded-full",
      },
      size: {
        default: "h-9 px-4 py-2 rounded-full",
        sm: "h-8 px-3 text-xs rounded-full",
        lg: "h-11 px-6 rounded-full text-base",
        icon: "h-9 w-9 rounded-full",
        chip: "h-7 px-3 text-xs rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
