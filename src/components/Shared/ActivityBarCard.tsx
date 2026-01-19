"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface ActivityBarChartProps {
  title: string;
  data: { label: string; value: number }[];
  colors?: string[];
}

export default function ActivityBarChart({ title, data, colors }: ActivityBarChartProps) {
  const defaultColors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="bg-card text-card-foreground border border-border rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <XAxis dataKey="label" tick={{ fill: "currentColor", opacity: 0.5 }} fontSize={12} />
          <YAxis tick={{ fill: "currentColor", opacity: 0.5 }} fontSize={12} />
          <Tooltip
            contentStyle={{ backgroundColor: "var(--popover)", borderColor: "var(--border)", borderRadius: 8, color: "var(--popover-foreground)" }}
            itemStyle={{ color: "inherit" }}
            labelStyle={{ fontWeight: 600, color: "inherit" }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors ? colors[index % colors.length] : defaultColors[index % defaultColors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
