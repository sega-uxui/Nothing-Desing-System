import * as React from "react";

import { cn } from "./utils";

function SkipLink({
  href = "#main-content",
  children = "Skip to main content",
  className,
  ...props
}: React.ComponentProps<"a">) {
  return (
    <a
      href={href}
      data-slot="skip-link"
      className={cn(
        "absolute top-0 left-0 z-50 -translate-y-full rounded-sm bg-primary p-3 text-primary-foreground transition-transform focus:translate-y-0",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export { SkipLink };
