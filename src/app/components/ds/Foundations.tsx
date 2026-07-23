import { Section, Group, mono, Label } from "./Shared";

const grayRamp = [
  { label: "50", hex: "#fafafa", token: "--ds-gray-50" },
  { label: "100", hex: "#f5f5f5", token: "--ds-gray-100" },
  { label: "200", hex: "#e5e5e5", token: "--ds-gray-200" },
  { label: "300", hex: "#d4d4d4", token: "--ds-gray-300" },
  { label: "400", hex: "#a3a3a3", token: "--ds-gray-400" },
  { label: "500", hex: "#737373", token: "--ds-gray-500" },
  { label: "600", hex: "#525252", token: "--ds-gray-600" },
  { label: "700", hex: "#404040", token: "--ds-gray-700" },
  { label: "800", hex: "#262626", token: "--ds-gray-800" },
  { label: "900", hex: "#171717", token: "--ds-gray-900" },
  { label: "950", hex: "#0a0a0a", token: "--ds-gray-950" },
];

const semanticColors = [
  { label: "Success", hex: "#16a34a", bg: "#f0fdf4", token: "--ds-color-success" },
  { label: "Warning", hex: "#ca8a04", bg: "#fefce8", token: "--ds-color-warning" },
  { label: "Error", hex: "#dc2626", bg: "#fef2f2", token: "--ds-color-error" },
  { label: "Info", hex: "#2563eb", bg: "#eff6ff", token: "--ds-color-info" },
];

const typeScale = [
  { label: "Display", size: "56px", token: "--ds-text-display", sample: "The quick brown fox", family: "display" },
  { label: "Heading 2xl", size: "32px", token: "--ds-text-2xl", sample: "The quick brown fox", family: "display" },
  { label: "Heading xl", size: "24px", token: "--ds-text-xl", sample: "The quick brown fox", family: "display" },
  { label: "Heading lg", size: "20px", token: "--ds-text-lg", sample: "The quick brown fox jumps", family: "mono" },
  { label: "Body", size: "14px", token: "--ds-text-base", sample: "The quick brown fox jumps over the lazy dog", family: "mono" },
  { label: "Label", size: "12px", token: "--ds-text-xs", sample: "THE QUICK BROWN FOX · UPPERCASE · UI CHROME · TRACKING WIDE", family: "mono" },
];

const spacingTokens = [
  { token: "--ds-space-1", px: "4px", rem: "0.25rem" },
  { token: "--ds-space-2", px: "8px", rem: "0.5rem" },
  { token: "--ds-space-3", px: "12px", rem: "0.75rem" },
  { token: "--ds-space-4", px: "16px", rem: "1rem" },
  { token: "--ds-space-5", px: "20px", rem: "1.25rem" },
  { token: "--ds-space-6", px: "24px", rem: "1.5rem" },
  { token: "--ds-space-8", px: "32px", rem: "2rem" },
  { token: "--ds-space-10", px: "40px", rem: "2.5rem" },
  { token: "--ds-space-12", px: "48px", rem: "3rem" },
  { token: "--ds-space-16", px: "64px", rem: "4rem" },
];

const shadowTokens = [
  { label: "0 · None", value: "none" },
  { label: "1 · xs", value: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
  { label: "2 · sm", value: "0 1px 3px 0 rgb(0 0 0 / 0.1)" },
  { label: "3 · md", value: "0 4px 6px -1px rgb(0 0 0 / 0.1)" },
  { label: "4 · lg", value: "0 10px 15px -3px rgb(0 0 0 / 0.1)" },
];

const radiusTokens = [
  { label: "none", value: "0" },
  { label: "sm", value: "2px" },
  { label: "md", value: "4px" },
  { label: "lg", value: "8px" },
  { label: "xl", value: "12px" },
  { label: "full", value: "9999px" },
];

const motionDurations = [
  { label: "fast", value: "80ms", pct: 11 },
  { label: "base", value: "150ms", pct: 21 },
  { label: "slow", value: "250ms", pct: 36 },
  { label: "slower", value: "400ms", pct: 57 },
  { label: "lazy", value: "700ms", pct: 100 },
];

const motionEasings = [
  { label: "linear", value: "linear" },
  { label: "ease-in", value: "cubic-bezier(0.4, 0, 1, 1)" },
  { label: "ease-out", value: "cubic-bezier(0, 0, 0.2, 1)" },
  { label: "default", value: "cubic-bezier(0.16, 1, 0.3, 1)" },
  { label: "spring", value: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
];

export function FoundationsSection() {
  return (
    <Section id="foundations" label="01 · Foundations" title="Tokens & Primitives">
      {/* Color Tokens — Gray ramp */}
      <Group label="Color Tokens · Gray ramp">
        <div className="flex gap-0 rounded-sm overflow-hidden border" style={{ borderColor: "var(--t-border-subtle)" }}>
          {grayRamp.map((swatch) => (
            <div key={swatch.label} className="flex-1 cursor-default">
              <div className="h-12" style={{ backgroundColor: swatch.hex }} />
              <div className="px-1 pt-1 pb-1.5 border-t" style={{ backgroundColor: "var(--t-bg-card)", borderColor: "var(--t-border-subtle)" }}>
                <div style={{ ...mono, color: "var(--t-fg-muted)" }} className="text-xs">{swatch.label}</div>
                <div style={{ ...mono, color: "var(--t-fg-subtle)" }} className="text-xs truncate">{swatch.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </Group>

      {/* Semantic status colors */}
      <Group label="Color Tokens · Semantic status">
        <div className="grid grid-cols-4 gap-2">
          {semanticColors.map((c) => (
            <div key={c.label} className="border rounded-sm overflow-hidden" style={{ borderColor: "var(--t-border-subtle)" }}>
              <div className="flex items-center gap-2 p-2" style={{ backgroundColor: c.bg }}>
                <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: c.hex }} />
                <span style={{ fontFamily: "var(--ds-font-body)", fontSize: "11px", color: c.hex }}>
                  {c.label}
                </span>
              </div>
              <div className="px-2 py-1.5" style={{ backgroundColor: "var(--t-bg-card)" }}>
                <div style={{ ...mono, color: "var(--t-fg-muted)" }} className="text-xs">{c.token}</div>
                <div style={{ ...mono, color: "var(--t-fg-subtle)" }} className="text-xs">{c.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </Group>

      {/* Type Scale */}
      <Group label="Type Scale · EB Garamond + IBM Plex Mono">
        <div className="space-y-0 divide-y divide-neutral-50">
          {typeScale.map((t) => (
            <div key={t.label} className="flex items-baseline gap-4 py-2" style={{ borderBottom: "1px solid var(--t-border-subtle)" }}>
              <div style={{ ...mono, color: "var(--t-fg-subtle)" }} className="text-xs w-24 flex-shrink-0">{t.label}</div>
              <div
                style={{
                  fontFamily: t.family === "display" ? "var(--ds-font-display)" : "var(--ds-font-body)",
                  fontSize: t.size,
                  lineHeight: 1.2,
                  color: "var(--t-fg)",
                }}
                className="flex-1 truncate"
              >
                {t.sample}
              </div>
              <div style={{ ...mono, color: "var(--t-fg-subtle)" }} className="text-xs text-right flex-shrink-0 w-10">
                {t.size}
              </div>
            </div>
          ))}
        </div>
      </Group>

      {/* Spacing */}
      <Group label="Spacing & Grid · 4px base unit · 12-col grid">
        <div className="space-y-1.5">
          {spacingTokens.map((s) => (
            <div key={s.token} className="flex items-center gap-3">
              <div style={{ ...mono, color: "var(--t-fg-subtle)" }} className="text-xs w-28 flex-shrink-0">{s.token}</div>
              <div style={{ backgroundColor: "var(--t-fg)", width: s.px, height: "10px", minWidth: "2px" }} />
              <div style={{ ...mono, color: "var(--t-fg-muted)" }} className="text-xs">{s.px} / {s.rem}</div>
            </div>
          ))}
        </div>
      </Group>

      {/* Elevation */}
      <Group label="Elevation · Shadow levels 0–4">
        <div className="flex gap-5 flex-wrap">
          {shadowTokens.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <div
                className="w-16 h-16 rounded-sm border"
                style={{
                  backgroundColor: "var(--t-bg-card)",
                  borderColor: "var(--t-border-subtle)",
                  boxShadow: s.value === "none" ? "none" : s.value,
                }}
              />
              <div style={{ ...mono, color: "var(--t-fg-subtle)" }} className="text-xs text-center">{s.label}</div>
            </div>
          ))}
        </div>
      </Group>

      {/* Radius */}
      <Group label="Radius Tokens · none · sm · md · lg · xl · full">
        <div className="flex gap-5 flex-wrap items-end">
          {radiusTokens.map((r) => (
            <div key={r.label} className="flex flex-col items-center gap-2">
              <div
                className="w-12 h-12 border-2"
                style={{ borderRadius: r.value, borderColor: "var(--t-fg)", backgroundColor: "var(--t-bg-subtle)" }}
              />
              <div style={{ ...mono, color: "var(--t-fg-muted)" }} className="text-xs">{r.label}</div>
              <div style={{ ...mono, color: "var(--t-fg-subtle)" }} className="text-xs">{r.value}</div>
            </div>
          ))}
        </div>
      </Group>

      {/* Motion */}
      <Group label="Motion Tokens · Easing · Duration">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <Label>Duration</Label>
            <div className="mt-2 space-y-2">
              {motionDurations.map((d) => (
                <div key={d.label} className="flex items-center gap-3">
                  <div style={mono} className="text-xs text-neutral-400 w-14">{d.label}</div>
                  <div className="flex-1 rounded-full h-1 overflow-hidden" style={{ backgroundColor: "var(--t-bg-muted)" }}>
                    <div className="h-full rounded-full" style={{ width: `${d.pct}%`, backgroundColor: "var(--t-fg)" }} />
                  </div>
                  <div style={mono} className="text-xs text-neutral-400 w-12 text-right">{d.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Label>Easing</Label>
            <div className="mt-2 space-y-2">
              {motionEasings.map((e) => (
                <div key={e.label} className="flex items-center gap-2">
                  <div style={mono} className="text-xs text-neutral-400 w-16">{e.label}</div>
                  <div style={mono} className="text-xs text-neutral-300 truncate flex-1">{e.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Group>
    </Section>
  );
}