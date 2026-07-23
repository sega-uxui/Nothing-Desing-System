import React from "react";

export const mono = { fontFamily: "var(--ds-font-body)" } as const;
export const display = { fontFamily: "var(--ds-font-display)" } as const;

export function Section({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      style={{ borderBottom: "1px solid var(--t-border-subtle)" }}
    >
      <div
        className="px-8 py-4 sticky top-0 z-10"
        style={{
          backgroundColor: "var(--t-bg)",
          borderBottom: "1px solid var(--t-border-subtle)",
        }}
      >
        <div
          style={{ ...mono, color: "var(--t-fg-subtle)" }}
          className="text-xs uppercase tracking-[0.2em]"
        >
          {label}
        </div>
        <h2
          style={{ ...display, color: "var(--t-fg)" }}
          className="text-[22px] mt-0.5 leading-tight"
        >
          {title}
        </h2>
      </div>
      <div className="px-8 py-6 space-y-8">{children}</div>
    </section>
  );
}

export function Group({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div
        style={{
          ...mono,
          color: "var(--t-fg-subtle)",
          borderBottom: "1px solid var(--t-border-subtle)",
        }}
        className="text-xs uppercase tracking-[0.15em] mb-2 pb-1.5"
      >
        {label}
      </div>
      {children}
    </div>
  );
}

export function TokenRow({
  name,
  value,
  preview,
}: {
  name: string;
  value: string;
  preview?: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center gap-3 py-1.5 group"
      style={{ borderBottom: "1px solid var(--t-border-subtle)" }}
    >
      {preview && <div className="w-6 h-6 flex-shrink-0">{preview}</div>}
      <div style={{ ...mono, color: "var(--t-fg)" }} className="text-xs flex-1">
        {name}
      </div>
      <div style={{ ...mono, color: "var(--t-fg-subtle)" }} className="text-xs">
        {value}
      </div>
    </div>
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{ ...mono, color: "var(--t-fg-subtle)" }}
      className="text-xs uppercase tracking-[0.12em]"
    >
      {children}
    </span>
  );
}

export function PreviewCard({
  children,
  className = "",
  noPad = false,
}: {
  children: React.ReactNode;
  className?: string;
  noPad?: boolean;
}) {
  return (
    <div
      className={`rounded-sm ${noPad ? "" : "p-4"} ${className}`}
      style={{
        backgroundColor: "var(--t-bg-card)",
        border: "1px solid var(--t-border-subtle)",
      }}
    >
      {children}
    </div>
  );
}

export function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ ...mono, color: "var(--t-fg-subtle)" }} className="text-xs mt-1">
      {children}
    </div>
  );
}
