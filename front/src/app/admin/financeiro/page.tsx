import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { CalendarContent } from "@/components/agendamento/calendar-content"
import { Button } from "@/components/ui/button"
import { Reminders } from "@/components/dashboard/reminders"
import FarmaciaPage from "@/components/dashboard/farmacia"
import RelatorioFinanceiroPage from "@/components/dashboard/RelatorioFinanceiro"

export default function CalendarPage() {
  return (
      <main className="p-6">

          <RelatorioFinanceiroPage />
      </main>
  )
}




