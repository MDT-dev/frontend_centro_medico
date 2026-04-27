// modules/recepcionista/components/RelatoriosPanel.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  CreditCard,
  Building2,
  Shield,
  FileText,
  Users,
} from 'lucide-react';
import { Fatura, Atendimento } from '../types/servicos.types';

interface RelatoriosPanelProps {
  faturas: Fatura[];
  atendimentos: Atendimento[];
  resumoDia: {
    total: number;
    quantidade: number;
    porPagamento: {
      dinheiro: number;
      multicaixa: number;
      transferencia: number;
      seguro: number;
    };
  };
}

export function RelatoriosPanel({ faturas, atendimentos, resumoDia }: RelatoriosPanelProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value);
  };

  const atendimentosHoje = atendimentos.filter(a => 
    new Date(a.dataChegada).toDateString() === new Date().toDateString()
  );

  const faturasHoje = faturas.filter(f => 
    new Date(f.data).toDateString() === new Date().toDateString() && f.status === 'paga'
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Resumo do Dia */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-t-xl">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Resumo do Dia
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-teal-50 rounded-lg">
              <p className="text-sm text-gray-500">Total Faturado</p>
              <p className="text-2xl font-bold text-teal-600">{formatCurrency(resumoDia.total)}</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-500">Atendimentos</p>
              <p className="text-2xl font-bold text-blue-600">{atendimentosHoje.length}</p>
            </div>
          </div>

          <h4 className="font-semibold mb-3">Formas de Pagamento</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
              <span className="flex items-center gap-2"><Wallet className="h-4 w-4" /> Dinheiro</span>
              <span className="font-bold">{formatCurrency(resumoDia.porPagamento.dinheiro)}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-purple-50 rounded-lg">
              <span className="flex items-center gap-2"><CreditCard className="h-4 w-4" /> Multicaixa</span>
              <span className="font-bold">{formatCurrency(resumoDia.porPagamento.multicaixa)}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
              <span className="flex items-center gap-2"><Building2 className="h-4 w-4" /> Transferência</span>
              <span className="font-bold">{formatCurrency(resumoDia.porPagamento.transferencia)}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-orange-50 rounded-lg">
              <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> Seguro</span>
              <span className="font-bold">{formatCurrency(resumoDia.porPagamento.seguro)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Últimas Faturas */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-xl">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Últimas Faturas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            {faturasHoje.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Nenhuma fatura emitida hoje</p>
              </div>
            ) : (
              <div className="space-y-3">
                {faturasHoje.slice(-10).reverse().map((fatura) => (
                  <div key={fatura.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{fatura.numeroFatura}</p>
                      <p className="text-xs text-gray-500">{fatura.pacienteNome}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-teal-600">{formatCurrency(fatura.total)}</p>
                      <Badge variant="outline" className="text-xs">
                        {fatura.formaPagamento}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}