import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-bold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-elevated hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-soft",
        outline: "border-3 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-soft",
        ghost: "hover:bg-primary/10 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
        // Fun gradient button - bouncy and playful
        fun: "gradient-hero text-white font-extrabold shadow-lg hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98]",
        // Lime green accent button
        accent: "gradient-accent text-accent-foreground font-extrabold shadow-glow hover:shadow-xl hover:-translate-y-1 active:translate-y-0",
        // Warm orange button
        warm: "gradient-fun text-white font-extrabold shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0",
        // Purple gradient
        purple: "gradient-purple text-white font-extrabold shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0",
        // Chunky 3D button
        chunky: "bg-primary text-primary-foreground shadow-fun hover:shadow-none hover:translate-y-1 transition-all",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-xl px-4",
        lg: "h-13 rounded-2xl px-8 text-base",
        xl: "h-16 rounded-3xl px-12 text-lg",
        icon: "h-11 w-11 rounded-xl",
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
