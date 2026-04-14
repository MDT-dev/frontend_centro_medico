// app/patient-portal/page.tsx

"use client";

import { useState } from "react";
import { PatientPortalLayout } from "@/components/patient-portal/PatientPortalLayout";
import { PatientDashboard } from "@/components/patient-portal/PatientDashboard";
import { AppointmentManagement } from "@/components/patient-portal/AppointmentManagement";
import { Prescriptions } from "@/components/patient-portal/Prescriptions";
import { Patient, Appointment, Prescription, Invoice, Doctor, Exam } from "@/components/patient-portal/types";

// Mock data - Replace with actual API calls
const loggedPatient: Patient = {
  id: 1,
  name: "Maria Celeste dos Santos",
  email: "maria.santos@email.com",
  phone: "+244 923 456 789",
  alternativePhone: "+244 912 345 678",
  address: "Rua 15, Bairro Kilamba, Luanda, Angola",
  birthDate: "1985-03-15",
  age: 40,
  bloodType: "O+",
  allergies: "Penicilina",
  medicalConditions: "Hipertensão",
  medications: "Losartana 50mg",
  emergencyContact: "João Santos - +244 934 567 890",
  createdAt: "2023-01-20",
};

const upcomingAppointments: Appointment[] = [
  {
    id: 1,
    doctorName: "Dr. Carlos Alberto Silva",
    specialty: "Clínica Geral",
    date: "2026-04-15",
    time: "09:00",
    duration: 30,
    type: "Consulta de Rotina",
    status: "confirmed",
    location: "Consultório 3",
    reason: "Check-up anual",
  },
  {
    id: 2,
    doctorName: "Dra. Ana Beatriz Oliveira",
    specialty: "Pediatria",
    date: "2026-04-20",
    time: "14:30",
    duration: 45,
    type: "Consulta de Acompanhamento",
    status: "scheduled",
    location: "Consultório 5",
    reason: "Acompanhamento da criança",
  },
];

const pastAppointments: Appointment[] = [
  {
    id: 3,
    doctorName: "Dr. Carlos Alberto Silva",
    specialty: "Clínica Geral",
    date: "2026-03-10",
    time: "10:00",
    duration: 30,
    type: "Consulta",
    status: "completed",
    location: "Consultório 3",
    reason: "Consulta de rotina",
    diagnosis: "Hipertensão controlada",
    prescription: "Manter medicação atual",
    notes: "Paciente estável, retorno em 3 meses",
  },
];

const prescriptions: Prescription[] = [
  {
    id: 1,
    date: "2026-03-10",
    doctor: "Dr. Carlos Silva",
    medications: [
      {
        name: "Losartana 50mg",
        dosage: "1 comprimido",
        frequency: "1x ao dia",
        duration: "30 dias",
        instructions: "Tomar após o café da manhã",
      },
    ],
    status: "active",
  },
];

const invoices: Invoice[] = [
  {
    id: "INV-2026-001",
    date: "2026-03-10",
    description: "Consulta com Dr. Carlos Silva",
    amount: 7500,
    status: "paid",
    paymentDate: "2026-03-10",
    paymentMethod: "Multicaixa Express",
  },
  {
    id: "INV-2026-003",
    date: "2026-04-15",
    description: "Consulta com Dr. Carlos Silva",
    amount: 7500,
    status: "pending",
  },
];

export default function PatientPortalPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleCancelAppointment = (appointmentId: number) => {
    console.log("Cancel appointment:", appointmentId);
    // Implement API call
  };

  const handleRescheduleAppointment = (appointment: Appointment) => {
    console.log("Reschedule appointment:", appointment);
    setActiveTab("schedule");
  };

  const handleViewAppointmentDetails = (appointment: Appointment) => {
    console.log("View details:", appointment);
    // Implement modal or navigate to details
  };

  const handleDownloadPrescription = (prescription: Prescription) => {
    console.log("Download prescription:", prescription);
    // Implement PDF generation
  };

  const handlePrintPrescription = (prescription: Prescription) => {
    console.log("Print prescription:", prescription);
    window.print();
  };

  const handleScheduleClick = () => {
    setActiveTab("schedule");
  };

  const handleExamClick = () => {
    // Implement exam scheduling
    alert("Funcionalidade em desenvolvimento");
  };

  const handleViewInvoices = () => {
    setActiveTab("invoices");
  };

  const handleViewAppointments = () => {
    setActiveTab("appointments");
  };

  return (
    <PatientPortalLayout
      patientName={loggedPatient.name}
      patientEmail={loggedPatient.email}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={() => console.log("Logout")}
    >
      {activeTab === "dashboard" && (
        <PatientDashboard
          patientName={loggedPatient.name}
          upcomingAppointments={upcomingAppointments}
          pastAppointmentsCount={pastAppointments.length}
          invoices={invoices}
          onScheduleClick={handleScheduleClick}
          onExamClick={handleExamClick}
          onViewAppointments={handleViewAppointments}
          onViewInvoices={handleViewInvoices}
        />
      )}

      {activeTab === "appointments" && (
        <AppointmentManagement
          upcomingAppointments={upcomingAppointments}
          pastAppointments={pastAppointments}
          onScheduleClick={handleScheduleClick}
          onCancelAppointment={handleCancelAppointment}
          onRescheduleAppointment={handleRescheduleAppointment}
          onViewDetails={handleViewAppointmentDetails}
        />
      )}

      {activeTab === "prescriptions" && (
        <Prescriptions
          prescriptions={prescriptions}
          onDownloadPrescription={handleDownloadPrescription}
          onPrintPrescription={handlePrintPrescription}
        />
      )}

      {/* Other tabs can be implemented similarly */}
      {(activeTab === "schedule" || activeTab === "invoices" || activeTab === "profile") && (
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-slate-500">Funcionalidade em desenvolvimento</p>
        </div>
      )}
    </PatientPortalLayout>
  );
}