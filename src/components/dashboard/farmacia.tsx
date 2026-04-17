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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

import {
  Pill,
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Printer,
  Bell,
  Settings,
  BarChart3,
  Truck,
  Calendar,
  DollarSign,
  RefreshCw,
  ShoppingCart,
} from "lucide-react";
import { VendasTab } from "../module/farmacia/VendasTab";

// Dados estáticos (simulando backend)
const initialMedicamentos = [
  {
    id: 1,
    nome: "Paracetamol 500mg",
    stock: 120,
    vendidos: 340,
    validade: "2026-06-10",
    status: "ok",
    preco: 5.50,
    fornecedor: "MedSaúde",
    lote: "LOT-001",
    localizacao: "Prateleira A1",
  },
  {
    id: 2,
    nome: "Amoxicilina 250mg",
    stock: 0,
    vendidos: 210,
    validade: "2025-12-01",
    status: "expirado",
    preco: 12.90,
    fornecedor: "Farmácia Central",
    lote: "LOT-002",
    localizacao: "Prateleira B3",
  },
  {
    id: 3,
    nome: "Ibuprofeno 400mg",
    stock: 15,
    vendidos: 890,
    validade: "2026-01-20",
    status: "expirando",
    preco: 8.75,
    fornecedor: "MedSaúde",
    lote: "LOT-003",
    localizacao: "Prateleira A2",
  },
  {
    id: 4,
    nome: "Omeprazol 20mg",
    stock: 45,
    vendidos: 125,
    validade: "2026-08-15",
    status: "ok",
    preco: 15.30,
    fornecedor: "PharmaPlus",
    lote: "LOT-004",
    localizacao: "Prateleira C1",
  },
  {
    id: 5,
    nome: "Dipirona 500mg",
    stock: 8,
    vendidos: 567,
    validade: "2026-02-28",
    status: "expirando",
    preco: 3.90,
    fornecedor: "Farmácia Central",
    lote: "LOT-005",
    localizacao: "Prateleira A3",
  },
];

const estatisticasVendas = {
  daily: [45, 62, 38, 71, 89, 54, 67],
  weekly: 426,
  monthly: 1842,
  topMedicamentos: [
    { nome: "Ibuprofeno 400mg", quantidade: 890 },
    { nome: "Dipirona 500mg", quantidade: 567 },
    { nome: "Paracetamol 500mg", quantidade: 340 },
  ],
};

export default function FarmaciaPage() {
  const [medicamentos, setMedicamentos] = useState(initialMedicamentos);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedMedicamento, setSelectedMedicamento] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("inventory");

  // Form state
  const [formData, setFormData] = useState({
    nome: "",
    stock: "",
    preco: "",
    validade: "",
    fornecedor: "",
    localizacao: "",
  });

  const totalVendidos = medicamentos.reduce(
    (acc, m) => acc + m.vendidos,
    0
  );

  const valorTotalEstoque = medicamentos.reduce(
    (acc, m) => acc + (m.stock * m.preco),
    0
  );

  const expirados = medicamentos.filter(
    (m) => m.status === "expirado"
  ).length;

  const expirando = medicamentos.filter(
    (m) => m.status === "expirando"
  ).length;

  const semStock = medicamentos.filter((m) => m.stock === 0).length;

  const filteredMedicamentos = medicamentos.filter((m) => {
    const matchesSearch = m.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "expirado":
        return <Badge className="bg-red-500 text-white"><XCircle className="h-3 w-3 mr-1" /> Expirado</Badge>;
      case "expirando":
        return <Badge className="bg-yellow-500 text-white"><Clock className="h-3 w-3 mr-1" /> Por expirar</Badge>;
      default:
        return <Badge className="bg-green-500 text-white"><CheckCircle className="h-3 w-3 mr-1" /> OK</Badge>;
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: "Esgotado", color: "text-red-600", bg: "bg-red-50" };
    if (stock < 10) return { text: "Stock Baixo", color: "text-yellow-600", bg: "bg-yellow-50" };
    return { text: "Em Stock", color: "text-green-600", bg: "bg-green-50" };
  };

  const handleAddMedicamento = () => {
    const newMedicamento = {
      id: medicamentos.length + 1,
      nome: formData.nome,
      stock: parseInt(formData.stock),
      vendidos: 0,
      validade: formData.validade,
      status: "ok",
      preco: parseFloat(formData.preco),
      fornecedor: formData.fornecedor,
      lote: `LOT-${String(medicamentos.length + 1).padStart(3, "0")}`,
      localizacao: formData.localizacao,
    };
    setMedicamentos([...medicamentos, newMedicamento]);
    setShowAddDialog(false);
    setFormData({ nome: "", stock: "", preco: "", validade: "", fornecedor: "", localizacao: "" });
  };

  const handleEditMedicamento = () => {
    setMedicamentos(medicamentos.map(m =>
      m.id === selectedMedicamento.id
        ? { ...m, ...formData, stock: parseInt(formData.stock), preco: parseFloat(formData.preco) }
        : m
    ));
    setShowEditDialog(false);
    setSelectedMedicamento(null);
  };

  const handleDeleteMedicamento = () => {
    setMedicamentos(medicamentos.filter(m => m.id !== selectedMedicamento.id));
    setShowDeleteDialog(false);
    setSelectedMedicamento(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg">
                <Pill className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                  Farmácia - Centro Médico
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Gestão de medicamentos e stock em tempo real
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
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 gap-2 shadow-lg" onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4" />
              Novo Medicamento
            </Button>
          </div>
        </div>

        {/* CARDS KPI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-700 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Total Vendidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">{totalVendidos}</p>
                <TrendingUp className="h-8 w-8 opacity-80" />
              </div>
              <p className="text-xs opacity-80 mt-2">+12% este mês</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-500">
                Valor em Estoque
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-slate-800">
                  {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(valorTotalEstoque)}
                </p>
                <Package className="h-8 w-8 text-blue-500 opacity-70" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg border-l-4 border-l-red-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-500">
                Expirados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-red-500">{expirados}</p>
                <XCircle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg border-l-4 border-l-yellow-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-500">
                Por Expirar (30 dias)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-yellow-500">{expirando}</p>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg border-l-4 border-l-orange-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-500">
                Sem Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-orange-500">{semStock}</p>
                <AlertTriangle className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* TABS */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-white shadow-sm">
            <TabsTrigger value="vendas" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Vendas
            </TabsTrigger>
            <TabsTrigger value="inventory" className="gap-2">
              <Package className="h-4 w-4" />
              Inventário
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Análise
            </TabsTrigger>
            <TabsTrigger value="alerts" className="gap-2">
              <Bell className="h-4 w-4" />
              Alertas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vendas">
            <VendasTab />
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            {/* SEARCH AND FILTERS */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Pesquisar medicamento..."
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
                  <SelectItem value="ok">OK</SelectItem>
                  <SelectItem value="expirando">Por expirar</SelectItem>
                  <SelectItem value="expirado">Expirados</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Atualizar
              </Button>
            </div>

            {/* TABLE */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-white rounded-t-xl">
                <CardTitle className="flex items-center justify-between">
                  <span>Lista de Medicamentos</span>
                  <span className="text-sm font-normal text-slate-500">
                    {filteredMedicamentos.length} medicamentos encontrados
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50">
                        <TableHead className="font-semibold">Nome</TableHead>
                        <TableHead className="font-semibold">Stock</TableHead>
                        <TableHead className="font-semibold">Vendidos</TableHead>
                        <TableHead className="font-semibold">Preço</TableHead>
                        <TableHead className="font-semibold">Validade</TableHead>
                        <TableHead className="font-semibold">Localização</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold text-center">Ações</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {filteredMedicamentos.map((m) => {
                        const stockStatus = getStockStatus(m.stock);
                        const daysUntilExpiry = Math.ceil((new Date(m.validade).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

                        return (
                          <TableRow key={m.id} className="hover:bg-slate-50 transition-colors">
                            <TableCell className="font-medium">
                              <div>
                                <p>{m.nome}</p>
                                <p className="text-xs text-slate-400">Lote: {m.lote}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <span className={`font-semibold ${stockStatus.color}`}>
                                  {m.stock} unid.
                                </span>
                                {m.stock < 10 && m.stock > 0 && (
                                  <Progress value={(m.stock / 50) * 100} className="h-1" />
                                )}
                              </div>
                            </TableCell>
                            <TableCell>{m.vendidos}</TableCell>
                            <TableCell>
                              {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(m.preco)}
                            </TableCell>
                            <TableCell>
                              <div>
                                <p>{new Date(m.validade).toLocaleDateString('pt-PT')}</p>
                                {daysUntilExpiry <= 30 && daysUntilExpiry > 0 && (
                                  <p className="text-xs text-yellow-600">{daysUntilExpiry} dias restantes</p>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-slate-500">
                                {m.localizacao}
                              </Badge>
                            </TableCell>
                            <TableCell>{getStatusBadge(m.status)}</TableCell>
                            <TableCell>
                              <div className="flex items-center justify-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedMedicamento(m);
                                    setFormData({
                                      nome: m.nome,
                                      stock: m.stock.toString(),
                                      preco: m.preco.toString(),
                                      validade: m.validade,
                                      fornecedor: m.fornecedor,
                                      localizacao: m.localizacao,
                                    });
                                    setShowEditDialog(true);
                                  }}
                                >
                                  <Edit className="h-4 w-4 text-blue-500" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedMedicamento(m);
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

          <TabsContent value="analytics" className="space-y-4">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Estatísticas de Vendas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-slate-500 text-sm">Vendas Semanais</p>
                    <p className="text-2xl font-bold text-blue-600">{estatisticasVendas.weekly}</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-slate-500 text-sm">Vendas Mensais</p>
                    <p className="text-2xl font-bold text-green-600">{estatisticasVendas.monthly}</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-slate-500 text-sm">Ticket Médio</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(valorTotalEstoque / totalVendidos || 0)}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Top Medicamentos Mais Vendidos</h4>
                  <div className="space-y-3">
                    {estatisticasVendas.topMedicamentos.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="font-medium">{item.nome}</span>
                        <Badge className="bg-blue-100 text-blue-700">{item.quantidade} unidades</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Alertas e Notificações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {medicamentos.filter(m => m.stock < 10 && m.stock > 0).length > 0 && (
                  <Alert className="border-yellow-200 bg-yellow-50">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <AlertDescription>
                      <strong>Stock baixo:</strong> {medicamentos.filter(m => m.stock < 10 && m.stock > 0).length} medicamento(s) com stock abaixo de 10 unidades.
                    </AlertDescription>
                  </Alert>
                )}

                {medicamentos.filter(m => m.status === "expirando").length > 0 && (
                  <Alert className="border-orange-200 bg-orange-50">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <AlertDescription>
                      <strong>Próximos à expiração:</strong> {medicamentos.filter(m => m.status === "expirando").length} medicamento(s) vencem em menos de 30 dias.
                    </AlertDescription>
                  </Alert>
                )}

                {medicamentos.filter(m => m.status === "expirado").length > 0 && (
                  <Alert className="border-red-200 bg-red-50">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription>
                      <strong>Medicamentos expirados:</strong> {medicamentos.filter(m => m.status === "expirado").length} medicamento(s) estão fora da validade.
                    </AlertDescription>
                  </Alert>
                )}

                {medicamentos.filter(m => m.stock === 0).length > 0 && (
                  <Alert className="border-red-200 bg-red-50">
                    <Package className="h-4 w-4 text-red-600" />
                    <AlertDescription>
                      <strong>Fora de stock:</strong> {medicamentos.filter(m => m.stock === 0).length} medicamento(s) estão esgotados.
                    </AlertDescription>
                  </Alert>
                )}

                {medicamentos.filter(m => m.stock >= 10 && m.status === "ok").length === medicamentos.length && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription>
                      <strong>Tudo OK!</strong> Nenhum alerta ativo no momento.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>

      {/* ADD DIALOG */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Medicamento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nome do Medicamento</Label>
              <Input value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Stock Inicial</Label>
                <Input type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
              </div>
              <div>
                <Label>Preço (AOA)</Label>
                <Input type="number" step="0.01" value={formData.preco} onChange={(e) => setFormData({ ...formData, preco: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Data de Validade</Label>
              <Input type="date" value={formData.validade} onChange={(e) => setFormData({ ...formData, validade: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Fornecedor</Label>
                <Input value={formData.fornecedor} onChange={(e) => setFormData({ ...formData, fornecedor: e.target.value })} />
              </div>
              <div>
                <Label>Localização</Label>
                <Input value={formData.localizacao} onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancelar</Button>
            <Button onClick={handleAddMedicamento}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EDIT DIALOG */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Medicamento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nome do Medicamento</Label>
              <Input value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Stock</Label>
                <Input type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
              </div>
              <div>
                <Label>Preço (AOA)</Label>
                <Input type="number" step="0.01" value={formData.preco} onChange={(e) => setFormData({ ...formData, preco: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Data de Validade</Label>
              <Input type="date" value={formData.validade} onChange={(e) => setFormData({ ...formData, validade: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Fornecedor</Label>
                <Input value={formData.fornecedor} onChange={(e) => setFormData({ ...formData, fornecedor: e.target.value })} />
              </div>
              <div>
                <Label>Localização</Label>
                <Input value={formData.localizacao} onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancelar</Button>
            <Button onClick={handleEditMedicamento}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DELETE DIALOG */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminação</DialogTitle>
          </DialogHeader>
          <p>Tem certeza que deseja eliminar <strong>{selectedMedicamento?.nome}</strong>?</p>
          <p className="text-sm text-slate-500">Esta ação não pode ser desfeita.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDeleteMedicamento}>Eliminar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}