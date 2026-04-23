"use client"

import { Card } from "@/components/ui/card"
import { Heart, Thermometer } from "lucide-react"

export function TimeTracker() {
  return (
    <Card
      className="bg-gradient-to-br from-primary/10 to-secondary/10 p-4 transition-all duration-500 hover:shadow-2xl animate-slide-in-up overflow-hidden relative"
      style={{ animationDelay: "1000ms" }}
    >
      <div className="relative z-10">
        <h2 className="text-lg font-semibold text-foreground mb-4">Vitais do Paciente</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-sm text-muted-foreground">Frequência Cardíaca</span>
            </div>
            <span className="text-xl font-bold text-foreground">78 bpm</span>
          </div>
          <div className="h-px bg-border" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-secondary" />
              <span className="text-sm text-muted-foreground">Temperatura</span>
            </div>
            <span className="text-xl font-bold text-foreground">37.2°C</span>
          </div>
          <div className="h-px bg-border" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Pressão Arterial</span>
            <span className="text-xl font-bold text-foreground">120/80 mmHg</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
