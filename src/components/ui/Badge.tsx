import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center border-l-2 border-accent bg-surface-subtle px-2.5 py-1 text-[.7rem] font-semibold tracking-[.03em] text-text-secondary",
        className,
      )}
      {...props}
    />
  );
}
