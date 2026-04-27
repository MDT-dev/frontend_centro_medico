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
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
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
  Users,
  UserPlus,
  Search,
  Filter,
  Download,
  Printer,
  Mail,
  Phone,
  Calendar,
  Shield,
  UserCog,
  Stethoscope,
  Pill,
  Syringe,
  Building2,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Trash2,
  Eye,
  Lock,
  Unlock,
  Key,
  Activity,
  BarChart3,
  Settings,
  UserCheck,
  UserX,
  Briefcase,
  GraduationCap,
  FileText,
  History,
  MoreHorizontal,
  RefreshCw,
} from "lucide-react";

// Adicionar no topo com as outras importações
import { sendWelcomeEmail } from '@/services/emailService';
import { generateTemporaryPassword } from '@/utils/passwordUtils';
import { useToast } from "@/hooks/use-toast";


// Tipos de utilizadores
type UserRole = "admin" | "doctor" | "nurse" | "pharmacist" | "receptionist" | "patient" | "laboratory" | "finance";
type UserStatus = "active" | "inactive" | "suspended" | "pending";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  department?: string;
  specialty?: string;
  licenseNumber?: string;
  lastLogin?: string;
  createdAt: string;
  permissions: string[];
  shifts?: { day: string; start: string; end: string }[];
}

// Dados estáticos
const initialUsers: User[] = [
  {
    id: 1,
    name: "Dr. Carlos Alberto Silva",
    email: "carlos.silva@medicina.co.ao",
    phone: "+244 923 456 789",
    role: "doctor",
    status: "active",
    department: "Medicina Geral",
    specialty: "Clínica Geral",
    licenseNumber: "MED-AO-0042",
    lastLogin: "2026-04-09 08:30",
    createdAt: "2020-01-15",
    permissions: ["view_patients", "create_prescription", "schedule_appointments", "view_medical_records"],
    shifts: [
      { day: "Segunda", start: "08:00", end: "17:00" },
      { day: "Terça", start: "08:00", end: "17:00" },
      { day: "Quarta", start: "08:00", end: "17:00" },
      { day: "Quinta", start: "08:00", end: "17:00" },
      { day: "Sexta", start: "08:00", end: "17:00" },
    ],
  },
  {
    id: 2,
    name: "Dra. Ana Beatriz Oliveira",
    email: "ana.oliveira@medicina.co.ao",
    phone: "+244 934 567 890",
    role: "doctor",
    status: "active",
    department: "Pediatria",
    specialty: "Pediatria",
    licenseNumber: "MED-AO-0156",
    lastLogin: "2026-04-08 14:20",
    createdAt: "2021-03-10",
    permissions: ["view_patients", "create_prescription", "schedule_appointments", "view_medical_records"],
    shifts: [
      { day: "Segunda", start: "10:00", end: "19:00" },
      { day: "Terça", start: "10:00", end: "19:00" },
      { day: "Quarta", start: "10:00", end: "19:00" },
      { day: "Quinta", start: "10:00", end: "19:00" },
      { day: "Sexta", start: "10:00", end: "19:00" },
    ],
  },
  {
    id: 3,
    name: "Enf. Maria Francisca Santos",
    email: "maria.santos@medicina.co.ao",
    phone: "+244 945 678 901",
    role: "nurse",
    status: "active",
    department: "Enfermagem",
    licenseNumber: "ENF-AO-0234",
    lastLogin: "2026-04-09 07:45",
    createdAt: "2020-06-20",
    permissions: ["view_patients", "record_vitals", "administer_medication"],
    shifts: [
      { day: "Segunda", start: "07:00", end: "15:00" },
      { day: "Terça", start: "07:00", end: "15:00" },
      { day: "Quarta", start: "07:00", end: "15:00" },
      { day: "Quinta", start: "07:00", end: "15:00" },
      { day: "Sexta", start: "07:00", end: "15:00" },
    ],
  },
  {
    id: 4,
    name: "Dr. Farm. João Mendes",
    email: "joao.mendes@medicina.co.ao",
    phone: "+244 956 789 012",
    role: "pharmacist",
    status: "active",
    department: "Farmácia",
    licenseNumber: "FARM-AO-0089",
    lastLogin: "2026-04-09 09:15",
    createdAt: "2021-01-05",
    permissions: ["manage_inventory", "dispense_medication", "view_prescriptions"],
    shifts: [
      { day: "Segunda", start: "08:00", end: "17:00" },
      { day: "Terça", start: "08:00", end: "17:00" },
      { day: "Quarta", start: "08:00", end: "17:00" },
      { day: "Quinta", start: "08:00", end: "17:00" },
      { day: "Sexta", start: "08:00", end: "17:00" },
    ],
  },
  {
    id: 5,
    name: "Admin Sistema - Paulo Costa",
    email: "admin@medicina.co.ao",
    phone: "+244 967 890 123",
    role: "admin",
    status: "active",
    department: "Administração",
    lastLogin: "2026-04-09 08:00",
    createdAt: "2019-01-10",
    permissions: ["all"],
    shifts: [],
  },
  {
    id: 6,
    name: "Recepcionista - Carla Souza",
    email: "carla.souza@medicina.co.ao",
    phone: "+244 978 901 234",
    role: "receptionist",
    status: "active",
    department: "Recepção",
    lastLogin: "2026-04-09 07:30",
    createdAt: "2022-02-15",
    permissions: ["schedule_appointments", "register_patients", "view_schedule"],
    shifts: [
      { day: "Segunda", start: "07:30", end: "16:30" },
      { day: "Terça", start: "07:30", end: "16:30" },
      { day: "Quarta", start: "07:30", end: "16:30" },
      { day: "Quinta", start: "07:30", end: "16:30" },
      { day: "Sexta", start: "07:30", end: "16:30" },
    ],
  },
  {
    id: 7,
    name: "Maria Celeste dos Santos",
    email: "maria.santos@email.com",
    phone: "+244 923 456 789",
    role: "patient",
    status: "active",
    lastLogin: "2026-04-05 10:30",
    createdAt: "2023-01-20",
    permissions: ["view_own_records", "schedule_appointments"],
  },
  {
    id: 8,
    name: "Téc. Lab. Ricardo Lopes",
    email: "ricardo.lopes@medicina.co.ao",
    phone: "+244 989 012 345",
    role: "laboratory",
    status: "inactive",
    department: "Laboratório",
    licenseNumber: "LAB-AO-0056",
    lastLogin: "2026-03-20 11:00",
    createdAt: "2021-08-01",
    permissions: ["perform_exams", "upload_results", "view_requests"],
    shifts: [
      { day: "Segunda", start: "08:00", end: "16:00" },
      { day: "Terça", start: "08:00", end: "16:00" },
      { day: "Quarta", start: "08:00", end: "16:00" },
      { day: "Quinta", start: "08:00", end: "16:00" },
      { day: "Sexta", start: "08:00", end: "16:00" },
    ],
  },
  {
    id: 9,
    name: "Financeiro - Amélia Gonçalves",
    email: "amelia.goncalves@medicina.co.ao",
    phone: "+244 990 123 456",
    role: "finance",
    status: "active",
    department: "Financeiro",
    lastLogin: "2026-04-08 15:45",
    createdAt: "2022-06-10",
    permissions: ["view_invoices", "process_payments", "financial_reports"],
    shifts: [
      { day: "Segunda", start: "09:00", end: "18:00" },
      { day: "Terça", start: "09:00", end: "18:00" },
      { day: "Quarta", start: "09:00", end: "18:00" },
      { day: "Quinta", start: "09:00", end: "18:00" },
      { day: "Sexta", start: "09:00", end: "18:00" },
    ],
  },
];

const roleConfig: Record<UserRole, { label: string; color: string; icon: any; bgColor: string }> = {
  admin: { label: "Administrador", color: "text-purple-700", bgColor: "bg-purple-100", icon: Shield },
  doctor: { label: "Médico", color: "text-blue-700", bgColor: "bg-blue-100", icon: Stethoscope },
  nurse: { label: "Enfermeiro", color: "text-green-700", bgColor: "bg-green-100", icon: Syringe },
  pharmacist: { label: "Farmacêutico", color: "text-teal-700", bgColor: "bg-teal-100", icon: Pill },
  receptionist: { label: "Recepcionista", color: "text-orange-700", bgColor: "bg-orange-100", icon: Building2 },
  patient: { label: "Paciente", color: "text-slate-700", bgColor: "bg-slate-100", icon: Users },
  laboratory: { label: "Laboratório", color: "text-pink-700", bgColor: "bg-pink-100", icon: FileText },
  finance: { label: "Financeiro", color: "text-emerald-700", bgColor: "bg-emerald-100", icon: BarChart3 },
};

const statusConfig: Record<UserStatus, { label: string; color: string; icon: any }> = {
  active: { label: "Ativo", color: "bg-green-100 text-green-700", icon: CheckCircle },
  inactive: { label: "Inativo", color: "bg-red-100 text-red-700", icon: XCircle },
  suspended: { label: "Suspenso", color: "bg-yellow-100 text-yellow-700", icon: AlertCircle },
  pending: { label: "Pendente", color: "bg-blue-100 text-blue-700", icon: Clock },
};

export function UserManagementPage() {

  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("list");
   const { toast } = useToast()
  // Adicionar com os outros states
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    specialty: "",
    licenseNumber: "",
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getRandomColor = (id: number) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-teal-500', 'bg-indigo-500', 'bg-rose-500'];
    return colors[id % colors.length];
  };

  const handleAddUser = async () => {
    // Validar campos obrigatórios
    if (!formData.name || !formData.email || !formData.phone || !formData.role) {
       toast({
        title: "Por favor, preencha todos os campos obrigatórios",
        className: "bg-red-600 text-white",
        duration: 3000,
      })
      return;
    }

    // Gerar password temporária
    // const temporaryPassword = generateTemporaryPassword(10);
    const temporaryPassword = "123456";

    const newUser: User = {
      id: users.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role as UserRole,
      status: "active",
      department: formData.department,
      specialty: formData.specialty,
      licenseNumber: formData.licenseNumber,
      createdAt: new Date().toISOString().split('T')[0],
      permissions: [],
    };

    setIsSendingEmail(true);

    // Enviar email de boas-vindas
    const emailResult = await sendWelcomeEmail({
      to: formData.email,
      firstName: formData.name.split(' ')[0],
      email: formData.email,
      password: temporaryPassword,
      role: formData.role,
      clinicName: "Centro Médico Mwanganza",
    });

    if (emailResult.success) {
      setUsers([...users, newUser]);
      setShowAddDialog(false);
      setFormData({ name: "", email: "", phone: "", role: "", department: "", specialty: "", licenseNumber: "" });
       toast({
        title: `Utilizador ${newUser.name} criado com sucesso! Email enviado para ${newUser.email}`,
        className: "bg-green-600 text-white",
        duration: 3000,
      })
    } else {
       toast({
        title: `Utilizador criado mas houve um erro ao enviar o email: ${emailResult.error}`,
        className: "bg-blue-600 text-white",
        duration: 3000,
      })
      // Mesmo com erro no email, podemos adicionar o usuário
      setUsers([...users, newUser]);
      setShowAddDialog(false);
    }

    setIsSendingEmail(false);
  };

  const handleEditUser = () => {
    if (selectedUser) {
      setUsers(users.map(u =>
        u.id === selectedUser.id ? { ...u, ...formData, role: formData.role as UserRole } : u
      ));
      setShowEditDialog(false);
      setSelectedUser(null);
    }
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(u => u.id !== selectedUser.id));
      setShowDeleteDialog(false);
      setSelectedUser(null);
    }
  };

  const handleToggleStatus = (user: User) => {
    const newStatus = user.status === "active" ? "inactive" : "active";
    setUsers(users.map(u => u.id === user.id ? { ...u, status: newStatus as UserStatus } : u));
  };

  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      department: user.department || "",
      specialty: user.specialty || "",
      licenseNumber: user.licenseNumber || "",
    });
    setShowEditDialog(true);
  };

  const openViewDialog = (user: User) => {
    setSelectedUser(user);
    setShowViewDialog(true);
  };

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === "active").length,
    inactive: users.filter(u => u.status === "inactive").length,
    byRole: {
      doctors: users.filter(u => u.role === "doctor").length,
      nurses: users.filter(u => u.role === "nurse").length,
      patients: users.filter(u => u.role === "patient").length,
      admins: users.filter(u => u.role === "admin").length,
    },
  };

  const handleResetPassword = async () => {
    if (!selectedUser) return;

    const newPassword = generateTemporaryPassword(10);

    setIsSendingEmail(true);

    const emailResult = await sendWelcomeEmail({
      to: selectedUser.email,
      firstName: selectedUser.name.split(' ')[0],
      email: selectedUser.email,
      password: newPassword,
      role: selectedUser.role,
      clinicName: "Centro Médico Mwanganza",
    });

    if (emailResult.success) {
       toast({
        title: `Nova password enviada para ${selectedUser.email}`,
        className: "bg-blue-600 text-white",
        duration: 3000,
      })
    } else {
        toast({
        title: `Erro ao enviar email: ${emailResult.error}`,
        className: "bg-red-600 text-white",
        duration: 3000,
      })
    }

    setIsSendingEmail(false);
    setShowResetPasswordDialog(false);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-purple-800 bg-clip-text text-transparent">
                  Gestão de Utilizadores
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Gerencie médicos, enfermeiros, pacientes e administradores do sistema
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            <Button variant="outline" className="gap-2">
              <Printer className="h-4 w-4" />
              Imprimir
            </Button>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 gap-2 shadow-lg" onClick={() => setShowAddDialog(true)}>
              <UserPlus className="h-4 w-4" />
              Novo Utilizador
            </Button>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-500 to-indigo-700 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-90">Total</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Users className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-700 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-90">Ativos</p>
                  <p className="text-2xl font-bold">{stats.active}</p>
                </div>
                <UserCheck className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-rose-700 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-90">Inativos</p>
                  <p className="text-2xl font-bold">{stats.inactive}</p>
                </div>
                <UserX className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Médicos</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.byRole.doctors}</p>
                </div>
                <Stethoscope className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Enfermeiros</p>
                  <p className="text-2xl font-bold text-green-600">{stats.byRole.nurses}</p>
                </div>
                <Syringe className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Pacientes</p>
                  <p className="text-2xl font-bold text-slate-600">{stats.byRole.patients}</p>
                </div>
                <Users className="h-8 w-8 text-slate-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* TABS */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-white shadow-sm">
            <TabsTrigger value="list" className="gap-2">
              <Users className="h-4 w-4" />
              Lista de Utilizadores
            </TabsTrigger>
            <TabsTrigger value="roles" className="gap-2">
              <Shield className="h-4 w-4" />
              Permissões & Funções
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2">
              <Activity className="h-4 w-4" />
              Atividade Recente
            </TabsTrigger>
          </TabsList>

          {/* TAB LISTA DE UTILIZADORES */}
          <TabsContent value="list" className="space-y-4">
            {/* SEARCH AND FILTERS */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Pesquisar por nome, email ou telefone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-slate-200 focus:border-indigo-300"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Filtrar por função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as funções</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="doctor">Médico</SelectItem>
                  <SelectItem value="nurse">Enfermeiro</SelectItem>
                  <SelectItem value="pharmacist">Farmacêutico</SelectItem>
                  <SelectItem value="receptionist">Recepcionista</SelectItem>
                  <SelectItem value="patient">Paciente</SelectItem>
                  <SelectItem value="laboratory">Laboratório</SelectItem>
                  <SelectItem value="finance">Financeiro</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px] bg-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Ativos</SelectItem>
                  <SelectItem value="inactive">Inativos</SelectItem>
                  <SelectItem value="suspended">Suspensos</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2" onClick={() => {
                setSearchTerm("");
                setRoleFilter("all");
                setStatusFilter("all");
              }}>
                <RefreshCw className="h-4 w-4" />
                Limpar
              </Button>
            </div>

            {/* TABLE */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-white rounded-t-xl">
                <CardTitle className="flex items-center justify-between">
                  <span>Lista de Utilizadores</span>
                  <span className="text-sm font-normal text-slate-500">
                    {filteredUsers.length} utilizadores encontrados
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50">
                        <TableHead className="font-semibold">Utilizador</TableHead>
                        <TableHead className="font-semibold">Contacto</TableHead>
                        <TableHead className="font-semibold">Função</TableHead>
                        <TableHead className="font-semibold">Departamento</TableHead>
                        <TableHead className="font-semibold">Último Acesso</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold text-center">Ações</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {filteredUsers.map((user) => {
                        const RoleIcon = roleConfig[user.role]?.icon || Users;
                        const StatusIcon = statusConfig[user.status]?.icon;
                        return (
                          <TableRow key={user.id} className="hover:bg-slate-50 transition-colors">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className={`h-10 w-10 ${getRandomColor(user.id)} text-white`}>
                                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-slate-800">{user.name}</p>
                                  <p className="text-xs text-slate-400">ID: {user.id}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 text-sm">
                                  <Mail className="h-3 w-3 text-slate-400" />
                                  <span className="text-xs">{user.email}</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                  <Phone className="h-3 w-3 text-slate-400" />
                                  <span>{user.phone}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={`${roleConfig[user.role]?.bgColor} ${roleConfig[user.role]?.color} border-0 gap-1`}>
                                <RoleIcon className="h-3 w-3" />
                                {roleConfig[user.role]?.label || user.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-slate-600">{user.department || "-"}</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm">
                                <Clock className="h-3 w-3 text-slate-400" />
                                <span>{user.lastLogin || "Nunca"}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={`${statusConfig[user.status]?.color} border-0 gap-1`}>
                                {StatusIcon && <StatusIcon className="h-3 w-3" />}
                                {statusConfig[user.status]?.label}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center justify-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openViewDialog(user)}
                                >
                                  <Eye className="h-4 w-4 text-blue-500" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openEditDialog(user)}
                                >
                                  <Edit className="h-4 w-4 text-green-500" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedUser(user);
                                    setShowResetPasswordDialog(true);
                                  }}
                                >
                                  <Key className="h-4 w-4 text-orange-500" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleToggleStatus(user)}
                                >
                                  {user.status === "active" ? (
                                    <Lock className="h-4 w-4 text-yellow-500" />
                                  ) : (
                                    <Unlock className="h-4 w-4 text-green-500" />
                                  )}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedUser(user);
                                    setShowDeleteDialog(true);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
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
          </TabsContent>

          {/* TAB PERMISSÕES & FUNÇÕES */}
          <TabsContent value="roles" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(roleConfig).map(([role, config]) => {
                const Icon = config.icon;
                const count = users.filter(u => u.role === role).length;
                return (
                  <Card key={role} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-3 rounded-xl ${config.bgColor}`}>
                          <Icon className={`h-6 w-6 ${config.color}`} />
                        </div>
                        <Badge className={`${config.bgColor} ${config.color} border-0`}>
                          {count} utilizadores
                        </Badge>
                      </div>
                      <h3 className="font-bold text-slate-800">{config.label}</h3>
                      <p className="text-sm text-slate-500 mt-2">
                        {role === "admin" && "Acesso total ao sistema, gestão de utilizadores e configurações."}
                        {role === "doctor" && "Consulta pacientes, prescreve medicamentos, agenda consultas."}
                        {role === "nurse" && "Regista sinais vitais, administra medicação, apoio clínico."}
                        {role === "pharmacist" && "Gestão de stock, dispensa medicamentos, valida prescrições."}
                        {role === "receptionist" && "Registo de pacientes, agendamento, atendimento."}
                        {role === "patient" && "Acesso ao próprio perfil, histórico e agendamentos."}
                        {role === "laboratory" && "Realiza exames, insere resultados, gestão de requisições."}
                        {role === "finance" && "Gestão de faturas, pagamentos, relatórios financeiros."}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* TAB ATIVIDADE RECENTE */}
          <TabsContent value="activity" className="space-y-4">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Registo de Atividades Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.filter(u => u.lastLogin).slice(0, 10).map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className={`h-8 w-8 ${getRandomColor(user.id)} text-white`}>
                          <AvatarFallback className="text-xs">{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-slate-500">{roleConfig[user.role]?.label}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-600">Último acesso</p>
                        <p className="text-xs text-slate-400">{user.lastLogin}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* ADD USER DIALOG */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-indigo-600" />
              Adicionar Novo Utilizador
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label>Nome Completo *</Label>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div>
              <Label>Email *</Label>
              <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div>
              <Label>Telefone *</Label>
              <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <div>
              <Label>Função *</Label>
              <Select value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="doctor">Médico</SelectItem>
                  <SelectItem value="nurse">Enfermeiro</SelectItem>
                  <SelectItem value="pharmacist">Farmacêutico</SelectItem>
                  <SelectItem value="receptionist">Recepcionista</SelectItem>
                  {/* <SelectItem value="patient">Paciente</SelectItem> */}
                  {/* <SelectItem value="laboratory">Laboratório</SelectItem> */}
                  {/* <SelectItem value="finance">Financeiro</SelectItem> */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Departamento</Label>
              <Input value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} />
            </div>
            <div>
              <Label>Especialidade (para Médicos)</Label>
              <Input value={formData.specialty} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} />
            </div>
            <div>
              <Label>Nº BI/Licença</Label>
              <Input value={formData.licenseNumber} onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancelar</Button>
            <Button onClick={handleAddUser}>Adicionar Utilizador</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EDIT USER DIALOG */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-green-600" />
              Editar Utilizador
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label>Nome Completo</Label>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div>
              <Label>Telefone</Label>
              <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <div>
              <Label>Função</Label>
              <Select value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="doctor">Médico</SelectItem>
                  <SelectItem value="nurse">Enfermeiro</SelectItem>
                  <SelectItem value="pharmacist">Farmacêutico</SelectItem>
                  <SelectItem value="receptionist">Recepcionista</SelectItem>
                  <SelectItem value="patient">Paciente</SelectItem>
                  <SelectItem value="laboratory">Laboratório</SelectItem>
                  <SelectItem value="finance">Financeiro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Departamento</Label>
              <Input value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} />
            </div>
            <div>
              <Label>Especialidade</Label>
              <Input value={formData.specialty} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} />
            </div>
            <div>
              <Label>Nº BI/Licença</Label>
              <Input value={formData.licenseNumber} onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancelar</Button>
            <Button onClick={handleEditUser}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* VIEW USER DIALOG */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="sm:max-w-2xl">
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className={`h-12 w-12 ${getRandomColor(selectedUser.id)} text-white`}>
                    <AvatarFallback className="text-lg">{getInitials(selectedUser.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div>{selectedUser.name}</div>
                    <p className="text-sm text-slate-500 font-normal">ID: {selectedUser.id}</p>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Informações Pessoais */}
                <div>
                  <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <UserCog className="h-4 w-4" />
                    Informações Pessoais
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-slate-500">Nome:</span> {selectedUser.name}</div>
                    <div><span className="text-slate-500">Função:</span> {roleConfig[selectedUser.role]?.label}</div>
                    <div><span className="text-slate-500">Email:</span> {selectedUser.email}</div>
                    <div><span className="text-slate-500">Telefone:</span> {selectedUser.phone}</div>
                    <div><span className="text-slate-500">Departamento:</span> {selectedUser.department || "-"}</div>
                    <div><span className="text-slate-500">Especialidade:</span> {selectedUser.specialty || "-"}</div>
                    <div><span className="text-slate-500">Nº Licença:</span> {selectedUser.licenseNumber || "-"}</div>
                    <div><span className="text-slate-500">Data Cadastro:</span> {selectedUser.createdAt}</div>
                    <div><span className="text-slate-500">Último Acesso:</span> {selectedUser.lastLogin || "Nunca"}</div>
                    <div><span className="text-slate-500">Status:</span> {statusConfig[selectedUser.status]?.label}</div>
                  </div>
                </div>

                {/* Horários (se for staff) */}
                {selectedUser.shifts && selectedUser.shifts.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Horário de Trabalho
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedUser.shifts.map((shift, idx) => (
                        <div key={idx} className="flex justify-between p-2 bg-slate-50 rounded-lg text-sm">
                          <span className="font-medium">{shift.day}</span>
                          <span>{shift.start} - {shift.end}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Permissões */}
                <div>
                  <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Permissões
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.permissions.length > 0 ? (
                      selectedUser.permissions.map((perm, idx) => (
                        <Badge key={idx} variant="outline" className="bg-indigo-50 text-indigo-700">
                          {perm.replace(/_/g, ' ').toUpperCase()}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-slate-500">Permissões padrão para esta função</span>
                    )}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowViewDialog(false)}>Fechar</Button>
                <Button onClick={() => {
                  setShowViewDialog(false);
                  openEditDialog(selectedUser);
                }}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* RESET PASSWORD DIALOG */}
      <AlertDialog open={showResetPasswordDialog} onOpenChange={setShowResetPasswordDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Resetar Password</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja resetar a password de <strong>{selectedUser?.name}</strong>?
              Uma nova password temporária será enviada para o email <strong>{selectedUser?.email}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSendingEmail}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleResetPassword}
              className="bg-orange-600 hover:bg-orange-700"
              disabled={isSendingEmail}
            >
              {isSendingEmail ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Resetar e Enviar Email
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* DELETE USER DIALOG */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Eliminação</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja eliminar <strong>{selectedUser?.name}</strong>?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}