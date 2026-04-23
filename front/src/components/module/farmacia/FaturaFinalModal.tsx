// components/FaturaFinalModal.tsx
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
import { Download, Share2, Printer, Copy, Check, FileCheck, QrCode } from 'lucide-react';
import { FaturaFinal } from '@/types/vendas.types';

interface FaturaFinalModalProps {
  fatura: FaturaFinal | null;
  open: boolean;
  onClose: () => void;
}

export function FaturaFinalModal({ fatura, open, onClose }: FaturaFinalModalProps) {
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

  const getPagamentoIcon = (tipo: string) => {
    switch (tipo) {
      case 'dinheiro': return '💰';
      case 'multicaixa': return '💳';
      case 'transferencia': return '🏦';
      case 'seguro': return '🏥';
      default: return '💵';
    }
  };

  const getPagamentoNome = (tipo: string) => {
    switch (tipo) {
      case 'dinheiro': return 'Dinheiro';
      case 'multicaixa': return 'Multicaixa';
      case 'transferencia': return 'Transferência Bancária';
      case 'seguro': return 'Seguro de Saúde';
      default: return tipo;
    }
  };

  const handleCopy = () => {
    const text = document.getElementById('fatura-final-content')?.innerText;
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById('fatura-final-content');
    if (printContent) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  const handleShare = async () => {
    const text = document.getElementById('fatura-final-content')?.innerText;
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

  const handleDownload = () => {
    const element = document.getElementById('fatura-final-content');
    if (element) {
      // Aqui você pode implementar a geração de PDF
      alert('Função de download em desenvolvimento');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-green-600" />
              Fatura Final - Documento Fiscal
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
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div id="fatura-final-content" className="space-y-6 p-6 bg-white rounded-lg">
          {/* Cabeçalho */}
          <div className="text-center border-b pb-4">
            <div className="flex justify-between items-start">
              <div className="text-left">
                <h2 className="text-xl font-bold text-blue-700">SIGESA - Farmácia</h2>
                <p className="text-xs text-gray-500">Centro Médico Angola</p>
              </div>
              <div className="text-right">
                <Badge className="bg-green-100 text-green-700 text-sm px-3 py-1">
                  FATURA FINAL
                </Badge>
                <p className="text-xs text-gray-500 mt-1">Documento Fiscal</p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-xs text-gray-400">NIF: 123456789 | Tel: +244 923 456 789</p>
              <p className="text-xs text-gray-400">Rua da Missão, 123 - Luanda, Angola</p>
            </div>
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

          {/* Dados do Cliente */}
          <div className="border rounded-lg p-4">
            <p className="text-xs text-gray-500 uppercase mb-2">Dados do Cliente</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">{fatura.cliente}</p>
                <p className="text-xs text-gray-500 capitalize">{fatura.clienteTipo}</p>
              </div>
              {fatura.nif && (
                <div>
                  <p className="text-xs text-gray-500">NIF</p>
                  <p className="font-semibold">{fatura.nif}</p>
                </div>
              )}
              {fatura.telefone && (
                <div>
                  <p className="text-xs text-gray-500">Telefone</p>
                  <p className="font-semibold">{fatura.telefone}</p>
                </div>
              )}
            </div>
          </div>

          {/* Tabela de Produtos */}
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
                    <td className="p-2">{item.nome}</td>
                    <td className="p-2 text-center">{item.quantidade}</td>
                    <td className="p-2 text-right">{formatCurrency(item.preco)}</td>
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
              {getPagamentoNome(fatura.formaPagamento)}
            </Badge>
          </div>

          {/* Referência da Proforma Original */}
          {fatura.numeroProformaOriginal && (
            <div className="text-center text-xs text-gray-400">
              <p>Fatura emitida com base na Proforma Nº: {fatura.numeroProformaOriginal}</p>
            </div>
          )}

          {/* Observações */}
          {fatura.observacoes && (
            <div className="bg-gray-50 p-3 rounded-lg text-sm">
              <p className="font-semibold">Observações:</p>
              <p className="text-gray-600">{fatura.observacoes}</p>
            </div>
          )}

          {/* Rodapé */}
          <div className="text-center text-xs text-gray-400 pt-4 border-t">
            <div className="flex justify-center gap-4 mb-2">
              <span>🏥 Atendente: {fatura.atendente}</span>
              <span>📅 Data: {formatDate(fatura.data)}</span>
            </div>
            <p>Documento emitido por sistema informático - SIGESA</p>
            <p className="mt-1">Obrigado pela preferência!</p>
            <div className="mt-2 flex justify-center">
              <QrCode className="h-12 w-12 text-gray-300" />
            </div>
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