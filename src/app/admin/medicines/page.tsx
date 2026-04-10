import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { CalendarContent } from "@/components/agendamento/calendar-content"
import { Button } from "@/components/ui/button"
import { Reminders } from "@/components/dashboard/reminders"
import FarmaciaPage from "@/components/dashboard/farmacia"

export default function CalendarPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 p-4 lg:p-6 lg:ml-64">
        <Header
          title="Farmacia"
          description="Veja e gerencie todos os agendamentos de consultas."
          actions={
            <Button className="w-full sm:w-auto h-9 text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-105">
              + Novo Medicamento
            </Button>
          }
        />

        <div className="mt-6">
          <FarmaciaPage />
        </div>
      </main>
    </div>
  )
}




