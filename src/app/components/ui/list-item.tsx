import * as React from "react";

import { cn } from "./utils";

function ListItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="list-item-group"
      className={cn("divide-y divide-border", className)}
      {...props}
    />
  );
}

function ListItem({
  leading,
  title,
  subtitle,
  trailing,
  onClick,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  leading?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  trailing?: React.ReactNode;
  onClick?: () => void;
}) {
  const interactive = !!onClick;
  const Comp = interactive ? "button" : "div";

  return (
    <Comp
      data-slot="list-item"
      onClick={onClick}
      className={cn(
        "flex w-full min-h-11 items-center gap-3 py-2.5 text-left",
        interactive && "cursor-pointer transition-colors hover:bg-accent",
        className,
      )}
      {...props}
    >
      {leading && <div className="flex-shrink-0">{leading}</div>}
      <div className="flex-1 min-w-0">
        <div className="text-sm text-foreground truncate">{title}</div>
        {subtitle && (
          <div className="text-xs text-muted-foreground truncate mt-0.5">{subtitle}</div>
        )}
      </div>
      {trailing && <div className="flex-shrink-0 flex items-center gap-1.5">{trailing}</div>}
    </Comp>
  );
}

export { ListItem, ListItemGroup };
