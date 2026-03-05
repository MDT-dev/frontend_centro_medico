"use client"

import { LayoutDashboard, Stethoscope, Calendar, BarChart3, Users, Settings, HelpCircle, LogOut, Pill, Users2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
  { icon: LayoutDashboard, label: "Painel de Controlo", href: "/" },
  { icon: Stethoscope, label: "Consultas", badge: "8", href: "/tasks" },
  { icon: Calendar, label: "Agendamentos", href: "/calendar" },
  { icon: BarChart3, label: "Relatórios", href: "/analytics" },
  { icon: Users2, label: "Equipa Médica", href: "/team" },
  { icon: Pill, label: "Medicamentos", href: "/medicines" },
]

const generalItems = [
  { icon: Settings, label: "Configurações", href: "/settings" },
  { icon: HelpCircle, label: "Ajuda", href: "/help" },
  { icon: LogOut, label: "Sair", href: "/logout" },
]

export function Sidebar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()

  return (
    <aside className="fixed top-0 left-0 w-64 bg-card border-r border-border p-4 h-screen overflow-y-auto lg:block">
      <div className="flex items-center gap-2 mb-8 group cursor-pointer">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
            <Stethoscope className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground leading-none">Clínica</span>
            <span className="text-[10px] font-medium text-primary">Digital</span>
          </div>
        </Link>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-[10px] font-medium text-muted-foreground mb-2 uppercase tracking-wider">Operações</p>
          <nav className="space-y-0.5">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                    hoveredItem === item.label && !isActive && "translate-x-1",
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-primary text-primary-foreground text-[10px] font-semibold px-1.5 py-0.5 rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        <div>
          <p className="text-[10px] font-medium text-muted-foreground mb-2 uppercase tracking-wider">Sistema</p>
          <nav className="space-y-0.5">
            {generalItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                    hoveredItem === item.label && !isActive && "translate-x-1",
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </aside>
  )
}
