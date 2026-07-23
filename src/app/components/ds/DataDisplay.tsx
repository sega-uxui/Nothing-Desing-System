import { useState } from "react";
import {
  StatUp, StatDown, NavArrowUp, NavArrowDown,
  User, MoreHoriz, Box, Page, Search, MailIn
} from "iconoir-react";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  PieChart, Pie, Cell, XAxis,
  Tooltip, ResponsiveContainer
} from "recharts";
import { Section, Group, mono } from "./Shared";
import { CompareBar } from "../ui/compare-bar";
import { NewsCard } from "../ui/news-card";
import { Sparkline } from "../ui/sparkline";

const chartData = [
  { month: "Jan", value: 42, prev: 35, area: 30 },
  { month: "Feb", value: 58, prev: 48, area: 44 },
  { month: "Mar", value: 51, prev: 52, area: 40 },
  { month: "Apr", value: 73, prev: 61, area: 55 },
  { month: "May", value: 67, prev: 58, area: 62 },
  { month: "Jun", value: 89, prev: 72, area: 74 },
  { month: "Jul", value: 82, prev: 79, area: 68 },
];

const sparkData = [
  [10, 14, 12, 18, 16, 22, 20],
  [22, 18, 24, 20, 28, 25, 30],
  [8, 12, 10, 8, 14, 12, 16],
].map((series) => series.map((v, i) => ({ i, v })));

const donutData = [
  { name: "Direct", value: 40, color: "#171717" },
  { name: "Organic", value: 30, color: "#737373" },
  { name: "Referral", value: 18, color: "#d4d4d4" },
  { name: "Social", value: 12, color: "#e5e5e5" },
];

const tableData = [
  { name: "Homepage", status: "Live", visits: "12,430", bounce: "38%", conv: "3.2%" },
  { name: "Pricing", status: "Live", visits: "8,210", bounce: "42%", conv: "5.8%" },
  { name: "Docs", status: "Draft", visits: "5,640", bounce: "22%", conv: "1.4%" },
  { name: "Blog", status: "Live", visits: "3,180", bounce: "55%", conv: "0.9%" },
  { name: "About", status: "Archive", visits: "920", bounce: "61%", conv: "0.4%" },
];

// ── Data Table ────────────────────────────────────────────────────────
function DataTableShowcase() {
  const [sortCol, setSortCol] = useState("visits");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [selected, setSelected] = useState<string[]>([]);
  const cols = ["name", "status", "visits", "bounce", "conv"];

  const toggleSelect = (name: string) =>
    setSelected((s) => s.includes(name) ? s.filter((n) => n !== name) : [...s, name]);

  return (
    <div className="border border-[var(--t-border)] rounded-sm overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--t-border-subtle)] bg-[var(--t-bg-subtle)]">
        <div className="relative">
          <Search width={11} height={11} className="absolute left-2 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input style={{ ...mono, backgroundColor: "var(--t-bg-card)", color: "var(--t-fg)", borderColor: "var(--t-border)" }} className="pl-6 pr-2 py-1 border rounded-sm text-xs outline-none focus:ring-2 focus:ring-neutral-950/15 placeholder:text-neutral-500 w-32" placeholder="Filter rows…" />
        </div>
        {selected.length > 0 && <span style={mono} className={`text-xs ${selected.length > 0 ? "text-neutral-500 ml-2" : "hidden"}`}>{selected.length} selected</span>}
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-100">
            <th className="w-8 px-3 py-2">
              <div
                className={`w-3.5 h-3.5 border rounded-sm cursor-pointer flex items-center justify-center ${selected.length === tableData.length ? "bg-neutral-950 border-neutral-950" : "border-neutral-300"}`}
                onClick={() => setSelected(selected.length === tableData.length ? [] : tableData.map((r) => r.name))}
              >
                {selected.length === tableData.length && (
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                )}
              </div>
            </th>
            {cols.map((col) => (
              <th key={col} onClick={() => { if (sortCol === col) setSortDir((d) => d === "asc" ? "desc" : "asc"); else { setSortCol(col); setSortDir("desc"); } }}
                className="px-3 py-2 text-left cursor-pointer hover:bg-neutral-50">
                <div className="flex items-center gap-1">
                  <span style={mono} className="text-xs uppercase tracking-wider text-neutral-500">{col}</span>
                  {sortCol === col && (sortDir === "desc" ? <NavArrowDown width={9} height={9} className="text-neutral-500" /> : <NavArrowUp width={9} height={9} className="text-neutral-500" />)}
                </div>
              </th>
            ))}
            <th className="px-3 py-2" />
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.name} className={`border-b border-[var(--t-border-subtle)] transition-colors hover:bg-[var(--t-bg-subtle)] ${selected.includes(row.name) ? "bg-blue-50/40" : ""}`}>
              <td className="px-3 py-2">
                <div className={`w-3.5 h-3.5 border rounded-sm cursor-pointer flex items-center justify-center ${selected.includes(row.name) ? "bg-neutral-950 border-neutral-950" : "border-neutral-300"}`}
                  onClick={() => toggleSelect(row.name)}>
                  {selected.includes(row.name) && <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </div>
              </td>
              <td className="px-3 py-2"><span style={mono} className="text-xs text-[var(--t-fg)]">{row.name}</span></td>
              <td className="px-3 py-2">
                <span style={mono} className={`text-xs px-1.5 py-0.5 rounded-full ${row.status === "Live" ? "bg-green-50 text-green-700" : row.status === "Draft" ? "bg-yellow-50 text-yellow-700" : "bg-neutral-100 text-neutral-500"}`}>
                  {row.status}
                </span>
              </td>
              <td className="px-3 py-2"><span style={mono} className="text-xs text-neutral-700">{row.visits}</span></td>
              <td className="px-3 py-2"><span style={mono} className="text-xs text-neutral-700">{row.bounce}</span></td>
              <td className="px-3 py-2"><span style={mono} className="text-xs text-neutral-700">{row.conv}</span></td>
              <td className="px-3 py-2"><MoreHoriz width={12} height={12} className="text-neutral-400 hover:text-neutral-700 cursor-pointer" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Stat Card / KPI ───────────────────────────────────────────────────
const kpis = [
  { label: "Total Revenue", value: "$45,231", delta: "+20.1%", up: true, spark: sparkData[0] },
  { label: "Subscriptions", value: "2,350", delta: "+12.5%", up: true, spark: sparkData[1] },
  { label: "Churn rate", value: "2.4%", delta: "-0.8%", up: false, spark: sparkData[2] },
];

function StatCardShowcase() {
  return (
    <div className="flex gap-3 flex-wrap">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="border border-[var(--t-border)] rounded-sm p-3 w-48 bg-[var(--t-bg-card)]">
          <div style={{ ...mono, color: "var(--t-fg-muted)" }} className="text-xs mb-1">{kpi.label}</div>
          <div className="flex items-end justify-between">
            <div>
              <div style={{ fontFamily: "var(--ds-font-display)", color: "var(--t-fg)" }} className="text-2xl leading-none">{kpi.value}</div>
              <div className={`flex items-center gap-0.5 mt-0.5 ${kpi.up ? "text-green-600" : "text-red-500"}`}>
                {kpi.up ? <StatUp width={10} height={10} /> : <StatDown width={10} height={10} />}
                <span style={mono} className="text-xs">{kpi.delta}</span>
              </div>
            </div>
            <Sparkline data={kpi.spark} variant={kpi.up ? "up" : "down"} width={48} height={28} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Charts ────────────────────────────────────────────────────────────
function ChartShowcase() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="border border-neutral-200 rounded-sm p-3">
        <div style={mono} className="text-xs text-neutral-500 mb-2">Line chart</div>
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={chartData}>
            <XAxis dataKey="month" tick={{ fontSize: 8, fontFamily: "var(--ds-font-body)", fill: "#a3a3a3" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontFamily: "var(--ds-font-body)", fontSize: 10, border: "1px solid #e5e5e5", borderRadius: 2, boxShadow: "none" }} />
            <Line key="line-value" type="monotone" dataKey="value" stroke="#171717" strokeWidth={1.5} dot={false} />
            <Line key="line-prev" type="monotone" dataKey="prev" stroke="#d4d4d4" strokeWidth={1.5} dot={false} strokeDasharray="3 3" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="border border-neutral-200 rounded-sm p-3">
        <div style={mono} className="text-xs text-neutral-500 mb-2">Bar chart</div>
        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={chartData} barSize={10}>
            <XAxis dataKey="month" tick={{ fontSize: 8, fontFamily: "var(--ds-font-body)", fill: "#a3a3a3" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontFamily: "var(--ds-font-body)", fontSize: 10, border: "1px solid #e5e5e5", borderRadius: 2, boxShadow: "none" }} />
            <Bar key="bar-value" dataKey="value" fill="#171717" radius={[2, 2, 0, 0]} />
            <Bar key="bar-prev" dataKey="prev" fill="#e5e5e5" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="border border-neutral-200 rounded-sm p-3">
        <div style={mono} className="text-xs text-neutral-500 mb-2">Area chart</div>
        <ResponsiveContainer width="100%" height={100}>
          <AreaChart data={chartData}>
            <XAxis dataKey="month" tick={{ fontSize: 8, fontFamily: "var(--ds-font-body)", fill: "#a3a3a3" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontFamily: "var(--ds-font-body)", fontSize: 10, border: "1px solid #e5e5e5", borderRadius: 2, boxShadow: "none" }} />
            <Area key="area-area" type="monotone" dataKey="area" stroke="#171717" strokeWidth={1.5} fill="#171717" fillOpacity={0.08} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="border border-neutral-200 rounded-sm p-3 flex items-center gap-4">
        <div>
          <div style={mono} className="text-xs text-neutral-500 mb-2">Donut chart</div>
          <PieChart width={90} height={90}>
            <Pie data={donutData} cx={40} cy={40} innerRadius={26} outerRadius={40} dataKey="value" strokeWidth={0}>
              {donutData.map((entry) => <Cell key={`cell-${entry.name}`} fill={entry.color} />)}
            </Pie>
          </PieChart>
        </div>
        <div className="space-y-1.5">
          {donutData.map((d) => (
            <div key={d.name} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
              <span style={mono} className="text-xs text-neutral-600">{d.name}</span>
              <span style={mono} className="text-xs text-neutral-400">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── List / Feed ───────────────────────────────────────────────────────
function ListFeedShowcase() {
  const items = [
    { name: "Sarah Chen", action: "deployed", target: "Production v2.4.1", time: "2m ago", icon: Box, color: "text-blue-600 bg-blue-50" },
    { name: "James Park", action: "opened PR", target: "#142 — Fix tooltip", time: "14m ago", icon: Page, color: "text-neutral-600 bg-neutral-100" },
    { name: "Mia Torres", action: "merged", target: "feature/nav-redesign", time: "1h ago", icon: User, color: "text-green-600 bg-green-50" },
    { name: "Alex Kim", action: "commented on", target: "Pricing page", time: "3h ago", icon: User, color: "text-neutral-600 bg-neutral-100" },
  ];
  return (
    <div className="border border-[var(--t-border)] rounded-sm bg-[var(--t-bg-card)] divide-y divide-[var(--t-border-subtle)] max-w-sm">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <div key={i} className="flex gap-3 px-3 py-2.5 hover:bg-neutral-50">
            <div className={`w-7 h-7 rounded-full ${item.color} flex items-center justify-center flex-shrink-0`}>
              <Icon width={12} height={12} />
            </div>
            <div className="flex-1 min-w-0">
              <p style={mono} className="text-xs text-neutral-900">
                <span className="text-neutral-700">{item.name}</span>{" "}
                <span className="text-neutral-400">{item.action}</span>{" "}
                <span className="text-neutral-700">{item.target}</span>
              </p>
              <p style={mono} className="text-xs text-neutral-400 mt-0.5">{item.time}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Empty State ───────────────────────────────────────────────────────
function EmptyStateShowcase() {
  return (
    <div className="border border-dashed border-[var(--t-border)] rounded-sm p-8 text-center bg-[var(--t-bg-subtle)] max-w-xs">
      <div className="w-12 h-12 bg-[var(--t-bg-card)] border border-[var(--t-border)] rounded-sm flex items-center justify-center mx-auto mb-3 shadow-sm">
        <MailIn width={20} height={20} className="text-neutral-400" />
      </div>
      <h4 style={mono} className="text-sm text-[var(--t-fg)] mb-1">No results found</h4>
      <p style={{ ...mono, color: "var(--t-fg-muted)" }} className="text-xs leading-relaxed mb-4">
        Try adjusting your filters or search query to find what you're looking for.
      </p>
      <button style={mono} className="px-3 py-1.5 bg-neutral-950 text-white text-xs rounded-sm hover:bg-neutral-800">
        Clear filters
      </button>
    </div>
  );
}

// ── Timeline ──────────────────────────────────────────────────────────
function TimelineShowcase() {
  const events = [
    { label: "Production deploy", sub: "v2.4.1 · 12 changes", time: "Today, 2:34 PM", done: true },
    { label: "Code review approved", sub: "PR #142 by James Park", time: "Today, 11:12 AM", done: true },
    { label: "Tests passing", sub: "All 247 tests passed", time: "Today, 10:55 AM", done: true },
    { label: "Build queued", sub: "Waiting for runner", time: "Today, 10:50 AM", done: false },
  ];
  return (
    <div className="relative max-w-xs">
      <div className="absolute left-3 top-3 bottom-3 w-px bg-neutral-100" />
      <div className="space-y-0">
        {events.map((e, i) => (
          <div key={i} className="flex gap-3 relative pb-4 last:pb-0">
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10 ${e.done ? "border-neutral-950 bg-neutral-950" : "border-[var(--t-border)] bg-[var(--t-bg-card)]"}`}>
              {e.done && <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </div>
            <div className="flex-1 pt-0.5">
              <p style={mono} className="text-xs text-neutral-900">{e.label}</p>
              <p style={mono} className="text-xs text-neutral-500">{e.sub}</p>
              <p style={mono} className="text-xs text-neutral-400 mt-0.5">{e.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Compare Bar ───────────────────────────────────────────────────────
function CompareBarShowcase() {
  return (
    <div className="max-w-sm space-y-4">
      <CompareBar label="Possession" leftValue={58} rightValue={42} />
      <CompareBar label="Shots on target" leftValue={7} rightValue={4} />
      <CompareBar label="Corners" leftValue={5} rightValue={8} />
    </div>
  );
}

// ── Sparkline ─────────────────────────────────────────────────────────
function SparklineShowcase() {
  return (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-1">
        <Sparkline data={sparkData[0]} variant="up" />
        <span style={mono} className="text-xs text-neutral-500">Up</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Sparkline data={sparkData[2]} variant="down" />
        <span style={mono} className="text-xs text-neutral-500">Down</span>
      </div>
    </div>
  );
}

// ── News Card ─────────────────────────────────────────────────────────
function NewsCardShowcase() {
  return (
    <div className="grid grid-cols-2 gap-4 max-w-xl">
      <NewsCard
        image="https://images.unsplash.com/photo-1642104704074-907c0698cbd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=640&q=60"
        tag="Earnings"
        time="48m ago"
        title="Nvidia earnings beat estimates, shares climb after hours"
        source="CNBC"
        onClick={() => {}}
      />
      <NewsCard
        tag="Macro"
        time="12m ago"
        title="Fed signals rate hold through Q2 amid cooling inflation"
        source="Bloomberg"
        onClick={() => {}}
      />
    </div>
  );
}

export function DataDisplaySection() {
  return (
    <Section id="data" label="06 · Data Display" title="Tables, Lists & Charts">
      <Group label="Data Table · Sort · Filter · Select rows">
        <DataTableShowcase />
      </Group>
      <Group label="Stat Card / KPI · Value · Delta · Sparkline">
        <StatCardShowcase />
      </Group>
      <Group label="Chart Components · Line · Bar · Area · Donut">
        <ChartShowcase />
      </Group>
      <Group label="List / Feed · Icon · Avatar · Action items">
        <ListFeedShowcase />
      </Group>
      <Group label="Empty State · Illustration + CTA">
        <EmptyStateShowcase />
      </Group>
      <Group label="Timeline · Activity log · Audit trail">
        <TimelineShowcase />
      </Group>
      <Group label="Compare Bar · Head-to-head stat">
        <CompareBarShowcase />
      </Group>
      <Group label="News Card · Image · Placeholder">
        <NewsCardShowcase />
      </Group>
      <Group label="Sparkline · Inline micro chart">
        <SparklineShowcase />
      </Group>
    </Section>
  );
}