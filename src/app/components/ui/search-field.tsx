import * as React from "react";
import { Search, Xmark } from "iconoir-react";

import { cn } from "./utils";
import { Input } from "./input";

function SearchField({
  value,
  onChange,
  onClear,
  placeholder = "Search",
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "onChange"> & {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
}) {
  return (
    <div data-slot="search-field" className={cn("relative flex-1", className)}>
      <Search
        width={14}
        height={14}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
      />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-8 pr-8 rounded-xl bg-input-background border-none"
        {...props}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <Xmark width={13} height={13} />
        </button>
      )}
    </div>
  );
}

export { SearchField };
