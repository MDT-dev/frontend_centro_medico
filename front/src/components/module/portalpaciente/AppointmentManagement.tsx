// components/patient-portal/AppointmentManagement.tsx

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Appointment } from "./types";
import {
  Calendar,
  Clock,
  MapPin,
  Stethoscope,
  CheckCircle,
  XCircle,
  Plus,
  Edit,
  FileText,
  ChevronRight,
} from "lucide-react";

interface AppointmentManagementProps {
  upcomingAppointments: Appointment[];
  pastAppointments: Appointment[];
  onScheduleClick: () => void;
  onCancelAppointment: (appointmentId: number) => void;
  onRescheduleAppointment: (appointment: Appointment) => void;
  onViewDetails: (appointment: Appointment) => void;
}

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

const getRandomColor = (id: number) => {
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500'];
  return colors[id % colors.length];
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "confirmed":
      return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" /> Confirmada</Badge>;
    case "scheduled":
      return <Badge className="bg-blue-100 text-blue-700"><Clock className="h-3 w-3 mr-1" /> Agendada</Badge>;
    case "completed":
      return <Badge className="bg-emerald-100 text-emerald-700"><CheckCircle className="h-3 w-3 mr-1" /> Realizada</Badge>;
    case "cancelled":
      return <Badge className="bg-red-100 text-red-700"><XCircle className="h-3 w-3 mr-1" /> Cancelada</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export function AppointmentManagement({
  upcomingAppointments,
  pastAppointments,
  onScheduleClick,
  onCancelAppointment,
  onRescheduleAppointment,
  onViewDetails,
}: AppointmentManagementProps) {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const handleCancelClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setCancelDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    if (selectedAppointment) {
      onCancelAppointment(selectedAppointment.id);
      setCancelDialogOpen(false);
      setSelectedAppointment(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">Minhas Consultas</h2>
          <p className="text-sm text-slate-500">Histórico completo de todas as suas consultas</p>
        </div>
        <Button onClick={onScheduleClick} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Nova Consulta
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="upcoming">Próximas ({upcomingAppointments.length})</TabsTrigger>
          <TabsTrigger value="past">Histórico ({pastAppointments.length})</TabsTrigger>
        </TabsList>

        {/* Upcoming Appointments */}
        <TabsContent value="upcoming" className="space-y-4 mt-4">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((apt) => (
              <Card key={apt.id} className="border-0 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Time Column */}
                    <div className="bg-blue-50 p-4 md:w-32 flex flex-row md:flex-col items-center md:items-center justify-between md:justify-center gap-2">
                      <p className="text-2xl font-bold text-blue-700">{apt.time}</p>
                      <p className="text-sm text-slate-500">{apt.date}</p>
                    </div>
                    
                    {/* Details Column */}
                    <div className="flex-1 p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex gap-3">
                          <Avatar className={`h-12 w-12 ${getRandomColor(apt.id)} text-white hidden sm:flex`}>
                            <AvatarFallback>{getInitials(apt.doctorName)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-lg">{apt.doctorName}</h3>
                            <p className="text-sm text-slate-500 flex items-center gap-1">
                              <Stethoscope className="h-3 w-3" />
                              {apt.specialty}
                            </p>
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-500">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {apt.duration} min
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {apt.location}
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 mt-2">
                              <span className="font-medium">Motivo:</span> {apt.reason}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {getStatusBadge(apt.status)}
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onViewDetails(apt)}
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              Detalhes
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onRescheduleAppointment(apt)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Remarcar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleCancelClick(apt)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-0 shadow-lg">
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 mx-auto text-slate-300 mb-3" />
                <p className="text-slate-500">Nenhuma consulta agendada</p>
                <Button variant="link" onClick={onScheduleClick} className="mt-2">
                  Marcar consulta →
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Past Appointments */}
        <TabsContent value="past" className="space-y-4 mt-4">
          {pastAppointments.length > 0 ? (
            pastAppointments.map((apt) => (
              <Card key={apt.id} className="border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-[70px]">
                        <p className="font-bold">{apt.date}</p>
                        <p className="text-sm text-slate-500">{apt.time}</p>
                      </div>
                      <div>
                        <p className="font-semibold">{apt.doctorName}</p>
                        <p className="text-sm text-slate-500">{apt.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(apt.status)}
                      <Button variant="ghost" size="sm" onClick={() => onViewDetails(apt)}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Diagnosis & Prescription (if available) */}
                  {(apt.diagnosis || apt.prescription) && (
                    <div className="mt-3 pt-3 border-t text-sm">
                      {apt.diagnosis && (
                        <p><span className="font-medium">Diagnóstico:</span> {apt.diagnosis}</p>
                      )}
                      {apt.prescription && (
                        <p><span className="font-medium">Prescrição:</span> {apt.prescription}</p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-0 shadow-lg">
              <CardContent className="py-12 text-center">
                <p className="text-slate-500">Nenhum histórico de consultas</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar Consulta</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja cancelar sua consulta com {selectedAppointment?.doctorName} no dia {selectedAppointment?.date} às {selectedAppointment?.time}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Voltar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmCancel} className="bg-red-600 hover:bg-red-700">
              Cancelar Consulta
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}