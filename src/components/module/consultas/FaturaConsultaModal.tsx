// consultas/components/FaturaConsultaModal.tsx
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Download, Share2, Printer, Copy, Check, FileCheck } from 'lucide-react';
import { FaturaConsulta } from '@/types/faturamento.types'; 

interface FaturaConsultaModalProps {
  fatura: FaturaConsulta | null;
  open: boolean;
  onClose: () => void;
}

export function FaturaConsultaModal({ fatura, open, onClose }: FaturaConsultaModalProps) {
  const [copied, setCopied] = useState(false);

  if (!fatura) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCopy = () => {
    const text = document.getElementById('fatura-consulta-content')?.innerText;
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById('fatura-consulta-content');
    if (printContent) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  const handleShare = async () => {
    const text = document.getElementById('fatura-consulta-content')?.innerText;
    if (navigator.share && text) {
      try {
        await navigator.share({
          title: `Fatura ${fatura.numeroFatura}`,
          text: text,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      handleCopy();
    }
  };

  const getPagamentoIcon = (tipo: string) => {
    switch (tipo) {
      case 'dinheiro': return '💰';
      case 'multicaixa': return '💳';
      case 'transferencia': return '🏦';
      case 'seguro': return '🏥';
      default: return '💵';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-green-600" />
              Fatura da Consulta - Documento Fiscal
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div id="fatura-consulta-content" className="space-y-6 p-6 bg-white rounded-lg">
          {/* Cabeçalho */}
          <div className="text-center border-b pb-4">
            <h2 className="text-2xl font-bold text-blue-700">SIGESA - Centro Médico</h2>
            <p className="text-sm text-gray-500">Sistema de Gestão de Saúde Angola</p>
            <p className="text-xs text-gray-400">NIF: 123456789 | Tel: +244 923 456 789</p>
            <p className="text-xs text-gray-400">Rua da Missão, 123 - Luanda, Angola</p>
          </div>

          {/* Nº Fatura */}
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <div>
              <p className="text-xs text-gray-500">Número da Fatura</p>
              <p className="text-lg font-bold text-gray-800">{fatura.numeroFatura}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Data de Emissão</p>
              <p className="text-sm font-semibold">{formatDate(fatura.data)}</p>
            </div>
          </div>

          {/* Dados do Paciente e Médico */}
          <div className="grid grid-cols-2 gap-4 border rounded-lg p-4">
            <div>
              <p className="text-xs text-gray-500 uppercase">Paciente</p>
              <p className="font-semibold">{fatura.pacienteNome}</p>
              {fatura.pacienteNif && <p className="text-xs">NIF: {fatura.pacienteNif}</p>}
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Médico</p>
              <p className="font-semibold">{fatura.medicoNome}</p>
              <p className="text-xs text-gray-500">{fatura.medicoEspecialidade}</p>
            </div>
          </div>

          {/* Tabela de Serviços */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Descrição</th>
                  <th className="p-2 text-center">Qtd</th>
                  <th className="p-2 text-right">Preço Unit.</th>
                  <th className="p-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {fatura.items.map((item, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-2">{item.descricao}</td>
                    <td className="p-2 text-center">{item.quantidade}</td>
                    <td className="p-2 text-right">{formatCurrency(item.precoUnitario)}</td>
                    <td className="p-2 text-right">{formatCurrency(item.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totais */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>{formatCurrency(fatura.subtotal)}</span>
              </div>
              {fatura.desconto > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Desconto:</span>
                  <span>-{formatCurrency(fatura.desconto)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span>IVA (7%):</span>
                <span>{formatCurrency(fatura.iva)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>TOTAL A PAGAR:</span>
                <span className="text-green-700 text-xl">{formatCurrency(fatura.total)}</span>
              </div>
            </div>
          </div>

          {/* Forma de Pagamento */}
          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-xl">{getPagamentoIcon(fatura.formaPagamento)}</span>
              <span className="font-semibold">Forma de Pagamento:</span>
            </div>
            <Badge className="bg-green-200 text-green-800">
              {fatura.formaPagamento === 'dinheiro' && 'Dinheiro'}
              {fatura.formaPagamento === 'multicaixa' && 'Multicaixa'}
              {fatura.formaPagamento === 'transferencia' && 'Transferência Bancária'}
              {fatura.formaPagamento === 'seguro' && 'Seguro de Saúde'}
            </Badge>
          </div>

          {/* Observações */}
          {fatura.observacoes && (
            <div className="bg-gray-50 p-3 rounded-lg text-sm">
              <p className="font-semibold">Observações:</p>
              <p className="text-gray-600">{fatura.observacoes}</p>
            </div>
          )}

          {/* Rodapé */}
          <div className="text-center text-xs text-gray-400 pt-4 border-t">
            <p>Atendente: {fatura.atendente}</p>
            <p className="mt-1">Documento emitido por sistema informático - SIGESA</p>
            <p className="mt-1">Obrigado pela preferência!</p>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <Button className="bg-green-600 hover:bg-green-700" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Imprimir Fatura
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}