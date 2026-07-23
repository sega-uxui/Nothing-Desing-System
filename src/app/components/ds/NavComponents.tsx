import { useState } from "react";
import {
  Search, Bell, NavArrowRight, NavArrowDown, NavArrowLeft,
  Home, Settings, Group as TeamIcon, StatsReport, Page, MultiplePages,
  Terminal, Check, ArrowRight, Github, Twitter, ChatLines, Figma
} from "iconoir-react";
import { Section, Group, mono, Label } from "./Shared";
import { SkipLink } from "../ui/skip-link";

// ── Navbar ────────────────────────────────────────────────────────────
function NavbarShowcase() {
  return (
    <div className="border border-[var(--t-border)] rounded-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--t-bg-card)] border-b border-[var(--t-border-subtle)]">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 bg-neutral-950 rounded-sm" />
            <span style={mono} className="text-xs text-[var(--t-fg)]">Acme</span>
          </div>
          <nav className="flex items-center gap-4">
            {["Product", "Docs", "Blog", "Pricing"].map((link) => (
              <a key={link} style={mono} className={`text-xs cursor-pointer ${link === "Product" ? "text-[var(--t-fg)]" : "text-[var(--t-fg-muted)] hover:text-[var(--t-fg)]"}`}>
                {link}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <button style={mono} className="px-3 py-1.5 text-xs text-[var(--t-fg-muted)] hover:text-[var(--t-fg)]">
            Sign in
          </button>
          <button style={mono} className="px-3 py-1.5 bg-neutral-950 text-white text-xs rounded-sm hover:bg-neutral-800">
            Get started
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Sidebar Nav ───────────────────────────────────────────────────────
function SidebarNavShowcase() {
  const [expanded, setExpanded] = useState(["Analytics"]);
  const nav = [
    { label: "Dashboard", icon: Home, active: true },
    { label: "Projects", icon: MultiplePages },
    { label: "Analytics", icon: StatsReport, children: ["Overview", "Traffic", "Conversions"] },
    { label: "Team", icon: TeamIcon },
    { label: "Files", icon: Page },
    { label: "Settings", icon: Settings },
  ];
  return (
    <div className="w-44 border border-[var(--t-border)] rounded-sm bg-[var(--t-bg-card)]">
      <div className="px-2 py-1.5 border-b border-[var(--t-border-subtle)]">
        <div style={mono} className="text-xs text-[var(--t-fg-subtle)] uppercase tracking-wider">Workspace</div>
      </div>
      <nav className="py-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const isExpanded = expanded.includes(item.label);
          return (
            <div key={item.label}>
              <button
                onClick={() => {
                  if (item.children) {
                    setExpanded((e) =>
                      e.includes(item.label)
                        ? e.filter((x) => x !== item.label)
                        : [...e, item.label]
                    );
                  }
                }}
                className={`w-full flex items-center gap-2 px-3 py-1.5 text-left transition-colors ${
                  item.active
                    ? "bg-[var(--t-bg-muted)] text-[var(--t-fg)]"
                    : "text-[var(--t-fg-muted)] hover:bg-[var(--t-bg-subtle)] hover:text-[var(--t-fg)]"
                }`}
              >
                <Icon width={12} height={12} className="flex-shrink-0" />
                <span style={mono} className="text-xs flex-1">{item.label}</span>
                {item.children && (
                  <NavArrowDown width={10} height={10} className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                )}
              </button>
              {item.children && isExpanded && (
                <div className="pl-6 py-0.5">
                  {item.children.map((child) => (
                    <button key={child} style={mono} className="w-full text-left px-2 py-1 text-xs text-[var(--t-fg-muted)] hover:text-[var(--t-fg)]">
                      {child}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}

// ── Tabs ──────────────────────────────────────────────────────────────
function TabsShowcase() {
  const [lineTab, setLineTab] = useState("Overview");
  const [pillTab, setPillTab] = useState("All");
  const [segTab, setSegTab] = useState("Month");
  return (
    <div className="space-y-4">
      <div>
        <Label>Line</Label>
        <div className="mt-2 flex border-b border-[var(--t-border)]">
          {["Overview", "Analytics", "Reports", "Settings"].map((tab) => (
            <button key={tab} onClick={() => setLineTab(tab)} style={mono}
              className={`px-3 py-1.5 text-xs border-b-2 -mb-px transition-colors ${lineTab === tab ? "border-neutral-950 text-[var(--t-fg)]" : "border-transparent text-[var(--t-fg-muted)] hover:text-[var(--t-fg-2)]"}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label>Pill</Label>
        <div className="mt-2 flex gap-1">
          {["All", "Active", "Archived"].map((tab) => (
            <button key={tab} onClick={() => setPillTab(tab)} style={mono}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${pillTab === tab ? "bg-neutral-950 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label>Segmented</Label>
        <div className="mt-2 inline-flex bg-[var(--t-bg-muted)] rounded-sm p-0.5 gap-0.5">
          {["Day", "Week", "Month", "Year"].map((tab) => (
            <button key={tab} onClick={() => setSegTab(tab)} style={mono}
              className={`px-2.5 py-1 text-xs rounded-sm transition-all ${segTab === tab ? "bg-[var(--t-bg-card)] text-[var(--t-fg)] shadow-sm" : "text-[var(--t-fg-muted)] hover:text-[var(--t-fg-2)]"}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Breadcrumb ────────────────────────────────────────────────────────
function BreadcrumbShowcase() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        {["Home", "Projects", "Design System", "Components"].map((crumb, i, arr) => (
          <div key={crumb} className="flex items-center gap-1">
            <span style={mono} className={`text-xs ${i === arr.length - 1 ? "text-[var(--t-fg)]" : "text-[var(--t-fg-subtle)] hover:text-[var(--t-fg-2)] cursor-pointer"}`}>
              {crumb}
            </span>
            {i < arr.length - 1 && <NavArrowRight width={11} height={11} className="text-neutral-300" />}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1">
        {["Home", "···", "Atoms", "Button"].map((crumb, i, arr) => (
          <div key={i} className="flex items-center gap-1">
            <span style={mono} className={`text-xs ${i === arr.length - 1 ? "text-[var(--t-fg)]" : "text-[var(--t-fg-subtle)] hover:text-[var(--t-fg-2)] cursor-pointer"}`}>
              {crumb}
            </span>
            {i < arr.length - 1 && <NavArrowRight width={11} height={11} className="text-neutral-300" />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Pagination ────────────────────────────────────────────────────────
function PaginationShowcase() {
  const [page, setPage] = useState(3);
  const total = 8;
  return (
    <div className="space-y-3">
      <div>
        <Label>Pages</Label>
        <div className="flex items-center gap-1 mt-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} style={mono}
            className="px-2 py-1 border border-neutral-200 rounded-sm text-xs text-neutral-600 hover:bg-neutral-50 disabled:opacity-40" disabled={page === 1}>
            <NavArrowLeft width={12} height={12} />
          </button>
          {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => setPage(p)} style={mono}
              className={`w-7 h-7 text-xs rounded-sm transition-colors ${p === page ? "bg-neutral-950 text-white" : "text-neutral-600 hover:bg-neutral-100"}`}>
              {p}
            </button>
          ))}
          <button onClick={() => setPage((p) => Math.min(total, p + 1))} style={mono}
            className="px-2 py-1 border border-neutral-200 rounded-sm text-xs text-neutral-600 hover:bg-neutral-50 disabled:opacity-40" disabled={page === total}>
            <NavArrowRight width={12} height={12} />
          </button>
        </div>
      </div>
      <div>
        <Label>Load more</Label>
        <button style={mono} className="mt-2 w-48 py-1.5 border border-neutral-200 text-xs text-neutral-600 rounded-sm hover:bg-neutral-50 text-center">
          Load 10 more results
        </button>
      </div>
    </div>
  );
}

// ── Command Palette ───────────────────────────────────────────────────
function CommandPaletteShowcase() {
  const [q, setQ] = useState("b");
  const allResults = [
    { group: "Components", items: ["Button", "Badge", "Breadcrumb"] },
    { group: "Pages", items: ["Billing", "Blog post"] },
  ];
  const results = allResults
    .map((g) => ({ ...g, items: g.items.filter((i) => i.toLowerCase().includes(q.toLowerCase())) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="border border-[var(--t-border)] rounded-sm overflow-hidden shadow-lg bg-[var(--t-bg-card)] w-72">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--t-border-subtle)]">
        <Terminal width={13} height={13} className="text-neutral-400" />
        <input style={{ ...mono, color: "var(--t-fg)", backgroundColor: "transparent" }} value={q} onChange={(e) => setQ(e.target.value)}
          className="flex-1 text-xs outline-none placeholder:text-neutral-500"
          placeholder="Search commands…" />
        <kbd style={mono} className="text-xs text-[var(--t-fg-subtle)] border border-[var(--t-border)] px-1 py-0.5 rounded-sm">Esc</kbd>
      </div>
      {results.map((group) => (
        <div key={group.group}>
          <div style={mono} className="text-xs uppercase tracking-wider text-[var(--t-fg-subtle)] px-3 py-1.5 bg-[var(--t-bg-subtle)]">{group.group}</div>
          {group.items.map((item) => (
            <div key={item} style={mono} className="flex items-center gap-2 px-3 py-1.5 text-xs text-[var(--t-fg-2)] hover:bg-[var(--t-bg-subtle)] cursor-pointer">
              <ArrowRight width={11} height={11} className="text-neutral-400" />
              {item}
            </div>
          ))}
        </div>
      ))}
      <div style={mono} className="flex items-center gap-3 px-3 py-1.5 border-t border-[var(--t-border-subtle)] text-xs text-[var(--t-fg-subtle)]">
        <span>↑↓ navigate</span><span>↵ select</span><span>Esc close</span>
      </div>
    </div>
  );
}

// ── Stepper ───────────────────────────────────────────────────────────
function StepperShowcase() {
  const [step, setStep] = useState(1);
  const steps = ["Account", "Profile", "Plan", "Review"];
  return (
    <div className="space-y-3">
      <div className="flex items-center">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center">
            <button onClick={() => setStep(i)} style={mono}
              className={`flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors text-xs flex-shrink-0 ${
                i < step ? "border-neutral-950 bg-neutral-950 text-white"
                  : i === step ? "border-neutral-950 bg-[var(--t-bg-card)] text-[var(--t-fg)]"
                  : "border-[var(--t-border)] bg-[var(--t-bg-card)] text-[var(--t-fg-subtle)]"
              }`}>
              {i < step ? <Check width={10} height={10} /> : i + 1}
            </button>
            <div style={mono} className={`text-xs ml-1 ${i === step ? "text-[var(--t-fg)]" : "text-[var(--t-fg-subtle)]"}`}>{s}</div>
            {i < steps.length - 1 && <div className={`flex-1 h-px mx-2 w-8 ${i < step ? "bg-neutral-950" : "bg-[var(--t-border)]"}`} />}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button style={mono} onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="px-3 py-1 border border-neutral-200 text-xs text-neutral-600 rounded-sm hover:bg-neutral-50 disabled:opacity-40" disabled={step === 0}>
          Back
        </button>
        <button style={mono} onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
          className="px-3 py-1 bg-neutral-950 text-white text-xs rounded-sm hover:bg-neutral-800 disabled:opacity-40" disabled={step === steps.length - 1}>
          Continue
        </button>
      </div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────
function FooterShowcase() {
  const links = {
    Product: ["Features", "Pricing", "Changelog"],
    Company: ["About", "Blog", "Careers"],
    Legal: ["Privacy", "Terms", "Cookie Policy"],
  };
  const socials = [Github, Twitter, ChatLines, Figma];
  return (
    <div className="border border-[var(--t-border)] rounded-sm p-4 bg-[var(--t-bg-subtle)]">
      <div className="flex flex-wrap gap-8 mb-5">
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-5 h-5 bg-neutral-950 rounded-sm" />
            <span style={mono} className="text-xs text-[var(--t-fg)]">Acme Inc.</span>
          </div>
          <p style={mono} className="text-xs text-[var(--t-fg-muted)] max-w-[140px] leading-relaxed">
            Building the future of design systems.
          </p>
        </div>
        {Object.entries(links).map(([group, items]) => (
          <div key={group}>
            <div style={mono} className="text-xs uppercase tracking-wider text-[var(--t-fg-subtle)] mb-2">{group}</div>
            <div className="space-y-1">
              {items.map((item) => (
                <div key={item} style={mono} className="text-xs text-[var(--t-fg-muted)] hover:text-[var(--t-fg)] cursor-pointer">{item}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-[var(--t-border)] pt-3">
        <span style={mono} className="text-xs text-[var(--t-fg-subtle)]">© 2026 Acme Inc. All rights reserved.</span>
        <div className="flex gap-2">
          {socials.map((Icon, i) => <Icon key={i} width={13} height={13} className="text-neutral-400 hover:text-neutral-700 cursor-pointer" />)}
        </div>
      </div>
    </div>
  );
}

// ── Skip Link ─────────────────────────────────────────────────────────
function SkipLinkShowcase() {
  return (
    <div className="relative border rounded-sm p-4 h-16 overflow-hidden" style={{ borderColor: "var(--t-border)" }}>
      <Label>Press Tab to reveal the focus state</Label>
      <SkipLink href="#skip-link-demo-target" />
    </div>
  );
}

export function NavComponentsSection() {
  return (
    <Section id="navigation" label="05 · Navigation" title="Wayfinding">
      <Group label="Navbar · Logo · Links · CTA · Mobile">
        <NavbarShowcase />
      </Group>
      <Group label="Sidebar Nav · Collapsible · Nested groups">
        <SidebarNavShowcase />
      </Group>
      <Group label="Tabs · Line · Pill · Segmented">
        <TabsShowcase />
      </Group>
      <Group label="Breadcrumb · With truncation">
        <BreadcrumbShowcase />
      </Group>
      <Group label="Pagination · Page · Load more">
        <PaginationShowcase />
      </Group>
      <Group label="Command Palette · ⌘K search / actions">
        <CommandPaletteShowcase />
      </Group>
      <Group label="Stepper · Onboarding · Checkout">
        <StepperShowcase />
      </Group>
      <Group label="Footer · Links · Legal · Socials">
        <FooterShowcase />
      </Group>
      <Group label="Skip Link · Keyboard accessibility">
        <SkipLinkShowcase />
      </Group>
    </Section>
  );
}