// modules/recepcionista/components/FaturamentoPanel.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CreditCard,
  Wallet,
  Building2,
  Shield,
  Receipt,
  Plus,
  Minus,
  Trash2,
  Stethoscope,
  Microscope,
  Scissors,
  FileText,
  DollarSign,
  Search,
} from 'lucide-react';
import { Servico, ItemFatura } from '../types/servicos.types';
import { servicosPorCategoria } from '../data/servicosData';
import { FaturaModal } from './FaturaModal';

interface FaturamentoPanelProps {
  carrinho: ItemFatura[];
  onAdicionar: (servico: Servico, quantidade: number) => void;
  onRemover: (itemId: string) => void;
  onAtualizarQuantidade: (itemId: string, quantidade: number) => void;
  onLimparCarrinho: () => void;
  onEmitirFatura: (
    pacienteId: string,
    pacienteNome: string,
    formaPagamento: any,
    atendimentoId?: string,
    pacienteNif?: string,
    desconto?: number,
    observacoes?: string
  ) => void;
  calcularTotais: (desconto?: number) => { subtotal: number; iva: number; total: number };
  servicosDisponiveis: Servico[];
}

export function FaturamentoPanel({
  carrinho,
  onAdicionar,
  onRemover,
  onAtualizarQuantidade,
  onLimparCarrinho,
  onEmitirFatura,
  calcularTotais,
}: FaturamentoPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [clienteNome, setClienteNome] = useState('');
  const [clienteNif, setClienteNif] = useState('');
  const [formaPagamento, setFormaPagamento] = useState<'dinheiro' | 'multicaixa' | 'transferencia' | 'seguro'>('dinheiro');
  const [desconto, setDesconto] = useState(0);
  const [observacoes, setObservacoes] = useState('');
  const [showFatura, setShowFatura] = useState(false);
  const [faturaEmitida, setFaturaEmitida] = useState(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value);
  };

  const { subtotal, iva, total } = calcularTotais(desconto);

  const servicosFiltrados = servicosPorCategoria.exames.filter(s =>
    s.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEmitir = () => {
    if (carrinho.length === 0) {
      alert('Adicione itens ao carrinho');
      return;
    }
    if (!clienteNome) {
      alert('Informe o nome do cliente');
      return;
    }

    const fatura = onEmitirFatura(
      Date.now().toString(),
      clienteNome,
      formaPagamento,
      undefined,
      clienteNif || undefined,
      desconto,
      observacoes
    );
    setFaturaEmitida(fatura as any);
    setShowFatura(true);
    
    // Reset form
    setClienteNome('');
    setClienteNif('');
    setDesconto(0);
    setObservacoes('');
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Painel de Serviços */}
        <Card className="lg:col-span-2 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-teal-600" />
              Serviços Disponíveis
            </CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Pesquisar serviços..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="exames" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="consultas">Consultas</TabsTrigger>
                <TabsTrigger value="exames">Exames</TabsTrigger>
                <TabsTrigger value="procedimentos">Procedimentos</TabsTrigger>
                <TabsTrigger value="taxas">Taxas</TabsTrigger>
              </TabsList>

              {Object.entries(servicosPorCategoria).map(([key, servicos]) => (
                <TabsContent key={key} value={key} className="space-y-2">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="grid grid-cols-2 gap-2">
                      {servicos.filter(s => 
                        s.nome.toLowerCase().includes(searchTerm.toLowerCase())
                      ).map((servico) => (
                        <div key={servico.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-sm">{servico.nome}</p>
                              <p className="text-xs text-gray-500 line-clamp-2">{servico.descricao}</p>
                              <p className="text-teal-600 font-bold mt-1">
                                {formatCurrency(servico.preco)}
                              </p>
                              {servico.preparoNecessario && (
                                <p className="text-xs text-orange-500 mt-1">
                                  ⚠️ {servico.preparoNecessario}
                                </p>
                              )}
                            </div>
                            <div className="flex flex-col items-center gap-1">
                              <div className="flex items-center gap-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-6 w-6 p-0"
                                  onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center text-sm">{quantidade}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-6 w-6 p-0"
                                  onClick={() => setQuantidade(quantidade + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <Button
                                size="sm"
                                className="mt-1 h-7 px-2 bg-teal-600 hover:bg-teal-700"
                                onClick={() => onAdicionar(servico, quantidade)}
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Adicionar
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Carrinho e Faturamento */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Fatura
              </span>
              {carrinho.length > 0 && (
                <Button variant="ghost" size="sm" onClick={onLimparCarrinho}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Itens do Carrinho */}
            <ScrollArea className="h-[250px]">
              {carrinho.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Receipt className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Carrinho vazio</p>
                  <p className="text-sm">Adicione serviços para faturar</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {carrinho.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.servicoNome}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 w-6 p-0"
                            onClick={() => onAtualizarQuantidade(item.id, item.quantidade - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm w-8 text-center">{item.quantidade}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 w-6 p-0"
                            onClick={() => onAtualizarQuantidade(item.id, item.quantidade + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm ml-2">
                            {formatCurrency(item.subtotal)}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemover(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            <Separator />

            {/* Dados do Cliente */}
            <div className="space-y-2">
              <div>
                <Label>Cliente *</Label>
                <Input
                  placeholder="Nome do cliente"
                  value={clienteNome}
                  onChange={(e) => setClienteNome(e.target.value)}
                />
              </div>
              <div>
                <Label>NIF (opcional)</Label>
                <Input
                  placeholder="NIF para fatura com documento"
                  value={clienteNif}
                  onChange={(e) => setClienteNif(e.target.value)}
                />
              </div>
            </div>

            {/* Totais */}
            <div className="space-y-1 bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Desconto:</span>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={desconto}
                    onChange={(e) => setDesconto(Number(e.target.value))}
                    className="w-24 h-8 text-right"
                  />
                  <span>AOA</span>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span>IVA (7%):</span>
                <span>{formatCurrency(iva)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>TOTAL:</span>
                <span className="text-teal-600">{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Forma de Pagamento */}
            <div>
              <Label>Forma de Pagamento</Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <Button
                  variant={formaPagamento === 'dinheiro' ? 'default' : 'outline'}
                  className="gap-2"
                  onClick={() => setFormaPagamento('dinheiro')}
                >
                  <Wallet className="h-4 w-4" />
                  Dinheiro
                </Button>
                <Button
                  variant={formaPagamento === 'multicaixa' ? 'default' : 'outline'}
                  className="gap-2"
                  onClick={() => setFormaPagamento('multicaixa')}
                >
                  <CreditCard className="h-4 w-4" />
                  Multicaixa
                </Button>
                <Button
                  variant={formaPagamento === 'transferencia' ? 'default' : 'outline'}
                  className="gap-2"
                  onClick={() => setFormaPagamento('transferencia')}
                >
                  <Building2 className="h-4 w-4" />
                  Transferência
                </Button>
                <Button
                  variant={formaPagamento === 'seguro' ? 'default' : 'outline'}
                  className="gap-2"
                  onClick={() => setFormaPagamento('seguro')}
                >
                  <Shield className="h-4 w-4" />
                  Seguro
                </Button>
              </div>
            </div>

            {/* Observações */}
            <div>
              <Label>Observações</Label>
              <Input
                placeholder="Notas adicionais..."
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
              />
            </div>

            <Button
              className="w-full bg-teal-600 hover:bg-teal-700"
              size="lg"
              onClick={handleEmitir}
              disabled={carrinho.length === 0 || !clienteNome}
            >
              <Receipt className="h-4 w-4 mr-2" />
              Emitir Fatura
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Modal da Fatura */}
      <FaturaModal
        fatura={faturaEmitida}
        open={showFatura}
        onClose={() => setShowFatura(false)}
      />
    </>
  );
}