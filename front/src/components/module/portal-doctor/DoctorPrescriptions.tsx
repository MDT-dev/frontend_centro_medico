// components/doctor-portal/DoctorPrescriptions.tsx

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
import { Patient, Prescription, Medication, prescriptionsList } from "./types";
import {
  Pill,
  Search,
  Calendar,
  User,
  Plus,
  Eye,
  Download,
  Printer,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  FileText,
  Send,
  Edit,
  Trash2,
  XCircle,
} from "lucide-react";

interface DoctorPrescriptionsProps {
  patients: Patient[];
  prescriptions: prescriptionsList[];
  onViewPrescription: (prescription: Prescription) => void;
  onCreatePrescription: (patientId: number, prescription: Partial<Prescription>) => void;
  onRenewPrescription: (prescriptionId: number) => void;
  onPrintPrescription: (prescription: Prescription) => void;
  onDownloadPrescription: (prescription: Prescription) => void;
}

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

const getRandomColor = (id: number) => {
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-teal-500'];
  return colors[id % colors.length];
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" /> Ativa</Badge>;
    case "expired":
      return <Badge className="bg-red-100 text-red-700"><AlertCircle className="h-3 w-3 mr-1" /> Expirada</Badge>;
    case "completed":
      return <Badge className="bg-blue-100 text-blue-700"><CheckCircle className="h-3 w-3 mr-1" /> Concluída</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export function DoctorPrescriptions({
  patients,
  prescriptions,
  onViewPrescription,
  onCreatePrescription,
  onRenewPrescription,
  onPrintPrescription,
  onDownloadPrescription,
}: DoctorPrescriptionsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  
  const [medications, setMedications] = useState<Medication[]>([
    { name: "", dosage: "", frequency: "", duration: "", quantity: 1 }
  ]);
  const [instructions, setInstructions] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone.includes(searchTerm)
  );

  const getPatientPrescriptions = (patientId: number) => {
    return prescriptions.filter(p => p.patientId === patientId).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  const handleAddMedication = () => {
    setMedications([...medications, { name: "", dosage: "", frequency: "", duration: "", quantity: 1 }]);
  };

  const handleRemoveMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleMedicationChange = (index: number, field: keyof Medication, value: string | number) => {
    const updated = [...medications];
    updated[index] = { ...updated[index], [field]: value };
    setMedications(updated);
  };

  const handleCreatePrescription = () => {
    if (selectedPatient && medications[0].name) {
      const newPrescription: Partial<Prescription> = {
        patientId: selectedPatient.id,
        patientName: selectedPatient.name,
        date: new Date().toISOString().split('T')[0],
        medications: medications.filter(m => m.name),
        instructions,
        followUpDate,
        status: "active",
      };
      onCreatePrescription(selectedPatient.id, newPrescription);
      setShowCreateDialog(false);
      setMedications([{ name: "", dosage: "", frequency: "", duration: "", quantity: 1 }]);
      setInstructions("");
      setFollowUpDate("");
      setSelectedPatient(null);
    }
  };

  const handleRenew = (prescription: Prescription) => {
    onRenewPrescription(prescription.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">Prescrições</h2>
          <p className="text-sm text-slate-500">Gerencie prescrições de medicamentos</p>
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

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="active">Ativas ({prescriptions.filter(p => p.status === "active").length})</TabsTrigger>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="expired">Expiradas ({prescriptions.filter(p => p.status === "expired").length})</TabsTrigger>
        </TabsList>

        {/* Active Prescriptions */}
        <TabsContent value="active" className="space-y-4 mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Pesquisar por paciente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prescriptions.filter(p => p.status === "active").map((prescription) => {
              const patient = patients.find(p => p.id === prescription.patientId);
              if (!patient) return null;
              if (searchTerm && !patient.name.toLowerCase().includes(searchTerm.toLowerCase())) return null;
              
              return (
                <Card key={prescription.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className={`h-10 w-10 ${getRandomColor(patient.id)} text-white`}>
                          <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{patient.name}</p>
                          <p className="text-xs text-slate-500">{prescription.date}</p>
                        </div>
                      </div>
                      {getStatusBadge(prescription.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      {prescription.medications.slice(0, 2).map((med, idx) => (
                        <div key={idx} className="text-sm">
                          <span className="font-medium">{med.name}</span>
                          <span className="text-slate-500 ml-2">- {med.dosage}</span>
                        </div>
                      ))}
                      {prescription.medications.length > 2 && (
                        <p className="text-xs text-slate-400">+{prescription.medications.length - 2} medicamento(s)</p>
                      )}
                    </div>
                    {prescription.followUpDate && (
                      <div className="flex items-center gap-2 text-sm text-orange-600">
                        <Calendar className="h-3 w-3" />
                        Retorno: {prescription.followUpDate}
                      </div>
                    )}
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => {
                        setSelectedPrescription(prescription);
                        setShowViewDialog(true);
                      }}>
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => handleRenew(prescription)}>
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Renovar
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => onPrintPrescription(prescription)}>
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Button className="w-full" onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Prescrição
          </Button>
        </TabsContent>

        {/* All Prescriptions */}
        <TabsContent value="all" className="space-y-4 mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Pesquisar por paciente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>

          <Card className="border-0 shadow-xl">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Data</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Paciente</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Medicamentos</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                      <th className="text-center py-3 px-4 font-semibold text-sm">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptions.map((prescription) => {
                      const patient = patients.find(p => p.id === prescription.patientId);
                      if (!patient) return null;
                      if (searchTerm && !patient.name.toLowerCase().includes(searchTerm.toLowerCase())) return null;
                      
                      return (
                        <tr key={prescription.id} className="border-t hover:bg-slate-50">
                          <td className="py-3 px-4 text-sm">{prescription.date}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Avatar className={`h-8 w-8 ${getRandomColor(patient.id)} text-white`}>
                                <AvatarFallback className="text-xs">{getInitials(patient.name)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{patient.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {prescription.medications.map(m => m.name).join(", ")}
                          </td>
                          <td className="py-3 px-4">{getStatusBadge(prescription.status)}</td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Button variant="ghost" size="sm" onClick={() => {
                                setSelectedPrescription(prescription);
                                setShowViewDialog(true);
                              }}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => onPrintPrescription(prescription)}>
                                <Printer className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Expired Prescriptions */}
        <TabsContent value="expired" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prescriptions.filter(p => p.status === "expired").map((prescription) => {
              const patient = patients.find(p => p.id === prescription.patientId);
              if (!patient) return null;
              
              return (
                <Card key={prescription.id} className="border-0 shadow-lg opacity-75">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className={`h-10 w-10 ${getRandomColor(patient.id)} text-white`}>
                          <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{patient.name}</p>
                          <p className="text-xs text-slate-500">{prescription.date}</p>
                        </div>
                      </div>
                      {getStatusBadge(prescription.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" variant="outline" className="w-full" onClick={() => handleRenew(prescription)}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Renovar Prescrição
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Prescription Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5 text-orange-600" />
              Nova Prescrição
            </DialogTitle>
            <DialogDescription>
              Selecione o paciente e adicione os medicamentos
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Select Patient */}
            <div>
              <Label>Paciente *</Label>
              <Select onValueChange={(value) => {
                const patient = patients.find(p => p.id.toString() === value);
                setSelectedPatient(patient || null);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar paciente" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map(p => (
                    <SelectItem key={p.id} value={p.id.toString()}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedPatient && (
              <>
                {/* Medications */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label>Medicamentos *</Label>
                    <Button type="button" variant="outline" size="sm" onClick={handleAddMedication}>
                      <Plus className="h-4 w-4 mr-1" />
                      Adicionar
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {medications.map((med, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Medicamento #{idx + 1}</span>
                          {medications.length > 1 && (
                            <Button variant="ghost" size="sm" onClick={() => handleRemoveMedication(idx)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs">Nome do Medicamento</Label>
                            <Input
                              placeholder="Ex: Paracetamol"
                              value={med.name}
                              onChange={(e) => handleMedicationChange(idx, "name", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Dosagem</Label>
                            <Input
                              placeholder="Ex: 500mg"
                              value={med.dosage}
                              onChange={(e) => handleMedicationChange(idx, "dosage", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Frequência</Label>
                            <Input
                              placeholder="Ex: 2x ao dia"
                              value={med.frequency}
                              onChange={(e) => handleMedicationChange(idx, "frequency", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Duração</Label>
                            <Input
                              placeholder="Ex: 7 dias"
                              value={med.duration}
                              onChange={(e) => handleMedicationChange(idx, "duration", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Quantidade</Label>
                            <Input
                              type="number"
                              placeholder="Ex: 20"
                              value={med.quantity}
                              onChange={(e) => handleMedicationChange(idx, "quantity", parseInt(e.target.value))}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <Label>Instruções Adicionais</Label>
                  <Textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Instruções para o paciente..."
                    className="min-h-[80px]"
                  />
                </div>

                {/* Follow-up */}
                <div>
                  <Label>Data de Retorno (opcional)</Label>
                  <Input
                    type="date"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancelar</Button>
                  <Button onClick={handleCreatePrescription} className="bg-orange-600 hover:bg-orange-700">
                    <Send className="h-4 w-4 mr-2" />
                    Emitir Prescrição
                  </Button>
                </DialogFooter>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* View Prescription Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-2xl">
          {selectedPrescription && (
            <>
              <DialogHeader>
                <DialogTitle>Detalhes da Prescrição</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><span className="text-slate-500">Data:</span> {selectedPrescription.date}</div>
                  <div><span className="text-slate-500">Status:</span> {getStatusBadge(selectedPrescription.status??"")}</div>
                  <div className="col-span-2"><span className="text-slate-500">Paciente:</span> {selectedPrescription.patientName}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="font-medium mb-2">Medicamentos</p>
                  <div className="space-y-2">
                    {selectedPrescription.medications.map((med, idx) => (
                      <div key={idx} className="pb-2 border-b border-slate-200 last:border-0">
                        <p className="font-medium">{med.name}</p>
                        <p className="text-sm text-slate-600">{med.dosage} - {med.frequency} - {med.duration}</p>
                        <p className="text-sm text-slate-500">Quantidade: {med.quantity} unidades</p>
                      </div>
                    ))}
                  </div>
                </div>
                {selectedPrescription.instructions && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="font-medium mb-2">Instruções</p>
                    <p>{selectedPrescription.instructions}</p>
                  </div>
                )}
                {selectedPrescription.followUpDate && (
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="font-medium">Data de Retorno Sugerida</p>
                    <p>{selectedPrescription.followUpDate}</p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => onPrintPrescription(selectedPrescription)}>
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimir
                </Button>
                <Button variant="outline" onClick={() => onDownloadPrescription(selectedPrescription)}>
                  <Download className="h-4 w-4 mr-2" />
                  Baixar PDF
                </Button>
                {selectedPrescription.status === "expired" && (
                  <Button onClick={() => handleRenew(selectedPrescription)}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Renovar
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}