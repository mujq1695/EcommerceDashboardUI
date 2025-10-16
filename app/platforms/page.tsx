"use client"

import type React from "react"

import DashboardShell from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { StoreIcon, TruckIcon, WarehouseIcon } from "lucide-react"
import { useState } from "react"
import Modal from "@/components/ui/Modal"
import ConnectModal from "./ConnectModal"

export default function Page() {


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState("");
  const connect = (name: string) => {
    setIsModalOpen(true);
    setModalHeader(name);
  }
  const closeModal = () => setIsModalOpen(false)

  let platformModal: React.ReactNode = null
  if (isModalOpen) {
    platformModal = <ConnectModal isOpen={isModalOpen} onClose={closeModal} ModalHeader={modalHeader} />
  }

  const Tile = ({
    name,
    description,
    icon: Icon,
  }: {
    name: string
    description: string
    icon: React.ElementType
  }) => (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="size-4 text-(--color-brand)" />
          <CardTitle className="text-base">{name}</CardTitle>
        </div>
        <Button size="sm" variant="outline" onClick={() => connect(name)}>
          Connect
        </Button>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">{description}</CardContent>
    </Card>
  )

  return (
    <DashboardShell>
      {platformModal}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-pretty">Platforms</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Tile name="Shopify" description="Orders, products, and customers." icon={StoreIcon} />
          <Tile name="Amazon Seller" description="Listings and marketplace performance." icon={WarehouseIcon} />
          <Tile name="Logistics" description="3PL and fulfillment insights." icon={TruckIcon} />
        </div>
      </div>
    </DashboardShell>
  )
}
