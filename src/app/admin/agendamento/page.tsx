import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"

export default function AnalyticsPage() {
  return (

      <main className="flex-1 p-4 lg:p-6 lg:ml-64">
        <Header
          title="Relatórios"
          description="Análise de dados epidemiológicos e estatísticas da Centro Médico."
          actions={
            <Button
              variant="outline"
              className="w-full sm:w-auto h-9 text-sm transition-all duration-300 hover:shadow-md hover:scale-105 bg-transparent"
            >
              Exportar Relatório
            </Button>
          }
        />

        <div className="mt-6">
          <AnalyticsContent />
        </div>
      </main>
  )
}
