import DashboardShell from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ModeToggle } from "@/components/mode-toggle"

export default function Page() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-pretty">Settings</h2>
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <ModeToggle />
            <span className="text-sm text-muted-foreground">Toggle dark / light theme</span>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
