// components/doctor-portal/DoctorAppointments.tsx

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  XCircle,
  Activity,
  Stethoscope,
  Pill,
  Microscope,
  Heart,
  Thermometer,
  Weight,
  Ruler,
  Plus,
  Save,
} from "lucide-react";
import { Appointment, Prescription, VitalSigns } from "./types";

interface DoctorAppointmentsProps {
  appointments: Appointment[];
  onStartAppointment: (appointment: Appointment) => void;
  onCompleteAppointment: (appointmentId: number, diagnosis: string, prescription: Prescription, notes: string) => void;
  onCancelAppointment: (appointmentId: number) => void;
}

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "confirmed":
      return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" /> Confirmada</Badge>;
    case "scheduled":
      return <Badge className="bg-blue-100 text-blue-700"><Clock className="h-3 w-3 mr-1" /> Agendada</Badge>;
    case "in_progress":
      return <Badge className="bg-yellow-100 text-yellow-700"><Activity className="h-3 w-3 mr-1" /> Em Andamento</Badge>;
    case "completed":
      return <Badge className="bg-emerald-100 text-emerald-700"><CheckCircle className="h-3 w-3 mr-1" /> Concluída</Badge>;
    case "cancelled":
      return <Badge className="bg-red-100 text-red-700"><XCircle className="h-3 w-3 mr-1" /> Cancelada</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export function DoctorAppointments({
  appointments,
  onStartAppointment,
  onCompleteAppointment,
  onCancelAppointment,
}: DoctorAppointmentsProps) {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showConsultDialog, setShowConsultDialog] = useState(false);
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [vitalSigns, setVitalSigns] = useState<VitalSigns>({
    bloodPressure: "",
    heartRate: undefined,
    temperature: undefined,
    respiratoryRate: undefined,
    oxygenSaturation: undefined,
    weight: undefined,
    height: undefined,
    recordedAt: new Date().toISOString(),
  });
  const [medications, setMedications] = useState<Array<{name: string, dosage: string, frequency: string, duration: string, quantity: number}>>([]);
  const [newMedication, setNewMedication] = useState({ name: "", dosage: "", frequency: "", duration: "", quantity: 1 });

  const todayAppointments = appointments.filter(a => a.date === new Date().toISOString().split('T')[0]);
  const upcomingAppointments = appointments.filter(a => a.date > new Date().toISOString().split('T')[0] && a.status !== "cancelled");
  const pastAppointments = appointments.filter(a => a.date < new Date().toISOString().split('T')[0] || a.status === "completed" || a.status === "cancelled");

  const handleAddMedication = () => {
    if (newMedication.name && newMedication.dosage) {
      setMedications([...medications, { ...newMedication }]);
      setNewMedication({ name: "", dosage: "", frequency: "", duration: "", quantity: 1 });
    }
  };

  const handleRemoveMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleCompleteConsultation = () => {
    const prescription: Prescription = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      medications: medications,
      instructions: notes,
    };
    onCompleteAppointment(selectedAppointment!.id, diagnosis, prescription, notes);
    setShowConsultDialog(false);
    setSelectedAppointment(null);
    setDiagnosis("");
    setNotes("");
    setMedications([]);
    setVitalSigns({
      bloodPressure: "",
      heartRate: undefined,
      temperature: undefined,
      respiratoryRate: undefined,
      oxygenSaturation: undefined,
      weight: undefined,
      height: undefined,
      recordedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-800">Minhas Consultas</h2>
        <p className="text-sm text-slate-500">Gerencie todas as suas consultas</p>
      </div>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="today">Hoje ({todayAppointments.length})</TabsTrigger>
          <TabsTrigger value="upcoming">Próximas ({upcomingAppointments.length})</TabsTrigger>
          <TabsTrigger value="past">Histórico ({pastAppointments.length})</TabsTrigger>
        </TabsList>

        {/* Today's Appointments */}
        <TabsContent value="today" className="space-y-4 mt-4">
          {todayAppointments.length > 0 ? (
            todayAppointments.map((apt) => (
              <Card key={apt.id} className="border-0 shadow-lg">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-[70px]">
                        <p className="text-2xl font-bold text-teal-600">{apt.time}</p>
                        <p className="text-xs text-slate-400">{apt.duration} min</p>
                      </div>
                      <Avatar className="h-12 w-12 bg-teal-500 text-white">
                        <AvatarFallback>{getInitials(apt.patientName)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-lg">{apt.patientName}</p>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                          <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {apt.patientPhone}</span>
                          <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {apt.patientEmail}</span>
                        </div>
                        <p className="text-sm text-slate-600 mt-1"><span className="font-medium">Motivo:</span> {apt.reason}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(apt.status)}
                      {apt.status === "scheduled" || apt.status === "confirmed" ? (
                        <Button onClick={() => onStartAppointment(apt)}>
                          <Activity className="h-4 w-4 mr-2" />
                          Iniciar Consulta
                        </Button>
                      ) : apt.status === "in_progress" ? (
                        <Button onClick={() => {
                          setSelectedAppointment(apt);
                          setShowConsultDialog(true);
                        }}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Concluir
                        </Button>
                      ) : null}
                      {(apt.status === "scheduled" || apt.status === "confirmed") && (
                        <Button variant="outline" className="text-red-600" onClick={() => onCancelAppointment(apt.id)}>
                          <XCircle className="h-4 w-4 mr-2" />
                          Cancelar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-0 shadow-lg">
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 mx-auto text-slate-300 mb-3" />
                <p className="text-slate-500">Nenhuma consulta agendada para hoje</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Upcoming Appointments */}
        <TabsContent value="upcoming" className="space-y-4 mt-4">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((apt) => (
              <Card key={apt.id} className="border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-[80px]">
                        <p className="font-bold">{apt.date}</p>
                        <p className="text-sm text-slate-500">{apt.time}</p>
                      </div>
                      <div>
                        <p className="font-semibold">{apt.patientName}</p>
                        <p className="text-sm text-slate-500">{apt.reason}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(apt.status)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-0 shadow-lg">
              <CardContent className="py-12 text-center">
                <p className="text-slate-500">Nenhuma consulta futura</p>
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
                      <div className="text-center min-w-[80px]">
                        <p className="font-bold">{apt.date}</p>
                        <p className="text-sm text-slate-500">{apt.time}</p>
                      </div>
                      <div>
                        <p className="font-semibold">{apt.patientName}</p>
                        {apt.diagnosis && (
                          <p className="text-sm text-slate-500">Diagnóstico: {apt.diagnosis}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(apt.status)}
                    </div>
                  </div>
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

      {/* Consultation Dialog */}
      <Dialog open={showConsultDialog} onOpenChange={setShowConsultDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-teal-600" />
              Registrar Consulta - {selectedAppointment?.patientName}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Vital Signs */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                Sinais Vitais
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <Label>Pressão Arterial</Label>
                  <Input
                    placeholder="120/80"
                    value={vitalSigns.bloodPressure}
                    onChange={(e) => setVitalSigns({ ...vitalSigns, bloodPressure: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Frequência Cardíaca (bpm)</Label>
                  <Input
                    type="number"
                    placeholder="72"
                    value={vitalSigns.heartRate || ""}
                    onChange={(e) => setVitalSigns({ ...vitalSigns, heartRate: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Temperatura (°C)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="36.5"
                    value={vitalSigns.temperature || ""}
                    onChange={(e) => setVitalSigns({ ...vitalSigns, temperature: parseFloat(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Saturação O₂ (%)</Label>
                  <Input
                    type="number"
                    placeholder="98"
                    value={vitalSigns.oxygenSaturation || ""}
                    onChange={(e) => setVitalSigns({ ...vitalSigns, oxygenSaturation: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Peso (kg)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="70"
                    value={vitalSigns.weight || ""}
                    onChange={(e) => setVitalSigns({ ...vitalSigns, weight: parseFloat(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Altura (cm)</Label>
                  <Input
                    type="number"
                    placeholder="170"
                    value={vitalSigns.height || ""}
                    onChange={(e) => setVitalSigns({ ...vitalSigns, height: parseFloat(e.target.value) })}
                  />
                </div>
              </div>
            </div>

            {/* Diagnosis */}
            <div>
              <Label>Diagnóstico *</Label>
              <Textarea
                placeholder="Descreva o diagnóstico..."
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            {/* Prescription */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Pill className="h-4 w-4 text-orange-500" />
                Prescrição Médica
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-3">
                <Input
                  placeholder="Medicamento"
                  value={newMedication.name}
                  onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                />
                <Input
                  placeholder="Dosagem"
                  value={newMedication.dosage}
                  onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                />
                <Input
                  placeholder="Frequência"
                  value={newMedication.frequency}
                  onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
                />
                <Input
                  placeholder="Duração"
                  value={newMedication.duration}
                  onChange={(e) => setNewMedication({ ...newMedication, duration: e.target.value })}
                />
                <Button type="button" variant="outline" onClick={handleAddMedication}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {medications.length > 0 && (
                <div className="space-y-2 mt-3">
                  {medications.map((med, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div>
                        <span className="font-medium">{med.name}</span>
                        <span className="text-sm text-slate-500 ml-2">- {med.dosage}</span>
                        <p className="text-xs text-slate-400">{med.frequency} • {med.duration}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveMedication(idx)}>
                        <XCircle className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notes */}
            <div>
              <Label>Notas Adicionais</Label>
              <Textarea
                placeholder="Observações relevantes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConsultDialog(false)}>Cancelar</Button>
            <Button onClick={handleCompleteConsultation} className="bg-teal-600 hover:bg-teal-700">
              <Save className="h-4 w-4 mr-2" />
              Salvar e Concluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}