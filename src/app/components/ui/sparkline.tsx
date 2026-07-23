import * as React from "react";
import { LineChart, Line } from "recharts";

function Sparkline({
  data,
  variant = "down",
  width = 76,
  height = 28,
}: {
  data: { i: number; v: number }[];
  variant?: "up" | "down";
  width?: number;
  height?: number;
}) {
  return (
    <LineChart width={width} height={height} data={data} margin={{ top: 3, right: 2, bottom: 3, left: 2 }}>
      <Line
        type="monotone"
        dataKey="v"
        stroke={variant === "up" ? "var(--ds-color-success)" : "var(--ds-color-error)"}
        strokeWidth={1.5}
        dot={false}
        isAnimationActive={false}
      />
    </LineChart>
  );
}

export { Sparkline };
