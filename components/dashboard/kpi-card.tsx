"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type * as React from "react"

export default function KPICard({
  label,
  value,
  delta,
  currency,
  icon: Icon,
}: {
  label: string
  value: number
  delta?: number
  currency?: boolean
  icon?: React.ElementType
}) {
  const formatted = currency
    ? value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
    : value.toLocaleString(undefined, { maximumFractionDigits: 0 })

  const deltaText = typeof delta === "number" ? `${delta >= 0 ? "▲" : "▼"} ${Math.abs(delta).toFixed(1)}%` : undefined

  const deltaColor =
    typeof delta === "number"
      ? delta >= 0
        ? "var(--color-chart-2)" // green/teal tone
        : "var(--color-destructive)"
      : "var(--color-muted-foreground)"

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        {Icon ? <Icon aria-hidden className="size-4 text-(--color-brand)" /> : null}
      </CardHeader>
      <CardContent className="flex items-end justify-between">
        <div className="text-2xl font-semibold leading-none">{formatted}</div>
        {deltaText ? (
          <span aria-label="period delta" style={{ color: deltaColor }} className="text-sm font-medium">
            {deltaText}
          </span>
        ) : (
          <span className="text-sm text-muted-foreground">—</span>
        )}
      </CardContent>
    </Card>
  )
}
