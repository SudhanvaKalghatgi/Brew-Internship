import * as React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
                    {
                        "bg-primary text-primary-foreground hover:opacity-90 shadow-md shadow-primary/20": variant === "default",
                        "bg-foreground text-background hover:bg-foreground/90 shadow-md": variant === "solid",
                        "border border-border bg-background hover:bg-muted text-foreground": variant === "outline",
                        "bg-muted text-foreground hover:bg-muted/80": variant === "secondary",
                        "hover:bg-muted text-foreground": variant === "ghost",
                        "h-10 px-4 py-2": size === "default",
                        "h-9 px-3": size === "sm",
                        "h-12 px-8 text-base": size === "lg",
                        "h-10 w-10": size === "icon",
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
