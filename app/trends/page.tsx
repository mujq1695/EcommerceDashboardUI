import DashboardShell from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SalesLineChart from "@/components/dashboard/sales-line-chart"

type DayPoint = { date: string; revenue: number; orders: number; refunds: number }

function generateSeries(days: number, seed = 1): DayPoint[] {
  const now = new Date()
  const out: DayPoint[] = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(now.getDate() - i)
    const revenue = 9000 + Math.sin(i / 5 + seed) * 1200 + (Math.random() - 0.5) * 400
    out.push({ date: d.toISOString().slice(0, 10), revenue: Math.round(revenue), orders: 0, refunds: 0 })
  }
  return out
}

export default function Page() {
  const data = generateSeries(60, 4)
  const compare = generateSeries(60, 5)

  return (
    <DashboardShell>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-pretty">Trends</h2>
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend (60 days)</CardTitle>
          </CardHeader>
          <CardContent className="h-[340px]">
            <SalesLineChart data={data} compareData={compare} />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
