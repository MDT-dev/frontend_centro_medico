// components/doctor-portal/DoctorDashboard.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Appointment, Statistics } from "./types";
import {
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Stethoscope,
  Pill,
  Activity,
  ArrowRight,
  UserPlus,
  FileText,
} from "lucide-react";

interface DoctorDashboardProps {
  statistics: Statistics;
  todayAppointments: Appointment[];
  onViewAppointments: () => void;
  onViewPatients: () => void;
  onStartAppointment: (appointment: Appointment) => void;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "confirmed":
      return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" /> Confirmada</Badge>;
    case "scheduled":
      return <Badge className="bg-blue-100 text-blue-700"><Clock className="h-3 w-3 mr-1" /> Agendada</Badge>;
    case "in_progress":
      return <Badge className="bg-yellow-100 text-yellow-700"><Activity className="h-3 w-3 mr-1" /> Em Andamento</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export function DoctorDashboard({
  statistics,
  todayAppointments,
  onViewAppointments,
  onViewPatients,
  onStartAppointment,
}: DoctorDashboardProps) {
  const completionRate = Math.round((statistics.completedAppointments / (statistics.completedAppointments + statistics.cancelledAppointments + statistics.todayAppointments)) * 100) || 0;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-700 text-white">
          <CardContent className="pt-4 md:pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-90">Total Pacientes</p>
                <p className="text-2xl font-bold">{statistics.totalPatients}</p>
              </div>
              <Users className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-500 to-emerald-700 text-white">
          <CardContent className="pt-4 md:pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-90">Consultas Hoje</p>
                <p className="text-2xl font-bold">{statistics.todayAppointments}</p>
              </div>
              <Calendar className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="pt-4 md:pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Concluídas</p>
                <p className="text-2xl font-bold text-green-600">{statistics.completedAppointments}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="pt-4 md:pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Canceladas</p>
                <p className="text-2xl font-bold text-red-600">{statistics.cancelledAppointments}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="pt-4 md:pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Prescrições</p>
                <p className="text-2xl font-bold text-purple-600">{statistics.pendingPrescriptions}</p>
              </div>
              <Pill className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="pt-4 md:pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Taxa de Ocupação</p>
                <p className="text-2xl font-bold text-orange-600">{completionRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Appointments */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Calendar className="h-5 w-5 text-teal-600" />
            Consultas de Hoje
          </CardTitle>
          <Button variant="link" className="text-teal-600" onClick={onViewAppointments}>
            Ver todas <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent>
          {todayAppointments.length > 0 ? (
            <div className="space-y-3">
              {todayAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 md:p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="text-center min-w-[60px]">
                      <p className="font-bold text-sm md:text-base">{apt.time}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-sm md:text-base">{apt.patientName}</p>
                      <p className="text-xs text-slate-500">{apt.type === "consultation" ? "Consulta" : apt.type === "follow_up" ? "Retorno" : "Emergência"}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-2">
                    {getStatusBadge(apt.status)}
                    {apt.status === "scheduled" || apt.status === "confirmed" ? (
                      <Button size="sm" onClick={() => onStartAppointment(apt)}>
                        <Activity className="h-4 w-4 mr-1" />
                        Iniciar
                      </Button>
                    ) : apt.status === "in_progress" ? (
                      <Button size="sm" variant="outline" className="text-yellow-600">
                        Em andamento
                      </Button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto text-slate-300 mb-3" />
              <p className="text-slate-500">Nenhuma consulta agendada para hoje</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-base md:text-lg">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-3" onClick={onViewPatients}>
              <UserPlus className="h-4 w-4" />
              Registrar Novo Paciente
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <FileText className="h-4 w-4" />
              Emitir Prescrição
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <Activity className="h-4 w-4" />
              Solicitar Exame
            </Button>
          </CardContent>
        </Card>

        {/* Performance */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-base md:text-lg">Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Taxa de Conclusão</span>
                <span className="font-semibold">{completionRate}%</span>
              </div>
              <Progress value={completionRate} className="h-2 [&>*]:bg-teal-500" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Pacientes Atendidos (Mês)</span>
                <span className="font-semibold">{statistics.completedAppointments}</span>
              </div>
              <Progress value={(statistics.completedAppointments / 50) * 100} className="h-2 [&>*]:bg-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-3 pt-4">
              <div className="text-center p-3 bg-teal-50 rounded-lg">
                <p className="text-2xl font-bold text-teal-600">{statistics.weeklyAppointments}</p>
                <p className="text-xs text-slate-500">Consultas esta semana</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{statistics.totalPatients}</p>
                <p className="text-xs text-slate-500">Total de pacientes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}