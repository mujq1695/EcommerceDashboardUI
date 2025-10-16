"use client"

import DashboardShell from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/hooks/use-toast"
import { useState } from "react"

export default function Page() {
  const [syncing, setSyncing] = useState(false)

  const basicFeatures = [
    '5 Projects',
    'Up to 10 Team Members',
    '5 GB Cloud Storage',
    'Basic Analytics',
    'Community Support',
    'Email Notifications',
    'Limited Integrations',
  ]

  const advanceFeatures = [
    '25 Projects',
    'Up to 50 Team Members',
    '50 GB Cloud Storage',
    'Advanced Analytics & Reports',
    'Priority Email Support',
    'Custom Integrations (Slack, Notion, etc.)',
    'Role-Based Access Control',
    'API Access',
  ]

  const premiumFeatures = [
    'Unlimited Projects',
    'Unlimited Team Members',
    '200 GB Cloud Storage',
    'Real-Time Collaboration',
    'Dedicated Account Manager',
    '24/7 Chat & Phone Support',
    'Custom Branding',
    'Early Access to New Features',
  ]

  const handleSync = () => {
    setSyncing(true)
    setTimeout(() => {
      setSyncing(false)
      toast({ title: "Campaigns synced", description: "Latest data fetched from ad platforms." })
    }, 1200)
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-pretty">Campaigns</h2>
            <Button onClick={handleSync} disabled={syncing} variant="outline">
              {syncing ? <Spinner className="mr-2 size-4" /> : null}
              {syncing ? "Syncing..." : "Sync Now"}
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p className="text-muted-foreground">
                Connect your ad accounts to see ROAS, CPA, and spend across Google, Meta, and Amazon Ads.
              </p>
              <ul className="mt-4 grid gap-2">
                <li className="flex items-center justify-between rounded-md border p-3">
                  <span>Holiday Promo</span>
                  <span className="text-green-500">ROAS 3.2x</span>
                </li>
                <li className="flex items-center justify-between rounded-md border p-3">
                  <span>Always-on Search</span>
                  <span className="text-yellow-500">ROAS 1.9x</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-pretty">Pricing Plans</h2>
            {/* <Button onClick={handleSync} disabled={syncing} variant="outline">
              {syncing ? <Spinner className="mr-2 size-4" /> : null}
              {syncing ? "Syncing..." : "Sync Now"}
            </Button> */}
          </div>
          <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-1">
            <Card>
              <CardHeader className=" h-[10%]">
                <CardTitle>Basic</CardTitle>
              </CardHeader>
              <CardContent className="text-sm flex flex-col justify-between h-[90%]">
                <ul className="mt-4 grid gap-2">
                  {basicFeatures.map((feature) => (
                    <li className="flex items-center justify-between p-3">
                      <span>{feature}</span>
                    </li>
                  ))
                  }
                </ul>
                <ul className="mt-4 grid gap-2">
                  <li className="flex items-center justify-between rounded-md border p-3">
                    <span>Pricing</span>
                    <span className="text-green-500">$ 50</span>
                  </li>
                  {/* <li className="flex items-center justify-between rounded-md border p-3">
                    <span>Always-on Search</span>
                    <span className="text-yellow-500">ROAS 1.9x</span>
                  </li> */}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className=" h-[10%]">
                <CardTitle>Advance</CardTitle>
              </CardHeader>
              <CardContent className="text-sm flex flex-col justify-between h-[90%]">
                {advanceFeatures.map((feature) => (
                  <li className="flex items-center justify-between p-3">
                    <span>{feature}</span>
                  </li>
                ))
                }
                <ul className="mt-4 grid gap-2">
                  <li className="flex items-center justify-between rounded-md border p-3">
                    <span>Pricing</span>
                    <span className="text-green-500">$ 150</span>
                  </li>
                  {/* <li className="flex items-center justify-between rounded-md border p-3">
                    <span>Always-on Search</span>
                    <span className="text-yellow-500">ROAS 1.9x</span>
                  </li> */}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className=" h-[10%]">
                <CardTitle>Premium</CardTitle>
              </CardHeader>
              <CardContent className="text-sm flex flex-col justify-between h-[90%]">
                <ul className="mt-4 grid gap-2">
                  {premiumFeatures.map((feature) => (
                    <li className="flex items-center justify-between p-3">
                      <span>{feature}</span>
                    </li>
                  ))
                  }
                </ul>
                <ul className="mt-4 grid gap-2">
                  <li className="flex items-center justify-between rounded-md border p-3">
                    <span>Pricing</span>
                    <span className="text-green-500">$ 250</span>
                  </li>
                  {/* <li className="flex items-center justify-between rounded-md border p-3">
                    <span>Always-on Search</span>
                    <span className="text-yellow-500">ROAS 1.9x</span>
                  </li> */}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
