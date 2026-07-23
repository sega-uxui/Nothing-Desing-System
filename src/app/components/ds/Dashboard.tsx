import { useState } from "react";
import {
  Search, Bell, Settings, NavArrowRight, MoreHoriz,
  Home, MultiplePages, StatsReport, Group as TeamIcon, Page, Plus,
  StatUp, Download, Filter, Xmark
} from "iconoir-react";
import { Section, Group, mono } from "./Shared";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

const miniChartData = [
  { v: 30 }, { v: 44 }, { v: 38 }, { v: 55 }, { v: 48 }, { v: 70 }, { v: 62 },
];

// ── App Shell ─────────────────────────────────────────────────────────
function AppShellShowcase() {
  return (
    <div className="border border-[var(--t-border)] rounded-sm overflow-hidden h-64 flex bg-[var(--t-bg-card)]">
      {/* Sidebar */}
      <div
        className="w-36 flex flex-col flex-shrink-0"
        style={{
          backgroundColor: "var(--t-s-bg)",
          borderRight: "1px solid var(--t-s-border)",
        }}
      >
        <div
          className="px-3 py-2.5"
          style={{ borderBottom: "1px solid var(--t-s-border)" }}
        >
          <div className="flex items-center gap-1.5">
            <div
              className="w-5 h-5 rounded-sm"
              style={{ backgroundColor: "var(--t-s-text)" }}
            />
            <span style={{ ...mono, color: "var(--t-s-text)" }} className="text-xs">Acme</span>
          </div>
        </div>
        <nav className="py-1 flex-1">
          {[
            { icon: Home, label: "Dashboard", active: true },
            { icon: MultiplePages, label: "Projects" },
            { icon: StatsReport, label: "Analytics" },
            { icon: TeamIcon, label: "Team" },
            { icon: Page, label: "Docs" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-2 px-3 py-1.5"
                style={{
                  backgroundColor: item.active ? "var(--t-s-active)" : "transparent",
                  color: item.active ? "var(--t-s-text)" : "var(--t-s-muted)",
                }}
              >
                <Icon width={11} height={11} />
                <span style={mono} className="text-xs">{item.label}</span>
              </div>
            );
          })}
        </nav>
        <div
          className="px-3 py-2.5"
          style={{ borderTop: "1px solid var(--t-s-border)" }}
        >
          <div className="flex items-center gap-1.5">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--t-s-avatar)" }}
            >
              <span style={{ ...mono, color: "var(--t-s-text)" }} className="text-xs">JD</span>
            </div>
            <span style={{ ...mono, color: "var(--t-s-muted)" }} className="text-xs truncate">Jane Doe</span>
          </div>
        </div>
      </div>
      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <div
          className="flex items-center justify-between px-4 py-2"
          style={{
            backgroundColor: "var(--t-bg-card)",
            borderBottom: "1px solid var(--t-border-subtle)",
          }}
        >
          <div className="flex items-center gap-2">
            <span style={{ ...mono, color: "var(--t-fg-subtle)" }} className="text-xs">Dashboard</span>
            <NavArrowRight width={10} height={10} style={{ color: "var(--t-border-strong)" }} />
            <span style={{ ...mono, color: "var(--t-fg-2)" }} className="text-xs">Overview</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search width={10} height={10} className="absolute left-2 top-1/2 -translate-y-1/2" style={{ color: "var(--t-fg-subtle)" }} />
              <input
                style={{ ...mono, backgroundColor: "var(--t-bg-subtle)", color: "var(--t-fg)", borderColor: "var(--t-border)" }}
                className="pl-5 pr-2 py-1 border rounded-sm text-xs outline-none w-28 placeholder:opacity-50"
                placeholder="Search…"
              />
            </div>
            <div className="relative">
              <Bell width={13} height={13} style={{ color: "var(--t-fg-muted)" }} />
              <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </div>
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--t-bg-muted)" }}
            >
              <span style={{ ...mono, color: "var(--t-fg-muted)" }} className="text-xs">JD</span>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 p-4 overflow-hidden" style={{ backgroundColor: "var(--t-bg-subtle)" }}>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { label: "Revenue", value: "$45.2k", delta: "+20%" },
              { label: "Users", value: "2,350", delta: "+12%" },
              { label: "Active", value: "573", delta: "+4%" },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-sm px-2 py-1.5"
                style={{
                  backgroundColor: "var(--t-bg-card)",
                  border: "1px solid var(--t-border-subtle)",
                }}
              >
                <div style={{ ...mono, color: "var(--t-fg-muted)" }} className="text-xs">{kpi.label}</div>
                <div style={{ fontFamily: "var(--ds-font-display)", color: "var(--t-fg)" }} className="text-sm">{kpi.value}</div>
                <div style={mono} className="text-xs text-green-600">{kpi.delta}</div>
              </div>
            ))}
          </div>
          <div
            className="rounded-sm p-2"
            style={{
              backgroundColor: "var(--t-bg-card)",
              border: "1px solid var(--t-border-subtle)",
            }}
          >
            <div style={{ ...mono, color: "var(--t-fg-subtle)" }} className="text-xs mb-1">Activity trend</div>
            <ResponsiveContainer width="100%" height={60}>
              <AreaChart data={miniChartData}>
                <Area type="monotone" dataKey="v" stroke="var(--t-fg)" strokeWidth={1} fill="var(--t-fg)" fillOpacity={0.08} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Topbar ────────────────────────────────────────────────────────────
function TopbarShowcase() {
  return (
    <div className="border border-[var(--t-border)] rounded-sm bg-[var(--t-bg-card)]">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--t-border-subtle)]">
        <div className="flex items-center gap-1.5">
          <span style={mono} className="text-xs text-[var(--t-fg-subtle)]">Workspace</span>
          <NavArrowRight width={11} height={11} className="text-neutral-300" />
          <span style={mono} className="text-xs text-[var(--t-fg-2)]">Design System</span>
          <NavArrowRight width={11} height={11} className="text-neutral-300" />
          <span style={mono} className="text-xs text-[var(--t-fg)]">Components</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search width={12} height={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input style={{ ...mono, backgroundColor: "var(--t-bg-card)", color: "var(--t-fg)", borderColor: "var(--t-border)" }} className="pl-7 pr-2 py-1.5 border rounded-sm text-xs outline-none focus:ring-2 focus:ring-neutral-950/15 placeholder:text-neutral-500 w-36" placeholder="Search…" />
          </div>
          <button className="relative p-1.5 text-[var(--t-fg-muted)] hover:text-[var(--t-fg)] rounded-sm">
            <Bell width={14} height={14} />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </button>
          <button className="p-1.5 text-[var(--t-fg-muted)] hover:text-[var(--t-fg)] rounded-sm">
            <Settings width={14} height={14} />
          </button>
          <div className="flex items-center gap-1.5 pl-2 border-l border-[var(--t-border-subtle)]">
            <div className="w-6 h-6 rounded-full bg-neutral-900 flex items-center justify-center">
              <span style={mono} className="text-xs text-white">JD</span>
            </div>
            <span style={{ ...mono, color: "var(--t-fg-2)" }} className="text-xs">Jane Doe</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Widget Card ───────────────────────────────────────────────────────
function WidgetCardShowcase() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Chart widget */}
      <div className="border border-[var(--t-border)] rounded-sm bg-[var(--t-bg-card)]">
        <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--t-border-subtle)]">
          <div>
            <div style={{ ...mono, color: "var(--t-fg)" }} className="text-xs">Revenue</div>
            <div style={{ ...mono, color: "var(--t-fg-subtle)" }} className="text-xs">Monthly overview</div>
          </div>
          <div className="flex items-center gap-1">
            <button style={{ ...mono, color: "var(--t-fg-muted)" }} className="px-2 py-0.5 text-xs border border-[var(--t-border)] rounded-sm">Export</button>
            <MoreHoriz width={13} height={13} className="text-neutral-400 cursor-pointer" />
          </div>
        </div>
        <div className="p-3">
          <div className="flex items-baseline gap-2 mb-2">
            <span style={{ fontFamily: "var(--ds-font-display)", color: "var(--t-fg)" }} className="text-2xl">$45,231</span>
            <span style={mono} className="text-xs text-green-600 flex items-center gap-0.5">
              <StatUp width={10} height={10} />+20.1%
            </span>
          </div>
          <ResponsiveContainer width="100%" height={72}>
            <AreaChart data={miniChartData}>
              <Tooltip contentStyle={{ fontFamily: "var(--ds-font-body)", fontSize: 11, border: "1px solid #e5e5e5", borderRadius: 2 }} />
              <Area type="monotone" dataKey="v" stroke="#171717" strokeWidth={1.5} fill="#171717" fillOpacity={0.08} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Goals widget */}
      <div className="border border-[var(--t-border)] rounded-sm bg-[var(--t-bg-card)]">
        <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--t-border-subtle)]">
          <div>
            <div style={{ ...mono, color: "var(--t-fg)" }} className="text-xs">Goals</div>
            <div style={{ ...mono, color: "var(--t-fg-subtle)" }} className="text-xs">Q2 milestones</div>
          </div>
          <button style={{ ...mono, color: "var(--t-fg-muted)" }} className="text-xs border border-[var(--t-border)] px-1.5 py-0.5 rounded-sm">+ Add</button>
        </div>
        <div className="p-3 space-y-2.5">
          {[
            { label: "Design System", pct: 85 },
            { label: "Mobile App", pct: 52 },
            { label: "Marketing Site", pct: 28 },
          ].map((g) => (
            <div key={g.label}>
              <div className="flex justify-between mb-1">
                <span style={{ ...mono, color: "var(--t-fg-2)" }} className="text-xs">{g.label}</span>
                <span style={{ ...mono, color: "var(--t-fg-subtle)" }} className="text-xs">{g.pct}%</span>
              </div>
              <div className="h-1 bg-[var(--t-bg-muted)] rounded-full">
                <div className="h-full bg-neutral-900 rounded-full" style={{ width: `${g.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Detail Panel ──────────────────────────────────────────────────────
function DetailPanelShowcase() {
  return (
    <div
      className="rounded-sm w-60"
      style={{
        border: "1px solid var(--t-border)",
        backgroundColor: "var(--t-bg-card)",
      }}
    >
      <div
        className="px-3 py-2 border-b"
        style={{ borderColor: "var(--t-border-subtle)" }}
      >
        <span
          style={{ ...mono, color: "var(--t-fg-subtle)" }}
          className="text-xs uppercase tracking-wider"
        >
          Properties
        </span>
      </div>

      <div>
        {[
          { label: "Component", value: "Button" },
          { label: "Variant",   value: "Primary" },
          { label: "Size",      value: "Default (md)" },
          { label: "Radius",    value: "4px" },
          { label: "Token",     value: "--ds-radius-md" },
        ].map((prop, i, arr) => (
          <div
            key={prop.label}
            className="flex items-center justify-between px-3 py-1.5"
            style={{
              borderBottom: i < arr.length - 1
                ? "1px solid var(--t-border-subtle)"
                : "none",
            }}
          >
            <span style={{ ...mono, color: "var(--t-fg-muted)" }} className="text-xs">
              {prop.label}
            </span>
            <span style={{ ...mono, color: "var(--t-fg)" }} className="text-xs">
              {prop.value}
            </span>
          </div>
        ))}
      </div>

      <div
        className="px-3 py-2"
        style={{ borderTop: "1px solid var(--t-border)" }}
      >
        <div
          style={{ ...mono, color: "var(--t-fg-subtle)" }}
          className="text-xs uppercase tracking-wider mb-1.5"
        >
          Tokens used
        </div>
        <div className="space-y-1">
          {["--ds-color-accent", "--ds-font-body", "--ds-radius-md"].map((tk) => (
            <div
              key={tk}
              style={{ ...mono, color: "var(--t-fg-2)" }}
              className="text-xs cursor-pointer truncate hover:opacity-70"
            >
              {tk}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page Header ───────────────────────────────────────────────────────
function PageHeaderShowcase() {
  return (
    <div className="border border-neutral-200 rounded-sm bg-white">
      <div className="px-4 pt-4 pb-3 border-b border-neutral-100">
        <div className="flex items-center gap-1 mb-2">
          <span style={mono} className="text-xs text-neutral-400 hover:text-neutral-700 cursor-pointer">Dashboard</span>
          <NavArrowRight width={10} height={10} className="text-neutral-300" />
          <span style={mono} className="text-xs text-neutral-700">Components</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 style={{ fontFamily: "var(--ds-font-display)" }} className="text-xl text-neutral-900">
              Component Library
            </h2>
            <p style={mono} className="text-xs text-neutral-500 mt-0.5">
              84 components · Last updated Apr 17, 2026
            </p>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button style={mono} className="p-1.5 border border-neutral-200 rounded-sm text-neutral-600 hover:bg-neutral-50">
              <Filter width={12} height={12} />
            </button>
            <button style={mono} className="p-1.5 border border-neutral-200 rounded-sm text-neutral-600 hover:bg-neutral-50">
              <Download width={12} height={12} />
            </button>
            <button style={mono} className="px-3 py-1.5 bg-neutral-950 text-white text-xs rounded-sm hover:bg-neutral-800 flex items-center gap-1.5">
              <Plus width={12} height={12} />
              New component
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardSection() {
  return (
    <Section id="dashboard" label="08 · Dashboard Layout" title="Shell & Panels">
      <Group label="App Shell · Sidebar + Topbar + Main">
        <AppShellShowcase />
      </Group>
      <Group label="Topbar · Search · Notifications · User menu">
        <TopbarShowcase />
      </Group>
      <Group label="Widget Card · Header · Content · Actions">
        <WidgetCardShowcase />
      </Group>
      <Group label="Detail Panel · Right-side properties">
        <DetailPanelShowcase />
      </Group>
      <Group label="Page Header · Title · Breadcrumb · Actions">
        <PageHeaderShowcase />
      </Group>
    </Section>
  );
}