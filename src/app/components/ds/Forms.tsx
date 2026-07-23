import { useState } from "react";
import {
  Search,
  Xmark,
  Upload,
  NavArrowDown,
  Eye,
  EyeClosed,
} from "iconoir-react";
import { Section, Group, mono, Label } from "./Shared";

const inputStyle = {
  backgroundColor: "var(--t-bg-card)",
  color: "var(--t-fg)",
  borderColor: "var(--t-border)",
} as const;

// ── Text Input ────────────────────────────────────────────────────────
function TextInputShowcase() {
  const [show, setShow] = useState(false);
  return (
    <div className="grid grid-cols-2 gap-3 max-w-lg">
      {/* Default */}
      <div className="space-y-1">
        <label
          style={{ ...mono, color: "var(--t-fg-muted)" }}
          className="text-xs"
        >
          Default
        </label>
        <input
          style={{ ...mono, ...inputStyle }}
          className="w-full px-2.5 py-1.5 border rounded-sm text-xs outline-none focus:ring-2 focus:ring-neutral-950/15 placeholder:text-neutral-500 transition-colors"
          placeholder="Enter value…"
        />
      </div>
      {/* With label */}
      <div className="space-y-1">
        <label
          style={{ ...mono, color: "var(--t-fg-2)" }}
          className="text-xs"
        >
          Email address
        </label>
        <input
          style={{ ...mono, ...inputStyle }}
          className="w-full px-2.5 py-1.5 border rounded-sm text-xs outline-none focus:ring-2 focus:ring-neutral-950/15 placeholder:text-neutral-500 transition-colors"
          placeholder="name@company.com"
          type="email"
        />
      </div>
      {/* Error */}
      <div className="space-y-1">
        <label
          style={{ ...mono, color: "var(--t-fg-2)" }}
          className="text-xs"
        >
          Username
        </label>
        <input
          style={mono}
          className="w-full px-2.5 py-1.5 border border-red-400 rounded-sm text-xs text-neutral-900 bg-red-50 outline-none placeholder:text-neutral-500"
          defaultValue="user@"
        />
        <p style={mono} className="text-xs text-red-600">
          Invalid username format
        </p>
      </div>
      {/* Disabled */}
      <div className="space-y-1">
        <label
          style={{ ...mono, color: "var(--t-fg-subtle)" }}
          className="text-xs"
        >
          Read only
        </label>
        <input
          style={{
            ...mono,
            backgroundColor: "var(--t-bg-subtle)",
            color: "var(--t-fg-subtle)",
            borderColor: "var(--t-border-subtle)",
          }}
          className="w-full px-2.5 py-1.5 border rounded-sm text-xs cursor-not-allowed"
          defaultValue="Locked value"
          disabled
        />
      </div>
      {/* Password */}
      <div className="space-y-1 col-span-2">
        <label
          style={{ ...mono, color: "var(--t-fg-2)" }}
          className="text-xs"
        >
          Password
        </label>
        <div className="relative">
          <input
            style={{ ...mono, ...inputStyle }}
            type={show ? "text" : "password"}
            className="w-full px-2.5 py-1.5 border rounded-sm text-xs outline-none focus:ring-2 focus:ring-neutral-950/15 pr-8 transition-colors"
            defaultValue="supersecretpw"
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
            onClick={() => setShow(!show)}
          >
            {show ? (
              <EyeClosed width={13} height={13} />
            ) : (
              <Eye width={13} height={13} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Textarea ─────────────────────────────────────────────────────────
function TextareaShowcase() {
  const [val, setVal] = useState(
    "Design systems help teams build consistent, high-quality products at scale.",
  );
  const limit = 150;
  return (
    <div className="max-w-sm space-y-1">
      <label
        style={{ ...mono, color: "var(--t-fg-2)" }}
        className="text-xs"
      >
        Description
      </label>
      <div className="relative">
        <textarea
          style={{ ...mono, ...inputStyle }}
          value={val}
          onChange={(e) =>
            setVal(e.target.value.slice(0, limit))
          }
          rows={3}
          className="w-full px-2.5 py-1.5 border rounded-sm text-xs outline-none focus:ring-2 focus:ring-neutral-950/15 resize-y placeholder:text-neutral-500 transition-colors"
        />
      </div>
      <div className="flex justify-end">
        <span
          style={{
            ...mono,
            color:
              val.length > limit * 0.9
                ? undefined
                : "var(--t-fg-subtle)",
          }}
          className={`text-xs ${val.length > limit * 0.9 ? "text-red-500" : ""}`}
        >
          {val.length}/{limit}
        </span>
      </div>
    </div>
  );
}

// ── Select ────────────────────────────────────────────────────────────
function SelectShowcase() {
  return (
    <div className="flex gap-3 flex-wrap">
      {/* Native */}
      <div className="space-y-1">
        <label
          style={{ ...mono, color: "var(--t-fg-2)" }}
          className="text-xs"
        >
          Framework
        </label>
        <select
          style={{ ...mono, ...inputStyle }}
          className="px-2.5 py-1.5 border rounded-sm text-xs outline-none focus:ring-2 focus:ring-neutral-950/15 appearance-none pr-7"
        >
          <option>React</option>
          <option>Vue</option>
          <option>Angular</option>
          <option>Svelte</option>
        </select>
      </div>
      {/* Custom */}
      <div className="space-y-1">
        <label
          style={{ ...mono, color: "var(--t-fg-2)" }}
          className="text-xs"
        >
          Status
        </label>
        <div className="relative">
          <div
            style={{ ...mono, ...inputStyle }}
            className="px-2.5 py-1.5 border rounded-sm text-xs flex items-center gap-6 cursor-pointer"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Active
            </div>
            <NavArrowDown
              size={11}
              className="text-neutral-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Checkbox / Radio ──────────────────────────────────────────────────
function CheckboxRadioShowcase() {
  const [checks, setChecks] = useState([true, false, true]);
  const [radio, setRadio] = useState(0);
  const options = [
    "Option Alpha",
    "Option Beta",
    "Option Gamma",
  ];
  return (
    <div className="flex gap-8 flex-wrap">
      <div className="space-y-1.5">
        <Label>Checkbox group</Label>
        {options.map((opt, i) => (
          <label
            key={opt}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div
              onClick={() =>
                setChecks((c) =>
                  c.map((v, j) => (j === i ? !v : v)),
                )
              }
              className={`w-4 h-4 border rounded-sm flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer ${
                checks[i]
                  ? "bg-neutral-950 border-neutral-950"
                  : "border-neutral-300 group-hover:border-neutral-500"
              }`}
              style={
                !checks[i]
                  ? { backgroundColor: "var(--t-bg-card)" }
                  : undefined
              }
            >
              {checks[i] && (
                <svg
                  width="8"
                  height="6"
                  viewBox="0 0 8 6"
                  fill="none"
                >
                  <path
                    d="M1 3L3 5L7 1"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span
              style={{ ...mono, color: "var(--t-fg-2)" }}
              className="text-xs"
            >
              {opt}
            </span>
          </label>
        ))}
        {/* Indeterminate */}
        <label className="flex items-center gap-2 cursor-pointer group">
          <div
            className="w-4 h-4 border border-neutral-500 rounded-sm flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "var(--t-bg-card)" }}
          >
            <div className="w-2 h-0.5 bg-neutral-500" />
          </div>
          <span
            style={{ ...mono, color: "var(--t-fg-subtle)" }}
            className="text-xs"
          >
            Indeterminate
          </span>
        </label>
      </div>
      <div className="space-y-1.5">
        <Label>Radio group</Label>
        {options.map((opt, i) => (
          <label
            key={opt}
            onClick={() => setRadio(i)}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div
              className={`w-4 h-4 border rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                radio === i
                  ? "border-neutral-950"
                  : "border-neutral-300 group-hover:border-neutral-500"
              }`}
              style={{ backgroundColor: "var(--t-bg-card)" }}
            >
              {radio === i && (
                <div className="w-2 h-2 rounded-full bg-neutral-950" />
              )}
            </div>
            <span
              style={{ ...mono, color: "var(--t-fg-2)" }}
              className="text-xs"
            >
              {opt}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

// ── Toggle / Switch ───────────────────────────────────────────────────
function ToggleShowcase() {
  const [states, setStates] = useState([true, false, true]);
  const labels = ["Notifications", "Dark mode", "Analytics"];
  return (
    <div className="space-y-2">
      {labels.map((label, i) => (
        <div key={label} className="flex items-center gap-3">
          <button
            onClick={() =>
              setStates((s) =>
                s.map((v, j) => (j === i ? !v : v)),
              )
            }
            className={`w-9 h-5 rounded-full transition-colors relative flex-shrink-0 ${
              states[i] ? "bg-neutral-950" : "bg-neutral-300"
            }`}
          >
            <div
              className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform shadow-sm ${
                states[i]
                  ? "translate-x-[18px]"
                  : "translate-x-0.5"
              }`}
            />
          </button>
          <span
            style={{ ...mono, color: "var(--t-fg-2)" }}
            className="text-xs"
          >
            {label}
          </span>
          <span
            style={{ ...mono, color: "var(--t-fg-subtle)" }}
            className="text-xs"
          >
            {states[i] ? "On" : "Off"}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Slider ────────────────────────────────────────────────────────────
function SliderShowcase() {
  const [single, setSingle] = useState(42);
  const [range, setRange] = useState([20, 75]);

  // Blue thumb + track-fill shared across both sliders
  const thumbCls = [
    "appearance-none cursor-pointer",
    "focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-1",
    // WebKit thumb
    "[&::-webkit-slider-thumb]:appearance-none",
    "[&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5",
    "[&::-webkit-slider-thumb]:rounded-full",
    "[&::-webkit-slider-thumb]:bg-blue-500",
    "[&::-webkit-slider-thumb]:shadow-sm",
    "[&::-webkit-slider-thumb]:transition-colors",
    // Firefox thumb
    "[&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5",
    "[&::-moz-range-thumb]:rounded-full",
    "[&::-moz-range-thumb]:bg-blue-500",
    "[&::-moz-range-thumb]:border-0",
    "[&::-moz-range-thumb]:shadow-sm",
  ].join(" ");

  return (
    <div className="space-y-5 max-w-xs">
      {/* ── Single ────────────────────────────────────────────────── */}
      <div className="space-y-1.5">
        <div className="flex justify-between">
          <Label>Single</Label>
          <span
            style={{ ...mono, color: "var(--t-fg-muted)" }}
            className="text-xs"
          >
            {single}
          </span>
        </div>
        {/* Neutral track, blue thumb only */}
        <input
          type="range"
          min={0}
          max={100}
          value={single}
          onChange={(e) => setSingle(Number(e.target.value))}
          className={`w-full h-1.5 rounded-full ${thumbCls}`}
          style={{ backgroundColor: "var(--t-bg-muted)" }}
        />
      </div>

      {/* ── Range ─────────────────────────────────────────────────── */}
      <div className="space-y-1.5">
        <div className="flex justify-between">
          <Label>Range</Label>
          <span
            style={{ ...mono, color: "var(--t-fg-muted)" }}
            className="text-xs"
          >
            {range[0]}–{range[1]}
          </span>
        </div>
        {/* Visual track + both thumbs in one relative container */}
        <div className="relative h-4 flex items-center">
          {/* Rail */}
          <div
            className="absolute inset-x-0 h-1.5 rounded-full pointer-events-none"
            style={{ backgroundColor: "var(--t-bg-muted)" }}
          />
          {/* Active band */}
          <div
            className="absolute h-1.5 rounded-full pointer-events-none"
            style={{
              backgroundColor: "var(--t-fg)",
              left: `${range[0]}%`,
              right: `${100 - range[1]}%`,
            }}
          />
          {/* Lower thumb */}
          <input
            type="range"
            min={0}
            max={100}
            value={range[0]}
            onChange={(e) =>
              setRange([
                Math.min(Number(e.target.value), range[1] - 5),
                range[1],
              ])
            }
            className={`absolute inset-x-0 w-full h-full bg-transparent rounded-full ${thumbCls}`}
          />
          {/* Upper thumb */}
          <input
            type="range"
            min={0}
            max={100}
            value={range[1]}
            onChange={(e) =>
              setRange([
                range[0],
                Math.max(Number(e.target.value), range[0] + 5),
              ])
            }
            className={`absolute inset-x-0 w-full h-full bg-transparent rounded-full ${thumbCls}`}
          />
        </div>
      </div>
    </div>
  );
}

// ── Search Input ──────────────────────────────────────────────────────
function SearchShowcase() {
  const [q, setQ] = useState("");
  const [suggestions] = useState([
    "Button",
    "Badge",
    "Avatar",
    "Modal",
    "Tooltip",
    "Table",
  ]);
  return (
    <div className="space-y-2 max-w-xs">
      <div className="relative">
        <Search
          size={12}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400"
        />
        <input
          style={{ ...mono, ...inputStyle }}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full pl-8 pr-8 py-1.5 border rounded-sm text-xs outline-none focus:ring-2 focus:ring-neutral-950/15 placeholder:text-neutral-500 transition-colors"
          placeholder="Search components…"
        />
        {q && (
          <button
            onClick={() => setQ("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
          >
            <Xmark size={11} />
          </button>
        )}
      </div>
      {q && (
        <div
          className="border rounded-sm overflow-hidden shadow-sm"
          style={{
            backgroundColor: "var(--t-bg-card)",
            borderColor: "var(--t-border)",
          }}
        >
          {suggestions
            .filter((s) =>
              s.toLowerCase().includes(q.toLowerCase()),
            )
            .map((s) => (
              <div
                key={s}
                style={{ ...mono, color: "var(--t-fg-2)" }}
                className="px-2.5 py-1.5 text-xs hover:bg-neutral-50 cursor-pointer"
              >
                {s}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

// ── Date Picker ───────────────────────────────────────────────────────
function DatePickerShowcase() {
  const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const dates = [
    [null, 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30, null, null, null, null],
  ];
  const [selected, setSelected] = useState(17);
  return (
    <div
      className="border rounded-sm p-3 w-52 shadow-sm"
      style={{
        backgroundColor: "var(--t-bg-card)",
        borderColor: "var(--t-border)",
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span
          style={{ ...mono, color: "var(--t-fg)" }}
          className="text-xs"
        >
          April 2026
        </span>
        <div className="flex gap-1">
          <button
            style={{ ...mono, color: "var(--t-fg-muted)" }}
            className="text-xs px-1.5 py-0.5 rounded-sm hover:bg-neutral-100"
          >
            ‹
          </button>
          <button
            style={{ ...mono, color: "var(--t-fg-muted)" }}
            className="text-xs px-1.5 py-0.5 rounded-sm hover:bg-neutral-100"
          >
            ›
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-0">
        {days.map((d) => (
          <div
            key={d}
            style={{ ...mono, color: "var(--t-fg-subtle)" }}
            className="text-center text-xs py-1"
          >
            {d}
          </div>
        ))}
        {dates.flat().map((d, i) => (
          <button
            key={i}
            onClick={() => d && setSelected(d)}
            style={{
              ...mono,
              color:
                d === selected ? undefined : "var(--t-fg-2)",
            }}
            className={`text-center text-xs py-1 rounded-sm transition-colors ${
              !d
                ? ""
                : d === selected
                  ? "bg-neutral-950 text-white"
                  : d === 17 && selected !== 17
                    ? "text-blue-600"
                    : "hover:bg-neutral-100"
            }`}
          >
            {d || ""}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── File Upload ───────────────────────────────────────────────────────
function FileUploadShowcase() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  return (
    <div
      className="border-2 border-dashed rounded-sm p-6 text-center transition-colors max-w-xs"
      style={{
        backgroundColor: dragging
          ? "var(--t-bg-subtle)"
          : "var(--t-bg-card)",
        borderColor: dragging
          ? "var(--t-fg-muted)"
          : "var(--t-border)",
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        const f = e.dataTransfer.files[0];
        if (f) setFile(f.name);
      }}
    >
      <Upload
        size={20}
        className="text-neutral-400 mx-auto mb-2"
      />
      {file ? (
        <div>
          <p
            style={{ ...mono, color: "var(--t-fg-2)" }}
            className="text-xs"
          >
            {file}
          </p>
          <button
            style={{ ...mono, color: "var(--t-fg-subtle)" }}
            onClick={() => setFile(null)}
            className="text-xs mt-1 hover:text-neutral-700"
          >
            Remove
          </button>
        </div>
      ) : (
        <>
          <p
            style={{ ...mono, color: "var(--t-fg-muted)" }}
            className="text-xs"
          >
            Drop files here or{" "}
            <span
              style={{ color: "var(--t-fg)" }}
              className="underline cursor-pointer"
            >
              browse
            </span>
          </p>
          <p
            style={{ ...mono, color: "var(--t-fg-subtle)" }}
            className="text-xs mt-1"
          >
            PNG, JPG, PDF up to 10MB
          </p>
        </>
      )}
    </div>
  );
}

export function FormsSection() {
  return (
    <Section
      id="forms"
      label="03 · Form Controls"
      title="Inputs & Selectors"
    >
      <Group label="Text Input · Default · Error · Disabled">
        <TextInputShowcase />
      </Group>
      <Group label="Textarea · Auto-resize · Char count">
        <TextareaShowcase />
      </Group>
      <Group label="Select · Native + Custom dropdown">
        <SelectShowcase />
      </Group>
      <Group label="Checkbox / Radio · Single + Group">
        <CheckboxRadioShowcase />
      </Group>
      <Group label="Toggle / Switch · On/off with label">
        <ToggleShowcase />
      </Group>
      <Group label="Slider · Single + Range">
        <SliderShowcase />
      </Group>
      <Group label="Search Input · Clear + Autocomplete">
        <SearchShowcase />
      </Group>
      <Group label="Date Picker · Calendar + Range">
        <DatePickerShowcase />
      </Group>
      <Group label="File Upload · Drag & Drop + Browse">
        <FileUploadShowcase />
      </Group>
    </Section>
  );
}