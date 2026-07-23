import { useState, useEffect, useRef } from "react";
import {
  ViewGrid, Box, Settings, Bell, Compass,
  StatsReport, LayoutLeft, Dashboard,
  Download, Eye, Code,
} from "iconoir-react";
import { FoundationsSection } from "./components/ds/Foundations";
import { PrimitivesSection } from "./components/ds/Primitives";
import { FormsSection } from "./components/ds/Forms";
import { FeedbackSection } from "./components/ds/Feedback";
import { NavComponentsSection } from "./components/ds/NavComponents";
import { DataDisplaySection } from "./components/ds/DataDisplay";
import { LandingSection } from "./components/ds/Landing";
import { DashboardSection } from "./components/ds/Dashboard";
import { ScreensSection } from "./components/ds/Screens";
import { AnimationsSection } from "./components/ds/Animations";
import { THEMES, THEME_ORDER, type ThemeId } from "./components/themes";
import LandingPage from "./components/LandingPage";
import {
  useGSAPAnimations,
  useScrollAnimations,
  useHoverAnimations,
  useThemeTransition
} from "./animations";

const mono = { fontFamily: "var(--ds-font-body)" } as const;
const disp = { fontFamily: "var(--ds-font-display)" } as const;

const SECTIONS = [
  { id: "foundations", label: "Foundations", tag: "tokens", icon: ViewGrid, count: "6" },
  { id: "primitives", label: "Primitives", tag: "atoms", icon: Box, count: "12" },
  { id: "forms", label: "Form Controls", tag: "inputs", icon: Settings, count: "9" },
  { id: "feedback", label: "Feedback", tag: "overlays", icon: Bell, count: "6" },
  { id: "navigation", label: "Navigation", tag: "wayfinding", icon: Compass, count: "9" },
  { id: "data", label: "Data Display", tag: "tables", icon: StatsReport, count: "9" },
  { id: "dashboard", label: "Dashboard", tag: "layout", icon: Dashboard, count: "5" },
  { id: "screens", label: "App Screens", tag: "mobile", icon: LayoutLeft, count: "13" },
];

const ANIMATION_SECTION = {
  id: "animations",
  label: "Animations",
  tag: "gsap",
  icon: Code,
  count: "docs",
};

const THEME_LABELS: Record<ThemeId, string> = {
  light: "Light",
  main: "Main",
  playful: "Playful",
  dark: "Dark",
};

export default function App() {
  const [active, setActive] = useState("foundations");
  const [themeId, setThemeId] = useState<ThemeId>("light");
  const [viewMode, setViewMode] = useState<"showcase" | "landing" | "animations">("showcase");
  const mainRef = useRef<HTMLDivElement>(null);

  const t = THEMES[themeId];

  // GSAP Animation Hooks
  const { fadeInUp, scaleIn, addHover, containerRef: gsapContainerRef } = useGSAPAnimations();
  const { containerRef: scrollContainerRef, reveal, staggerReveal } = useScrollAnimations();
  const { addScaleHover, addLiftHover, addButtonHover } = useHoverAnimations();
  const { animateThemeSwitch, containerRef: themeContainerRef } = useThemeTransition();

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    const handleScroll = () => {
      const sections = SECTIONS.map((s) => {
        const el = document.getElementById(s.id);
        if (!el) return { id: s.id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: s.id, top: Math.abs(rect.top - 80) };
      });
      const closest = sections.reduce((a, b) => (a.top < b.top ? a : b));
      setActive(closest.id);
    };
    main.addEventListener("scroll", handleScroll, { passive: true });
    return () => main.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el && mainRef.current) {
      mainRef.current.scrollTo({ top: el.offsetTop, behavior: "smooth" });
      setActive(id);
    }
  };

  const totalComponents = SECTIONS.reduce((a, s) => a + parseInt(s.count), 0);

  return (
    <div
      ref={(el) => {
        if (gsapContainerRef.current) gsapContainerRef.current = el;
        if (scrollContainerRef.current) scrollContainerRef.current = el;
        if (themeContainerRef.current) themeContainerRef.current = el;
      }}
      data-theme={themeId}
      data-scroll-stagger="0.05"
      style={{ ...mono, backgroundColor: t.mainBg, color: t.mainText }}
      className="flex h-screen overflow-hidden transition-colors duration-300"
    >
      {/* ── Sidebar ──────────────────────────────────────────────── */}
      <aside
        className="w-48 flex-shrink-0 flex flex-col transition-colors duration-300"
        style={{
          backgroundColor: t.sidebarBg,
          borderRight: `1px solid ${t.sidebarBorder}`,
        }}
      >
        {/* Logo / Header */}
        <div
          className="px-4 py-4"
          style={{ borderBottom: `1px solid ${t.sidebarHeaderBorder}` }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-5 h-5 rounded-sm flex-shrink-0 transition-colors duration-300"
              style={{ backgroundColor: t.logoDot }}
            />
            <span style={{ ...disp, color: t.sidebarTitle }} className="text-base">
              Design System
            </span>
          </div>
          <div style={{ ...mono, color: t.sidebarSubtle }} className="text-[9px] leading-relaxed">
            Component Library v1.0
          </div>
          <div style={{ ...mono, color: t.sidebarSubtle }} className="text-[9px] mt-0.5">
            {totalComponents} components · 2 typefaces
          </div>
        </div>

        {/* Typefaces */}
        <div
          className="px-4 py-3"
          style={{ borderBottom: `1px solid ${t.sidebarHeaderBorder}` }}
        >
          <div style={{ ...mono, color: t.sidebarLabel }} className="text-[9px] uppercase tracking-widest mb-2">
            Typefaces
          </div>
          <div className="space-y-1.5">
            <div>
              <div style={{ fontFamily: "var(--ds-font-display)", color: t.sidebarText }} className="text-sm leading-none">
                Eb Garamond
              </div>
              <div style={{ ...mono, color: t.sidebarSubtle }} className="text-[9px] mt-0.5">
                Display · Serif
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--ds-font-body)", color: t.sidebarMuted }} className="text-xs leading-none">
                IBM Plex Mono
              </div>
              <div style={{ ...mono, color: t.sidebarSubtle }} className="text-[9px] mt-0.5">
                Body · Monospace
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-2 overflow-y-auto">
          <div
            style={{ ...mono, color: t.sidebarLabel }}
            className="px-4 py-1 text-[9px] uppercase tracking-widest mb-1"
          >
            Sections
          </div>
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            const isActive = active === section.id;
            return (
              <button
                key={section.id}
                data-hover-lift="-2"
                onClick={() => {
                  // If we're in landing mode, switch to showcase first
                  if (viewMode === "landing") {
                    setViewMode("showcase");
                    // Small delay to ensure the showcase view is rendered
                    setTimeout(() => {
                      scrollTo(section.id);
                    }, 50);
                  } else {
                    scrollTo(section.id);
                  }
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-left transition-all duration-150"
                style={{
                  backgroundColor: isActive && viewMode === "showcase" ? t.sidebarActiveBg : "transparent",
                  color: isActive && viewMode === "showcase" ? t.sidebarActiveText : t.sidebarMuted,
                }}
                onMouseEnter={(e) => {
                  if (!(isActive && viewMode === "showcase")) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = t.sidebarHoverBg;
                    (e.currentTarget as HTMLElement).style.color = t.sidebarHoverText;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!(isActive && viewMode === "showcase")) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLElement).style.color = t.sidebarMuted;
                  }
                }}
              >
                <Icon width={14} height={14} className="flex-shrink-0 m-[0px]" />
                <div className="flex-1 min-w-0">
                  <div style={mono} className="text-[11px] leading-none">
                    {section.label}
                  </div>
                  <div
                    style={{ ...mono, color: isActive && viewMode === "showcase" ? t.sidebarActiveMuted : t.sidebarSubtle }}
                    className="text-[9px] mt-0.5"
                  >
                    {section.tag}
                  </div>
                </div>
                <span
                  style={{ ...mono, color: isActive && viewMode === "showcase" ? t.sidebarActiveMuted : t.sidebarSubtle }}
                  className="text-[9px] flex-shrink-0"
                >
                  {section.count}
                </span>
              </button>
            );
          })}

          {/* Animation Documentation */}
          <div
            style={{ ...mono, color: t.sidebarLabel }}
            className="px-4 py-1 text-[9px] uppercase tracking-widest mb-1 mt-4"
          >
            Documentation
          </div>

          <button
            onClick={() => {
              setViewMode("animations");
              setActive("animations");
            }}
            className="w-full flex items-center gap-2.5 px-4 py-2 text-left transition-all duration-150"
            style={{
              backgroundColor: viewMode === "animations" ? t.sidebarActiveBg : "transparent",
              color: viewMode === "animations" ? t.sidebarActiveText : t.sidebarMuted,
            }}
            onMouseEnter={(e) => {
              if (viewMode !== "animations") {
                (e.currentTarget as HTMLElement).style.backgroundColor = t.sidebarHoverBg;
                (e.currentTarget as HTMLElement).style.color = t.sidebarHoverText;
              }
            }}
            onMouseLeave={(e) => {
              if (viewMode !== "animations") {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLElement).style.color = t.sidebarMuted;
              }
            }}
          >
            <Code width={14} height={14} className="flex-shrink-0 m-[0px]" />
            <div className="flex-1 min-w-0">
              <div style={mono} className="text-[11px] leading-none">
                {ANIMATION_SECTION.label}
              </div>
              <div
                style={{ ...mono, color: active === "animations" ? t.sidebarActiveMuted : t.sidebarSubtle }}
                className="text-[9px] mt-0.5"
              >
                {ANIMATION_SECTION.tag}
              </div>
            </div>
            <span
              style={{ ...mono, color: active === "animations" ? t.sidebarActiveMuted : t.sidebarSubtle }}
              className="text-[9px] flex-shrink-0"
            >
              {ANIMATION_SECTION.count}
            </span>
          </button>

          {/* Landing Page Separator */}
          <div
            style={{ ...mono, color: t.sidebarLabel }}
            className="px-4 py-1 text-[9px] uppercase tracking-widest mb-1 mt-4"
          >
            Views
          </div>

          {/* Landing Page Option */}
          <button
            onClick={() => setViewMode("landing")}
            className="w-full flex items-center gap-2.5 px-4 py-2 text-left transition-all duration-150"
            style={{
              backgroundColor: viewMode === "landing" ? t.sidebarActiveBg : "transparent",
              color: viewMode === "landing" ? t.sidebarActiveText : t.sidebarMuted,
            }}
            onMouseEnter={(e) => {
              if (viewMode !== "landing") {
                (e.currentTarget as HTMLElement).style.backgroundColor = t.sidebarHoverBg;
                (e.currentTarget as HTMLElement).style.color = t.sidebarHoverText;
              }
            }}
            onMouseLeave={(e) => {
              if (viewMode !== "landing") {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLElement).style.color = t.sidebarMuted;
              }
            }}
          >
            <Eye width={14} height={14} className="flex-shrink-0 m-[0px]" />
            <div className="flex-1 min-w-0">
              <div style={mono} className="text-[11px] leading-none">
                Landing Page
              </div>
              <div
                style={{ ...mono, color: viewMode === "landing" ? t.sidebarActiveMuted : t.sidebarSubtle }}
                className="text-[9px] mt-0.5"
              >
                demo
              </div>
            </div>
            <span
              style={{ ...mono, color: viewMode === "landing" ? t.sidebarActiveMuted : t.sidebarSubtle }}
              className="text-[9px] flex-shrink-0"
            >
              full
            </span>
          </button>

          {/* Components Option - Show when in landing mode */}
          {viewMode === "landing" && (
            <button
              onClick={() => setViewMode("showcase")}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-left transition-all duration-150"
              style={{
                backgroundColor: "transparent",
                color: t.sidebarMuted,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = t.sidebarHoverBg;
                (e.currentTarget as HTMLElement).style.color = t.sidebarHoverText;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLElement).style.color = t.sidebarMuted;
              }}
            >
              <Code width={14} height={14} className="flex-shrink-0 m-[0px]" />
              <div className="flex-1 min-w-0">
                <div style={mono} className="text-[11px] leading-none">
                  Components
                </div>
                <div
                  style={{ ...mono, color: t.sidebarSubtle }}
                  className="text-[9px] mt-0.5"
                >
                  showcase
                </div>
              </div>
              <span
                style={{ ...mono, color: t.sidebarSubtle }}
                className="text-[9px] flex-shrink-0"
              >
                {totalComponents}
              </span>
            </button>
          )}
        </nav>

        {/* ── Theme Switcher ── */}
        <div
          className="px-4 py-3"
          style={{ borderTop: `1px solid ${t.sidebarHeaderBorder}` }}
        >
          <div style={{ ...mono, color: t.sidebarLabel }} className="text-[9px] uppercase tracking-widest mb-2">
            Theme
          </div>
          <div className="flex items-center gap-1.5">
            {THEME_ORDER.map((tid) => {
              const cfg = THEMES[tid];
              const isSelected = tid === themeId;
              return (
                <button
                  key={tid}
                  data-hover-scale="1.1"
                  onClick={() => setThemeId(tid)}
                  title={THEME_LABELS[tid]}
                  className="flex flex-col items-center gap-1 group"
                  style={{ outline: "none" }}
                >
                  {/* Swatch cluster: 3 mini dots */}
                  <div
                    className="flex gap-[2px] p-[3px] rounded-md transition-all duration-150"
                    style={{
                      backgroundColor: isSelected
                        ? "rgba(128,128,128,0.25)"
                        : "transparent",
                      boxShadow: isSelected
                        ? `0 0 0 1.5px ${t.sidebarText}30`
                        : "none",
                    }}
                  >
                    {cfg.swatches.map((color, i) => (
                      <span
                        key={i}
                        className="block w-2 h-2 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span
                    style={{
                      ...mono,
                      color: isSelected ? t.sidebarText : t.sidebarSubtle,
                    }}
                    className="text-[8px] leading-none"
                  >
                    {THEME_LABELS[tid]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-4 py-3 space-y-2"
          style={{ borderTop: `1px solid ${t.sidebarHeaderBorder}` }}
        >
          <a
            href="/tokens.css"
            download
            className="flex items-center gap-1.5 transition-colors"
            style={{ color: t.sidebarSubtle }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = t.sidebarText)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = t.sidebarSubtle)
            }
          >
            <Download width={10} height={10} />
            <span style={mono} className="text-[9px]">tokens.css</span>
          </a>
          <div style={{ ...mono, color: t.sidebarSubtle }} className="text-[8px]">
            IBM Plex Mono · EB Garamond<br />
            MIT License · 2026
          </div>
        </div>
      </aside>

      {/* ── Main Content ──────────────────────────────────────────── */}
      {viewMode === "showcase" ? (
        <main
          ref={mainRef}
          className="flex-1 overflow-y-auto transition-colors duration-300"
          style={{ backgroundColor: t.mainBg }}
        >
          {/* Page header */}
          <div
            className="px-8 py-5 flex items-center justify-between"
            style={{
              borderBottom: `1px solid ${t.mainBorder}`,
              backgroundColor: t.mainHeaderBg,
            }}
          >
            <div>
              <div
                style={{ ...mono, color: t.mainMuted }}
                className="text-[10px] uppercase tracking-[0.2em] mb-0.5"
              >
                Component Showcase · Full Reference
              </div>
              <h1 style={{ ...disp, color: t.mainText }} className="text-2xl leading-tight">
                Design System — All Components
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div style={{ ...mono, color: t.mainMuted }} className="text-xs">
                {SECTIONS.length} sections · {totalComponents} components
              </div>
              <div
                className="w-px h-4"
                style={{ backgroundColor: t.mainBorder }}
              />
              <div style={{ ...mono, color: t.mainMuted }} className="flex items-center gap-1 text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Production ready
              </div>
            </div>
          </div>

          {/* All sections */}
          <div data-scroll-reveal="up">
            <FoundationsSection />
          </div>
          <div data-scroll-reveal="up">
            <PrimitivesSection />
          </div>
          <div data-scroll-reveal="up">
            <FormsSection />
          </div>
          <div data-scroll-reveal="up">
            <FeedbackSection />
          </div>
          <div data-scroll-reveal="up">
            <NavComponentsSection />
          </div>
          <div data-scroll-reveal="up">
            <DataDisplaySection />
          </div>
          <div data-scroll-reveal="up">
            <LandingSection />
          </div>
          <div data-scroll-reveal="up">
            <DashboardSection />
          </div>
          <div data-scroll-reveal="up">
            <ScreensSection />
          </div>
          {/* Footer */}
          <div
            className="px-8 py-8"
            style={{ borderTop: `1px solid ${t.mainBorder}` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div style={{ ...disp, color: t.mainText }} className="text-lg mb-1">
                  Design System v1.0
                </div>
                <div style={{ ...mono, color: t.mainMuted }} className="text-[10px]">
                  Built with IBM Plex Mono + EB Garamond · MIT License
                </div>
              </div>
              <div className="flex items-center gap-4">
                {["Foundations", "Primitives", "Forms", "Charts"].map((tag) => (
                  <span key={tag} style={{ ...mono, color: t.mainMuted }} className="text-[10px]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </main>
      ) : viewMode === "animations" ? (
        <main
          className="flex-1 overflow-y-auto transition-colors duration-300"
          style={{ backgroundColor: t.mainBg }}
        >
          <AnimationsSection />
        </main>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <LandingPage themeId={themeId} setThemeId={setThemeId} />
        </div>
      )}
    </div>
  );
}
