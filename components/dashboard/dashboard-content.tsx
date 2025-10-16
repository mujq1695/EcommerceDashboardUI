"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import KPICard from "./kpi-card"
import SalesLineChart from "./sales-line-chart"
import TopProductsChart from "./top-products-chart"
import CustomerDonutChart from "./customer-donut-chart"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/hooks/use-toast"
import { DollarSignIcon, ShoppingCartIcon, GaugeIcon, TrendingUpIcon, RefreshCwIcon } from "lucide-react"

type DayPoint = { date: string; revenue: number; orders: number; refunds: number }

const ranges = [
  { key: "7D", label: "Last 7 Days", days: 7 },
  { key: "30D", label: "Last 30 Days", days: 30 },
  { key: "90D", label: "Last 90 Days", days: 90 },
] as const
type RangeKey = (typeof ranges)[number]["key"]

function generateSeries(days: number, seed = 1): DayPoint[] {
  const now = new Date()
  const out: DayPoint[] = []
  const base = 12000 + seed * 800
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(now.getDate() - i)
    const noise = Math.sin(i / 5 + seed) * 900 + (Math.random() - 0.5) * 400
    const revenue = Math.max(3000, base + noise - i * (seed * 8))
    const orders = Math.round(revenue / (80 + seed * 5) + (Math.random() - 0.5) * 10)
    const refunds = Math.max(0, Math.round(orders * (0.02 + (Math.sin(i) + 1) * 0.005)))
    out.push({
      date: d.toISOString().slice(0, 10),
      revenue: Math.round(revenue),
      orders,
      refunds,
    })
  }
  return out
}

function sum<T>(arr: T[], sel: (x: T) => number) {
  return arr.reduce((acc, x) => acc + sel(x), 0)
}

export default function DashboardContent() {
  const [range, setRange] = useState<RangeKey>("30D")
  const [compare, setCompare] = useState(true)
  const [loading, setLoading] = useState(false)

  const days = ranges.find((r) => r.key === range)!.days

  const current = useMemo(() => generateSeries(days, 2), [days])
  const previous = useMemo(() => (compare ? generateSeries(days, 3) : []), [days, compare])

  const currentRevenue = sum(current, (d) => d.revenue)
  const currentOrders = sum(current, (d) => d.orders)
  const currentRefunds = sum(current, (d) => d.refunds)
  const aov = currentOrders ? currentRevenue / currentOrders : 0
  const profit = currentRevenue * 0.62 - currentRefunds * 35 // pretend COGS/shipping

  const previousRevenue = sum(previous, (d) => d.revenue)
  const previousOrders = sum(previous, (d) => d.orders)
  const previousRefunds = sum(previous, (d) => d.refunds)
  const previousAov = previousOrders ? previousRevenue / previousOrders : 0
  const previousProfit = previousRevenue * 0.62 - previousRefunds * 35

  const productData = [
    { name: "Hoodie A", sales: 1250, returns: 32 },
    { name: "Sneakers B", sales: 980, returns: 21 },
    { name: "Cap C", sales: 640, returns: 12 },
    { name: "Backpack D", sales: 590, returns: 18 },
    { name: "Socks E", sales: 420, returns: 4 },
  ]

  const customerMix = [
    { name: "New", value: 60 },
    { name: "Repeat", value: 40 },
  ]

  const handleRefresh = async () => {
    setLoading(true)
    // simulate fetch
    setTimeout(() => {
      setLoading(false)
      toast({ title: "Refreshed", description: "Metrics updated successfully." })
    }, 1200)
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          {ranges.map((r) => (
            <Button
              key={r.key}
              size="sm"
              variant={range === r.key ? "default" : "outline"}
              onClick={() => setRange(r.key)}
              aria-pressed={range === r.key}
            >
              {r.key}
            </Button>
          ))}
          <Button
            size="sm"
            variant={compare ? "default" : "outline"}
            onClick={() => setCompare((v) => !v)}
            aria-pressed={compare}
            title="Compare with previous period"
          >
            Compare
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={handleRefresh} disabled={loading}>
            {loading ? <Spinner className="mr-2 size-4" /> : <RefreshCwIcon className="mr-2 size-4" />}
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
        <div aria-live="polite" className="text-sm text-muted-foreground">
          {ranges.find((r) => r.key === range)?.label} {compare ? "(vs previous period)" : ""}
        </div>
      </div>

      {/* KPI cards */}
      <section aria-label="Key metrics" className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard
          label="Revenue"
          value={currentRevenue}
          currency
          delta={compare ? percentDelta(currentRevenue, previousRevenue) : undefined}
          icon={DollarSignIcon}
        />
        <KPICard
          label="Orders"
          value={currentOrders}
          delta={compare ? percentDelta(currentOrders, previousOrders) : undefined}
          icon={ShoppingCartIcon}
        />
        <KPICard
          label="Avg Order Value"
          value={aov}
          currency
          delta={compare ? percentDelta(aov, previousAov) : undefined}
          icon={GaugeIcon}
        />
        <KPICard
          label="Profit"
          value={profit}
          currency
          delta={compare ? percentDelta(profit, previousProfit) : undefined}
          icon={TrendingUpIcon}
        />
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Sales Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <SalesLineChart data={current} compareData={compare ? previous : undefined} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <TopProductsChart data={productData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Mix</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <CustomerDonutChart data={customerMix} />
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Operational Metrics</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <Metric label="Refunds" value={currentRefunds.toLocaleString()} />
            <Metric label="Refund Rate" value={`${((currentRefunds / (currentOrders || 1)) * 100).toFixed(1)}%`} />
            <Metric
              label="COGS (est.)"
              value={(currentRevenue * 0.38).toLocaleString("en-US", { style: "currency", currency: "USD" })}
            />
            <Metric label="Gross Margin" value={`${(62).toFixed(0)}%`} />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

function percentDelta(curr: number, prev: number) {
  if (!prev) return undefined
  return ((curr - prev) / prev) * 100
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border p-3">
      <div className="text-muted-foreground">{label}</div>
      <div className="text-base font-medium">{value}</div>
    </div>
  )
}
