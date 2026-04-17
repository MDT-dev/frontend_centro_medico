// components/ListaFaturasModal.tsx
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, FileText, FileCheck, Eye, TrendingUp } from 'lucide-react';
import { FaturaProforma, FaturaFinal } from '@/types/vendas.types';

interface ListaFaturasModalProps {
  open: boolean;
  onClose: () => void;
  proformas: FaturaProforma[];
  faturasFinais: FaturaFinal[];
  onVerProforma: (fatura: FaturaProforma) => void;
  onVerFatura: (fatura: FaturaFinal) => void;
  onConverterProforma: (fatura: FaturaProforma) => void;
}

export function ListaFaturasModal({
  open,
  onClose,
  proformas,
  faturasFinais,
  onVerProforma,
  onVerFatura,
  onConverterProforma,
}: ListaFaturasModalProps) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('proformas');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-PT');
  };

  const proformasFiltradas = proformas.filter(p =>
    p.numeroProforma.toLowerCase().includes(search.toLowerCase()) ||
    p.cliente.toLowerCase().includes(search.toLowerCase())
  );

  const faturasFiltradas = faturasFinais.filter(f =>
    f.numeroFatura.toLowerCase().includes(search.toLowerCase()) ||
    f.cliente.toLowerCase().includes(search.toLowerCase())
  );

  const totalProformas = proformasFiltradas.reduce((acc, p) => acc + p.total, 0);
  const totalFaturas = faturasFiltradas.reduce((acc, f) => acc + f.total, 0);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Histórico de Faturas
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Pesquisar por número ou cliente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-orange-50 p-3 rounded-lg text-center">
            <p className="text-xs text-orange-600">Total em Proformas</p>
            <p className="text-lg font-bold text-orange-700">{formatCurrency(totalProformas)}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <p className="text-xs text-green-600">Total em Faturas</p>
            <p className="text-lg font-bold text-green-700">{formatCurrency(totalFaturas)}</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="proformas" className="gap-2">
              <FileText className="h-4 w-4" />
              Proformas ({proformasFiltradas.length})
            </TabsTrigger>
            <TabsTrigger value="faturas" className="gap-2">
              <FileCheck className="h-4 w-4" />
              Faturas ({faturasFiltradas.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="proformas" className="flex-1 mt-4 overflow-hidden">
            <ScrollArea className="h-[400px]">
              <div className="space-y-2 pr-4">
                {proformasFiltradas.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Nenhuma proforma encontrada</p>
                  </div>
                ) : (
                  proformasFiltradas.map((proforma) => (
                    <div
                      key={proforma.id}
                      className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-orange-500" />
                            <p className="font-medium">{proforma.numeroProforma}</p>
                            <Badge variant={proforma.status === 'ativa' ? 'default' : 'secondary'}>
                              {proforma.status === 'ativa' ? 'Ativa' : 
                               proforma.status === 'convertida' ? 'Convertida' : 
                               proforma.status === 'expirada' ? 'Expirada' : 'Cancelada'}
                            </Badge>
                          </div>
                          <p className="text-sm mt-1">{proforma.cliente}</p>
                          <p className="text-xs text-gray-400">{formatDate(proforma.data)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-orange-600">{formatCurrency(proforma.total)}</p>
                          <p className="text-xs text-gray-400">{proforma.items.length} itens</p>
                          <div className="flex gap-1 mt-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => onVerProforma(proforma)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {proforma.status === 'ativa' && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-green-600"
                                onClick={() => onConverterProforma(proforma)}
                              >
                                <TrendingUp className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="faturas" className="flex-1 mt-4 overflow-hidden">
            <ScrollArea className="h-[400px]">
              <div className="space-y-2 pr-4">
                {faturasFiltradas.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <FileCheck className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Nenhuma fatura encontrada</p>
                  </div>
                ) : (
                  faturasFiltradas.map((fatura) => (
                    <div
                      key={fatura.id}
                      className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <FileCheck className="h-4 w-4 text-green-500" />
                            <p className="font-medium">{fatura.numeroFatura}</p>
                            <Badge className="bg-green-100 text-green-700">
                              {fatura.formaPagamento}
                            </Badge>
                          </div>
                          <p className="text-sm mt-1">{fatura.cliente}</p>
                          <p className="text-xs text-gray-400">{formatDate(fatura.data)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">{formatCurrency(fatura.total)}</p>
                          <p className="text-xs text-gray-400">{fatura.items.length} itens</p>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="mt-1"
                            onClick={() => onVerFatura(fatura)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}