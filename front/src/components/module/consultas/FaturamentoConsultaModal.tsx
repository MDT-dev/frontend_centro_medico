// FaturamentoConsultaModal.tsx
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
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
} from 'lucide-react';
import { ItemFaturaConsulta, servicosConsultas } from '@/types/faturamento.types';

interface FaturamentoConsultaModalProps {
  open: boolean;
  onClose: () => void;
  consulta: {
    id: number;
    pacienteId: number;
    pacienteNome: string;
    pacienteNif?: string;
    medicoNome: string;
    medicoEspecialidade: string;
  } | null;  // Permitir null
  onConfirmar: (dados: {
    items: ItemFaturaConsulta[];
    formaPagamento: 'dinheiro' | 'multicaixa' | 'transferencia' | 'seguro';
    desconto: number;
    observacoes: string;
  }) => void;
}

export function FaturamentoConsultaModal({
  open,
  onClose,
  consulta,
  onConfirmar,
}: FaturamentoConsultaModalProps) {
  const [items, setItems] = useState<ItemFaturaConsulta[]>([]);
  const [formaPagamento, setFormaPagamento] = useState<'dinheiro' | 'multicaixa' | 'transferencia' | 'seguro'>('dinheiro');
  const [desconto, setDesconto] = useState(0);
  const [observacoes, setObservacoes] = useState('');
  const [selectedServicos, setSelectedServicos] = useState<string[]>([]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value);
  };

  // VERIFICAÇÃO: Se consulta for null, não renderiza o conteúdo
  if (!consulta) {
    return null;
  }

  // Adicionar serviço padrão da consulta
  const adicionarServicoConsulta = () => {
    const servicoBase = servicosConsultas.find(s => s.categoria === 'consulta');
    if (servicoBase && !items.some(i => i.descricao === servicoBase.nome)) {
      const novoItem: ItemFaturaConsulta = {
        id: Date.now().toString(),
        descricao: `${servicoBase.nome} - ${consulta.medicoEspecialidade}`,
        quantidade: 1,
        precoUnitario: servicoBase.preco,
        subtotal: servicoBase.preco,
        tipo: 'consulta',
      };
      setItems([...items, novoItem]);
    }
  };

  // Adicionar serviço adicional
  const adicionarServico = (servico: typeof servicosConsultas[0]) => {
    const novoItem: ItemFaturaConsulta = {
      id: Date.now().toString(),
      descricao: servico.nome,
      quantidade: 1,
      precoUnitario: servico.preco,
      subtotal: servico.preco,
      tipo: servico.categoria,
    };
    setItems([...items, novoItem]);
    setSelectedServicos([...selectedServicos, servico.id]);
  };

  // Remover item
  const removerItem = (itemId: string) => {
    setItems(items.filter(i => i.id !== itemId));
  };

  // Atualizar quantidade
  const atualizarQuantidade = (itemId: string, quantidade: number) => {
    if (quantidade <= 0) {
      removerItem(itemId);
      return;
    }
    setItems(items.map(item =>
      item.id === itemId
        ? {
            ...item,
            quantidade,
            subtotal: item.precoUnitario * quantidade,
          }
        : item
    ));
  };

  const calcularTotais = () => {
    const subtotal = items.reduce((acc, item) => acc + item.subtotal, 0);
    const subtotalComDesconto = subtotal - desconto;
    const iva = subtotalComDesconto * 0.07;
    const total = subtotalComDesconto + iva;
    return { subtotal, iva, total };
  };

  const { subtotal, iva, total } = calcularTotais();

  const handleConfirmar = () => {
    if (items.length === 0) {
      alert('Adicione pelo menos um serviço à fatura');
      return;
    }
    onConfirmar({
      items,
      formaPagamento,
      desconto,
      observacoes,
    });
  };

  const servicosDisponiveis = servicosConsultas.filter(s => 
    !items.some(i => i.descricao === s.nome) && !selectedServicos.includes(s.id)
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Faturamento da Consulta
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Painel de Serviços */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Stethoscope className="h-4 w-4" />
                  Dados da Consulta
                </h4>
                <Button size="sm" variant="outline" onClick={adicionarServicoConsulta}>
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar Consulta Base
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-gray-500">Paciente:</span> {consulta.pacienteNome}</div>
                <div><span className="text-gray-500">Médico:</span> {consulta.medicoNome}</div>
                <div><span className="text-gray-500">Especialidade:</span> {consulta.medicoEspecialidade}</div>
                {consulta.pacienteNif && <div><span className="text-gray-500">NIF:</span> {consulta.pacienteNif}</div>}
              </div>
            </div>

            {/* Serviços Adicionais */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Serviços Adicionais
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {servicosDisponiveis.map(servico => (
                  <Button
                    key={servico.id}
                    variant="outline"
                    className="justify-start"
                    onClick={() => adicionarServico(servico)}
                  >
                    {servico.categoria === 'exame' && <Microscope className="h-4 w-4 mr-2" />}
                    {servico.categoria === 'procedimento' && <Scissors className="h-4 w-4 mr-2" />}
                    {servico.categoria === 'taxa' && <FileText className="h-4 w-4 mr-2" />}
                    <span className="flex-1 text-left">{servico.nome}</span>
                    <span className="text-blue-600">{formatCurrency(servico.preco)}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Itens da Fatura */}
            <div>
              <h4 className="font-semibold mb-2">Itens da Fatura</h4>
              {items.length === 0 ? (
                <div className="text-center py-8 text-gray-400 border rounded-lg">
                  <Receipt className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhum item adicionado</p>
                  <p className="text-sm">Adicione a consulta base ou serviços adicionais</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {item.tipo === 'consulta' && <Stethoscope className="h-4 w-4 text-blue-500" />}
                          {item.tipo === 'exame' && <Microscope className="h-4 w-4 text-teal-500" />}
                          {item.tipo === 'procedimento' && <Scissors className="h-4 w-4 text-purple-500" />}
                          <span className="font-medium">{item.descricao}</span>
                        </div>
                        <p className="text-sm text-gray-500">{formatCurrency(item.precoUnitario)} por unidade</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 w-7 p-0"
                            onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantidade}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 w-7 p-0"
                            onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="font-semibold w-24 text-right">{formatCurrency(item.subtotal)}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removerItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-400" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Painel de Totais e Pagamento */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold">Resumo da Fatura</h4>
              <div className="space-y-2">
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
                  <span className="text-green-600">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            <div>
              <Label>Forma de Pagamento</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
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

            <div>
              <Label>Observações</Label>
              <Input
                placeholder="Notas adicionais..."
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                className="mt-1"
              />
            </div>

            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
              onClick={handleConfirmar}
              disabled={items.length === 0}
            >
              <Receipt className="h-4 w-4 mr-2" />
              Emitir Fatura e Concluir
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}