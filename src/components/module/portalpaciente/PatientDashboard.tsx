// components/patient-portal/PatientDashboard.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Appointment, Invoice } from "./types";
import {
  Calendar,
  Clock,
  Receipt,
  AlertCircle,
  CheckCircle,
  Heart,
  Plus,
  Microscope,
  Pill,
  Stethoscope,
} from "lucide-react";

interface PatientDashboardProps {
  patientName: string;
  upcomingAppointments: Appointment[];
  pastAppointmentsCount: number;
  invoices: Invoice[];
  onScheduleClick: () => void;
  onExamClick: () => void;
  onViewAppointments: () => void;
  onViewInvoices: () => void;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value);
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "confirmed":
      return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" /> Confirmada</Badge>;
    case "scheduled":
      return <Badge className="bg-blue-100 text-blue-700"><Clock className="h-3 w-3 mr-1" /> Agendada</Badge>;
    case "paid":
      return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" /> Paga</Badge>;
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-700"><AlertCircle className="h-3 w-3 mr-1" /> Pendente</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export function PatientDashboard({
  patientName,
  upcomingAppointments,
  pastAppointmentsCount,
  invoices,
  onScheduleClick,
  onExamClick,
  onViewAppointments,
  onViewInvoices,
}: PatientDashboardProps) {
  const totalPaid = invoices.filter(i => i.status === "paid").reduce((sum, i) => sum + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === "pending").reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
        <CardContent className="p-4 md:p-6 relative">
          <div className="absolute right-0 top-0 opacity-10">
            <Heart className="h-32 w-32 md:h-40 md:w-40" />
          </div>
          <div className="relative z-10">
            <p className="text-sm opacity-90">Bem-vindo de volta!</p>
            <p className="text-xl md:text-2xl font-bold mt-1">{patientName}</p>
            <p className="text-sm opacity-90 mt-2">
              Sua próxima consulta é em {upcomingAppointments[0]?.date || "nenhuma data agendada"}
            </p>
            <Button
              className="mt-4 bg-white text-blue-700 hover:bg-slate-100"
              onClick={onScheduleClick}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Marcar Consulta
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-4 md:pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-slate-500">Consultas</p>
                <p className="text-xl md:text-2xl font-bold text-blue-600">
                  {upcomingAppointments.length + pastAppointmentsCount}
                </p>
              </div>
              <Calendar className="h-6 w-6 md:h-8 md:w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-4 md:pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-slate-500">Próximas</p>
                <p className="text-xl md:text-2xl font-bold text-green-600">
                  {upcomingAppointments.length}
                </p>
              </div>
              <Clock className="h-6 w-6 md:h-8 md:w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-4 md:pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-slate-500">Faturas Pagas</p>
                <p className="text-xl md:text-2xl font-bold text-emerald-600">
                  {invoices.filter(i => i.status === "paid").length}
                </p>
              </div>
              <Receipt className="h-6 w-6 md:h-8 md:w-8 text-emerald-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-4 md:pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-slate-500">Pendentes</p>
                <p className="text-xl md:text-2xl font-bold text-yellow-600">
                  {invoices.filter(i => i.status === "pending").length}
                </p>
              </div>
              <AlertCircle className="h-6 w-6 md:h-8 md:w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
              Próximas Consultas
            </CardTitle>
            <Button variant="link" className="text-blue-600 w-fit px-0" onClick={onViewAppointments}>
              Ver todas →
            </Button>
          </div>
          <CardDescription>Suas consultas agendadas</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-3">
              {upcomingAppointments.slice(0, 3).map((apt) => (
                <div
                  key={apt.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 md:p-4 bg-slate-50 rounded-xl"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="text-center min-w-[60px] md:min-w-[70px]">
                      <p className="font-bold text-sm md:text-lg">{apt.time}</p>
                      <p className="text-xs text-slate-400">{apt.date}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-sm md:text-base">{apt.doctorName}</p>
                      <p className="text-xs md:text-sm text-slate-500">{apt.specialty}</p>
                      <p className="text-xs text-slate-400 mt-1 hidden sm:block">{apt.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-2">
                    {getStatusBadge(apt.status)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500 py-8">Nenhuma consulta agendada</p>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card
          className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          onClick={onScheduleClick}
        >
          <CardContent className="pt-4 md:pt-6 text-center">
            <div className="p-2 md:p-3 bg-blue-100 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mx-auto mb-2 md:mb-3">
              <Plus className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
            </div>
            <p className="text-xs md:text-sm font-medium">Marcar Consulta</p>
          </CardContent>
        </Card>
        <Card
          className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          onClick={onViewInvoices}
        >
          <CardContent className="pt-4 md:pt-6 text-center">
            <div className="p-2 md:p-3 bg-green-100 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mx-auto mb-2 md:mb-3">
              <Receipt className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
            </div>
            <p className="text-xs md:text-sm font-medium">Ver Faturas</p>
          </CardContent>
        </Card>
        <Card
          className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          onClick={onExamClick}
        >
          <CardContent className="pt-4 md:pt-6 text-center">
            <div className="p-2 md:p-3 bg-purple-100 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mx-auto mb-2 md:mb-3">
              <Microscope className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
            </div>
            <p className="text-xs md:text-sm font-medium">Agendar Exame</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
          <CardContent className="pt-4 md:pt-6 text-center">
            <div className="p-2 md:p-3 bg-orange-100 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mx-auto mb-2 md:mb-3">
              <Pill className="h-5 w-5 md:h-6 md:w-6 text-orange-600" />
            </div>
            <p className="text-xs md:text-sm font-medium">Prescrições</p>
          </CardContent>
        </Card>
      </div>

      {/* Financial Summary */}
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-base md:text-lg">Resumo Financeiro</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            <div className="text-center p-3 md:p-4 bg-green-50 rounded-lg">
              <p className="text-xs md:text-sm text-slate-500">Total Gasto</p>
              <p className="text-lg md:text-2xl font-bold text-green-600">{formatCurrency(totalPaid)}</p>
            </div>
            <div className="text-center p-3 md:p-4 bg-yellow-50 rounded-lg">
              <p className="text-xs md:text-sm text-slate-500">Pendente</p>
              <p className="text-lg md:text-2xl font-bold text-yellow-600">{formatCurrency(totalPending)}</p>
            </div>
            <div className="text-center p-3 md:p-4 bg-blue-50 rounded-lg">
              <p className="text-xs md:text-sm text-slate-500">Última Consulta</p>
              <p className="text-base md:text-xl font-bold text-blue-600">
                {upcomingAppointments[0]?.date || "---"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}