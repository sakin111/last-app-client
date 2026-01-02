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
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <XAxis dataKey="label" tick={{ fill: "#9ca3af" }} />
          <YAxis tick={{ fill: "#9ca3af" }} />
          <Tooltip 
            contentStyle={{ backgroundColor: "#f3f4f6", borderRadius: 8 }}
            labelStyle={{ fontWeight: 600 }}
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
