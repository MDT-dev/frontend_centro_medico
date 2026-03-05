"use client"

import { Card } from "@/components/ui/card"

export function ProjectProgress() {
  const medicines = [
    { name: "Paracetamol 500mg", stock: 45, total: 100, color: "bg-green-500" },
    { name: "Amoxicilina 250mg", stock: 28, total: 100, color: "bg-amber-500" },
    { name: "Ibuprofeno 400mg", stock: 12, total: 100, color: "bg-red-500" },
  ]

  return (
    <Card
      className="p-4 transition-all duration-500 hover:shadow-xl animate-slide-in-up overflow-hidden"
      style={{ animationDelay: "800ms" }}
    >
      <h2 className="text-lg font-semibold text-foreground mb-4">Inventário de Medicamentos</h2>
      <div className="space-y-3">
        {medicines.map((medicine) => {
          const percentage = (medicine.stock / medicine.total) * 100
          return (
            <div key={medicine.name}>
              <div className="flex justify-between items-center mb-1.5">
                <p className="text-sm font-medium text-foreground truncate">{medicine.name}</p>
                <span className="text-xs text-muted-foreground">{medicine.stock}/{medicine.total}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                <div
                  className={`${medicine.color} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
