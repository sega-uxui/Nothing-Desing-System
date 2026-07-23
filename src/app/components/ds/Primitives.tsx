import { useState } from "react";
import {
  Search, Bell, Settings, NavArrowRight, Plus, Xmark, Check,
  ArrowRight, RefreshDouble, Home, User, Star, Heart, Flash, Page
} from "iconoir-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Section, Group, mono, display, Label, SubLabel } from "./Shared";
import { PhoneFrame } from "../ui/phone-frame";
import { MobileStatusBar } from "../ui/mobile-status-bar";
import { ListItem, ListItemGroup } from "../ui/list-item";
import { SearchField } from "../ui/search-field";

// ── Buttons ──────────────────────────────────────────────────────────
function ButtonShowcase() {
  return (
    <div className="flex flex-wrap gap-2 items-center">

      {/* Primary — accent colour per theme */}
      <button
        style={mono}
        className="px-3 py-1.5 text-xs rounded-sm transition-colors
                   bg-[var(--t-accent)] text-[var(--t-accent-fg)]
                   hover:bg-[var(--t-accent-hover)]"
      >
        Primary
      </button>

      {/* Secondary */}
      <button
        style={mono}
        className="px-3 py-1.5 text-xs rounded-sm transition-colors
                   bg-[var(--t-bg-muted)] text-[var(--t-fg)]
                   hover:opacity-80"
      >
        Secondary
      </button>

      {/* Ghost */}
      <button
        style={mono}
        className="px-3 py-1.5 text-xs rounded-sm transition-colors
                   text-[var(--t-fg-muted)]
                   hover:bg-[var(--t-bg-muted)] hover:text-[var(--t-fg)]"
      >
        Ghost
      </button>

      {/* Outline */}
      <button
        style={mono}
        className="px-3 py-1.5 text-xs rounded-sm transition-colors
                   border border-[var(--t-border-strong)] text-[var(--t-fg-2)]
                   hover:bg-[var(--t-bg-muted)]"
      >
        Outline
      </button>

      {/* Destructive — always red, semantic colour */}
      <button
        style={mono}
        className="px-3 py-1.5 bg-red-600 text-white text-xs rounded-sm
                   hover:bg-red-700 transition-colors"
      >
        Destructive
      </button>

      {/* Icon — filled */}
      <button
        className="p-1.5 rounded-sm transition-colors
                   bg-[var(--t-bg-muted)] text-[var(--t-fg-2)]
                   hover:opacity-80"
      >
        <Plus width={14} height={14} />
      </button>

      {/* Icon — outline */}
      <button
        className="p-1.5 rounded-sm transition-colors
                   border border-[var(--t-border-strong)] text-[var(--t-fg-2)]
                   hover:bg-[var(--t-bg-muted)]"
      >
        <Search width={14} height={14} />
      </button>

      {/* Link */}
      <button
        style={mono}
        className="px-2 text-xs underline underline-offset-2 transition-colors
                   text-[var(--t-fg-2)] hover:text-[var(--t-fg)]"
      >
        Link →
      </button>

      {/* Primary + icon */}
      <button
        style={mono}
        className="px-3 py-1.5 text-xs rounded-sm transition-colors
                   bg-[var(--t-accent)] text-[var(--t-accent-fg)]
                   hover:bg-[var(--t-accent-hover)]
                   flex items-center gap-1.5"
      >
        <ArrowRight width={12} height={12} />
        Get started
      </button>

      {/* Disabled */}
      <button
        style={mono}
        className="px-3 py-1.5 text-xs rounded-sm cursor-not-allowed
                   bg-[var(--t-bg-muted)] text-[var(--t-fg-subtle)]"
        disabled
      >
        Disabled
      </button>

    </div>
  );
}

// ── Badges ───────────────────────────────────────────────────────────
function BadgeShowcase() {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* Status */}
      <span style={mono} className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full border border-green-200">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
        Active
      </span>
      <span style={mono} className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-50 text-yellow-700 text-xs rounded-full border border-yellow-200">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
        Pending
      </span>
      <span style={mono} className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-700 text-xs rounded-full border border-red-200">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
        Error
      </span>
      <span style={mono} className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
        Info
      </span>
      {/* Count */}
      <span style={mono} className="inline-flex items-center justify-center w-5 h-5 bg-neutral-900 text-white text-xs rounded-full">
        3
      </span>
      <span style={mono} className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 bg-red-500 text-white text-xs rounded-full">
        12
      </span>
      {/* Label */}
      <span style={mono} className="px-2 py-0.5 bg-neutral-100 text-neutral-600 text-xs rounded-sm">
        Label
      </span>
      <span style={mono} className="px-2 py-0.5 bg-neutral-900 text-white text-xs rounded-sm">
        New
      </span>
      <span style={mono} className="px-2 py-0.5 border border-neutral-300 text-neutral-600 text-xs rounded-sm">
        Draft
      </span>
      <span style={mono} className="px-2 py-0.5 bg-violet-50 text-violet-700 text-xs rounded-sm border border-violet-200">
        Beta
      </span>
    </div>
  );
}

// ── Avatars ──────────────────────────────────────────────────────────
function AvatarShowcase() {
  const initials = ["JD", "SM", "KL", "AB"];
  const colors = ["bg-neutral-800", "bg-blue-600", "bg-violet-600", "bg-orange-500"];
  return (
    <div className="flex items-center gap-4 flex-wrap">
      {/* Image avatar */}
      <div className="flex flex-col items-center gap-1">
        <div className="w-8 h-8 rounded-full bg-neutral-200 overflow-hidden flex items-center justify-center">
          <User width={16} height={16} className="text-neutral-400" />
        </div>
        <Label>Image</Label>
      </div>
      {/* Initials */}
      <div className="flex flex-col items-center gap-1">
        <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center">
          <span style={mono} className="text-xs text-white">JD</span>
        </div>
        <Label>Initials</Label>
      </div>
      {/* Sizes */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded-full bg-neutral-300 flex items-center justify-center">
            <span style={mono} className="text-xs text-neutral-600">xs</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-neutral-400 flex items-center justify-center">
            <span style={mono} className="text-xs text-white">sm</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-neutral-600 flex items-center justify-center">
            <span style={mono} className="text-xs text-white">md</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center">
            <span style={mono} className="text-xs text-white">lg</span>
          </div>
        </div>
        <Label>Sizes</Label>
      </div>
      {/* Group */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex -space-x-2">
          {initials.map((init, i) => (
            <div
              key={init}
              className={`w-7 h-7 rounded-full border-2 border-white ${colors[i]} flex items-center justify-center`}
            >
              <span style={mono} className="text-xs text-white">{init}</span>
            </div>
          ))}
          <div className="w-7 h-7 rounded-full border-2 border-white bg-neutral-200 flex items-center justify-center">
            <span style={mono} className="text-xs text-neutral-600">+3</span>
          </div>
        </div>
        <Label>Group</Label>
      </div>
    </div>
  );
}

// ── Icons ────────────────────────────────────────────────────────────
function IconShowcase() {
  const icons = [Home, Search, Bell, Settings, User, Star, Heart, Flash, Page, Plus, Xmark, Check];
  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-3 items-center">
          {icons.slice(0, 6).map((Icon, i) => (
            <Icon key={i} width={16} height={16} className="text-neutral-700" />
          ))}
        </div>
        <Label>16px</Label>
      </div>
      <div className="w-px h-8 bg-neutral-100" />
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-3 items-center">
          {icons.slice(0, 6).map((Icon, i) => (
            <Icon key={i} width={20} height={20} className="text-neutral-700" />
          ))}
        </div>
        <Label>20px</Label>
      </div>
      <div className="w-px h-8 bg-neutral-100" />
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-3 items-center">
          {icons.slice(0, 6).map((Icon, i) => (
            <Icon key={i} width={24} height={24} className="text-neutral-700" />
          ))}
        </div>
        <Label>24px</Label>
      </div>
    </div>
  );
}

// ── Dividers ─────────────────────────────────────────────────────────
function DividerShowcase() {
  return (
    <div className="space-y-4">
      {/* Horizontal */}
      <div className="space-y-1">
        <Label>Horizontal</Label>
        <div className="pt-2">
          <hr className="border-neutral-200" />
        </div>
      </div>
      {/* With label */}
      <div className="space-y-1">
        <Label>With label</Label>
        <div className="flex items-center gap-3 pt-2">
          <div className="flex-1 h-px bg-neutral-200" />
          <span style={mono} className="text-xs text-neutral-400 px-1">or continue with</span>
          <div className="flex-1 h-px bg-neutral-200" />
        </div>
      </div>
      {/* Vertical */}
      <div className="space-y-1">
        <Label>Vertical</Label>
        <div className="flex items-center gap-3 h-6 pt-1">
          <span style={mono} className="text-xs text-neutral-600">Item A</span>
          <div className="w-px h-full bg-neutral-200" />
          <span style={mono} className="text-xs text-neutral-600">Item B</span>
          <div className="w-px h-full bg-neutral-200" />
          <span style={mono} className="text-xs text-neutral-600">Item C</span>
        </div>
      </div>
    </div>
  );
}

// ── Spinner / Skeleton ────────────────────────────────────────────────
function SpinnerSkeleton() {
  return (
    <div className="flex gap-8 items-start flex-wrap">
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-3 items-center">
          <RefreshDouble width={14} height={14} className="text-neutral-700 animate-spin" />
          <RefreshDouble width={18} height={18} className="text-neutral-700 animate-spin" />
          <RefreshDouble width={22} height={22} className="text-neutral-700 animate-spin" />
        </div>
        <Label>Spinner</Label>
      </div>
      <div className="flex flex-col gap-2 w-48">
        <Label>Skeleton</Label>
        <div className="space-y-1.5 mt-1">
          <div className="h-3 bg-neutral-100 rounded-sm animate-pulse" />
          <div className="h-3 bg-neutral-100 rounded-sm animate-pulse w-4/5" />
          <div className="h-3 bg-neutral-100 rounded-sm animate-pulse w-3/5" />
        </div>
        <div className="flex gap-2 mt-1">
          <div className="w-8 h-8 bg-neutral-100 rounded-full animate-pulse flex-shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2.5 bg-neutral-100 rounded-sm animate-pulse" />
            <div className="h-2.5 bg-neutral-100 rounded-sm animate-pulse w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Tooltip ───────────────────────────────────────────────────────────
function TooltipShowcase() {
  return (
    <Tooltip.Provider delayDuration={0}>
      <div className="flex gap-4 flex-wrap">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Tooltip.Root key={side}>
            <Tooltip.Trigger asChild>
              <button
                style={mono}
                className="px-3 py-1.5 border border-neutral-200 text-xs text-neutral-700 rounded-sm hover:bg-neutral-50"
              >
                Hover ({side})
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content
              side={side}
              sideOffset={6}
              style={mono}
              className="px-2 py-1 bg-neutral-950 text-white text-xs rounded-sm shadow-lg z-50"
            >
              Tooltip · {side}
              <Tooltip.Arrow className="fill-neutral-950" />
            </Tooltip.Content>
          </Tooltip.Root>
        ))}
      </div>
    </Tooltip.Provider>
  );
}

// ── Kbd ───────────────────────────────────────────────────────────────
function KbdShowcase() {
  const shortcuts = [
    { keys: ["⌘", "K"], label: "Command palette" },
    { keys: ["⌃", "Z"], label: "Undo" },
    { keys: ["⌘", "⇧", "P"], label: "Find file" },
    { keys: ["Esc"], label: "Dismiss" },
    { keys: ["⌘", "Enter"], label: "Submit" },
  ];
  return (
    <div className="space-y-2">
      {shortcuts.map((s, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="flex gap-0.5 items-center">
            {s.keys.map((key, j) => (
              <kbd
                key={j}
                style={mono}
                className="px-1.5 py-0.5 border border-neutral-300 bg-neutral-50 text-neutral-700 text-xs rounded-sm shadow-[0_1px_0_0_#d4d4d4] min-w-[20px] text-center"
              >
                {key}
              </kbd>
            ))}
          </div>
          <span style={mono} className="text-xs text-neutral-500">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── Search Input ──────────────────────────────────────────────────────
function SearchShowcase() {
  const [q, setQ] = useState("");
  const [suggestions] = useState(["Button", "Badge", "Avatar", "Modal", "Tooltip", "Table"]);
  return (
    <div className="space-y-2 max-w-xs">
      <div className="relative">
        <Search width={12} height={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="px-3 py-1.5 bg-neutral-50 text-neutral-700 text-xs rounded-sm border border-neutral-300 focus:outline-none focus:border-neutral-500"
          placeholder="Search..."
        />
        {q && (
          <button
            onClick={() => setQ("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
          >
            <Xmark width={11} height={11} />
          </button>
        )}
      </div>
      {q && (
        <div className="bg-neutral-50 border border-neutral-300 rounded-sm shadow-sm max-h-40 overflow-y-auto">
          {suggestions
            .filter((s) => s.toLowerCase().includes(q.toLowerCase()))
            .map((s, i) => (
              <div key={i} className="px-3 py-1.5 text-neutral-700 text-xs hover:bg-neutral-100 cursor-pointer">
                {s}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

// ── Phone Frame ────────────────────────────────────────────────────────
function PhoneFrameShowcase() {
  return (
    <div style={{ height: 300, overflow: "hidden" }}>
      <div style={{ transform: "scale(0.5)", transformOrigin: "top left" }}>
        <PhoneFrame>
          <div className="flex-1 flex items-center justify-center">
            <span style={mono} className="text-xs text-muted-foreground">Screen content</span>
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}

// ── Mobile Status Bar ────────────────────────────────────────────────────
function MobileStatusBarShowcase() {
  return (
    <div
      className="max-w-xs rounded-2xl overflow-hidden border"
      style={{ backgroundColor: "var(--t-bg-card)", borderColor: "var(--t-border)" }}
    >
      <MobileStatusBar />
      <div className="h-10" />
    </div>
  );
}

// ── List Item ────────────────────────────────────────────────────────────
function ListItemShowcase() {
  return (
    <div className="max-w-sm rounded-sm border" style={{ borderColor: "var(--t-border)" }}>
      <ListItemGroup>
        <ListItem
          leading={<Bell width={18} height={18} className="text-muted-foreground" />}
          title="Notifications"
          subtitle="Push, email, and SMS alerts"
          trailing={<NavArrowRight width={14} height={14} className="text-muted-foreground" />}
          onClick={() => {}}
          className="px-3"
        />
        <ListItem
          leading={
            <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center">
              <span style={mono} className="text-xs text-white">JD</span>
            </div>
          }
          title="Jordan Diaz"
          subtitle="Product Manager"
          trailing={<span style={mono} className="text-xs text-muted-foreground">Online</span>}
          className="px-3"
        />
      </ListItemGroup>
    </div>
  );
}

// ── Search Field ───────────────────────────────────────────────────────
function SearchFieldShowcase() {
  const [q, setQ] = useState("");
  return (
    <div className="max-w-xs">
      <SearchField value={q} onChange={setQ} onClear={() => setQ("")} placeholder="Search components..." />
    </div>
  );
}

export function PrimitivesSection() {
  return (
    <Section id="primitives" label="02 · Primitives" title="Atoms">
      <Group label="Button · Primary · Ghost · Icon · Link">
        <ButtonShowcase />
      </Group>

      <Group label="Badge / Tag · Status · Count · Label">
        <BadgeShowcase />
      </Group>

      <Group label="Avatar · Image · Initials · Group">
        <AvatarShowcase />
      </Group>

      <Group label="Icon · 16 · 20 · 24px">
        <IconShowcase />
      </Group>

      <Group label="Divider · Horizontal · Vertical · Label">
        <DividerShowcase />
      </Group>

      <Group label="Spinner / Skeleton · Inline + block loading">
        <SpinnerSkeleton />
      </Group>

      <Group label="Tooltip · 4 directions · delay">
        <TooltipShowcase />
      </Group>

      <Group label="Kbd · Keyboard shortcut display">
        <KbdShowcase />
      </Group>

      <Group label="Search Input · Suggestions">
        <SearchShowcase />
      </Group>

      <Group label="Phone Frame · Device mockup chrome">
        <PhoneFrameShowcase />
      </Group>

      <Group label="Mobile Status Bar · Time · Signal · WiFi · Battery">
        <MobileStatusBarShowcase />
      </Group>

      <Group label="List Item · Leading · Title/Subtitle · Trailing">
        <ListItemShowcase />
      </Group>

      <Group label="Search Field · Icon + Input + Clear">
        <SearchFieldShowcase />
      </Group>
    </Section>
  );
}