"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, ArrowRight } from "lucide-react"

export function MobileAppCard() {
  return (
    <Card
      className="bg-gradient-to-br from-secondary to-secondary/80 text-background p-4 transition-all duration-500 hover:shadow-2xl animate-slide-in-up overflow-hidden relative group"
      style={{ animationDelay: "900ms" }}
    >
      <div className="absolute top-0 right-0 opacity-20">
        <Activity className="w-20 h-20" />
      </div>

      <div className="relative z-10">
        <h2 className="text-lg font-bold mb-1">Campanha de Saúde</h2>
        <p className="text-xs opacity-90 mb-4">Vacinação contra Sarampo</p>

        <div className="flex flex-col gap-2 mb-4">
          <div className="bg-background/20 rounded-lg p-3">
            <p className="text-xs opacity-90 font-medium">Data: 22-25 Nov 2024</p>
            <p className="text-xs opacity-80">Local: Sala 2 - Vacinação</p>
          </div>

          <Button
            className="w-full h-10 bg-background text-secondary hover:bg-background/90 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            Ver Detalhes
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
