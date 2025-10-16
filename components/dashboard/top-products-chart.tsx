"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type Row = { name: string; sales: number; returns: number }

export default function TopProductsChart({ data }: { data: Row[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
        <YAxis tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
        <Tooltip
          contentStyle={{
            background: "var(--color-popover)",
            color: "var(--color-popover-foreground)",
            border: "1px solid var(--color-border)",
            borderRadius: "8px",
          }}
        />
        <Bar dataKey="sales" name="Sales" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="returns" name="Returns" fill="var(--color-chart-5)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
