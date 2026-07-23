import * as React from "react";

import { cn } from "./utils";

function StatusIcons() {
  return (
    <div className="flex items-center gap-1.5">
      {/* Signal */}
      <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
        <rect x="0" y="8" width="2.5" height="3" rx="0.5" />
        <rect x="4" y="5.5" width="2.5" height="5.5" rx="0.5" />
        <rect x="8" y="2.5" width="2.5" height="8.5" rx="0.5" />
        <rect x="12" y="0" width="2.5" height="11" rx="0.5" opacity="0.3" />
      </svg>
      {/* WiFi */}
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none" stroke="currentColor" strokeLinecap="round">
        <circle cx="7.5" cy="10" r="1" fill="currentColor" stroke="none" />
        <path d="M4.5 7.5 Q7.5 5.5 10.5 7.5" strokeWidth="1.4" />
        <path d="M2 5 Q7.5 1 13 5" strokeWidth="1.4" />
      </svg>
      {/* Battery */}
      <svg width="24" height="11" viewBox="0 0 24 11" fill="currentColor">
        <rect x="0.5" y="0.5" width="19" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
        <rect x="20.5" y="3.5" width="2.5" height="4" rx="1" opacity="0.4" />
        <rect x="2" y="2" width="14" height="7" rx="1.2" />
      </svg>
    </div>
  );
}

function MobileStatusBar({
  time = "9:41",
  className,
  ...props
}: React.ComponentProps<"div"> & { time?: string }) {
  return (
    <div
      data-slot="mobile-status-bar"
      className={cn(
        "flex items-center justify-between px-6 pt-3 pb-1 flex-shrink-0 text-foreground",
        className,
      )}
      {...props}
    >
      <span className="font-mono text-[13px]" style={{ fontFamily: "var(--ds-font-body)" }}>
        {time}
      </span>
      <StatusIcons />
    </div>
  );
}

export { MobileStatusBar };
