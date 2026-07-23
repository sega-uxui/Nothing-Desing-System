import { useState } from "react";
import {
  InfoCircle, CheckCircle, WarningTriangle, XmarkCircle, Xmark,
  Bell, ArrowRight
} from "iconoir-react";
import { Section, Group, mono, Label } from "./Shared";

// ── Alert / Banner ────────────────────────────────────────────────────
function AlertShowcase() {
  const alerts = [
    {
      type: "info",
      icon: InfoCircle,
      seed: "#3b82f6",
      title: "Information",
      msg: "Your account has been updated successfully.",
    },
    {
      type: "success",
      icon: CheckCircle,
      seed: "#16a34a",
      title: "Success",
      msg: "Changes saved. Your preferences are now active.",
    },
    {
      type: "warning",
      icon: WarningTriangle,
      seed: "#ca8a04",
      title: "Warning",
      msg: "Usage limit approaching. Upgrade to avoid interruptions.",
    },
    {
      type: "error",
      icon: XmarkCircle,
      seed: "#dc2626",
      title: "Error",
      msg: "Failed to process request. Please try again.",
    },
  ];

  return (
    <div className="space-y-2 max-w-lg">
      {alerts.map((a) => {
        const Icon = a.icon;
        /* Blend the seed colour into the current theme's card bg / fg so
           the tint adapts to Light, Main, Playful and Dark automatically. */
        const accentColor = `color-mix(in srgb, ${a.seed} 75%, var(--t-fg))`;
        const bgColor     = `color-mix(in srgb, ${a.seed} 10%, var(--t-bg-card))`;
        const borderColor = `color-mix(in srgb, ${a.seed} 28%, var(--t-border))`;

        return (
          <div
            key={a.type}
            className="flex gap-2.5 p-2.5 rounded-sm"
            style={{ backgroundColor: bgColor, border: `1px solid ${borderColor}` }}
          >
            <Icon
              width={14}
              height={14}
              className="flex-shrink-0 mt-0.5"
              style={{ color: accentColor }}
            />
            <div className="flex-1 min-w-0">
              <p style={{ ...mono, color: accentColor }} className="text-xs">
                {a.title}
              </p>
              <p style={{ ...mono, color: "var(--t-fg-muted)" }} className="text-xs mt-0.5">
                {a.msg}
              </p>
            </div>
            <button
              className="flex-shrink-0 opacity-40 hover:opacity-90"
              style={{ color: accentColor }}
            >
              <Xmark width={12} height={12} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

// ── Toast ─────────────────────────────────────────────────────────────
function ToastShowcase() {
  const toasts = [
    { id: 1, type: "default", msg: "Settings saved successfully." },
    { id: 2, type: "success", msg: "File uploaded · design-v2.fig", icon: CheckCircle, color: "text-green-600" },
    { id: 3, type: "error", msg: "Connection failed. Retrying…", icon: XmarkCircle, color: "text-red-600" },
  ];
  return (
    <div className="flex flex-col gap-2 max-w-xs">
      {toasts.map((t) => {
        const Icon = t.icon;
        return (
          <div
            key={t.id}
            className="flex items-center gap-2 px-3 py-2 bg-neutral-950 text-white rounded-sm shadow-lg"
          >
            {Icon && <Icon width={13} height={13} className={t.color} />}
            <span style={mono} className="text-xs flex-1">{t.msg}</span>
            <button className="text-neutral-500 hover:text-white ml-2">
              <Xmark width={11} height={11} />
            </button>
          </div>
        );
      })}
      <p style={mono} className="text-xs text-neutral-400 mt-1">Toast appears top-right · auto-dismisses after 4s</p>
    </div>
  );
}

// ── Modal / Dialog ────────────────────────────────────────────────────
function ModalShowcase() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex gap-3 flex-wrap items-start">
      <button
        style={mono}
        onClick={() => setOpen(true)}
        className="px-3 py-1.5 bg-neutral-950 text-white text-xs rounded-sm hover:bg-neutral-800"
      >
        Open modal
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />
          <div className="relative bg-[var(--t-bg-card)] border border-[var(--t-border)] rounded-sm shadow-xl w-80 z-10">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--t-border-subtle)]">
              <h3 style={mono} className="text-sm text-[var(--t-fg)]">Confirm action</h3>
              <button onClick={() => setOpen(false)} className="text-neutral-400 hover:text-neutral-700">
                <Xmark width={14} height={14} />
              </button>
            </div>
            {/* Body */}
            <div className="px-4 py-3">
              <p style={mono} className="text-xs text-[var(--t-fg-muted)] leading-relaxed">
                This action cannot be undone. This will permanently delete the project and remove all associated data from our servers.
              </p>
            </div>
            {/* Footer */}
            <div className="flex gap-2 px-4 py-3 border-t border-[var(--t-border-subtle)] justify-end">
              <button
                style={mono}
                onClick={() => setOpen(false)}
                className="px-3 py-1.5 border border-[var(--t-border)] text-xs text-[var(--t-fg-2)] rounded-sm hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                style={mono}
                onClick={() => setOpen(false)}
                className="px-3 py-1.5 bg-red-600 text-white text-xs rounded-sm hover:bg-red-700"
              >
                Delete project
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Static preview */}
      <div className="border border-[var(--t-border)] rounded-sm bg-[var(--t-bg-card)] w-64 shadow-sm">
        <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--t-border-subtle)]">
          <span style={mono} className="text-xs text-[var(--t-fg)]">Create project</span>
          <Xmark size={12} className="text-neutral-400" />
        </div>
        <div className="px-3 py-2 space-y-2">
          <div className="space-y-0.5">
            <label style={mono} className="text-xs text-[var(--t-fg-muted)]">Project name</label>
            <div style={mono} className="w-full px-2 py-1 border border-[var(--t-border)] rounded-sm text-xs text-[var(--t-fg-muted)]">My new project</div>
          </div>
          <div className="space-y-0.5">
            <label style={mono} className="text-xs text-[var(--t-fg-muted)]">Framework</label>
            <div style={mono} className="w-full px-2 py-1 border border-[var(--t-border)] rounded-sm text-xs text-[var(--t-fg-muted)]">React</div>
          </div>
        </div>
        <div className="flex gap-1.5 px-3 py-2 border-t border-[var(--t-border-subtle)] justify-end">
          <div style={mono} className="px-2.5 py-1 border border-[var(--t-border)] rounded-sm text-xs text-[var(--t-fg-muted)]">Cancel</div>
          <div style={mono} className="px-2.5 py-1 bg-neutral-950 text-white rounded-sm text-xs">Deploy</div>
        </div>
      </div>
    </div>
  );
}

// ── Popover ───────────────────────────────────────────────────────────
function PopoverShowcase() {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex gap-6 flex-wrap">
      <div className="relative inline-block">
        <button
          style={mono}
          onClick={() => setOpen(!open)}
          className="px-3 py-1.5 border border-neutral-200 text-xs text-neutral-700 rounded-sm hover:bg-neutral-50"
        >
          {open ? "Close" : "Open"} popover
        </button>
        {open && (
          <div className="absolute left-0 top-full mt-1.5 z-20 w-56 bg-[var(--t-bg-card)] border border-[var(--t-border)] rounded-sm shadow-md">
            <div className="px-3 py-2 border-b border-[var(--t-border-subtle)]">
              <p style={mono} className="text-xs text-[var(--t-fg)]">Filter options</p>
            </div>
            <div className="px-3 py-2 space-y-1.5">
              {["Assigned to me", "Created by me", "Archived"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <div className="w-3.5 h-3.5 border border-[var(--t-border)] rounded-sm bg-[var(--t-bg-card)]" />
                  <span style={mono} className="text-xs text-[var(--t-fg-muted)]">{opt}</span>
                </label>
              ))}
            </div>
            <div className="px-3 py-2 border-t border-[var(--t-border-subtle)]">
              <button style={mono} className="text-xs text-[var(--t-fg-muted)] hover:text-[var(--t-fg)]">Reset filters</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Progress Bar ──────────────────────────────────────────────────────
function ProgressShowcase() {
  const bars = [
    { label: "Design System", value: 85 },
    { label: "Mobile App", value: 52 },
    { label: "Marketing Site", value: 28 },
    { label: "API v2", value: 100 },
  ];
  return (
    <div className="flex gap-8 flex-wrap items-start">
      <div className="space-y-3 w-48">
        <Label>Linear progress</Label>
        {bars.map((b) => (
          <div key={b.label} className="space-y-1">
            <div className="flex justify-between">
              <span style={mono} className="text-xs text-neutral-600">{b.label}</span>
              <span style={mono} className="text-xs text-neutral-400">{b.value}%</span>
            </div>
            <div className="h-1 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${b.value === 100 ? "bg-green-500" : "bg-neutral-900"}`}
                style={{ width: `${b.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-2">
        <Label>Circular</Label>
        <div className="flex gap-3 mt-1">
          {[25, 60, 88].map((pct) => {
            const r = 16;
            const circ = 2 * Math.PI * r;
            const dash = (pct / 100) * circ;
            return (
              <div key={pct} className="flex flex-col items-center gap-1">
                <svg width="44" height="44" viewBox="0 0 44 44">
                  <circle cx="22" cy="22" r={r} fill="none" stroke="#f5f5f5" strokeWidth="3" />
                  <circle
                    cx="22" cy="22" r={r}
                    fill="none"
                    stroke={pct === 88 ? "#16a34a" : "#171717"}
                    strokeWidth="3"
                    strokeDasharray={`${dash} ${circ}`}
                    strokeLinecap="round"
                    transform="rotate(-90 22 22)"
                  />
                  <text x="22" y="26" textAnchor="middle" style={{ fontFamily: "var(--ds-font-body)", fontSize: "8px", fill: "#404040" }}>
                    {pct}%
                  </text>
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Drawer ────────────────────────────────────────────────────────────
function DrawerShowcase() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        style={mono}
        onClick={() => setOpen(true)}
        className="px-3 py-1.5 border border-neutral-200 text-xs text-neutral-700 rounded-sm hover:bg-neutral-50 flex items-center gap-1.5"
      >
        <ArrowRight width={12} height={12} />
        Open drawer
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/20" onClick={() => setOpen(false)} />
          <div className="relative bg-[var(--t-bg-card)] w-80 h-full border-l border-[var(--t-border)] shadow-xl flex flex-col z-10">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--t-border-subtle)]">
              <h3 style={mono} className="text-sm text-[var(--t-fg)]">Project settings</h3>
              <button onClick={() => setOpen(false)} className="text-neutral-400 hover:text-neutral-700">
                <Xmark width={14} height={14} />
              </button>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {["General", "Members", "Integrations", "Billing", "Danger zone"].map((s) => (
                <div key={s} className="space-y-1">
                  <div style={mono} className="text-xs uppercase tracking-wider text-[var(--t-fg-subtle)]">{s}</div>
                  <div className="h-10 rounded-sm border border-[var(--t-border-subtle)]" style={{ backgroundColor: "var(--t-bg-subtle)" }} />
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-[var(--t-border-subtle)]">
              <button style={mono} className="w-full px-3 py-2 bg-neutral-950 text-white text-xs rounded-sm hover:bg-neutral-800">
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
      <p style={mono} className="text-xs text-neutral-400 mt-2">Right-side slide-over · closes on backdrop click</p>
    </div>
  );
}

export function FeedbackSection() {
  return (
    <Section id="feedback" label="04 · Feedback & Overlay" title="Alerts, Modals & Toasts">
      <Group label="Alert / Banner · Info · Success · Warn · Error">
        <AlertShowcase />
      </Group>

      <Group label="Toast · Top-right · Auto-dismiss">
        <ToastShowcase />
      </Group>

      <Group label="Modal / Dialog · Confirm · Form · Info">
        <ModalShowcase />
      </Group>

      <Group label="Popover · Contextual overlay">
        <PopoverShowcase />
      </Group>

      <Group label="Progress Bar · Linear + Circular">
        <ProgressShowcase />
      </Group>

      <Group label="Drawer · Left / Right slide-over">
        <DrawerShowcase />
      </Group>
    </Section>
  );
}