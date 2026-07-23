import * as React from "react";

import { cn } from "./utils";

function CompareBar({
  label,
  leftValue,
  rightValue,
  leftLabel,
  rightLabel,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  label: string;
  leftValue: number;
  rightValue: number;
  leftLabel?: string;
  rightLabel?: string;
}) {
  const total = leftValue + rightValue || 1;
  const leftPct = (leftValue / total) * 100;

  return (
    <div data-slot="compare-bar" className={cn("w-full", className)} {...props}>
      <div className="flex items-center justify-between mb-1.5 text-sm">
        <span className="text-foreground tabular-nums">
          {leftLabel ? `${leftValue} ${leftLabel}` : leftValue}
        </span>
        <span className="text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
        <span className="text-foreground tabular-nums">
          {rightLabel ? `${rightValue} ${rightLabel}` : rightValue}
        </span>
      </div>
      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full bg-primary" style={{ width: `${leftPct}%` }} />
        <div className="h-full bg-border" style={{ width: `${100 - leftPct}%` }} />
      </div>
    </div>
  );
}

export { CompareBar };
