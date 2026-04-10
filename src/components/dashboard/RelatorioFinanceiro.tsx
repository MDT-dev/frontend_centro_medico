"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Receipt,
  Pill,
  Stethoscope,
  Syringe,
  FileText,
  Download,
  Printer,
  Calendar,
  PieChart,
  BarChart3,
  Wallet,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  CheckCircle,
  Clock,
  Building2,
  Users,
  Ambulance,
  Microscope,
  Heart,
  RefreshCw,
} from "lucide-react";

// Dados financeiros simulados
const dadosFinanceiros = {
  // Resumo do período
  resumo: {
    receitaTotal: 1256800,
    despesaTotal: 782450,
    lucroLiquido: 474350,
    margemLucro: 37.8,
    comparativoMesAnterior: 8.5,
  },

  // Receitas por categoria
  receitas: {
    consultas: {
      total: 425000,
      items: [
        { descricao: "Consultas Gerais", quantidade: 342, valorUnitario: 2500, total: 855000 },
        { descricao: "Consultas Especializadas", quantidade: 156, valorUnitario: 4500, total: 702000 },
        { descricao: "Teleconsultas", quantidade: 89, valorUnitario: 1800, total: 160200 },
      ],
    },
    farmacia: {
      total: 589300,
      items: [
        { descricao: "Medicamentos Prescritos", quantidade: 1245, valorUnitario: 350, total: 435750 },
        { descricao: "Medicamentos OTC", quantidade: 892, valorUnitario: 172, total: 153424 },
      ],
    },
    exames: {
      total: 187500,
      items: [
        { descricao: "Análises Clínicas", quantidade: 234, valorUnitario: 450, total: 105300 },
        { descricao: "Raio-X", quantidade: 78, valorUnitario: 850, total: 66300 },
        { descricao: "Ultrassonografias", quantidade: 23, valorUnitario: 1200, total: 27600 },
      ],
    },
    outros: {
      total: 55000,
      items: [
        { descricao: "Taxas Administrativas", quantidade: 156, valorUnitario: 250, total: 39000 },
        { descricao: "Certificados Médicos", quantidade: 89, valorUnitario: 180, total: 16020 },
      ],
    },
  },

  // Despesas por categoria
  despesas: {
    farmaciaInsumos: {
      total: 325400,
      items: [
        { categoria: "Medicamentos", fornecedor: "MedSaúde", valor: 185400, percentual: 57 },
        { categoria: "Material Hospitalar", fornecedor: "HospiSupplies", valor: 89000, percentual: 27.4 },
        { categoria: "Equipamentos", fornecedor: "MedEquip", valor: 51000, percentual: 15.6 },
      ],
    },
    salarios: {
      total: 287000,
      items: [
        { cargo: "Médicos", quantidade: 4, total: 142000 },
        { cargo: "Enfermeiros", quantidade: 6, total: 84000 },
        { cargo: "Farmacêuticos", quantidade: 2, total: 38000 },
        { cargo: "Administrativos", quantidade: 3, total: 23000 },
      ],
    },
    servicos: {
      total: 98000,
      items: [
        { servico: "Água e Energia", valor: 32000 },
        { servico: "Internet e Telefone", valor: 8500 },
        { servico: "Manutenção", valor: 15000 },
        { servico: "Limpeza", valor: 18000 },
        { servico: "Segurança", valor: 14500 },
        { servico: "Resíduos Hospitalares", valor: 10000 },
      ],
    },
    impostos: {
      total: 52000,
      items: [
        { tipo: "IRP", valor: 32000, percentual: 61.5 },
        { tipo: "IVA", valor: 15000, percentual: 28.8 },
        { tipo: "Segurança Social", valor: 5000, percentual: 9.7 },
      ],
    },
    outros: {
      total: 20050,
      items: [
        { descricao: "Material de Escritório", valor: 8500 },
        { descricao: "Marketing", valor: 5000 },
        { descricao: "Treinamentos", valor: 6550 },
      ],
    },
  },

  // Produtos farmacêuticos - detalhado
  produtosFarmacia: [
    { id: 1, nome: "Paracetamol 500mg", compras: 45000, vendas: 68250, margem: 51.7, stock: 120 },
    { id: 2, nome: "Amoxicilina 250mg", compras: 28000, vendas: 41160, margem: 47.0, stock: 45 },
    { id: 3, nome: "Ibuprofeno 400mg", compras: 32000, vendas: 53400, margem: 66.9, stock: 78 },
    { id: 4, nome: "Omeprazol 20mg", compras: 22500, vendas: 34425, margem: 53.0, stock: 92 },
    { id: 5, nome: "Dipirona 500mg", compras: 18500, vendas: 29500, margem: 59.5, stock: 156 },
    { id: 6, nome: "Losartana 50mg", compras: 19750, vendas: 31000, margem: 57.0, stock: 67 },
    { id: 7, nome: "Metformina 850mg", compras: 16500, vendas: 24500, margem: 48.5, stock: 89 },
    { id: 8, nome: "Atorvastatina 20mg", compras: 21250, vendas: 33200, margem: 56.2, stock: 54 },
  ],

  // Evolução mensal
  evolucaoMensal: [
    { mes: "Jan", receita: 98500, despesa: 62500, lucro: 36000 },
    { mes: "Fev", receita: 102300, despesa: 64800, lucro: 37500 },
    { mes: "Mar", receita: 108200, despesa: 67100, lucro: 41100 },
    { mes: "Abr", receita: 112500, despesa: 69800, lucro: 42700 },
    { mes: "Mai", receita: 118400, despesa: 72500, lucro: 45900 },
    { mes: "Jun", receita: 125680, despesa: 78245, lucro: 47435 },
  ],

  // Indicadores de performance
  kpis: {
    ticketMedioConsulta: 3250,
    ticketMedioFarmacia: 385,
    rotatividadeEstoque: 2.8,
    diasCoberturaEstoque: 38,
    contasPagar: 124500,
    contasReceber: 189300,
  },
};

export default function RelatorioFinanceiroPage() {
  const [periodo, setPeriodo] = useState("mes");
  const [activeTab, setActiveTab] = useState("resumo");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-xl shadow-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent">
                  Relatório Financeiro
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Centro Médico - Análise de Receitas, Despesas e Performance
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex items-center gap-2 bg-white rounded-lg border px-3 py-1">
              <Calendar className="h-4 w-4 text-slate-400" />
              <Select value={periodo} onValueChange={setPeriodo}>
                <SelectTrigger className="border-0 w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mes">Último Mês</SelectItem>
                  <SelectItem value="trimestre">Último Trimestre</SelectItem>
                  <SelectItem value="ano">Último Ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
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

        {/* CARDS RESUMO */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-700 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Receita Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">{formatCurrency(dadosFinanceiros.resumo.receitaTotal)}</p>
                <TrendingUp className="h-8 w-8 opacity-80" />
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs opacity-80">
                <ArrowUpRight className="h-3 w-3" />
                <span>+{dadosFinanceiros.resumo.comparativoMesAnterior}% vs mês anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-rose-700 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Despesa Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">{formatCurrency(dadosFinanceiros.resumo.despesaTotal)}</p>
                <TrendingDown className="h-8 w-8 opacity-80" />
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs opacity-80">
                <span>62.2% da receita</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-700 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Lucro Líquido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">{formatCurrency(dadosFinanceiros.resumo.lucroLiquido)}</p>
                <Wallet className="h-8 w-8 opacity-80" />
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs opacity-80">
                <span>Margem de {dadosFinanceiros.resumo.margemLucro}%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-700 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Ticket Médio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">{formatCurrency(dadosFinanceiros.kpis.ticketMedioConsulta)}</p>
                <CreditCard className="h-8 w-8 opacity-80" />
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs opacity-80">
                <span>Farmácia: {formatCurrency(dadosFinanceiros.kpis.ticketMedioFarmacia)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* TABS */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-white shadow-sm">
            <TabsTrigger value="resumo" className="gap-2">
              <PieChart className="h-4 w-4" />
              Resumo Geral
            </TabsTrigger>
            <TabsTrigger value="receitas" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Receitas
            </TabsTrigger>
            <TabsTrigger value="despesas" className="gap-2">
              <TrendingDown className="h-4 w-4" />
              Despesas
            </TabsTrigger>
            <TabsTrigger value="farmacia" className="gap-2">
              <Pill className="h-4 w-4" />
              Farmácia
            </TabsTrigger>
            <TabsTrigger value="evolucao" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Evolução
            </TabsTrigger>
          </TabsList>

          {/* TAB RESUMO GERAL */}
          <TabsContent value="resumo" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Distribuição Receitas */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    Distribuição das Receitas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Farmácia</span>
                        <span className="font-semibold">{formatCurrency(dadosFinanceiros.receitas.farmacia.total)}</span>
                      </div>
                      <Progress value={(dadosFinanceiros.receitas.farmacia.total / dadosFinanceiros.resumo.receitaTotal) * 100} className="h-2 bg-slate-100" />
                      <p className="text-xs text-slate-500 mt-1">{((dadosFinanceiros.receitas.farmacia.total / dadosFinanceiros.resumo.receitaTotal) * 100).toFixed(1)}% do total</p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Consultas</span>
                        <span className="font-semibold">{formatCurrency(dadosFinanceiros.receitas.consultas.total)}</span>
                      </div>
                      <Progress value={(dadosFinanceiros.receitas.consultas.total / dadosFinanceiros.resumo.receitaTotal) * 100} className="h-2 bg-slate-100" />
                      <p className="text-xs text-slate-500 mt-1">{((dadosFinanceiros.receitas.consultas.total / dadosFinanceiros.resumo.receitaTotal) * 100).toFixed(1)}% do total</p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Exames</span>
                        <span className="font-semibold">{formatCurrency(dadosFinanceiros.receitas.exames.total)}</span>
                      </div>
                      <Progress value={(dadosFinanceiros.receitas.exames.total / dadosFinanceiros.resumo.receitaTotal) * 100} className="h-2 bg-slate-100" />
                      <p className="text-xs text-slate-500 mt-1">{((dadosFinanceiros.receitas.exames.total / dadosFinanceiros.resumo.receitaTotal) * 100).toFixed(1)}% do total</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Distribuição Despesas */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-red-500" />
                    Distribuição das Despesas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Farmácia/Insumos</span>
                        <span className="font-semibold">{formatCurrency(dadosFinanceiros.despesas.farmaciaInsumos.total)}</span>
                      </div>
                      <Progress value={(dadosFinanceiros.despesas.farmaciaInsumos.total / dadosFinanceiros.resumo.despesaTotal) * 100} className="h-2 bg-slate-100" />
                      <p className="text-xs text-slate-500 mt-1">{((dadosFinanceiros.despesas.farmaciaInsumos.total / dadosFinanceiros.resumo.despesaTotal) * 100).toFixed(1)}% do total</p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Salários</span>
                        <span className="font-semibold">{formatCurrency(dadosFinanceiros.despesas.salarios.total)}</span>
                      </div>
                      <Progress value={(dadosFinanceiros.despesas.salarios.total / dadosFinanceiros.resumo.despesaTotal) * 100} className="h-2 bg-slate-100" />
                      <p className="text-xs text-slate-500 mt-1">{((dadosFinanceiros.despesas.salarios.total / dadosFinanceiros.resumo.despesaTotal) * 100).toFixed(1)}% do total</p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Serviços</span>
                        <span className="font-semibold">{formatCurrency(dadosFinanceiros.despesas.servicos.total)}</span>
                      </div>
                      <Progress value={(dadosFinanceiros.despesas.servicos.total / dadosFinanceiros.resumo.despesaTotal) * 100} className="h-2 bg-slate-100" />
                      <p className="text-xs text-slate-500 mt-1">{((dadosFinanceiros.despesas.servicos.total / dadosFinanceiros.resumo.despesaTotal) * 100).toFixed(1)}% do total</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* KPIs Adicionais */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Rotatividade Estoque</p>
                      <p className="text-2xl font-bold text-slate-800">{dadosFinanceiros.kpis.rotatividadeEstoque}x</p>
                    </div>
                    <RefreshCw className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Dias Cobertura</p>
                      <p className="text-2xl font-bold text-slate-800">{dadosFinanceiros.kpis.diasCoberturaEstoque} dias</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Contas a Receber</p>
                      <p className="text-2xl font-bold text-green-600">{formatCurrency(dadosFinanceiros.kpis.contasReceber)}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Contas a Pagar</p>
                      <p className="text-2xl font-bold text-red-600">{formatCurrency(dadosFinanceiros.kpis.contasPagar)}</p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-red-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB RECEITAS */}
          <TabsContent value="receitas" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Consultas */}
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-blue-50 rounded-t-xl">
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-blue-600" />
                    Consultas
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tipo</TableHead>
                        <TableHead className="text-right">Quantidade</TableHead>
                        <TableHead className="text-right">Valor Unit.</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dadosFinanceiros.receitas.consultas.items.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{item.descricao}</TableCell>
                          <TableCell className="text-right">{item.quantidade}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.valorUnitario)}</TableCell>
                          <TableCell className="text-right font-semibold">{formatCurrency(item.total)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-blue-50">
                        <TableCell colSpan={3} className="text-right font-bold">Subtotal</TableCell>
                        <TableCell className="text-right font-bold">{formatCurrency(dadosFinanceiros.receitas.consultas.total)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Farmácia */}
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-green-50 rounded-t-xl">
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="h-5 w-5 text-green-600" />
                    Farmácia
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Categoria</TableHead>
                        <TableHead className="text-right">Quantidade</TableHead>
                        <TableHead className="text-right">Valor Unit.</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dadosFinanceiros.receitas.farmacia.items.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{item.descricao}</TableCell>
                          <TableCell className="text-right">{item.quantidade}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.valorUnitario)}</TableCell>
                          <TableCell className="text-right font-semibold">{formatCurrency(item.total)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-green-50">
                        <TableCell colSpan={3} className="text-right font-bold">Subtotal</TableCell>
                        <TableCell className="text-right font-bold">{formatCurrency(dadosFinanceiros.receitas.farmacia.total)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Exames */}
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-purple-50 rounded-t-xl">
                  <CardTitle className="flex items-center gap-2">
                    <Microscope className="h-5 w-5 text-purple-600" />
                    Exames
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tipo</TableHead>
                        <TableHead className="text-right">Quantidade</TableHead>
                        <TableHead className="text-right">Valor Unit.</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dadosFinanceiros.receitas.exames.items.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{item.descricao}</TableCell>
                          <TableCell className="text-right">{item.quantidade}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.valorUnitario)}</TableCell>
                          <TableCell className="text-right font-semibold">{formatCurrency(item.total)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-purple-50">
                        <TableCell colSpan={3} className="text-right font-bold">Subtotal</TableCell>
                        <TableCell className="text-right font-bold">{formatCurrency(dadosFinanceiros.receitas.exames.total)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Outros */}
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-gray-50 rounded-t-xl">
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-gray-600" />
                    Outras Receitas
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Descrição</TableHead>
                        <TableHead className="text-right">Quantidade</TableHead>
                        <TableHead className="text-right">Valor Unit.</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dadosFinanceiros.receitas.outros.items.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{item.descricao}</TableCell>
                          <TableCell className="text-right">{item.quantidade}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.valorUnitario)}</TableCell>
                          <TableCell className="text-right font-semibold">{formatCurrency(item.total)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-gray-50">
                        <TableCell colSpan={3} className="text-right font-bold">Subtotal</TableCell>
                        <TableCell className="text-right font-bold">{formatCurrency(dadosFinanceiros.receitas.outros.total)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB DESPESAS */}
          <TabsContent value="despesas" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Farmácia Insumos */}
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-orange-50 rounded-t-xl">
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="h-5 w-5 text-orange-600" />
                    Farmácia e Insumos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Fornecedor</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                        <TableHead className="text-right">%</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dadosFinanceiros.despesas.farmaciaInsumos.items.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{item.categoria}</TableCell>
                          <TableCell>{item.fornecedor}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.valor)}</TableCell>
                          <TableCell className="text-right">{item.percentual}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Salários */}
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-blue-50 rounded-t-xl">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Salários
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cargo</TableHead>
                        <TableHead className="text-right">Quantidade</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dadosFinanceiros.despesas.salarios.items.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{item.cargo}</TableCell>
                          <TableCell className="text-right">{item.quantidade}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.total)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Serviços */}
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-purple-50 rounded-t-xl">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-purple-600" />
                    Serviços
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Serviço</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dadosFinanceiros.despesas.servicos.items.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{item.servico}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.valor)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Impostos e Outros */}
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-red-50 rounded-t-xl">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-red-600" />
                    Impostos e Outros
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Impostos</h4>
                    {dadosFinanceiros.despesas.impostos.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{item.tipo}</span>
                        <span className="font-semibold">{formatCurrency(item.valor)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 pt-4 border-t">
                    <h4 className="font-semibold text-sm">Outras Despesas</h4>
                    {dadosFinanceiros.despesas.outros.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{item.descricao}</span>
                        <span className="font-semibold">{formatCurrency(item.valor)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB FARMÁCIA - Produtos */}
          <TabsContent value="farmacia" className="space-y-4">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-green-600" />
                  Análise de Produtos Farmácia
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medicamento</TableHead>
                      <TableHead className="text-right">Compras</TableHead>
                      <TableHead className="text-right">Vendas</TableHead>
                      <TableHead className="text-right">Margem</TableHead>
                      <TableHead className="text-right">Stock</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dadosFinanceiros.produtosFarmacia.map((produto) => (
                      <TableRow key={produto.id}>
                        <TableCell className="font-medium">{produto.nome}</TableCell>
                        <TableCell className="text-right">{formatCurrency(produto.compras)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(produto.vendas)}</TableCell>
                        <TableCell className="text-right">
                          <span className={produto.margem > 50 ? "text-green-600 font-semibold" : "text-yellow-600"}>
                            {produto.margem}%
                          </span>
                        </TableCell>
                        <TableCell className="text-right">{produto.stock}</TableCell>
                        <TableCell>
                          {produto.stock < 20 ? (
                            <Badge className="bg-yellow-500">Stock Baixo</Badge>
                          ) : (
                            <Badge className="bg-green-500">OK</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB EVOLUÇÃO */}
          <TabsContent value="evolucao" className="space-y-4">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Evolução Mensal</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mês</TableHead>
                      <TableHead className="text-right">Receita</TableHead>
                      <TableHead className="text-right">Despesa</TableHead>
                      <TableHead className="text-right">Lucro</TableHead>
                      <TableHead className="text-right">Margem</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dadosFinanceiros.evolucaoMensal.map((item, idx) => {
                      const margem = (item.lucro / item.receita) * 100;
                      return (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">{item.mes}</TableCell>
                          <TableCell className="text-right text-green-600">{formatCurrency(item.receita)}</TableCell>
                          <TableCell className="text-right text-red-600">{formatCurrency(item.despesa)}</TableCell>
                          <TableCell className="text-right text-blue-600 font-semibold">{formatCurrency(item.lucro)}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant={margem > 35 ? "default" : "secondary"} className={margem > 35 ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                              {margem.toFixed(1)}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}