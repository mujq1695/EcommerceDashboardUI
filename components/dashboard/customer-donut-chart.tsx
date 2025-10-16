"use client"

import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell, Legend } from "recharts"

type Slice = { name: string; value: number }

const COLORS = ["var(--color-chart-3)", "var(--color-chart-4)"]

export default function CustomerDonutChart({ data }: { data: Slice[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={90}
          paddingAngle={4}
          dataKey="value"
          nameKey="name"
          label={(p) => `${p.name} ${p.value}%`}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip
          contentStyle={{
            background: "var(--color-popover)",
            color: "var(--color-popover-foreground)",
            border: "1px solid var(--color-border)",
            borderRadius: "8px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
