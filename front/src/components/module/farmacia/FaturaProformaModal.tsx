// components/FaturaProformaModal.tsx
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
import { Download, Share2, Printer, Copy, Check, FileText } from 'lucide-react';
import { FaturaProforma } from '@/types/vendas.types';

interface FaturaProformaModalProps {
  fatura: FaturaProforma | null;
  open: boolean;
  onClose: () => void;
  onConverter?: (fatura: FaturaProforma) => void;
}

export function FaturaProformaModal({ fatura, open, onClose, onConverter }: FaturaProformaModalProps) {
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
    const text = document.getElementById('fatura-content')?.innerText;
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById('fatura-content');
    if (printContent) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  const handleShare = async () => {
    const text = document.getElementById('fatura-content')?.innerText;
    if (navigator.share && text) {
      try {
        await navigator.share({
          title: `Proforma ${fatura.numeroProforma}`,
          text: text,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      handleCopy();
    }
  };

  const isExpirada = new Date(fatura.validade) < new Date();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Fatura Proforma
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

        <div id="fatura-content" className="space-y-6 p-6 bg-white rounded-lg">
          {/* Cabeçalho */}
          <div className="text-center border-b pb-4">
            <h2 className="text-2xl font-bold text-blue-700">SIGESA - Farmácia</h2>
            <p className="text-sm text-gray-500">Centro Médico Angola</p>
            <p className="text-xs text-gray-400">NIF: 123456789 | Tel: +244 923 456 789</p>
            <p className="text-xs text-gray-400">Rua da Missão, 123 - Luanda, Angola</p>
          </div>

          {/* Título e Nº Proforma */}
          <div className="flex justify-between items-center">
            <div>
              <Badge className="bg-orange-100 text-orange-700 text-sm px-3 py-1">
                PROFORMA {isExpirada ? '(Expirada)' : ''}
              </Badge>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">Nº: {fatura.numeroProforma}</p>
              <p className="text-xs text-gray-500">Data: {formatDate(fatura.data)}</p>
              <p className="text-xs text-red-500">
                Válida até: {new Date(fatura.validade).toLocaleDateString('pt-PT')}
              </p>
            </div>
          </div>

          {/* Dados do Cliente */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Cliente</p>
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
              {fatura.endereco && (
                <div>
                  <p className="text-xs text-gray-500">Endereço</p>
                  <p className="font-semibold text-sm">{fatura.endereco}</p>
                </div>
              )}
            </div>
          </div>

          {/* Tabela de Produtos */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Produto</th>
                  <th className="p-2 text-center">Qtd</th>
                  <th className="p-2 text-right">Preço</th>
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
          <div className="space-y-2 border-t pt-4">
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
              <span>TOTAL:</span>
              <span className="text-orange-700">{formatCurrency(fatura.total)}</span>
            </div>
          </div>

          {/* Observações */}
          {fatura.observacoes && (
            <div className="bg-yellow-50 p-3 rounded-lg text-sm">
              <p className="font-semibold text-yellow-700">Observações:</p>
              <p className="text-yellow-600">{fatura.observacoes}</p>
            </div>
          )}

          {/* Rodapé */}
          <div className="text-center text-xs text-gray-400 pt-4 border-t">
            <p>Atendente: {fatura.atendente}</p>
            <p className="mt-1">Este documento é uma fatura proforma e não tem validade fiscal</p>
            <p className="mt-1 text-blue-500">** Após confirmação de pagamento, será emitida a fatura final **</p>
          </div>
        </div>

        <div className="flex justify-between gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          {!isExpirada && fatura.status === 'ativa' && onConverter && (
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => onConverter(fatura)}
            >
              <FileText className="h-4 w-4 mr-2" />
              Converter para Fatura Final
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}