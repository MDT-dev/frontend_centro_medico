import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { HelpContent } from "@/components/help/help-content"
import { PatientPortalPage } from "@/components/module/portalpaciente/paciente"

export default function HelpPage() {
  return (
    <div className="flex min-h-screen bg-background">
    <PatientPortalPage></PatientPortalPage>
    </div>
  )
}
