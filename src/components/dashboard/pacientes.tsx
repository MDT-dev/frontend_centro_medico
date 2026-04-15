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
import { Progress } from "@/components/ui/progress";
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
  Calendar,
  Phone,
  Mail,
  MapPin,
  Heart,
  Activity,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Stethoscope,
  Syringe,
  Pill,
  TestTube,
  MessageSquare,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Baby,
  Briefcase,
  Thermometer,
  Weight,
  Ruler,
  TrendingUp,
  UserCheck,
  UserX,
  CalendarDays,
  History,
  PieChart,
  Bell,
  Blinds,
  Blend,
  User,
} from "lucide-react";

// Dados estáticos de pacientes
const initialPacientes = [
  {
    id: 1,
    nome: "Maria Celeste dos Santos",
    genero: "Feminino",
    dataNascimento: "1985-03-15",
    idade: 40,
    telefone: "+244 923 456 789",
    email: "maria.santos@email.com",
    endereco: "Rua 15, Bairro Kilamba, Luanda",
    tipoSanguineo: "O+",
    alergias: "Penicilina",
    condicoes: "Hipertensão",
    medicamentosAtuais: "Losartana 50mg",
    ultimaConsulta: "2026-03-20",
    proximaConsulta: "2026-04-20",
    status: "active",
    historicoConsultas: [
      { data: "2026-03-20", medico: "Dr. Carlos Silva", diagnostico: "Hipertensão controlada", prescricao: "Manter medicação" },
      { data: "2026-02-15", medico: "Dra. Ana Oliveira", diagnostico: "Check-up anual", prescricao: "Exames de rotina" },
    ],
  },
  {
    id: 2,
    nome: "João Manuel Fernandes",
    genero: "Masculino",
    dataNascimento: "1978-08-22",
    idade: 47,
    telefone: "+244 912 345 678",
    email: "joao.fernandes@email.com",
    endereco: "Av. 4 de Fevereiro, Luanda",
    tipoSanguineo: "A+",
    alergias: "Nenhuma",
    condicoes: "Diabetes Tipo 2",
    medicamentosAtuais: "Metformina 850mg",
    ultimaConsulta: "2026-03-18",
    proximaConsulta: "2026-04-18",
    status: "active",
    historicoConsultas: [
      { data: "2026-03-18", medico: "Dr. Pedro Costa", diagnostico: "Glicemia controlada", prescricao: "Continuar medicação" },
    ],
  },
  {
    id: 3,
    nome: "Ana Beatriz Silva",
    genero: "Feminino",
    dataNascimento: "1992-11-05",
    idade: 33,
    telefone: "+244 934 567 890",
    email: "ana.silva@email.com",
    endereco: "Rua 1, Bairro Miramar, Luanda",
    tipoSanguineo: "B-",
    alergias: "Sulfa",
    condicoes: "Asma",
    medicamentosAtuais: "Salbutamol spray",
    ultimaConsulta: "2026-03-10",
    proximaConsulta: "2026-03-25",
    status: "active",
    historicoConsultas: [
      { data: "2026-03-10", medico: "Dra. Maria Santos", diagnostico: "Crise asmática leve", prescricao: "Uso do spray conforme necessário" },
    ],
  },
  {
    id: 4,
    nome: "António Paulo Mendes",
    genero: "Masculino",
    dataNascimento: "1965-02-28",
    idade: 61,
    telefone: "+244 945 678 901",
    email: "antonio.mendes@email.com",
    endereco: "Rua 8, Bairro Talatona, Luanda",
    tipoSanguineo: "AB+",
    alergias: "Aspirina",
    condicoes: "Artrite, Colesterol Alto",
    medicamentosAtuais: "Atorvastatina 20mg, Ibuprofeno 400mg",
    ultimaConsulta: "2026-02-28",
    proximaConsulta: "2026-05-28",
    status: "inactive",
    historicoConsultas: [
      { data: "2026-02-28", medico: "Dr. Carlos Silva", diagnostico: "Controle de colesterol", prescricao: "Manter dieta e medicação" },
    ],
  },
  {
    id: 5,
    nome: "Isabel Cristina Lopes",
    genero: "Feminino",
    dataNascimento: "2000-07-19",
    idade: 25,
    telefone: "+244 956 789 012",
    email: "isabel.lopes@email.com",
    endereco: "Rua 3, Bairro Alvalade, Luanda",
    tipoSanguineo: "O-",
    alergias: "Nenhuma",
    condicoes: "Nenhuma",
    medicamentosAtuais: "Nenhum",
    ultimaConsulta: "2026-03-22",
    proximaConsulta: "2026-04-05",
    status: "active",
    historicoConsultas: [
      { data: "2026-03-22", medico: "Dra. Ana Oliveira", diagnostico: "Dor de garganta", prescricao: "Amoxicilina 500mg" },
    ],
  },
];

const estatisticas = {
  totalPacientes: 156,
  novosMes: 23,
  consultasHoje: 12,
  consultasSemana: 48,
  pacientesAtivos: 128,
  pacientesInativos: 28,
  genero: { masculino: 68, feminino: 88 },
  faixaEtaria: { "0-18": 24, "19-35": 52, "36-50": 41, "51+": 39 },
};

export default function GerenciamentoPacientesPage() {
  const [pacientes, setPacientes] = useState(initialPacientes);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("list");
  
  // Form state
  const [formData, setFormData] = useState({
    nome: "",
    genero: "",
    dataNascimento: "",
    telefone: "",
    email: "",
    endereco: "",
    tipoSanguineo: "",
    alergias: "",
    condicoes: "",
    medicamentosAtuais: "",
  });

  const filteredPacientes = pacientes.filter((p) => {
    const matchesSearch = p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.telefone.includes(searchTerm) ||
                         p.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" /> Ativo</Badge>;
      case "inactive":
        return <Badge className="bg-red-100 text-red-700"><XCircle className="h-3 w-3 mr-1" /> Inativo</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getInitials = (nome: string) => {
    return nome.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getRandomColor = (id: number) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-teal-500'];
    return colors[id % colors.length];
  };

  const handleAddPaciente = () => {
    const idade = new Date().getFullYear() - new Date(formData.dataNascimento).getFullYear();
    const newPaciente = {
      id: pacientes.length + 1,
      ...formData,
      idade,
      ultimaConsulta: new Date().toISOString().split('T')[0],
      proximaConsulta: "",
      status: "active",
      historicoConsultas: [],
    };
    setPacientes([...pacientes, newPaciente]);
    setShowAddDialog(false);
    setFormData({
      nome: "", genero: "", dataNascimento: "", telefone: "", email: "",
      endereco: "", tipoSanguineo: "", alergias: "", condicoes: "", medicamentosAtuais: "",
    });
  };

  const handleEditPaciente = () => {
    setPacientes(pacientes.map(p => 
      p.id === selectedPaciente.id ? { ...p, ...formData } : p
    ));
    setShowEditDialog(false);
    setSelectedPaciente(null);
  };

  const handleDeletePaciente = () => {
    setPacientes(pacientes.filter(p => p.id !== selectedPaciente.id));
    setShowDeleteDialog(false);
    setSelectedPaciente(null);
  };

  const openEditDialog = (paciente: any) => {
    setSelectedPaciente(paciente);
    setFormData({
      nome: paciente.nome,
      genero: paciente.genero,
      dataNascimento: paciente.dataNascimento,
      telefone: paciente.telefone,
      email: paciente.email,
      endereco: paciente.endereco,
      tipoSanguineo: paciente.tipoSanguineo,
      alergias: paciente.alergias,
      condicoes: paciente.condicoes,
      medicamentosAtuais: paciente.medicamentosAtuais,
    });
    setShowEditDialog(true);
  };

  const openViewDialog = (paciente: any) => {
    setSelectedPaciente(paciente);
    setShowViewDialog(true);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
                  Gestão de Pacientes
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Gerencie informações, consultas e histórico de pacientes
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
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 gap-2 shadow-lg" onClick={() => setShowAddDialog(true)}>
              <UserPlus className="h-4 w-4" />
              Novo Paciente
            </Button>
          </div>
        </div>

        {/* CARDS ESTATÍSTICAS */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-700 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-90">Total Pacientes</p>
                  <p className="text-2xl font-bold">{estatisticas.totalPacientes}</p>
                </div>
                <Users className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-700 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-90">Novos (Mês)</p>
                  <p className="text-2xl font-bold">{estatisticas.novosMes}</p>
                </div>
                <UserPlus className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-700 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-90">Consultas Hoje</p>
                  <p className="text-2xl font-bold">{estatisticas.consultasHoje}</p>
                </div>
                <Calendar className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-600 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-90">Consultas Semana</p>
                  <p className="text-2xl font-bold">{estatisticas.consultasSemana}</p>
                </div>
                <Activity className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Ativos</p>
                  <p className="text-2xl font-bold text-green-600">{estatisticas.pacientesAtivos}</p>
                </div>
                <UserCheck className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Inativos</p>
                  <p className="text-2xl font-bold text-red-600">{estatisticas.pacientesInativos}</p>
                </div>
                <UserX className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* TABS */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-white shadow-sm">
            <TabsTrigger value="list" className="gap-2">
              <Users className="h-4 w-4" />
              Lista de Pacientes
            </TabsTrigger>
            <TabsTrigger value="demographics" className="gap-2">
              <PieChart className="h-4 w-4" />
              Demografia
            </TabsTrigger>
            <TabsTrigger value="reminders" className="gap-2">
              <Bell className="h-4 w-4" />
              Lembretes
            </TabsTrigger>
          </TabsList>

          {/* TAB LISTA DE PACIENTES */}
          <TabsContent value="list" className="space-y-4">
            {/* SEARCH AND FILTERS */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Pesquisar por nome, telefone ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-slate-200 focus:border-blue-300"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Ativos</SelectItem>
                  <SelectItem value="inactive">Inativos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* TABLE */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-white rounded-t-xl">
                <CardTitle className="flex items-center justify-between">
                  <span>Lista de Pacientes</span>
                  <span className="text-sm font-normal text-slate-500">
                    {filteredPacientes.length} pacientes encontrados
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                <div className="">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50">
                        <TableHead className="font-semibold">Paciente</TableHead>
                        <TableHead className="font-semibold">Contacto</TableHead>
                        <TableHead className="font-semibold">Idade</TableHead>
                        <TableHead className="font-semibold">Tipo Sanguíneo</TableHead>
                        <TableHead className="font-semibold">Última Consulta</TableHead>
                        <TableHead className="font-semibold">Próxima Consulta</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold text-center">Ações</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {filteredPacientes.map((paciente) => (
                        <TableRow key={paciente.id} className="hover:bg-slate-50 transition-colors">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className={`h-10 w-10 ${getRandomColor(paciente.id)} text-white`}>
                                <AvatarFallback>{getInitials(paciente.nome)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-slate-800">{paciente.nome}</p>
                                <p className="text-xs text-slate-400">ID: {paciente.id}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 text-sm">
                                <Phone className="h-3 w-3 text-slate-400" />
                                <span>{paciente.telefone}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <Mail className="h-3 w-3 text-slate-400" />
                                <span className="text-xs">{paciente.email}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-slate-400" />
                              <span>{paciente.idade} anos</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                              <Blinds className="h-3 w-3 mr-1" />
                              {paciente.tipoSanguineo}
                            </Badge>
                          </TableCell>
                          <TableCell>{paciente.ultimaConsulta}</TableCell>
                          <TableCell>
                            {paciente.proximaConsulta ? (
                              <span className="text-amber-600">{paciente.proximaConsulta}</span>
                            ) : (
                              <span className="text-slate-400">Não agendada</span>
                            )}
                          </TableCell>
                          <TableCell>{getStatusBadge(paciente.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openViewDialog(paciente)}
                              >
                                <Eye className="h-4 w-4 text-blue-500" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEditDialog(paciente)}
                              >
                                <Edit className="h-4 w-4 text-green-500" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedPaciente(paciente);
                                  setShowDeleteDialog(true);
                                }}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
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
          </TabsContent>

          {/* TAB DEMOGRAFIA */}
          <TabsContent value="demographics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Género */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    Distribuição por Género
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Masculino</span>
                        <span className="font-semibold">{estatisticas.genero.masculino} pacientes</span>
                      </div>
                      <Progress value={(estatisticas.genero.masculino / estatisticas.totalPacientes) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Feminino</span>
                        <span className="font-semibold">{estatisticas.genero.feminino} pacientes</span>
                      </div>
                      <Progress value={(estatisticas.genero.feminino / estatisticas.totalPacientes) * 100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Faixa Etária */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-500" />
                    Distribuição por Idade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(estatisticas.faixaEtaria).map(([faixa, quantidade]) => (
                      <div key={faixa}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{faixa} anos</span>
                          <span className="font-semibold">{quantidade} pacientes</span>
                        </div>
                        <Progress value={(quantidade / estatisticas.totalPacientes) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tipo Sanguíneo */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Blend className="h-5 w-5 text-red-500" />
                    Tipos Sanguíneos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((tipo) => {
                      const count = pacientes.filter(p => p.tipoSanguineo === tipo).length;
                      return (
                        <div key={tipo} className="flex justify-between items-center">
                          <span className="font-medium">{tipo}</span>
                          <div className="flex items-center gap-2">
                            <Progress value={(count / estatisticas.totalPacientes) * 100} className="h-2 w-32" />
                            <span className="text-sm text-slate-500 w-12">{count} pacientes</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Condições Médicas */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-rose-500" />
                    Condições Médicas Comuns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { condicao: "Hipertensão", count: pacientes.filter(p => p.condicoes?.includes("Hipertensão")).length },
                      { condicao: "Diabetes", count: pacientes.filter(p => p.condicoes?.includes("Diabetes")).length },
                      { condicao: "Asma", count: pacientes.filter(p => p.condicoes?.includes("Asma")).length },
                      { condicao: "Artrite", count: pacientes.filter(p => p.condicoes?.includes("Artrite")).length },
                    ].filter(c => c.count > 0).map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
                        <span>{item.condicao}</span>
                        <Badge>{item.count} pacientes</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB LEMBRETES */}
          <TabsContent value="reminders" className="space-y-4">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Consultas Agendadas (Próximos 7 dias)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pacientes.filter(p => p.proximaConsulta).map((paciente) => {
                    const diasRestantes = Math.ceil((new Date(paciente.proximaConsulta).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                    if (diasRestantes <= 7 && diasRestantes >= 0) {
                      return (
                        <div key={paciente.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Avatar className={`h-10 w-10 ${getRandomColor(paciente.id)} text-white`}>
                              <AvatarFallback>{getInitials(paciente.nome)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{paciente.nome}</p>
                              <p className="text-sm text-slate-500">{paciente.telefone}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={diasRestantes === 0 ? "bg-red-500" : "bg-yellow-500"}>
                              {diasRestantes === 0 ? "Hoje" : `${diasRestantes} dias`}
                            </Badge>
                            <p className="text-sm text-slate-500 mt-1">{paciente.proximaConsulta}</p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* ADD DIALOG */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-blue-600" />
              Adicionar Novo Paciente
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Nome Completo *</Label>
              <Input value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} />
            </div>
            <div>
              <Label>Género</Label>
              <Select value={formData.genero} onValueChange={(v) => setFormData({ ...formData, genero: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Masculino">Masculino</SelectItem>
                  <SelectItem value="Feminino">Feminino</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Data de Nascimento</Label>
              <Input type="date" value={formData.dataNascimento} onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })} />
            </div>
            <div>
              <Label>Tipo Sanguíneo</Label>
              <Select value={formData.tipoSanguineo} onValueChange={(v) => setFormData({ ...formData, tipoSanguineo: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Telefone</Label>
              <Input value={formData.telefone} onChange={(e) => setFormData({ ...formData, telefone: e.target.value })} />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <Label>Endereço</Label>
              <Input value={formData.endereco} onChange={(e) => setFormData({ ...formData, endereco: e.target.value })} />
            </div>
            <div>
              <Label>Alergias</Label>
              <Input value={formData.alergias} onChange={(e) => setFormData({ ...formData, alergias: e.target.value })} placeholder="Nenhuma se aplicável" />
            </div>
            <div>
              <Label>Condições Médicas</Label>
              <Input value={formData.condicoes} onChange={(e) => setFormData({ ...formData, condicoes: e.target.value })} placeholder="Ex: Hipertensão, Diabetes" />
            </div>
            <div className="md:col-span-2">
              <Label>Medicamentos Atuais</Label>
              <Input value={formData.medicamentosAtuais} onChange={(e) => setFormData({ ...formData, medicamentosAtuais: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancelar</Button>
            <Button onClick={handleAddPaciente}>Adicionar Paciente</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EDIT DIALOG */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-green-600" />
              Editar Paciente
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Nome Completo</Label>
              <Input value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} />
            </div>
            <div>
              <Label>Género</Label>
              <Select value={formData.genero} onValueChange={(v) => setFormData({ ...formData, genero: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Masculino">Masculino</SelectItem>
                  <SelectItem value="Feminino">Feminino</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Data de Nascimento</Label>
              <Input type="date" value={formData.dataNascimento} onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })} />
            </div>
            <div>
              <Label>Tipo Sanguíneo</Label>
              <Select value={formData.tipoSanguineo} onValueChange={(v) => setFormData({ ...formData, tipoSanguineo: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Telefone</Label>
              <Input value={formData.telefone} onChange={(e) => setFormData({ ...formData, telefone: e.target.value })} />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <Label>Endereço</Label>
              <Input value={formData.endereco} onChange={(e) => setFormData({ ...formData, endereco: e.target.value })} />
            </div>
            <div>
              <Label>Alergias</Label>
              <Input value={formData.alergias} onChange={(e) => setFormData({ ...formData, alergias: e.target.value })} />
            </div>
            <div>
              <Label>Condições Médicas</Label>
              <Input value={formData.condicoes} onChange={(e) => setFormData({ ...formData, condicoes: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <Label>Medicamentos Atuais</Label>
              <Input value={formData.medicamentosAtuais} onChange={(e) => setFormData({ ...formData, medicamentosAtuais: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancelar</Button>
            <Button onClick={handleEditPaciente}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* VIEW DIALOG */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedPaciente && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className={`h-12 w-12 ${getRandomColor(selectedPaciente.id)} text-white`}>
                    <AvatarFallback className="text-lg">{getInitials(selectedPaciente.nome)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div>{selectedPaciente.nome}</div>
                    <p className="text-sm text-slate-500 font-normal">ID: {selectedPaciente.id}</p>
                  </div>
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Informações Pessoais */}
                <div>
                  <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Informações Pessoais
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-slate-500">Género:</span> {selectedPaciente.genero}</div>
                    <div><span className="text-slate-500">Idade:</span> {selectedPaciente.idade} anos</div>
                    <div><span className="text-slate-500">Data Nascimento:</span> {selectedPaciente.dataNascimento}</div>
                    <div><span className="text-slate-500">Tipo Sanguíneo:</span> {selectedPaciente.tipoSanguineo}</div>
                    <div className="col-span-2"><span className="text-slate-500">Endereço:</span> {selectedPaciente.endereco}</div>
                  </div>
                </div>

                {/* Contacto */}
                <div>
                  <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Contacto
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-slate-500">Telefone:</span> {selectedPaciente.telefone}</div>
                    <div><span className="text-slate-500">Email:</span> {selectedPaciente.email}</div>
                  </div>
                </div>

                {/* Informações Médicas */}
                <div>
                  <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    Informações Médicas
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-slate-500">Alergias:</span> {selectedPaciente.alergias || "Nenhuma"}</div>
                    <div><span className="text-slate-500">Condições:</span> {selectedPaciente.condicoes || "Nenhuma"}</div>
                    <div><span className="text-slate-500">Medicamentos:</span> {selectedPaciente.medicamentosAtuais || "Nenhum"}</div>
                  </div>
                </div>

                {/* Histórico de Consultas */}
                <div>
                  <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <History className="h-4 w-4" />
                    Histórico de Consultas
                  </h3>
                  <div className="space-y-3">
                    {selectedPaciente.historicoConsultas.map((consulta: any, idx: number) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{consulta.data}</p>
                            <p className="text-sm text-slate-600">Médico: {consulta.medico}</p>
                            <p className="text-sm mt-1"><span className="text-slate-500">Diagnóstico:</span> {consulta.diagnostico}</p>
                            <p className="text-sm"><span className="text-slate-500">Prescrição:</span> {consulta.prescricao}</p>
                          </div>
                          <Badge variant="outline" className="text-green-600">Realizada</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowViewDialog(false)}>Fechar</Button>
                <Button onClick={() => {
                  setShowViewDialog(false);
                  openEditDialog(selectedPaciente);
                }}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* DELETE DIALOG */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Eliminação</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja eliminar <strong>{selectedPaciente?.nome}</strong>?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePaciente} className="bg-red-600 hover:bg-red-700">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}