"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
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

import {
  Calendar,
  Clock,
  Stethoscope,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  AlertCircle,
  Video,
  MessageSquare,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  Printer,
  Plus,
  ChevronLeft,
  ChevronRight,
  Users,
  Pill,
  Syringe,
  Heart,
  Thermometer,
  Activity,
  Scissors,
  Microscope,
  Ambulance,
  Baby,
  Briefcase,
  CalendarDays,
  List,
  Grid3x3,
  Bell,
  RefreshCw,
  Wallet,
} from "lucide-react";
import { useFaturamentoConsultas } from "@/hooks/useFaturamentoConsultas";
import { ItemFaturaConsulta } from "@/types/faturamento.types";
import { FaturamentoConsultaModal } from "./FaturamentoConsultaModal";
import { FaturaConsultaModal } from "./FaturaConsultaModal";
import { FechoDiaConsolidadoModal } from "./FechoDiaConsolidadoModal";

// Tipos de consulta
type AppointmentStatus = "scheduled" | "confirmed" | "in_progress" | "completed" | "cancelled" | "no_show";
type AppointmentType = "consultation" | "follow_up" | "emergency" | "exam" | "vaccination" | "procedure";

interface Appointment {
  id: number;
  patientId: number;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  doctorId: number;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  time: string;
  duration: number;
  type: AppointmentType;
  status: AppointmentStatus;
  reason: string;
  symptoms?: string;
  diagnosis?: string;
  prescription?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

// Dados estáticos
const initialAppointments: Appointment[] = [
  {
    id: 1,
    patientId: 1,
    patientName: "Maria Celeste dos Santos",
    patientPhone: "+244 923 456 789",
    patientEmail: "maria.santos@email.com",
    doctorId: 1,
    doctorName: "Dr. Carlos Alberto Silva",
    doctorSpecialty: "Clínica Geral",
    date: "2026-04-10",
    time: "09:00",
    duration: 30,
    type: "consultation",
    status: "scheduled",
    reason: "Dor de cabeça persistente há 3 dias",
    symptoms: "Dor latejante na região frontal, sensibilidade à luz",
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
    doctorSpecialty: "Clínica Geral",
    date: "2026-04-10",
    time: "10:00",
    duration: 30,
    type: "follow_up",
    status: "confirmed",
    reason: "Acompanhamento diabetes - exames de rotina",
    diagnosis: "Glicemia controlada, manter medicação",
    prescription: "Metformina 850mg - 2x ao dia",
    createdAt: "2026-04-01T14:20:00",
  },
  {
    id: 3,
    patientId: 3,
    patientName: "Ana Beatriz Silva",
    patientPhone: "+244 934 567 890",
    patientEmail: "ana.silva@email.com",
    doctorId: 2,
    doctorName: "Dra. Ana Beatriz Oliveira",
    doctorSpecialty: "Pediatria",
    date: "2026-04-10",
    time: "11:30",
    duration: 45,
    type: "consultation",
    status: "in_progress",
    reason: "Tosse e febre na criança",
    symptoms: "Tosse seca, febre 38.5°C, falta de apetite",
    createdAt: "2026-04-08T09:15:00",
  },
  {
    id: 4,
    patientId: 4,
    patientName: "António Paulo Mendes",
    patientPhone: "+244 945 678 901",
    patientEmail: "antonio.mendes@email.com",
    doctorId: 1,
    doctorName: "Dr. Carlos Alberto Silva",
    doctorSpecialty: "Clínica Geral",
    date: "2026-04-11",
    time: "14:00",
    duration: 30,
    type: "consultation",
    status: "scheduled",
    reason: "Dores nas articulações",
    symptoms: "Dor nos joelhos e mãos, piora pela manhã",
    createdAt: "2026-04-09T11:00:00",
  },
  {
    id: 5,
    patientId: 5,
    patientName: "Isabel Cristina Lopes",
    patientPhone: "+244 956 789 012",
    patientEmail: "isabel.lopes@email.com",
    doctorId: 2,
    doctorName: "Dra. Ana Beatriz Oliveira",
    doctorSpecialty: "Pediatria",
    date: "2026-04-11",
    time: "15:30",
    duration: 30,
    type: "vaccination",
    status: "scheduled",
    reason: "Vacinação de rotina - Febre Amarela",
    createdAt: "2026-04-07T16:45:00",
  },
  {
    id: 6,
    patientId: 1,
    patientName: "Maria Celeste dos Santos",
    patientPhone: "+244 923 456 789",
    patientEmail: "maria.santos@email.com",
    doctorId: 2,
    doctorName: "Dra. Ana Beatriz Oliveira",
    doctorSpecialty: "Pediatria",
    date: "2026-04-09",
    time: "16:00",
    duration: 30,
    type: "consultation",
    status: "completed",
    reason: "Consulta de rotina",
    diagnosis: "Paciente saudável",
    notes: "Exames em dia, sem queixas",
    createdAt: "2026-03-25T09:00:00",
  },
  {
    id: 7,
    patientId: 3,
    patientName: "Ana Beatriz Silva",
    patientPhone: "+244 934 567 890",
    patientEmail: "ana.silva@email.com",
    doctorId: 1,
    doctorName: "Dr. Carlos Alberto Silva",
    doctorSpecialty: "Clínica Geral",
    date: "2026-04-08",
    time: "09:30",
    duration: 30,
    type: "emergency",
    status: "completed",
    reason: "Reação alérgica",
    diagnosis: "Alergia a frutos do mar",
    prescription: "Anti-histamínico por 5 dias",
    createdAt: "2026-04-08T08:00:00",
  },
  {
    id: 8,
    patientId: 4,
    patientName: "António Paulo Mendes",
    patientPhone: "+244 945 678 901",
    patientEmail: "antonio.mendes@email.com",
    doctorId: 2,
    doctorName: "Dra. Ana Beatriz Oliveira",
    doctorSpecialty: "Pediatria",
    date: "2026-04-07",
    time: "10:00",
    duration: 30,
    type: "consultation",
    status: "cancelled",
    reason: "Paciente cancelou por motivo de saúde",
    createdAt: "2026-04-01T13:30:00",
  },
];

const doctors = [
  { id: 1, name: "Dr. Carlos Alberto Silva", specialty: "Clínica Geral", avatar: "CS" },
  { id: 2, name: "Dra. Ana Beatriz Oliveira", specialty: "Pediatria", avatar: "AO" },
  { id: 3, name: "Dr. Miguel Santos", specialty: "Cardiologia", avatar: "MS" },
  { id: 4, name: "Dra. Paula Lima", specialty: "Dermatologia", avatar: "PL" },
];

const patients = [
  { id: 1, name: "Maria Celeste dos Santos", phone: "+244 923 456 789" },
  { id: 2, name: "João Manuel Fernandes", phone: "+244 912 345 678" },
  { id: 3, name: "Ana Beatriz Silva", phone: "+244 934 567 890" },
  { id: 4, name: "António Paulo Mendes", phone: "+244 945 678 901" },
  { id: 5, name: "Isabel Cristina Lopes", phone: "+244 956 789 012" },
];

const statusConfig: Record<AppointmentStatus, { label: string; color: string; icon: any }> = {
  scheduled: { label: "Agendada", color: "bg-blue-100 text-blue-700", icon: Calendar },
  confirmed: { label: "Confirmada", color: "bg-green-100 text-green-700", icon: CheckCircle },
  in_progress: { label: "Em Atendimento", color: "bg-yellow-100 text-yellow-700", icon: Activity },
  completed: { label: "Concluída", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle },
  cancelled: { label: "Cancelada", color: "bg-red-100 text-red-700", icon: XCircle },
  no_show: { label: "Não Compareceu", color: "bg-gray-100 text-gray-700", icon: XCircle },
};

const typeConfig: Record<AppointmentType, { label: string; color: string; icon: any }> = {
  consultation: { label: "Consulta", color: "bg-indigo-100 text-indigo-700", icon: Stethoscope },
  follow_up: { label: "Retorno", color: "bg-purple-100 text-purple-700", icon: RefreshCw },
  emergency: { label: "Emergência", color: "bg-red-100 text-red-700", icon: Ambulance },
  exam: { label: "Exame", color: "bg-teal-100 text-teal-700", icon: Microscope },
  vaccination: { label: "Vacina", color: "bg-green-100 text-green-700", icon: Syringe },
  procedure: { label: "Procedimento", color: "bg-pink-100 text-pink-700", icon: Scissors },
};

export function ConsultasPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [doctorFilter, setDoctorFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("today");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [activeTab, setActiveTab] = useState("agenda");


  const [showFaturamentoDialog, setShowFaturamentoDialog] = useState(false);
  const [showFaturaDialog, setShowFaturaDialog] = useState(false);
  const [showFechoConsolidadoDialog, setShowFechoConsolidadoDialog] = useState(false);
  const [consultaParaFaturar, setConsultaParaFaturar] = useState<any>(null);
  const [faturaEmitida, setFaturaEmitida] = useState<any>(null);

  const {
    emitirFaturaConsulta,
    getFaturaByConsultaId,
    getResumoConsultasDia,
    faturasConsultas
  } = useFaturamentoConsultas();


  // Form state
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    duration: "30",
    type: "consultation",
    reason: "",
    symptoms: "",
  });

  // Clinical notes form
  const [clinicalData, setClinicalData] = useState({
    diagnosis: "",
    prescription: "",
    notes: "",
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getRandomColor = (id: number) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-teal-500'];
    return colors[id % colors.length];
  };

  // Filter appointments
  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
    const matchesDoctor = doctorFilter === "all" || apt.doctorId.toString() === doctorFilter;

    let matchesDate = true;
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const weekStart = new Date(Date.now() - new Date().getDay() * 86400000).toISOString().split('T')[0];
    const weekEnd = new Date(Date.now() + (6 - new Date().getDay()) * 86400000).toISOString().split('T')[0];

    if (dateFilter === "today") matchesDate = apt.date === today;
    else if (dateFilter === "tomorrow") matchesDate = apt.date === tomorrow;
    else if (dateFilter === "week") matchesDate = apt.date >= weekStart && apt.date <= weekEnd;

    return matchesSearch && matchesStatus && matchesDoctor && matchesDate;
  });

  // Stats
  const stats = {
    today: appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length,
    scheduled: appointments.filter(a => a.status === "scheduled").length,
    completed: appointments.filter(a => a.status === "completed").length,
    cancelled: appointments.filter(a => a.status === "cancelled").length,
    inProgress: appointments.filter(a => a.status === "in_progress").length,
  };

  const handleAddAppointment = () => {
    const patient = patients.find(p => p.id.toString() === formData.patientId);
    const doctor = doctors.find(d => d.id.toString() === formData.doctorId);

    const newAppointment: Appointment = {
      id: appointments.length + 1,
      patientId: parseInt(formData.patientId),
      patientName: patient?.name || "",
      patientPhone: patient?.phone || "",
      patientEmail: "",
      doctorId: parseInt(formData.doctorId),
      doctorName: doctor?.name || "",
      doctorSpecialty: doctor?.specialty || "",
      date: formData.date,
      time: formData.time,
      duration: parseInt(formData.duration),
      type: formData.type as AppointmentType,
      status: "scheduled",
      reason: formData.reason,
      symptoms: formData.symptoms,
      createdAt: new Date().toISOString(),
    };
    setAppointments([...appointments, newAppointment]);
    setShowAddDialog(false);
    setFormData({ patientId: "", doctorId: "", date: "", time: "", duration: "30", type: "consultation", reason: "", symptoms: "" });
  };

  const handleCancelAppointment = () => {
    if (selectedAppointment) {
      setAppointments(appointments.map(a =>
        a.id === selectedAppointment.id ? { ...a, status: "cancelled", updatedAt: new Date().toISOString() } : a
      ));
      setShowCancelDialog(false);
      setSelectedAppointment(null);
    }
  };

  const handleStartAppointment = (appointment: Appointment) => {
    setAppointments(appointments.map(a =>
      a.id === appointment.id ? { ...a, status: "in_progress" } : a
    ));
  };

  // Group appointments by time for calendar view
  const timeSlots = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];

  const appointmentsByTime = timeSlots.map(slot => ({
    time: slot,
    appointments: filteredAppointments.filter(a => a.time === slot)
  }));

  // Adicionar função para buscar dados do fecho consolidado
  const getDadosFechoConsolidado = () => {
    const resumoConsultas = getResumoConsultasDia();
    // Buscar dados da farmácia do localStorage
    const storedFaturasFarmacia = localStorage.getItem('farmacia_faturas');
    const faturasFarmacia = storedFaturasFarmacia ? JSON.parse(storedFaturasFarmacia) : [];
    const faturasFarmaciaHoje = faturasFarmacia.filter((f: any) =>
      new Date(f.data).toDateString() === new Date().toDateString()
    );

    const totalFarmacia = faturasFarmaciaHoje.reduce((acc: number, f: any) => acc + f.total, 0);
    const porPagamentoFarmacia = {
      dinheiro: faturasFarmaciaHoje.filter((f: any) => f.formaPagamento === 'dinheiro').reduce((acc: number, f: any) => acc + f.total, 0),
      multicaixa: faturasFarmaciaHoje.filter((f: any) => f.formaPagamento === 'multicaixa').reduce((acc: number, f: any) => acc + f.total, 0),
      transferencia: faturasFarmaciaHoje.filter((f: any) => f.formaPagamento === 'transferencia').reduce((acc: number, f: any) => acc + f.total, 0),
      seguro: faturasFarmaciaHoje.filter((f: any) => f.formaPagamento === 'seguro').reduce((acc: number, f: any) => acc + f.total, 0),
    };

    return {
      data: new Date(),
      consultas: {
        total: resumoConsultas.total,
        quantidade: resumoConsultas.quantidade,
        porMedico: resumoConsultas.porMedico,
        porEspecialidade: resumoConsultas.porEspecialidade,
      },
      farmacia: {
        total: totalFarmacia,
        quantidade: faturasFarmaciaHoje.length,
        porPagamento: porPagamentoFarmacia,
      },
      totalGeral: resumoConsultas.total + totalFarmacia,
      quantidadeTotal: resumoConsultas.quantidade + faturasFarmaciaHoje.length,
    };
  };

  
  // MANTER ESTA FUNÇÃO (linhas ~506-518)
  const handleCompleteAppointment = (appointment: Appointment) => {
    const faturaExistente = getFaturaByConsultaId(appointment.id);
    if (faturaExistente) {
      setFaturaEmitida(faturaExistente);
      setShowFaturaDialog(true);
    } else {
      setConsultaParaFaturar(appointment);
      setShowFaturamentoDialog(true);
    }
  };

  // Função para confirmar faturamento
  const handleConfirmarFaturamento = (dados: {
    items: ItemFaturaConsulta[];
    formaPagamento: 'dinheiro' | 'multicaixa' | 'transferencia' | 'seguro';
    desconto: number;
    observacoes: string;
  }) => {
    if (consultaParaFaturar) {
      const fatura = emitirFaturaConsulta({
        consultaId: consultaParaFaturar.id,
        pacienteId: consultaParaFaturar.patientId,
        pacienteNome: consultaParaFaturar.patientName,
        pacienteNif: undefined,
        medicoNome: consultaParaFaturar.doctorName,
        medicoEspecialidade: consultaParaFaturar.doctorSpecialty,
        items: dados.items,
        formaPagamento: dados.formaPagamento,
        desconto: dados.desconto,
        observacoes: dados.observacoes,
      });

      // Atualizar status da consulta para completed
      setAppointments(appointments.map(a =>
        a.id === consultaParaFaturar.id
          ? {
            ...a,
            status: "completed",
            updatedAt: new Date().toISOString(),
            diagnosis: dados.items.find(i => i.tipo === 'consulta')?.descricao || 'Consulta realizada'
          }
          : a
      ));

      setFaturaEmitida(fatura);
      setShowFaturamentoDialog(false);
      setShowFaturaDialog(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">

      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-xl shadow-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-700 to-blue-800 bg-clip-text text-transparent">
                  Gestão de Consultas
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Agende, gerencie e acompanhe todas as consultas médicas
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="gap-2" onClick={() => setViewMode(viewMode === "list" ? "calendar" : "list")}>
              {viewMode === "list" ? <Grid3x3 className="h-4 w-4" /> : <List className="h-4 w-4" />}
              {viewMode === "list" ? "Calendário" : "Lista"}
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            <Button variant="outline" className="gap-2">
              <Printer className="h-4 w-4" />
              Imprimir
            </Button>
            <Button className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 gap-2 shadow-lg" onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4" />
              Nova Consulta
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setShowFechoConsolidadoDialog(true)}
            >
              <Wallet className="h-4 w-4" />
              Fecho Consolidado
            </Button>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-700 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-90">Consultas Hoje</p>
                  <p className="text-2xl font-bold">{stats.today}</p>
                </div>
                <Calendar className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500 to-orange-600 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-90">Agendadas</p>
                  <p className="text-2xl font-bold">{stats.scheduled}</p>
                </div>
                <CalendarDays className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-700 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-90">Concluídas</p>
                  <p className="text-2xl font-bold">{stats.completed}</p>
                </div>
                <CheckCircle className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Em Atendimento</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
                </div>
                <Activity className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Canceladas</p>
                  <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* TABS */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-white shadow-sm">
            <TabsTrigger value="agenda" className="gap-2">
              <Calendar className="h-4 w-4" />
              Agenda
            </TabsTrigger>
            <TabsTrigger value="pacientes" className="gap-2">
              <Users className="h-4 w-4" />
              Pacientes do Dia
            </TabsTrigger>
            <TabsTrigger value="relatorios" className="gap-2">
              <FileText className="h-4 w-4" />
              Relatórios
            </TabsTrigger>
          </TabsList>

          {/* TAB AGENDA */}
          <TabsContent value="agenda" className="space-y-4">
            {/* FILTERS */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Pesquisar por paciente, médico ou motivo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-slate-200 focus:border-cyan-300"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px] bg-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="scheduled">Agendadas</SelectItem>
                  <SelectItem value="confirmed">Confirmadas</SelectItem>
                  <SelectItem value="in_progress">Em Atendimento</SelectItem>
                  <SelectItem value="completed">Concluídas</SelectItem>
                  <SelectItem value="cancelled">Canceladas</SelectItem>
                </SelectContent>
              </Select>
              <Select value={doctorFilter} onValueChange={setDoctorFilter}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Médico" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os médicos</SelectItem>
                  {doctors.map(d => (
                    <SelectItem key={d.id} value={d.id.toString()}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[130px] bg-white">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="tomorrow">Amanhã</SelectItem>
                  <SelectItem value="week">Esta semana</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* VIEW MODE */}
            {viewMode === "list" ? (
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-white rounded-t-xl">
                  <CardTitle className="flex items-center justify-between">
                    <span>Lista de Consultas</span>
                    <span className="text-sm font-normal text-slate-500">
                      {filteredAppointments.length} consultas encontradas
                    </span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-50">
                          <TableHead className="font-semibold">Data/Hora</TableHead>
                          <TableHead className="font-semibold">Paciente</TableHead>
                          <TableHead className="font-semibold">Médico</TableHead>
                          <TableHead className="font-semibold">Tipo</TableHead>
                          <TableHead className="font-semibold">Motivo</TableHead>
                          <TableHead className="font-semibold">Status</TableHead>
                          <TableHead className="font-semibold text-center">Ações</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {filteredAppointments.map((apt) => {
                          const StatusIcon = statusConfig[apt.status].icon;
                          const TypeIcon = typeConfig[apt.type].icon;
                          return (
                            <TableRow key={apt.id} className="hover:bg-slate-50 transition-colors">
                              <TableCell>
                                <div>
                                  <p className="font-medium">{apt.date}</p>
                                  <p className="text-sm text-slate-500 flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {apt.time}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar className={`h-8 w-8 ${getRandomColor(apt.patientId)} text-white`}>
                                    <AvatarFallback className="text-xs">{getInitials(apt.patientName)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium text-sm">{apt.patientName}</p>
                                    <p className="text-xs text-slate-400">{apt.patientPhone}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="text-sm font-medium">{apt.doctorName}</p>
                                  <p className="text-xs text-slate-400">{apt.doctorSpecialty}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={`${typeConfig[apt.type].color} border-0 gap-1`}>
                                  <TypeIcon className="h-3 w-3" />
                                  {typeConfig[apt.type].label}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <p className="text-sm line-clamp-1">{apt.reason}</p>
                              </TableCell>
                              <TableCell>
                                <Badge className={`${statusConfig[apt.status].color} border-0 gap-1`}>
                                  <StatusIcon className="h-3 w-3" />
                                  {statusConfig[apt.status].label}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center justify-center gap-1">
                                  <Button variant="ghost" size="sm" onClick={() => {
                                    setSelectedAppointment(apt);
                                    setShowViewDialog(true);
                                  }}>
                                    <Eye className="h-4 w-4 text-blue-500" />
                                  </Button>
                                  {apt.status === "scheduled" && (
                                    <Button variant="ghost" size="sm" onClick={() => handleStartAppointment(apt)}>
                                      <Activity className="h-4 w-4 text-green-500" />
                                    </Button>
                                  )}
                                  {apt.status === "in_progress" && (
                                    <Button variant="ghost" size="sm" onClick={() => {
                                      setSelectedAppointment(apt);
                                      setShowCompleteDialog(true);
                                    }}>
                                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                                    </Button>
                                  )}
                                  {(apt.status === "scheduled" || apt.status === "confirmed") && (
                                    <Button variant="ghost" size="sm" onClick={() => {
                                      setSelectedAppointment(apt);
                                      setShowCancelDialog(true);
                                    }}>
                                      <XCircle className="h-4 w-4 text-red-500" />
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar */}
                <Card className="border-0 shadow-xl lg:col-span-1">
                  <CardContent className="p-4">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>

                {/* Appointments for selected date */}
                <Card className="border-0 shadow-xl lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Consultas para {selectedDate.toLocaleDateString('pt-PT')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {appointments.filter(a => a.date === selectedDate.toISOString().split('T')[0]).map((apt) => (
                        <div key={apt.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="text-center min-w-[60px]">
                              <p className="font-bold text-lg">{apt.time}</p>
                              <p className="text-xs text-slate-400">{apt.duration}min</p>
                            </div>
                            <div>
                              <p className="font-medium">{apt.patientName}</p>
                              <p className="text-sm text-slate-500">{apt.doctorName}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={statusConfig[apt.status].color}>
                              {statusConfig[apt.status].label}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      {appointments.filter(a => a.date === selectedDate.toISOString().split('T')[0]).length === 0 && (
                        <p className="text-center text-slate-500 py-8">Nenhuma consulta agendada para esta data</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* TAB PACIENTES DO DIA */}
          <TabsContent value="pacientes" className="space-y-4">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Pacientes Agendados para Hoje</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).map((apt) => (
                    <div key={apt.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <Avatar className={`h-12 w-12 ${getRandomColor(apt.patientId)} text-white`}>
                          <AvatarFallback>{getInitials(apt.patientName)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-lg">{apt.patientName}</p>
                          <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {apt.patientPhone}</span>
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {apt.time}</span>
                            <span className="flex items-center gap-1"><Stethoscope className="h-3 w-3" /> {apt.doctorName}</span>
                          </div>
                          <p className="text-sm text-slate-600 mt-2"><span className="font-medium">Motivo:</span> {apt.reason}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {apt.status === "scheduled" && (
                          <Button size="sm" onClick={() => handleStartAppointment(apt)}>
                            <Activity className="h-4 w-4 mr-2" />
                            Iniciar
                          </Button>
                        )}
                        {apt.status === "in_progress" && (
                          <Button size="sm" className="bg-emerald-600" onClick={() => {
                            setSelectedAppointment(apt);
                            setShowCompleteDialog(true);
                          }}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Concluir
                          </Button>
                        )}
                        <Badge className={statusConfig[apt.status].color}>
                          {statusConfig[apt.status].label}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length === 0 && (
                    <p className="text-center text-slate-500 py-8">Nenhum paciente agendado para hoje</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB RELATÓRIOS */}
          <TabsContent value="relatorios" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Consultas por Médico</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {doctors.map(doc => {
                      const count = appointments.filter(a => a.doctorId === doc.id).length;
                      return (
                        <div key={doc.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 bg-blue-500 text-white">
                              <AvatarFallback>{doc.avatar}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{doc.name}</span>
                          </div>
                          <Badge className="bg-blue-100 text-blue-700">{count} consultas</Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Consultas por Tipo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(typeConfig).map(([key, config]) => {
                      const count = appointments.filter(a => a.type === key).length;
                      return (
                        <div key={key} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <config.icon className="h-4 w-4" />
                            <span>{config.label}</span>
                          </div>
                          <Badge className={config.color}>{count}</Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl md:col-span-2">
                <CardHeader>
                  <CardTitle>Resumo Mensal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-slate-500 text-sm">Total Consultas</p>
                      <p className="text-2xl font-bold text-blue-600">{appointments.length}</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-slate-500 text-sm">Concluídas</p>
                      <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <p className="text-slate-500 text-sm">Taxa de Ocupação</p>
                      <p className="text-2xl font-bold text-yellow-600">{Math.round((stats.completed / appointments.length) * 100)}%</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-slate-500 text-sm">Média Diária</p>
                      <p className="text-2xl font-bold text-purple-600">{Math.round(appointments.length / 30)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* ADD APPOINTMENT DIALOG */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-cyan-600" />
              Nova Consulta
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Paciente *</Label>
              <Select value={formData.patientId} onValueChange={(v) => setFormData({ ...formData, patientId: v })}>
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
            <div>
              <Label>Médico *</Label>
              <Select value={formData.doctorId} onValueChange={(v) => setFormData({ ...formData, doctorId: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar médico" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map(d => (
                    <SelectItem key={d.id} value={d.id.toString()}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Data *</Label>
              <Input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
            </div>
            <div>
              <Label>Hora *</Label>
              <Input type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
            </div>
            <div>
              <Label>Duração (min)</Label>
              <Select value={formData.duration} onValueChange={(v) => setFormData({ ...formData, duration: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 min</SelectItem>
                  <SelectItem value="30">30 min</SelectItem>
                  <SelectItem value="45">45 min</SelectItem>
                  <SelectItem value="60">60 min</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Tipo de Consulta</Label>
              <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consulta</SelectItem>
                  <SelectItem value="follow_up">Retorno</SelectItem>
                  <SelectItem value="emergency">Emergência</SelectItem>
                  <SelectItem value="exam">Exame</SelectItem>
                  <SelectItem value="vaccination">Vacina</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label>Motivo da Consulta *</Label>
              <Textarea value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <Label>Sintomas (opcional)</Label>
              <Textarea value={formData.symptoms} onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancelar</Button>
            <Button onClick={handleAddAppointment}>Agendar Consulta</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* VIEW APPOINTMENT DIALOG */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="sm:max-w-2xl">
          {selectedAppointment && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-blue-500" />
                  Detalhes da Consulta
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><span className="text-slate-500">Paciente:</span> <strong>{selectedAppointment.patientName}</strong></div>
                  <div><span className="text-slate-500">Telefone:</span> {selectedAppointment.patientPhone}</div>
                  <div><span className="text-slate-500">Médico:</span> {selectedAppointment.doctorName}</div>
                  <div><span className="text-slate-500">Especialidade:</span> {selectedAppointment.doctorSpecialty}</div>
                  <div><span className="text-slate-500">Data:</span> {selectedAppointment.date}</div>
                  <div><span className="text-slate-500">Hora:</span> {selectedAppointment.time}</div>
                  <div><span className="text-slate-500">Tipo:</span> {typeConfig[selectedAppointment.type].label}</div>
                  <div><span className="text-slate-500">Status:</span> {statusConfig[selectedAppointment.status].label}</div>
                  <div className="col-span-2"><span className="text-slate-500">Motivo:</span> {selectedAppointment.reason}</div>
                  {selectedAppointment.symptoms && <div className="col-span-2"><span className="text-slate-500">Sintomas:</span> {selectedAppointment.symptoms}</div>}
                  {selectedAppointment.diagnosis && <div className="col-span-2"><span className="text-slate-500">Diagnóstico:</span> {selectedAppointment.diagnosis}</div>}
                  {selectedAppointment.prescription && <div className="col-span-2"><span className="text-slate-500">Prescrição:</span> {selectedAppointment.prescription}</div>}
                  {selectedAppointment.notes && <div className="col-span-2"><span className="text-slate-500">Notas:</span> {selectedAppointment.notes}</div>}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowViewDialog(false)}>Fechar</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* COMPLETE APPOINTMENT DIALOG */}
      {/* COMPLETE APPOINTMENT DIALOG */}
      <Dialog open={showCompleteDialog} onOpenChange={setShowCompleteDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
              Concluir Consulta
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><span className="text-slate-500">Paciente:</span> <strong>{selectedAppointment?.patientName}</strong></div>
              <div><span className="text-slate-500">Médico:</span> {selectedAppointment?.doctorName}</div>
            </div>
            <div>
              <Label>Diagnóstico</Label>
              <Textarea value={clinicalData.diagnosis} onChange={(e) => setClinicalData({ ...clinicalData, diagnosis: e.target.value })} placeholder="Descreva o diagnóstico..." />
            </div>
            <div>
              <Label>Prescrição</Label>
              <Textarea value={clinicalData.prescription} onChange={(e) => setClinicalData({ ...clinicalData, prescription: e.target.value })} placeholder="Medicamentos, dosagens, recomendações..." />
            </div>
            <div>
              <Label>Notas Adicionais</Label>
              <Textarea value={clinicalData.notes} onChange={(e) => setClinicalData({ ...clinicalData, notes: e.target.value })} placeholder="Observações relevantes..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCompleteDialog(false)}>Cancelar</Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={() => {
                setShowCompleteDialog(false);
                handleCompleteAppointment(selectedAppointment!);
              }}
            >
              Concluir e Faturar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modais de Faturamento */}
      <FaturamentoConsultaModal
        open={showFaturamentoDialog}
        onClose={() => setShowFaturamentoDialog(false)}
        consulta={consultaParaFaturar}
        onConfirmar={handleConfirmarFaturamento}
      />

      <FaturaConsultaModal
        fatura={faturaEmitida}
        open={showFaturaDialog}
        onClose={() => setShowFaturaDialog(false)}
      />

      <FechoDiaConsolidadoModal
        open={showFechoConsolidadoDialog}
        onClose={() => setShowFechoConsolidadoDialog(false)}
        dados={getDadosFechoConsolidado()}
        onConfirmarFecho={(dados) => {
          console.log('Fecho consolidado confirmado:', dados);
          setShowFechoConsolidadoDialog(false);
        }}
      />

      {/* CANCEL APPOINTMENT DIALOG */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar Consulta</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja cancelar a consulta de <strong>{selectedAppointment?.patientName}</strong> com <strong>{selectedAppointment?.doctorName}</strong> no dia {selectedAppointment?.date} às {selectedAppointment?.time}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Voltar</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelAppointment} className="bg-red-600 hover:bg-red-700">Cancelar Consulta</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}