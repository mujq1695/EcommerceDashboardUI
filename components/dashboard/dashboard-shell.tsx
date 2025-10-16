"use client"

import { type PropsWithChildren, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ModeToggle } from "@/components/mode-toggle"
import { LayoutDashboardIcon, MegaphoneIcon, StoreIcon, LineChartIcon, SettingsIcon } from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboardIcon },
  { label: "Campaigns", href: "/campaigns", icon: MegaphoneIcon },
  { label: "Platforms", href: "/platforms", icon: StoreIcon },
  { label: "Trends", href: "/trends", icon: LineChartIcon },
  { label: "Settings", href: "/settings", icon: SettingsIcon },
] as const

export default function DashboardShell({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="flex">
        {/* Sidebar */}
        <aside
          aria-label="Sidebar navigation"
          className={[
            " fixed left:0 top:0 hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-(--color-sidebar) text-(--color-sidebar-foreground)  h-[100dvh]",
          ].join(" ")}
        >
          <div className="h-16 flex items-center px-4 border-b border-(--color-sidebar-border)">
            <span className="font-semibold text-pretty">CommerceIQ</span>
          </div>
          <nav className="flex-1 p-2">
            <ul className="space-y-1 text-sm">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      className={[
                        "flex items-center gap-2 rounded-md px-3 py-2 transition-colors",
                        active
                          ? "bg-(--color-sidebar-accent) text-(--color-sidebar-accent-foreground)"
                          : "hover:bg-(--color-sidebar-accent)",
                      ].join(" ")}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                    >
                      <Icon className="size-4 text-(--color-sidebar-primary)" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="p-3 mt-auto">
            <Card className="p-3 text-xs">
              <p className="font-medium">Tip</p>
              <p className="text-muted-foreground">Use the date filter to compare performance period over period.</p>
            </Card>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0 ml-64">
          {/* Topbar */}
          <header className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
            <div className="h-16 flex items-center justify-between gap-3 px-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden bg-transparent"
                  aria-controls="mobile-sidebar"
                  aria-expanded={open}
                  onClick={() => setOpen((v) => !v)}
                >
                  Menu
                </Button>
                <h1 className="text-lg font-semibold text-pretty">Unified Commerce Analytics</h1>
              </div>
              <div className="flex items-center gap-2">
                <Input placeholder="Search..." className="w-48 md:w-72" />
                <ModeToggle />
                <div aria-label="User avatar" className="size-8 rounded-full bg-muted" />
              </div>
            </div>
            {/* Mobile drawer */}
            {open && (
              <div id="mobile-sidebar" className="lg:hidden border-t border-border">
                <nav className="p-2 grid grid-cols-2 gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      className="rounded-md px-3 py-2 bg-secondary hover:bg-accent flex items-center gap-2"
                      href={item.href}
                      onClick={() => setOpen(false)}
                    >
                      <item.icon className="size-4 text-(--color-sidebar-primary)" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </header>

          <main role="main" className="px-4 py-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
