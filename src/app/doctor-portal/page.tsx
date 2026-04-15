// app/doctor-portal/page.tsx

"use client";

import { DoctorAppointments } from "@/components/module/portal-doctor/DoctorAppointments";
import { DoctorDashboard } from "@/components/module/portal-doctor/DoctorDashboard";
import { DoctorMedicalRecords } from "@/components/module/portal-doctor/DoctorMedicalRecords";
import { DoctorPatientList } from "@/components/module/portal-doctor/DoctorPatientList";
import { DoctorPortalLayout } from "@/components/module/portal-doctor/DoctorPortalLayout";
import { DoctorPrescriptions } from "@/components/module/portal-doctor/DoctorPrescriptions";
import { DoctorSchedule } from "@/components/module/portal-doctor/DoctorSchedule";

import { Appointment, MedicalRecord, Patient, Prescription, ScheduleType, Statistics } from "@/components/module/portal-doctor/types";
import type { prescriptionsList } from "@/components/module/portal-doctor/types";
import { useState } from "react";

// Mock Data
const loggedDoctor = {
    id: 1,
    name: "Dr. Carlos Alberto Silva",
    email: "carlos.silva@medicina.co.ao",
    phone: "+244 923 456 789",
    specialty: "Clínica Geral",
    licenseNumber: "MED-AO-0042",
    experience: 15,
};

const patients: Patient[] = [
    {
        id: 1,
        name: "Maria Celeste dos Santos",
        email: "maria.santos@email.com",
        phone: "+244 923 456 789",
        alternativePhone: "+244 912 345 678",
        address: "Rua 15, Bairro Kilamba, Luanda",
        birthDate: "1985-03-15",
        age: 40,
        gender: "F",
        bloodType: "O+",
        allergies: "Penicilina",
        medicalConditions: "Hipertensão",
        medications: "Losartana 50mg",
        emergencyContact: "João Santos - +244 934 567 890",
        createdAt: "2023-01-20",
        lastVisit: "2026-03-10",
    },
    {
        id: 2,
        name: "João Manuel Fernandes",
        email: "joao.fernandes@email.com",
        phone: "+244 912 345 678",
        address: "Av. 4 de Fevereiro, Luanda",
        birthDate: "1978-08-22",
        age: 47,
        gender: "M",
        bloodType: "A+",
        allergies: "Nenhuma",
        medicalConditions: "Diabetes Tipo 2",
        medications: "Metformina 850mg",
        createdAt: "2023-06-10",
        lastVisit: "2026-03-18",
    },
];

const appointments: Appointment[] = [
    {
        id: 1,
        patientId: 1,
        patientName: "Maria Celeste dos Santos",
        patientPhone: "+244 923 456 789",
        patientEmail: "maria.santos@email.com",
        doctorId: 1,
        doctorName: "Dr. Carlos Alberto Silva",
        date: new Date().toISOString().split('T')[0],
        time: "09:00",
        duration: 30,
        type: "consultation",
        status: "scheduled",
        reason: "Dor de cabeça persistente",
        symptoms: "Dor latejante na região frontal",
        createdAt: "2026-04-05T10:30:00",
    },
    {
        id: 2,
        patientId: 2,
        patientName: "João Manuel Fernandes",
        patientPhone: "+244 912 345 678",
        patientEmail: "joao.fernandes@email.com",
        doctorId: 1,
        doctorName: "Dr. Carlos Alberto Silva",
        date: new Date().toISOString().split('T')[0],
        time: "10:00",
        duration: 30,
        type: "follow_up",
        status: "confirmed",
        reason: "Acompanhamento diabetes",
        createdAt: "2026-04-01T14:20:00",
    },
];

const statistics: Statistics = {
    totalPatients: 156,
    todayAppointments: 2,
    weeklyAppointments: 12,
    completedAppointments: 48,
    cancelledAppointments: 5,
    pendingPrescriptions: 3,
};



// Adicione estes dados mock
const medicalRecords = [
    {
        id: 1,
        patientId: 1,
        date: "2026-03-10",
        doctorId: 1,
        doctorName: "Dr. Carlos Silva",
        type: "consultation",
        diagnosis: "Hipertensão controlada",
        notes: "Paciente estável, manter medicação",
    },
    
    {
        id: 2,
        patientId: 2,
        date: "2026-03-18",
        doctorId: 1,
        doctorName: "Dr. Carlos Silva",
        type: "consultation",
        diagnosis: "Glicemia controlada",
        prescription: {
            id: 1,
            date: "2026-03-18",
            medications: [{ name: "Metformina 850mg", dosage: "1 comprimido", frequency: "2x ao dia", duration: "30 dias", quantity: 60 }],
            status: "active",
        },
    },
];

const prescriptionsList: prescriptionsList[] = [
    {
        id: 1,
        patientId: 2,
        patientName: "João Manuel Fernandes",
        date: "2026-03-18",
        medications: [{ name: "Metformina 850mg", dosage: "1 comprimido", frequency: "2x ao dia", duration: "30 dias", quantity: 60 }],
        status: "active",
        followUpDate: "2026-04-18",
    },
];

const doctorSchedule: ScheduleType[] = [
    { day: "monday", slots: [{ time: "09:00", available: true }, { time: "10:00", available: true }, { time: "11:00", available: true }, { time: "14:00", available: true }, { time: "15:00", available: true }] },
    { day: "tuesday", slots: [{ time: "09:00", available: true }, { time: "10:00", available: true }, { time: "11:00", available: true }, { time: "14:00", available: true }, { time: "15:00", available: true }] },
    { day: "wednesday", slots: [{ time: "09:00", available: true }, { time: "10:00", available: true }, { time: "11:00", available: true }, { time: "14:00", available: true }, { time: "15:00", available: true }] },
    { day: "thursday", slots: [{ time: "09:00", available: true }, { time: "10:00", available: true }, { time: "11:00", available: true }, { time: "14:00", available: true }, { time: "15:00", available: true }] },
    { day: "friday", slots: [{ time: "09:00", available: true }, { time: "10:00", available: true }, { time: "11:00", available: true }, { time: "14:00", available: true }, { time: "15:00", available: true }] },
    { day: "saturday", slots: [] },
    { day: "sunday", slots: [] },
];

// Adicione estas funções handler
const handleViewRecord = (record: MedicalRecord) => {
    console.log("View record:", record);
};

const handleAddRecord = (patientId: number, record: Partial<MedicalRecord>) => {
    console.log("Add record:", patientId, record);
};

const handlePrintRecord = (record: MedicalRecord) => {
    window.print();
};

const handleDownloadRecord = (record: MedicalRecord) => {
    console.log("Download record:", record);
};

const handleViewPrescription = (prescription: Prescription) => {
    console.log("View prescription:", prescription);
};

const handleCreatePrescription = (patientId: number, prescription: Partial<Prescription>) => {
    console.log("Create prescription:", patientId, prescription);
};

const handleRenewPrescription = (prescriptionId: number) => {
    console.log("Renew prescription:", prescriptionId);
};

const handlePrintPrescription = (prescription: Prescription) => {
    window.print();
};

const handleDownloadPrescription = (prescription: Prescription) => {
    console.log("Download prescription:", prescription);
};

const handleUpdateSchedule = (schedule: ScheduleType[]) => {
    console.log("Update schedule:", schedule);
};

const handleAddTimeSlot = (day: string, time: string) => {
    console.log("Add time slot:", day, time);
};

const handleRemoveTimeSlot = (day: string, time: string) => {
    console.log("Remove time slot:", day, time);
};

const handleSetDayOff = (day: string, isDayOff: boolean) => {
    console.log("Set day off:", day, isDayOff);
};

// Adicione no return do componente, dentro do DoctorPortalLayout:

export default function DoctorPortalPage() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [appointmentsList, setAppointmentsList] = useState(appointments);

    const handleStartAppointment = (appointment: Appointment) => {
        setAppointmentsList(appointmentsList.map(a =>
            a.id === appointment.id ? { ...a, status: "in_progress" as const } : a
        ));
    };

    const handleCompleteAppointment = (id: number, diagnosis: string, prescription: Prescription, notes: string) => {
        setAppointmentsList(appointmentsList.map(a =>
            a.id === id ? { ...a, status: "completed" as const, diagnosis, prescription, notes } : a
        ));
    };

    const handleCancelAppointment = (id: number) => {
        setAppointmentsList(appointmentsList.map(a =>
            a.id === id ? { ...a, status: "cancelled" as const } : a
        ));
    };

    const handleViewPatient = (patient: Patient) => {
        console.log("View patient:", patient);
        // Implement patient details view
    };

    const handleAddPatient = () => {
        console.log("Add patient");
        // Implement add patient modal
    };

    const handleNewAppointment = (patient: Patient) => {
        setActiveTab("appointments");
        // Implement new appointment modal
    };

    return (
        <DoctorPortalLayout
            doctorName={loggedDoctor.name}
            doctorSpecialty={loggedDoctor.specialty}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onLogout={() => console.log("Logout")}
        >
            {activeTab === "dashboard" && (
                <DoctorDashboard
                    statistics={statistics}
                    todayAppointments={appointmentsList.filter(a => a.date === new Date().toISOString().split('T')[0])}
                    onViewAppointments={() => setActiveTab("appointments")}
                    onViewPatients={() => setActiveTab("patients")}
                    onStartAppointment={handleStartAppointment}
                />
            )}

            {activeTab === "appointments" && (
                <DoctorAppointments
                    appointments={appointmentsList}
                    onStartAppointment={handleStartAppointment}
                    onCompleteAppointment={handleCompleteAppointment}
                    onCancelAppointment={handleCancelAppointment}
                />
            )}

            {activeTab === "patients" && (
                <DoctorPatientList
                    patients={patients}
                    onViewPatient={handleViewPatient}
                    onAddPatient={handleAddPatient}
                    onNewAppointment={handleNewAppointment}
                />
            )}

            {
                activeTab === "records" && (
                    <DoctorMedicalRecords
                        patients={patients}
                        medicalRecords={medicalRecords}
                        onViewRecord={handleViewRecord}
                        onAddRecord={handleAddRecord}
                        onPrintRecord={handlePrintRecord}
                        onDownloadRecord={handleDownloadRecord}
                    />
                )
            }

            {
                activeTab === "prescriptions" && (
                    <DoctorPrescriptions
                        patients={patients}
                        prescriptions={prescriptionsList}
                        onViewPrescription={handleViewPrescription}
                        onCreatePrescription={handleCreatePrescription}
                        onRenewPrescription={handleRenewPrescription}
                        onPrintPrescription={handlePrintPrescription}
                        onDownloadPrescription={handleDownloadPrescription}
                    />
                )
            }

            {
                activeTab === "schedule" && (
                    <DoctorSchedule
                        schedule={doctorSchedule}
                        appointments={appointmentsList}
                        onUpdateSchedule={handleUpdateSchedule}
                        onAddTimeSlot={handleAddTimeSlot}
                        onRemoveTimeSlot={handleRemoveTimeSlot}
                        onSetDayOff={handleSetDayOff}
                    />
                )
            }

        </DoctorPortalLayout>
    );
}