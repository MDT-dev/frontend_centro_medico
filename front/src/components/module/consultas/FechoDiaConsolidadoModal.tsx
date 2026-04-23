// consultas/components/FechoDiaConsolidadoModal.tsx
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Stethoscope,
  Pill,
  FileText,
} from 'lucide-react';

interface FechoDiaConsolidadoData {
  data: Date;
  consultas: {
    total: number;
    quantidade: number;
    porMedico: { medico: string; quantidade: number; total: number }[];
    porEspecialidade: { especialidade: string; quantidade: number; total: number }[];
  };
  farmacia: {
    total: number;
    quantidade: number;
    porPagamento: {
      dinheiro: number;
      multicaixa: number;
      transferencia: number;
      seguro: number;
    };
  };
  totalGeral: number;
  quantidadeTotal: number;
}

interface FechoDiaConsolidadoModalProps {
  open: boolean;
  onClose: () => void;
  dados: FechoDiaConsolidadoData;
  onConfirmarFecho: (dados: { valorAbertura: number; observacoes: string }) => void;
}

export function FechoDiaConsolidadoModal({
  open,
  onClose,
  dados,
  onConfirmarFecho,
}: FechoDiaConsolidadoModalProps) {
  const [valorAbertura, setValorAbertura] = useState<number>(0);
  const [observacoes, setObservacoes] = useState('');
  const [step, setStep] = useState<'resumo' | 'conferencia' | 'final'>('resumo');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value);
  };

  // CORRIGIDO: usar farmacia.porPagamento.dinheiro em vez de consultas.porPagamento
  const totalCaixa = dados.farmacia.porPagamento.dinheiro;
  const diferenca = totalCaixa - valorAbertura;

  const handleConfirmar = () => {
    onConfirmarFecho({ valorAbertura, observacoes });
    setStep('final');
  };

  const handleImprimir = () => {
    const printContent = document.getElementById('fecho-consolidado-content');
    if (printContent) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  const handleExportar = () => {
    // CORRIGIDO: remover a duplicação da propriedade data
    const dataToExport = {
      data: new Date(dados.data).toLocaleDateString('pt-PT'),
      consultas: dados.consultas,
      farmacia: dados.farmacia,
      totalGeral: dados.totalGeral,
      quantidadeTotal: dados.quantidadeTotal,
      valorAbertura,
      diferenca,
      observacoes,
    };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fecho_consolidado_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-blue-600" />
            Fecho Consolidado do Dia - {new Date(dados.data).toLocaleDateString('pt-PT')}
          </DialogTitle>
        </DialogHeader>

        <div id="fecho-consolidado-content" className="space-y-6">
          {step === 'resumo' && (
            <>
              {/* Cards de Resumo */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <CardContent className="pt-4 text-center">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-90">Consultas</p>
                        <p className="text-2xl font-bold">{dados.consultas.quantidade}</p>
                        <p className="text-sm">{formatCurrency(dados.consultas.total)}</p>
                      </div>
                      <Stethoscope className="h-8 w-8 opacity-80" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <CardContent className="pt-4 text-center">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-90">Farmácia</p>
                        <p className="text-2xl font-bold">{dados.farmacia.quantidade}</p>
                        <p className="text-sm">{formatCurrency(dados.farmacia.total)}</p>
                      </div>
                      <Pill className="h-8 w-8 opacity-80" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                  <CardContent className="pt-4 text-center">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-90">TOTAL GERAL</p>
                        <p className="text-2xl font-bold">{dados.quantidadeTotal}</p>
                        <p className="text-sm">{formatCurrency(dados.totalGeral)}</p>
                      </div>
                      <FileText className="h-8 w-8 opacity-80" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="consultas" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="consultas">Consultas</TabsTrigger>
                  <TabsTrigger value="farmacia">Farmácia</TabsTrigger>
                </TabsList>

                <TabsContent value="consultas" className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Por Médico</h4>
                    {dados.consultas.porMedico.map((medico, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span>{medico.medico}</span>
                        <div className="flex gap-4">
                          <Badge variant="outline">{medico.quantidade} consultas</Badge>
                          <span className="font-bold">{formatCurrency(medico.total)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="farmacia" className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Por Forma de Pagamento</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="flex items-center gap-2"><Wallet className="h-4 w-4" /> Dinheiro</span>
                        <span className="font-bold">{formatCurrency(dados.farmacia.porPagamento.dinheiro)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="flex items-center gap-2"><CreditCard className="h-4 w-4" /> Multicaixa</span>
                        <span className="font-bold">{formatCurrency(dados.farmacia.porPagamento.multicaixa)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="flex items-center gap-2"><Building2 className="h-4 w-4" /> Transferência</span>
                        <span className="font-bold">{formatCurrency(dados.farmacia.porPagamento.transferencia)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> Seguro</span>
                        <span className="font-bold">{formatCurrency(dados.farmacia.porPagamento.seguro)}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

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
                    <span>Total em Dinheiro (Farmácia):</span>
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
                  O fecho consolidado do dia foi registado com sucesso.
                </p>

                <Card>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Data:</span>
                        <span className="font-medium">{new Date(dados.data).toLocaleDateString('pt-PT')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total de Vendas (Consultas + Farmácia):</span>
                        <span className="font-bold text-blue-600">{formatCurrency(dados.totalGeral)}</span>
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