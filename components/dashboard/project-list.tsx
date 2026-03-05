"use client"

import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const patients = [
  { name: "Maria Santos", status: "Seguimento", date: "Última consulta: 15 Nov", color: "bg-primary", icon: "👩" },
  { name: "João Pereira", status: "Crítico", date: "Hipertensão controlada", color: "bg-accent", icon: "👨" },
  { name: "Ana Dias", status: "Estável", date: "Última consulta: 18 Nov", color: "bg-secondary", icon: "👱‍♀️" },
  { name: "Carlos Neto", status: "Novo Paciente", date: "Primeira consulta: 20 Nov", color: "bg-green-500", icon: "👨‍🦱" },
  { name: "Rosa Gomes", status: "Acompanhamento", date: "Próxima visita: 25 Nov", color: "bg-blue-600", icon: "👵" },
]

export function ProjectList() {
  return (
    <Card
      className="p-6 transition-all duration-500 hover:shadow-xl animate-slide-in-up"
      style={{ animationDelay: "700ms" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Pacientes Principais</h2>
        <Button variant="outline" size="sm" className="transition-all duration-300 hover:scale-105 bg-transparent">
          <Plus className="w-4 h-4 mr-1" />
          Novo
        </Button>
      </div>
      <div className="space-y-3">
        {patients.map((patient, index) => (
          <div
            key={patient.name}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-all duration-300 cursor-pointer group"
            style={{ animationDelay: `${800 + index * 100}ms` }}
          >
            <div
              className={`${patient.color} w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110`}
            >
              {patient.icon}
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground text-sm">{patient.name}</p>
              <p className="text-xs text-muted-foreground">{patient.status}</p>
            </div>
            <span className="text-[10px] text-muted-foreground">{patient.date.split(": ")[1]}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
