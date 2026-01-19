"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

interface ActivityLineChartProps {
  title: string;
  data: { label: string; value: number }[];
}

export default function ActivityLineChart({ title, data }: ActivityLineChartProps) {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">{title}</h2>

        {data.length > 0 ? (
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="label" tick={{ fill: "currentColor", opacity: 0.5 }} fontSize={12} />
                <YAxis tick={{ fill: "currentColor", opacity: 0.5 }} fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--popover)", borderColor: "var(--border)", borderRadius: 8, color: "var(--popover-foreground)" }}
                  itemStyle={{ color: "inherit" }}
                  labelStyle={{ color: "inherit" }}
                />
                <Line type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">No data to display</p>
        )}
      </CardContent>
    </Card>
  );
}
