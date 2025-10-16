"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

type DayPoint = { date: string; revenue: number; orders: number; refunds: number }

export default function SalesLineChart({
  data,
  compareData,
}: {
  data: DayPoint[]
  compareData?: DayPoint[]
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 16, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis dataKey="date" tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
        <YAxis
          yAxisId="revenue"
          tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
          tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
        />
        <Tooltip
          formatter={(v: number, name) => {
            if (name === "Revenue") return [`$${v.toLocaleString()}`, "Revenue"]
            if (name === "Orders") return [v.toLocaleString(), "Orders"]
            return v.toLocaleString()
          }}
          labelClassName="text-xs"
          contentStyle={{
            background: "var(--color-popover)",
            color: "var(--color-popover-foreground)",
            border: "1px solid var(--color-border)",
            borderRadius: "8px",
          }}
        />
        <Legend />
        <Line
          yAxisId="revenue"
          type="monotone"
          dataKey="revenue"
          name="Revenue"
          stroke="var(--color-chart-1)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
        <Line
          yAxisId="revenue"
          type="monotone"
          data={compareData}
          dataKey="revenue"
          name="Revenue (Prev)"
          stroke="var(--color-muted-foreground)"
          strokeDasharray="4 4"
          strokeWidth={2}
          dot={false}
          hide={!compareData}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
