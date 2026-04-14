// components/doctor-portal/DoctorMedicalRecords.tsx

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Patient, MedicalRecord, Prescription } from "./types";
import {
  FileText,
  Search,
  Calendar,
  User,
  Stethoscope,
  Pill,
  Microscope,
  Syringe,
  Heart,
  Activity,
  Download,
  Printer,
  Eye,
  Plus,
  Clock,
  AlertCircle,
  CheckCircle,
  FileSignature,
  History,
  TrendingUp,
  Scissors,
  Baby,
  Bone,
  Brain,
  Eye as EyeIcon,
  Ear,
} from "lucide-react";

interface DoctorMedicalRecordsProps {
  patients: Patient[];
  medicalRecords: any[];
  onViewRecord: (record: MedicalRecord) => void;
  onAddRecord: (patientId: number, record: Partial<MedicalRecord>) => void;
  onPrintRecord: (record: MedicalRecord) => void;
  onDownloadRecord: (record: MedicalRecord) => void;
}

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

const getRandomColor = (id: number) => {
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-teal-500'];
  return colors[id % colors.length];
};

const recordTypeConfig: Record<string, { label: string; icon: any; color: string }> = {
  consultation: { label: "Consulta", icon: Stethoscope, color: "bg-blue-100 text-blue-700" },
  exam: { label: "Exame", icon: Microscope, color: "bg-purple-100 text-purple-700" },
  procedure: { label: "Procedimento", icon: Scissors, color: "bg-red-100 text-red-700" },
  vaccination: { label: "Vacinação", icon: Syringe, color: "bg-green-100 text-green-700" },
  prescription: { label: "Prescrição", icon: Pill, color: "bg-orange-100 text-orange-700" },
};

export function DoctorMedicalRecords({
  patients,
  medicalRecords,
  onViewRecord,
  onAddRecord,
  onPrintRecord,
  onDownloadRecord,
}: DoctorMedicalRecordsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showAddRecordDialog, setShowAddRecordDialog] = useState(false);
  const [showViewRecordDialog, setShowViewRecordDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [activeTab, setActiveTab] = useState("list");
  
  const [recordForm, setRecordForm] = useState({
    type: "consultation",
    diagnosis: "",
    notes: "",
    attachments: [] as string[],
  });

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone.includes(searchTerm)
  );

  const getPatientRecords = (patientId: number) => {
    return medicalRecords.filter(r => r.patientId === patientId).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  const handleAddRecord = () => {
    if (selectedPatient) {
      onAddRecord(selectedPatient.id, {
        ...recordForm,
        date: new Date().toISOString().split('T')[0],
        doctorId: 1,
        doctorName: "Dr. Carlos Silva",
      });
      setShowAddRecordDialog(false);
      setRecordForm({ type: "consultation", diagnosis: "", notes: "", attachments: [] });
    }
  };

  const handleViewRecord = (record: MedicalRecord) => {
    setSelectedRecord(record);
    setShowViewRecordDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">Prontuários</h2>
          <p className="text-sm text-slate-500">Histórico médico completo dos pacientes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            Imprimir
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="list">Pacientes</TabsTrigger>
          <TabsTrigger value="recent">Registos Recentes</TabsTrigger>
        </TabsList>

        {/* Patient List Tab */}
        <TabsContent value="list" className="space-y-4 mt-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Pesquisar paciente por nome ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>

          {/* Patients Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPatients.map((patient) => {
              const records = getPatientRecords(patient.id);
              const lastRecord = records[0];
              return (
                <Card key={patient.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setSelectedPatient(patient)}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className={`h-12 w-12 ${getRandomColor(patient.id)} text-white`}>
                        <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-slate-800">{patient.name}</p>
                          <Badge variant="outline" className="text-xs">
                            {records.length} registos
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-500">{patient.age} anos • {patient.bloodType}</p>
                        <p className="text-xs text-slate-400 mt-1">{patient.phone}</p>
                        {lastRecord && (
                          <p className="text-xs text-teal-600 mt-2">
                            Última consulta: {lastRecord.date}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4 pt-3 border-t">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPatient(patient);
                          setShowAddRecordDialog(true);
                        }}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Novo Registo
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPatient(patient);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Recent Records Tab */}
        <TabsContent value="recent" className="space-y-4 mt-4">
          {medicalRecords.slice(0, 10).map((record) => {
            const TypeIcon = recordTypeConfig[record.type]?.icon || FileText;
            const patient = patients.find(p => p.id === record.patientId);
            return (
              <Card key={record.id} className="border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${recordTypeConfig[record.type]?.color || "bg-slate-100"}`}>
                        <TypeIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold">{patient?.name}</p>
                          <Badge className={recordTypeConfig[record.type]?.color}>
                            {recordTypeConfig[record.type]?.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                          <Calendar className="h-3 w-3" />
                          {record.date}
                          <span className="text-slate-300">|</span>
                          <User className="h-3 w-3" />
                          Dr(a). {record.doctorName}
                        </p>
                        <p className="text-sm text-slate-600 mt-1 line-clamp-1">
                          {record.diagnosis}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewRecord(record)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onPrintRecord(record)}>
                        <Printer className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onDownloadRecord(record)}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>

      {/* Patient Records Detail Dialog */}
      <Dialog open={!!selectedPatient && !showAddRecordDialog} onOpenChange={() => setSelectedPatient(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedPatient && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className={`h-12 w-12 ${getRandomColor(selectedPatient.id)} text-white`}>
                    <AvatarFallback className="text-lg">{getInitials(selectedPatient.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div>{selectedPatient.name}</div>
                    <p className="text-sm text-slate-500 font-normal">
                      {selectedPatient.age} anos • {selectedPatient.bloodType} • {selectedPatient.phone}
                    </p>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Patient Medical Summary */}
                <Card className="border-0 bg-slate-50">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      Resumo Clínico
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div><span className="text-slate-500">Alergias:</span> {selectedPatient.allergies || "Nenhuma"}</div>
                      <div><span className="text-slate-500">Condições:</span> {selectedPatient.medicalConditions || "Nenhuma"}</div>
                      <div><span className="text-slate-500">Medicamentos:</span> {selectedPatient.medications || "Nenhum"}</div>
                      <div><span className="text-slate-500">Contacto Emergência:</span> {selectedPatient.emergencyContact || "-"}</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Records Timeline */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <History className="h-4 w-4" />
                    Histórico de Registos
                  </h3>
                  <div className="space-y-3">
                    {getPatientRecords(selectedPatient.id).map((record, idx) => {
                      const TypeIcon = recordTypeConfig[record.type]?.icon || FileText;
                      return (
                        <div key={record.id} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                              <TypeIcon className="h-4 w-4 text-teal-600" />
                            </div>
                            {idx < getPatientRecords(selectedPatient.id).length - 1 && (
                              <div className="w-px h-full bg-slate-200 mt-1" />
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <div>
                                <p className="font-semibold">{record.date}</p>
                                <p className="text-sm text-slate-500">Dr(a). {record.doctorName}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => handleViewRecord(record)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm mt-1">{record.diagnosis}</p>
                            {record.notes && (
                              <p className="text-sm text-slate-500 mt-1">{record.notes}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button onClick={() => setShowAddRecordDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Registo
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Record Dialog */}
      <Dialog open={showAddRecordDialog} onOpenChange={setShowAddRecordDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Novo Registo Médico</DialogTitle>
            <DialogDescription>
              Paciente: <strong>{selectedPatient?.name}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Tipo de Registo</Label>
              <Select value={recordForm.type} onValueChange={(v) => setRecordForm({ ...recordForm, type: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consulta</SelectItem>
                  <SelectItem value="exam">Exame</SelectItem>
                  <SelectItem value="procedure">Procedimento</SelectItem>
                  <SelectItem value="vaccination">Vacinação</SelectItem>
                  <SelectItem value="prescription">Prescrição</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Diagnóstico / Descrição *</Label>
              <Textarea
                value={recordForm.diagnosis}
                onChange={(e) => setRecordForm({ ...recordForm, diagnosis: e.target.value })}
                placeholder="Descreva o diagnóstico ou procedimento..."
                className="min-h-[100px]"
              />
            </div>
            <div>
              <Label>Notas Adicionais</Label>
              <Textarea
                value={recordForm.notes}
                onChange={(e) => setRecordForm({ ...recordForm, notes: e.target.value })}
                placeholder="Observações relevantes..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddRecordDialog(false)}>Cancelar</Button>
            <Button onClick={handleAddRecord}>Salvar Registo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Record Dialog */}
      <Dialog open={showViewRecordDialog} onOpenChange={setShowViewRecordDialog}>
        <DialogContent className="max-w-2xl">
          {selectedRecord && (
            <>
              <DialogHeader>
                <DialogTitle>Detalhes do Registo</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><span className="text-slate-500">Data:</span> {selectedRecord.date}</div>
                  <div><span className="text-slate-500">Médico:</span> Dr(a). {selectedRecord.doctorName}</div>
                  <div><span className="text-slate-500">Tipo:</span> {recordTypeConfig[selectedRecord.type]?.label}</div>
                  <div><span className="text-slate-500">Paciente:</span> {patients.find(p => p.id === selectedRecord.patientId)?.name}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="font-medium mb-2">Diagnóstico</p>
                  <p>{selectedRecord.diagnosis}</p>
                </div>
                {selectedRecord.notes && (
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="font-medium mb-2">Notas</p>
                    <p>{selectedRecord.notes}</p>
                  </div>
                )}
                {selectedRecord.prescription && (
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="font-medium mb-2 flex items-center gap-2">
                      <Pill className="h-4 w-4 text-orange-600" />
                      Prescrição
                    </p>
                    {selectedRecord.prescription.medications.map((med, idx) => (
                      <div key={idx} className="mb-2 pb-2 border-b border-orange-100 last:border-0">
                        <p className="font-medium">{med.name}</p>
                        <p className="text-sm">{med.dosage} - {med.frequency} - {med.duration}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => onPrintRecord(selectedRecord)}>
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimir
                </Button>
                <Button variant="outline" onClick={() => onDownloadRecord(selectedRecord)}>
                  <Download className="h-4 w-4 mr-2" />
                  Baixar PDF
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}