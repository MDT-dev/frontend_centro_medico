import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { CalendarContent } from "@/components/agendamento/calendar-content"
import { Button } from "@/components/ui/button"
import { Reminders } from "@/components/dashboard/reminders"
import FarmaciaPage from "@/components/dashboard/farmacia"
import RelatorioFinanceiroPage from "@/components/dashboard/RelatorioFinanceiro"
import GerenciamentoPacientesPage from "@/components/dashboard/pacientes"

export default function CalendarPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-4 lg:p-6 lg:ml-64">
        <div className="mt-6">
          <GerenciamentoPacientesPage />
        </div>
      </main>
    </div>
  )
}




