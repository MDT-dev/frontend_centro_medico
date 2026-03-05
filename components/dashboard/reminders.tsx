"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Package, Activity } from "lucide-react"

export function Reminders() {
  return (
    <Card
      className="p-6 transition-all duration-500 hover:shadow-xl animate-slide-in-up"
      style={{ animationDelay: "500ms" }}
    >
      <h2 className="text-xl font-semibold text-foreground mb-6">Alertas Clínicos</h2>
      <div className="space-y-3">
        <div className="bg-accent/10 border border-accent rounded-lg p-4 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-start gap-3">
            <Package className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground text-sm">Medicamentos Baixos</h3>
              <p className="text-xs text-muted-foreground mt-1">Paracetamol - Reposição urgente</p>
            </div>
          </div>
        </div>
        
        <div className="bg-secondary/10 border border-secondary rounded-lg p-4 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-start gap-3">
            <Activity className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground text-sm">Acompanhamentos Pendentes</h3>
              <p className="text-xs text-muted-foreground mt-1">2 pacientes aguardam seguimento</p>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 border border-border rounded-lg p-4 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground text-sm">Campanha de Vacinação</h3>
              <p className="text-xs text-muted-foreground mt-1">Sarampo - Próxima segunda-feira</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
