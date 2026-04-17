// components/FechoDiaModal.tsx
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  Download,
  Printer,
  Wallet,
  CreditCard,
  Building2,
  Shield,
} from 'lucide-react';
import { Venda, FechoDia } from '@/types/vendas.types';

interface FechoDiaModalProps {
  open: boolean;
  onClose: () => void;
  vendasDoDia: Venda[];
  resumoDia: {
    totalVendas: number;
    quantidadeVendas: number;
    porPagamento: {
      dinheiro: number;
      multicaixa: number;
      transferencia: number;
      seguro: number;
    };
  };
  onConfirmarFecho: (dados: { valorAbertura: number; observacoes: string }) => void;
}

export function FechoDiaModal({
  open,
  onClose,
  vendasDoDia,
  resumoDia,
  onConfirmarFecho,
}: FechoDiaModalProps) {
  const [valorAbertura, setValorAbertura] = useState<number>(0);
  const [observacoes, setObservacoes] = useState('');
  const [step, setStep] = useState<'resumo' | 'conferencia' | 'final'>('resumo');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value);
  };

  const totalCaixa = resumoDia.porPagamento.dinheiro;
  const diferenca = totalCaixa - valorAbertura;

  const handleConfirmar = () => {
    onConfirmarFecho({ valorAbertura, observacoes });
    setStep('final');
  };

  const handleImprimir = () => {
    const printContent = document.getElementById('fecho-content');
    if (printContent) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  const handleExportar = () => {
    const data = {
      data: new Date().toLocaleDateString('pt-PT'),
      ...resumoDia,
      valorAbertura,
      diferenca,
      observacoes,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fecho_dia_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-blue-600" />
            Fecho do Dia
          </DialogTitle>
        </DialogHeader>

        <div id="fecho-content" className="space-y-6">
          {step === 'resumo' && (
            <>
              {/* Resumo do Dia */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-4 text-center">
                    <p className="text-sm text-gray-500">Total de Vendas</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(resumoDia.totalVendas)}
                    </p>
                    <Badge variant="outline" className="mt-1">
                      {resumoDia.quantidadeVendas} vendas
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-4 text-center">
                    <p className="text-sm text-gray-500">Ticket Médio</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(resumoDia.totalVendas / (resumoDia.quantidadeVendas || 1))}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Detalhe por Pagamento */}
              <div className="space-y-3">
                <h4 className="font-semibold">Detalhe por Forma de Pagamento</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Dinheiro</span>
                    </div>
                    <span className="font-bold">{formatCurrency(resumoDia.porPagamento.dinheiro)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-purple-600" />
                      <span className="text-sm">Multicaixa</span>
                    </div>
                    <span className="font-bold">{formatCurrency(resumoDia.porPagamento.multicaixa)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Transferência</span>
                    </div>
                    <span className="font-bold">{formatCurrency(resumoDia.porPagamento.transferencia)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-orange-600" />
                      <span className="text-sm">Seguro</span>
                    </div>
                    <span className="font-bold">{formatCurrency(resumoDia.porPagamento.seguro)}</span>
                  </div>
                </div>
              </div>

              {/* Últimas Vendas */}
              <div className="space-y-3">
                <h4 className="font-semibold">Últimas Vendas do Dia</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {vendasDoDia.slice(-5).reverse().map((venda) => (
                    <div key={venda.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg text-sm">
                      <div>
                        <p className="font-medium">{venda.numeroFatura}</p>
                        <p className="text-xs text-gray-500">{new Date(venda.data).toLocaleTimeString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatCurrency(venda.total)}</p>
                        <p className="text-xs capitalize">{venda.formaPagamento}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button onClick={() => setStep('conferencia')}>
                  Continuar para Conferência
                </Button>
              </div>
            </>
          )}

          {step === 'conferencia' && (
            <>
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Confirme os valores em caixa antes de finalizar o fecho do dia.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <Label>Valor de Abertura do Caixa (KZ)</Label>
                  <Input
                    type="number"
                    value={valorAbertura}
                    onChange={(e) => setValorAbertura(Number(e.target.value))}
                    placeholder="0,00"
                    className="mt-1"
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span>Total em Dinheiro (Vendas):</span>
                    <span className="font-semibold">{formatCurrency(totalCaixa)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Valor de Abertura:</span>
                    <span className="font-semibold">{formatCurrency(valorAbertura)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total em Caixa:</span>
                    <span className={`font-bold ${totalCaixa + valorAbertura >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(totalCaixa + valorAbertura)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Diferença (Vendas - Abertura):</span>
                    <span className={diferenca >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {diferenca >= 0 ? (
                        <span className="flex items-center gap-1"><TrendingUp className="h-3 w-3" /> +{formatCurrency(diferenca)}</span>
                      ) : (
                        <span className="flex items-center gap-1"><TrendingDown className="h-3 w-3" /> {formatCurrency(diferenca)}</span>
                      )}
                    </span>
                  </div>
                </div>

                <div>
                  <Label>Observações (opcional)</Label>
                  <Textarea
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    placeholder="Notas sobre o fecho do dia, ocorrências, etc."
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setStep('resumo')}>
                  Voltar
                </Button>
                <Button onClick={handleConfirmar} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirmar Fecho do Dia
                </Button>
              </div>
            </>
          )}

          {step === 'final' && (
            <>
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Fecho do Dia Concluído!</h3>
                <p className="text-gray-500">
                  O fecho do dia foi registado com sucesso.
                </p>

                <Card>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Data:</span>
                        <span className="font-medium">{new Date().toLocaleDateString('pt-PT')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total de Vendas:</span>
                        <span className="font-bold text-blue-600">{formatCurrency(resumoDia.totalVendas)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total em Caixa:</span>
                        <span className="font-bold text-green-600">{formatCurrency(totalCaixa + valorAbertura)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center gap-2">
                <Button variant="outline" onClick={handleExportar}>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
                <Button variant="outline" onClick={handleImprimir}>
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimir
                </Button>
                <Button onClick={onClose}>
                  Fechar
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}