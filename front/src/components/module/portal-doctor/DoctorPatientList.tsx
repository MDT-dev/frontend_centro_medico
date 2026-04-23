// components/doctor-portal/DoctorPatientList.tsx

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Patient, MedicalRecord } from "./types";
import {
  Search,
  UserPlus,
  Phone,
  Mail,
  Calendar,
  Eye,
  FileText,
  Activity,
  Plus,
} from "lucide-react";

interface DoctorPatientListProps {
  patients: Patient[];
  onViewPatient: (patient: Patient) => void;
  onAddPatient: () => void;
  onNewAppointment: (patient: Patient) => void;
}

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

const getRandomColor = (id: number) => {
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-teal-500'];
  return colors[id % colors.length];
};

export function DoctorPatientList({
  patients,
  onViewPatient,
  onAddPatient,
  onNewAppointment,
}: DoctorPatientListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone.includes(searchTerm) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">Meus Pacientes</h2>
          <p className="text-sm text-slate-500">Gerencie todos os seus pacientes</p>
        </div>
        <Button onClick={onAddPatient}>
          <UserPlus className="h-4 w-4 mr-2" />
          Novo Paciente
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Pesquisar por nome, telefone ou email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white"
        />
      </div>

      {/* Patients Table */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-white rounded-t-xl">
          <CardTitle className="flex items-center justify-between">
            <span>Lista de Pacientes</span>
            <span className="text-sm font-normal text-slate-500">
              {filteredPatients.length} pacientes
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold">Paciente</TableHead>
                  <TableHead className="font-semibold">Contacto</TableHead>
                  <TableHead className="font-semibold">Idade</TableHead>
                  <TableHead className="font-semibold">Tipo Sanguíneo</TableHead>
                  <TableHead className="font-semibold">Última Visita</TableHead>
                  <TableHead className="font-semibold text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id} className="hover:bg-slate-50 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className={`h-10 w-10 ${getRandomColor(patient.id)} text-white`}>
                          <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-slate-800">{patient.name}</p>
                          <p className="text-xs text-slate-400">ID: {patient.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3 text-slate-400" />
                          <span>{patient.phone}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3 text-slate-400" />
                          <span className="text-xs">{patient.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{patient.age} anos</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-50 text-red-600">
                        {patient.bloodType}
                      </Badge>
                    </TableCell>
                    <TableCell>{patient.lastVisit || "Nunca"}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewPatient(patient)}
                        >
                          <Eye className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onNewAppointment(patient)}
                        >
                          <Calendar className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 text-purple-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}