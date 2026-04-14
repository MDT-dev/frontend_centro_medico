// components/patient-portal/Prescriptions.tsx

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Prescription, Medication } from "./types";
import {
  Pill,
  Download,
  Printer,
  Eye,
  Calendar,
  User,
  Clock,
  AlertCircle,
  CheckCircle,
  FileText,
} from "lucide-react";

interface PrescriptionsProps {
  prescriptions: Prescription[];
  onDownloadPrescription: (prescription: Prescription) => void;
  onPrintPrescription: (prescription: Prescription) => void;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" /> Ativa</Badge>;
    case "completed":
      return <Badge className="bg-blue-100 text-blue-700"><CheckCircle className="h-3 w-3 mr-1" /> Concluída</Badge>;
    case "expired":
      return <Badge className="bg-red-100 text-red-700"><AlertCircle className="h-3 w-3 mr-1" /> Expirada</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export function Prescriptions({
  prescriptions,
  onDownloadPrescription,
  onPrintPrescription,
}: PrescriptionsProps) {
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const activePrescriptions = prescriptions.filter(p => p.status === "active");
  const pastPrescriptions = prescriptions.filter(p => p.status !== "active");

  const handleViewDetails = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-800">Minhas Prescrições</h2>
        <p className="text-sm text-slate-500">Medicamentos e recomendações médicas</p>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="active">Ativas ({activePrescriptions.length})</TabsTrigger>
          <TabsTrigger value="past">Histórico ({pastPrescriptions.length})</TabsTrigger>
        </TabsList>

        {/* Active Prescriptions */}
        <TabsContent value="active" className="space-y-4 mt-4">
          {activePrescriptions.length > 0 ? (
            activePrescriptions.map((prescription) => (
              <Card key={prescription.id} className="border-0 shadow-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                      <Pill className="h-5 w-5 text-orange-600" />
                      Prescrição #{prescription.id}
                    </CardTitle>
                    {getStatusBadge(prescription.status)}
                  </div>
                  <CardDescription className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      Dr(a). {prescription.doctor}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {prescription.date}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-3">
                    {prescription.medications.map((med, idx) => (
                      <div key={idx} className="p-3 md:p-4 bg-slate-50 rounded-lg">
                        <p className="font-semibold text-base md:text-lg">{med.name}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2 text-sm">
                          <div>
                            <span className="text-slate-500">Dosagem:</span>
                            <p className="font-medium">{med.dosage}</p>
                          </div>
                          <div>
                            <span className="text-slate-500">Frequência:</span>
                            <p className="font-medium">{med.frequency}</p>
                          </div>
                          <div>
                            <span className="text-slate-500">Duração:</span>
                            <p className="font-medium">{med.duration}</p>
                          </div>
                        </div>
                        {med.instructions && (
                          <p className="text-sm text-slate-600 mt-2">
                            <span className="font-medium">Instruções:</span> {med.instructions}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(prescription)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalhes
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onDownloadPrescription(prescription)}>
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onPrintPrescription(prescription)}>
                      <Printer className="h-4 w-4 mr-2" />
                      Imprimir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-0 shadow-lg">
              <CardContent className="py-12 text-center">
                <Pill className="h-12 w-12 mx-auto text-slate-300 mb-3" />
                <p className="text-slate-500">Nenhuma prescrição ativa</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Past Prescriptions */}
        <TabsContent value="past" className="space-y-4 mt-4">
          {pastPrescriptions.length > 0 ? (
            pastPrescriptions.map((prescription) => (
              <Card key={prescription.id} className="border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="font-semibold">Prescrição #{prescription.id}</p>
                      <p className="text-sm text-slate-500">
                        Dr(a). {prescription.doctor} • {prescription.date}
                      </p>
                      <p className="text-sm mt-1">
                        {prescription.medications.length} medicamento(s)
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(prescription.status)}
                      <Button variant="ghost" size="sm" onClick={() => handleViewDetails(prescription)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-0 shadow-lg">
              <CardContent className="py-12 text-center">
                <p className="text-slate-500">Nenhum histórico de prescrições</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Prescription Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedPrescription && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-orange-600" />
                  Detalhes da Prescrição
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-slate-500">Médico:</span>
                      <p className="font-medium">Dr(a). {selectedPrescription.doctor}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Data:</span>
                      <p className="font-medium">{selectedPrescription.date}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Status:</span>
                      <div>{getStatusBadge(selectedPrescription.status)}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Medicamentos Prescritos</h3>
                  <div className="space-y-3">
                    {selectedPrescription.medications.map((med, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-lg">
                        <p className="font-semibold text-lg">{med.name}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                          <div>
                            <span className="text-slate-500 text-sm">Dosagem</span>
                            <p>{med.dosage}</p>
                          </div>
                          <div>
                            <span className="text-slate-500 text-sm">Frequência</span>
                            <p>{med.frequency}</p>
                          </div>
                          <div>
                            <span className="text-slate-500 text-sm">Duração</span>
                            <p>{med.duration}</p>
                          </div>
                        </div>
                        {med.instructions && (
                          <p className="text-sm text-slate-600 mt-2">
                            <span className="font-medium">Instruções:</span> {med.instructions}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => onDownloadPrescription(selectedPrescription)}>
                  <Download className="h-4 w-4 mr-2" />
                  Baixar PDF
                </Button>
                <Button variant="outline" onClick={() => onPrintPrescription(selectedPrescription)}>
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimir
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}