"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  Home,
  Calendar,
  FileText,
  User,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  Stethoscope,
  Clock,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  CreditCard,
  Download,
  Printer,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock as ClockIcon,
  CalendarDays,
  Pill,
  Heart,
  Activity,
  Syringe,
  Microscope,
  Ambulance,
  Baby,
  Scissors,
  ChevronRight,
  ChevronLeft,
  Plus,
  Edit,
  Trash2,
  Settings,
  Shield,
  Smartphone,
  Building2,
  Star,
  MessageSquare,
  Video,
  ExternalLink,
  RefreshCw,
  History,
  Receipt,
  QrCode,
  Wallet,
  TrendingUp,
  Award,
  Gift,
  HelpCircle,
  PanelsTopLeftIcon,
} from "lucide-react";

// Dados do paciente logado (simulado)
const loggedPatient = {
  id: 1,
  name: "Maria Celeste dos Santos",
  email: "maria.santos@email.com",
  phone: "+244 923 456 789",
  alternativePhone: "+244 912 345 678",
  address: "Rua 15, Bairro Kilamba, Luanda, Angola",
  birthDate: "1985-03-15",
  age: 40,
  bloodType: "O+",
  allergies: "Penicilina",
  medicalConditions: "Hipertensão",
  medications: "Losartana 50mg",
  emergencyContact: "João Santos - +244 934 567 890",
  profileImage: "",
  createdAt: "2023-01-20",
};

// Próximas consultas
const upcomingAppointments = [
  {
    id: 1,
    doctorName: "Dr. Carlos Alberto Silva",
    specialty: "Clínica Geral",
    date: "2026-04-15",
    time: "09:00",
    duration: 30,
    type: "Consulta de Rotina",
    status: "confirmed",
    location: "Consultório 3",
    reason: "Check-up anual",
  },
  {
    id: 2,
    doctorName: "Dra. Ana Beatriz Oliveira",
    specialty: "Pediatria",
    date: "2026-04-20",
    time: "14:30",
    duration: 45,
    type: "Consulta de Acompanhamento",
    status: "scheduled",
    location: "Consultório 5",
    reason: "Acompanhamento da criança",
  },
];

// Histórico de consultas
const pastAppointments = [
  {
    id: 3,
    doctorName: "Dr. Carlos Alberto Silva",
    specialty: "Clínica Geral",
    date: "2026-03-10",
    time: "10:00",
    type: "Consulta",
    status: "completed",
    diagnosis: "Hipertensão controlada",
    prescription: "Manter medicação atual",
    notes: "Paciente estável, retorno em 3 meses",
  },
  {
    id: 4,
    doctorName: "Dra. Ana Beatriz Oliveira",
    specialty: "Pediatria",
    date: "2026-02-15",
    time: "15:00",
    type: "Consulta",
    status: "completed",
    diagnosis: "Desenvolvimento normal",
    prescription: "Vacinação em dia",
    notes: "Sem queixas",
  },
];

// Faturas
const invoices = [
  {
    id: "INV-2026-001",
    date: "2026-03-10",
    description: "Consulta com Dr. Carlos Silva",
    amount: 7500,
    status: "paid",
    paymentDate: "2026-03-10",
    paymentMethod: "Multicaixa Express",
  },
  {
    id: "INV-2026-002",
    date: "2026-02-15",
    description: "Consulta com Dra. Ana Oliveira",
    amount: 8500,
    status: "paid",
    paymentDate: "2026-02-15",
    paymentMethod: "Dinheiro",
  },
  {
    id: "INV-2026-003",
    date: "2026-04-15",
    description: "Consulta com Dr. Carlos Silva",
    amount: 7500,
    status: "pending",
    paymentDate: null,
    paymentMethod: null,
  },
];

// Médicos disponíveis
const availableDoctors = [
  { id: 1, name: "Dr. Carlos Alberto Silva", specialty: "Clínica Geral", experience: 15, rating: 4.8, image: "", available: true },
  { id: 2, name: "Dra. Ana Beatriz Oliveira", specialty: "Pediatria", experience: 12, rating: 4.9, image: "", available: true },
  { id: 3, name: "Dr. Miguel Santos", specialty: "Cardiologia", experience: 20, rating: 4.9, image: "", available: true },
  { id: 4, name: "Dra. Paula Lima", specialty: "Dermatologia", experience: 8, rating: 4.7, image: "", available: false },
  { id: 5, name: "Dr. Ricardo Mendes", specialty: "Ortopedia", experience: 10, rating: 4.8, image: "", available: true },
  { id: 6, name: "Dra. Sofia Costa", specialty: "Ginecologia", experience: 14, rating: 4.9, image: "", available: true },
];

// Horários disponíveis
const availableSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00",
];

// Exames disponíveis
const availableExams = [
  { id: 1, name: "Análises Clínicas (Sangue/Urina)", price: 4500, preparation: "Jejum de 8 horas" },
  { id: 2, name: "Raio-X", price: 8500, preparation: "Nenhuma" },
  { id: 3, name: "Ultrassonografia", price: 12000, preparation: "Jejum de 4 horas" },
  { id: 4, name: "Eletrocardiograma", price: 6500, preparation: "Nenhuma" },
  { id: 5, name: "Tomografia Computadorizada", price: 25000, preparation: "Jejum de 6 horas" },
  { id: 6, name: "Ressonância Magnética", price: 35000, preparation: "Jejum de 4 horas" },
];

// Medicamentos (prescrições)
const prescriptions = [
  {
    id: 1,
    date: "2026-03-10",
    doctor: "Dr. Carlos Silva",
    medications: [
      { name: "Losartana 50mg", dosage: "1 comprimido", frequency: "1x ao dia", duration: "30 dias" },
    ],
    status: "active",
  },
];

export  function PatientPortalPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showExamDialog, setShowExamDialog] = useState(false);
  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false);
  const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);
  
  // Form state for scheduling
  const [scheduleForm, setScheduleForm] = useState({
    doctorId: "",
    date: "",
    time: "",
    reason: "",
    type: "consultation",
  });

  // Form state for exam scheduling
  const [examForm, setExamForm] = useState({
    examId: "",
    date: "",
    time: "",
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" /> Confirmada</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-700"><Clock className="h-3 w-3 mr-1" /> Agendada</Badge>;
      case "completed":
        return <Badge className="bg-emerald-100 text-emerald-700"><CheckCircle className="h-3 w-3 mr-1" /> Realizada</Badge>;
      case "paid":
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" /> Paga</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700"><Clock className="h-3 w-3 mr-1" /> Pendente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleScheduleAppointment = () => {
    // Simulate scheduling
    alert("Consulta agendada com sucesso! Você receberá uma confirmação por email.");
    setShowScheduleDialog(false);
    setScheduleForm({ doctorId: "", date: "", time: "", reason: "", type: "consultation" });
  };

  const handleScheduleExam = () => {
    alert("Exame agendado com sucesso! Você receberá as instruções por email.");
    setShowExamDialog(false);
    setExamForm({ examId: "", date: "", time: "" });
  };

  const handleCancelAppointment = () => {
    alert("Consulta cancelada com sucesso.");
    setShowCancelDialog(false);
    setSelectedAppointment(null);
  };

  const handlePayInvoice = () => {
    alert("Redirecionando para pagamento...");
  };

  const navigation = [
    { name: "Dashboard", icon: Home, id: "dashboard" },
    { name: "Minhas Consultas", icon: Calendar, id: "appointments" },
    { name: "Marcar Consulta", icon: Plus, id: "schedule" },
    { name: "Faturas", icon: PanelsTopLeftIcon, id: "invoices" },
    { name: "Prescrições", icon: Pill, id: "prescriptions" },
    { name: "Meu Perfil", icon: User, id: "profile" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="bg-white shadow-lg">
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-40 h-screen w-72 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
                  Clínica Vida+
                </h1>
                <p className="text-xs text-slate-400">Portal do Paciente</p>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <AvatarFallback className="text-lg">{getInitials(loggedPatient.name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-slate-800">{loggedPatient.name}</p>
                <p className="text-xs text-slate-500">{loggedPatient.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 ${
                    activeTab === item.id 
                      ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white" 
                      : "text-slate-600 hover:text-blue-600"
                  }`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <Button variant="ghost" className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="h-5 w-5" />
              Sair
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Olá, {loggedPatient.name.split(' ')[0]}! 👋
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Bem-vindo ao seu portal de saúde. Aqui você pode gerir suas consultas, faturas e muito mais.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                  2
                </span>
              </Button>
              <Button variant="outline" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* DASHBOARD TAB */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
                <CardContent className="p-6 relative">
                  <div className="absolute right-0 top-0 opacity-10">
                    <Heart className="h-40 w-40" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-sm opacity-90">Bem-vindo de volta!</p>
                    <p className="text-2xl font-bold mt-1">{loggedPatient.name}</p>
                    <p className="text-sm opacity-90 mt-2">Sua próxima consulta é em {upcomingAppointments[0]?.date || "nenhuma data agendada"}</p>
                    <Button className="mt-4 bg-white text-blue-700 hover:bg-slate-100" onClick={() => setActiveTab("schedule")}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Marcar Consulta
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border-0 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">Consultas</p>
                        <p className="text-2xl font-bold text-blue-600">{upcomingAppointments.length + pastAppointments.length}</p>
                      </div>
                      <Calendar className="h-8 w-8 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">Próximas</p>
                        <p className="text-2xl font-bold text-green-600">{upcomingAppointments.length}</p>
                      </div>
                      <Clock className="h-8 w-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">Faturas Pagas</p>
                        <p className="text-2xl font-bold text-emerald-600">{invoices.filter(i => i.status === "paid").length}</p>
                      </div>
                      <Receipt className="h-8 w-8 text-emerald-400" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">Pendentes</p>
                        <p className="text-2xl font-bold text-yellow-600">{invoices.filter(i => i.status === "pending").length}</p>
                      </div>
                      <AlertCircle className="h-8 w-8 text-yellow-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Appointments */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Próximas Consultas
                  </CardTitle>
                  <CardDescription>Suas consultas agendadas</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingAppointments.length > 0 ? (
                    <div className="space-y-3">
                      {upcomingAppointments.map((apt) => (
                        <div key={apt.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                          <div className="flex items-center gap-4">
                            <div className="text-center min-w-[70px]">
                              <p className="font-bold text-lg">{apt.time}</p>
                              <p className="text-xs text-slate-400">{apt.date}</p>
                            </div>
                            <div>
                              <p className="font-semibold">{apt.doctorName}</p>
                              <p className="text-sm text-slate-500">{apt.specialty}</p>
                              <p className="text-xs text-slate-400 mt-1">{apt.location}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(apt.status)}
                            <Button variant="outline" size="sm" onClick={() => {
                              setSelectedAppointment(apt);
                              setShowCancelDialog(true);
                            }}>
                              Cancelar
                            </Button>
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow" onClick={() => setActiveTab("schedule")}>
                  <CardContent className="pt-6 text-center">
                    <div className="p-3 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <Plus className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="font-medium">Marcar Consulta</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow" onClick={() => setActiveTab("invoices")}>
                  <CardContent className="pt-6 text-center">
                    <div className="p-3 bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <Receipt className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="font-medium">Ver Faturas</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow" onClick={() => setShowExamDialog(true)}>
                  <CardContent className="pt-6 text-center">
                    <div className="p-3 bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <Microscope className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="font-medium">Agendar Exame</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow" onClick={() => setActiveTab("prescriptions")}>
                  <CardContent className="pt-6 text-center">
                    <div className="p-3 bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <Pill className="h-6 w-6 text-orange-600" />
                    </div>
                    <p className="font-medium">Prescrições</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* MINHAS CONSULTAS TAB */}
          {activeTab === "appointments" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Minhas Consultas</h2>
                  <p className="text-sm text-slate-500">Histórico completo de todas as suas consultas</p>
                </div>
                <Button onClick={() => setActiveTab("schedule")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Consulta
                </Button>
              </div>

              {/* Próximas */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Próximas Consultas</CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingAppointments.length > 0 ? (
                    <div className="space-y-3">
                      {upcomingAppointments.map((apt) => (
                        <div key={apt.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                          <div className="flex items-center gap-4">
                            <div className="text-center min-w-[80px]">
                              <p className="font-bold">{apt.date}</p>
                              <p className="text-sm text-slate-500">{apt.time}</p>
                            </div>
                            <div>
                              <p className="font-semibold">{apt.doctorName}</p>
                              <p className="text-sm text-slate-500">{apt.specialty}</p>
                              <p className="text-xs text-slate-400 mt-1">{apt.reason}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(apt.status)}
                            <Button variant="outline" size="sm">Remarcar</Button>
                            <Button variant="outline" size="sm" className="text-red-600" onClick={() => {
                              setSelectedAppointment(apt);
                              setShowCancelDialog(true);
                            }}>Cancelar</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-slate-500 py-8">Nenhuma consulta agendada</p>
                  )}
                </CardContent>
              </Card>

              {/* Histórico */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Histórico de Consultas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pastAppointments.map((apt) => (
                      <div key={apt.id} className="p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="text-center min-w-[80px]">
                              <p className="font-bold">{apt.date}</p>
                              <p className="text-sm text-slate-500">{apt.time}</p>
                            </div>
                            <div>
                              <p className="font-semibold">{apt.doctorName}</p>
                              <p className="text-sm text-slate-500">{apt.specialty}</p>
                            </div>
                          </div>
                          {getStatusBadge(apt.status)}
                        </div>
                        {(apt.diagnosis || apt.prescription) && (
                          <div className="mt-3 pt-3 border-t text-sm">
                            <p><span className="font-medium">Diagnóstico:</span> {apt.diagnosis}</p>
                            <p><span className="font-medium">Prescrição:</span> {apt.prescription}</p>
                            {apt.notes && <p><span className="font-medium">Notas:</span> {apt.notes}</p>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* MARCAR CONSULTA TAB */}
          {activeTab === "schedule" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Selecionar Médico */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-blue-600" />
                    Escolha o Médico
                  </CardTitle>
                  <CardDescription>Selecione o especialista para sua consulta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {availableDoctors.filter(d => d.available).map((doctor) => (
                    <div
                      key={doctor.id}
                      className={`p-4 border rounded-xl cursor-pointer transition-all hover:shadow-md ${
                        scheduleForm.doctorId === doctor.id.toString() 
                          ? "border-blue-500 bg-blue-50" 
                          : "border-slate-200 hover:border-blue-300"
                      }`}
                      onClick={() => setScheduleForm({ ...scheduleForm, doctorId: doctor.id.toString() })}
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 bg-blue-500 text-white">
                          <AvatarFallback>{getInitials(doctor.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold">{doctor.name}</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm">{doctor.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-slate-500">{doctor.specialty}</p>
                          <p className="text-xs text-slate-400">{doctor.experience} anos de experiência</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Agendamento */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-green-600" />
                    Agendar Consulta
                  </CardTitle>
                  <CardDescription>Escolha a data e horário</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Data</Label>
                    <Input 
                      type="date" 
                      value={scheduleForm.date} 
                      onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <Label>Horário</Label>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {availableSlots.map((slot) => (
                        <Button
                          key={slot}
                          type="button"
                          variant={scheduleForm.time === slot ? "default" : "outline"}
                          className="text-sm"
                          onClick={() => setScheduleForm({ ...scheduleForm, time: slot })}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Tipo de Consulta</Label>
                    <Select value={scheduleForm.type} onValueChange={(v) => setScheduleForm({ ...scheduleForm, type: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">Consulta Normal</SelectItem>
                        <SelectItem value="follow_up">Retorno</SelectItem>
                        <SelectItem value="checkup">Check-up</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Motivo da Consulta</Label>
                    <Textarea 
                      value={scheduleForm.reason} 
                      onChange={(e) => setScheduleForm({ ...scheduleForm, reason: e.target.value })}
                      placeholder="Descreva o motivo da consulta..."
                    />
                  </div>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700" 
                    onClick={handleScheduleAppointment}
                    disabled={!scheduleForm.doctorId || !scheduleForm.date || !scheduleForm.time}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Confirmar Agendamento
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* FATURAS TAB */}
          {activeTab === "invoices" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Minhas Faturas</h2>
                  <p className="text-sm text-slate-500">Histórico de pagamentos e faturas pendentes</p>
                </div>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Exportar
                </Button>
              </div>

              <Card className="border-0 shadow-xl">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nº Fatura</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Descrição</TableHead>
                          <TableHead className="text-right">Valor</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-center">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invoices.map((invoice) => (
                          <TableRow key={invoice.id}>
                            <TableCell className="font-medium">{invoice.id}</TableCell>
                            <TableCell>{invoice.date}</TableCell>
                            <TableCell>{invoice.description}</TableCell>
                            <TableCell className="text-right font-semibold">{formatCurrency(invoice.amount)}</TableCell>
                            <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-2">
                                <Button variant="ghost" size="sm" onClick={() => {
                                  setSelectedInvoice(invoice);
                                  setShowInvoiceDialog(true);
                                }}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                {invoice.status === "pending" && (
                                  <Button size="sm" className="bg-green-600" onClick={handlePayInvoice}>
                                    Pagar
                                  </Button>
                                )}
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4" />
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

              {/* Resumo Financeiro */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Resumo Financeiro</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-slate-500 text-sm">Total Gasto</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(invoices.filter(i => i.status === "paid").reduce((sum, i) => sum + i.amount, 0))}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <p className="text-slate-500 text-sm">Pendente</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {formatCurrency(invoices.filter(i => i.status === "pending").reduce((sum, i) => sum + i.amount, 0))}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-slate-500 text-sm">Última Consulta</p>
                      <p className="text-xl font-bold text-blue-600">10 Mar 2026</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* PRESCRIÇÕES TAB */}
          {activeTab === "prescriptions" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Minhas Prescrições</h2>
                <p className="text-sm text-slate-500">Medicamentos e recomendações médicas</p>
              </div>

              <div className="space-y-4">
                {prescriptions.map((prescription) => (
                  <Card key={prescription.id} className="border-0 shadow-xl">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Pill className="h-5 w-5 text-orange-600" />
                          Prescrição Médica
                        </CardTitle>
                        <Badge className="bg-green-100 text-green-700">Ativa</Badge>
                      </div>
                      <CardDescription>
                        Prescrito por {prescription.doctor} em {prescription.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {prescription.medications.map((med, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 rounded-lg">
                          <p className="font-semibold text-lg">{med.name}</p>
                          <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                            <div><span className="text-slate-500">Dosagem:</span> {med.dosage}</div>
                            <div><span className="text-slate-500">Frequência:</span> {med.frequency}</div>
                            <div><span className="text-slate-500">Duração:</span> {med.duration}</div>
                          </div>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <Button variant="outline" className="gap-2">
                          <Download className="h-4 w-4" />
                          Baixar PDF
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <Printer className="h-4 w-4" />
                          Imprimir
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* PERFIL TAB */}
          {activeTab === "profile" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Informações Pessoais */}
              <Card className="border-0 shadow-xl lg:col-span-2">
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>Seus dados cadastrais</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Nome Completo</Label>
                      <p className="mt-1 font-medium">{loggedPatient.name}</p>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <p className="mt-1">{loggedPatient.email}</p>
                    </div>
                    <div>
                      <Label>Telefone</Label>
                      <p className="mt-1">{loggedPatient.phone}</p>
                    </div>
                    <div>
                      <Label>Telefone Alternativo</Label>
                      <p className="mt-1">{loggedPatient.alternativePhone || "-"}</p>
                    </div>
                    <div>
                      <Label>Data de Nascimento</Label>
                      <p className="mt-1">{loggedPatient.birthDate} ({loggedPatient.age} anos)</p>
                    </div>
                    <div>
                      <Label>Tipo Sanguíneo</Label>
                      <p className="mt-1">{loggedPatient.bloodType}</p>
                    </div>
                    <div className="col-span-2">
                      <Label>Endereço</Label>
                      <p className="mt-1">{loggedPatient.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Informações Médicas */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Informações Médicas</CardTitle>
                  <CardDescription>Dados relevantes para sua saúde</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Alergias</Label>
                    <p className="mt-1 text-red-600">{loggedPatient.allergies || "Nenhuma"}</p>
                  </div>
                  <div>
                    <Label>Condições Médicas</Label>
                    <p className="mt-1">{loggedPatient.medicalConditions || "Nenhuma"}</p>
                  </div>
                  <div>
                    <Label>Medicamentos em Uso</Label>
                    <p className="mt-1">{loggedPatient.medications || "Nenhum"}</p>
                  </div>
                  <div>
                    <Label>Contacto de Emergência</Label>
                    <p className="mt-1">{loggedPatient.emergencyContact || "-"}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Botão Editar Perfil */}
              <Card className="border-0 shadow-xl lg:col-span-3">
                <CardContent className="pt-6">
                  <Button className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Perfil
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      {/* Schedule Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Marcar Consulta</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Funcionalidade de agendamento</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Exam Dialog */}
      <Dialog open={showExamDialog} onOpenChange={setShowExamDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Microscope className="h-5 w-5 text-purple-600" />
              Agendar Exame
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Tipo de Exame</Label>
              <Select value={examForm.examId} onValueChange={(v) => setExamForm({ ...examForm, examId: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar exame" />
                </SelectTrigger>
                <SelectContent>
                  {availableExams.map(exam => (
                    <SelectItem key={exam.id} value={exam.id.toString()}>
                      {exam.name} - {formatCurrency(exam.price)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Data</Label>
              <Input type="date" value={examForm.date} onChange={(e) => setExamForm({ ...examForm, date: e.target.value })} />
            </div>
            <div>
              <Label>Horário</Label>
              <Select value={examForm.time} onValueChange={(v) => setExamForm({ ...examForm, time: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar horário" />
                </SelectTrigger>
                <SelectContent>
                  {availableSlots.map(slot => (
                    <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {examForm.examId && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-700">Preparação necessária:</p>
                <p className="text-sm text-blue-600">{availableExams.find(e => e.id.toString() === examForm.examId)?.preparation}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExamDialog(false)}>Cancelar</Button>
            <Button onClick={handleScheduleExam}>Agendar Exame</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invoice Dialog */}
      <Dialog open={showInvoiceDialog} onOpenChange={setShowInvoiceDialog}>
        <DialogContent className="sm:max-w-md">
          {selectedInvoice && (
            <>
              <DialogHeader>
                <DialogTitle>Detalhes da Fatura</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-500">Nº Fatura</p>
                  <p className="text-xl font-bold">{selectedInvoice.id}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Data:</span>
                    <span>{selectedInvoice.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Descrição:</span>
                    <span>{selectedInvoice.description}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Valor:</span>
                    <span className="font-bold">{formatCurrency(selectedInvoice.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status:</span>
                    {getStatusBadge(selectedInvoice.status)}
                  </div>
                  {selectedInvoice.paymentDate && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Data Pagamento:</span>
                      <span>{selectedInvoice.paymentDate}</span>
                    </div>
                  )}
                  {selectedInvoice.paymentMethod && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Método Pagamento:</span>
                      <span>{selectedInvoice.paymentMethod}</span>
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowInvoiceDialog(false)}>Fechar</Button>
                {selectedInvoice.status === "pending" && (
                  <Button className="bg-green-600" onClick={handlePayInvoice}>Pagar Agora</Button>
                )}
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Baixar PDF
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Cancel Appointment Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar Consulta</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja cancelar sua consulta com {selectedAppointment?.doctorName} no dia {selectedAppointment?.date} às {selectedAppointment?.time}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Voltar</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelAppointment} className="bg-red-600 hover:bg-red-700">
              Cancelar Consulta
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}