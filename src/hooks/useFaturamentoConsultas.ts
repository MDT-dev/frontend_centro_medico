// consultas/hooks/useFaturamentoConsultas.ts
import { useState, useEffect } from 'react';
import { FaturaConsulta, ItemFaturaConsulta, FechoDiaConsolidado } from '../types/faturamento.types';

export function useFaturamentoConsultas() {
  const [faturasConsultas, setFaturasConsultas] = useState<FaturaConsulta[]>([]);

  // Carregar faturas do localStorage
  useEffect(() => {
    const stored = localStorage.getItem('farmacia_faturas_consultas');
    if (stored) {
      setFaturasConsultas(JSON.parse(stored));
    }
  }, []);

  // Salvar faturas
  const salvarFaturas = (novas: FaturaConsulta[]) => {
    setFaturasConsultas(novas);
    localStorage.setItem('farmacia_faturas_consultas', JSON.stringify(novas));
  };

  // Gerar número de fatura
  const gerarNumeroFatura = () => {
    const ano = new Date().getFullYear();
    const mes = String(new Date().getMonth() + 1).padStart(2, '0');
    const faturasHoje = faturasConsultas.filter(f => 
      new Date(f.data).toDateString() === new Date().toDateString()
    ).length;
    return `FAT-C-${ano}${mes}-${String(faturasHoje + 1).padStart(4, '0')}`;
  };

  // Emitir fatura para consulta
  const emitirFaturaConsulta = (dados: {
    consultaId: number;
    pacienteId: number;
    pacienteNome: string;
    pacienteNif?: string;
    medicoNome: string;
    medicoEspecialidade: string;
    items: ItemFaturaConsulta[];
    formaPagamento: FaturaConsulta['formaPagamento'];
    desconto?: number;
    observacoes?: string;
  }): FaturaConsulta => {
    const subtotal = dados.items.reduce((acc, item) => acc + item.subtotal, 0);
    const desconto = dados.desconto || 0;
    const iva = (subtotal - desconto) * 0.07;
    const total = subtotal - desconto + iva;

    const novaFatura: FaturaConsulta = {
      id: Date.now().toString(),
      numeroFatura: gerarNumeroFatura(),
      consultaId: dados.consultaId,
      data: new Date(),
      pacienteId: dados.pacienteId,
      pacienteNome: dados.pacienteNome,
      pacienteNif: dados.pacienteNif,
      medicoNome: dados.medicoNome,
      medicoEspecialidade: dados.medicoEspecialidade,
      items: dados.items,
      subtotal,
      desconto,
      iva,
      total,
      formaPagamento: dados.formaPagamento,
      status: 'paga',
      observacoes: dados.observacoes,
      atendente: 'Admin',
    };

    const novasFaturas = [...faturasConsultas, novaFatura];
    salvarFaturas(novasFaturas);

    return novaFatura;
  };

  // Obter fatura por consulta
  const getFaturaByConsultaId = (consultaId: number): FaturaConsulta | undefined => {
    return faturasConsultas.find(f => f.consultaId === consultaId);
  };

  // Obter faturas do dia
  const getFaturasConsultasDoDia = () => {
    const hoje = new Date().toDateString();
    return faturasConsultas.filter(f => 
      new Date(f.data).toDateString() === hoje && f.status === 'paga'
    );
  };

  // Obter resumo do dia para consultas
  const getResumoConsultasDia = () => {
    const faturasDia = getFaturasConsultasDoDia();
    const total = faturasDia.reduce((acc, f) => acc + f.total, 0);
    
    return {
      total,
      quantidade: faturasDia.length,
      porMedico: faturasDia.reduce((acc, f) => {
        const existing = acc.find(m => m.medico === f.medicoNome);
        if (existing) {
          existing.quantidade++;
          existing.total += f.total;
        } else {
          acc.push({ medico: f.medicoNome, quantidade: 1, total: f.total });
        }
        return acc;
      }, [] as { medico: string; quantidade: number; total: number }[]),
      porEspecialidade: faturasDia.reduce((acc, f) => {
        const existing = acc.find(e => e.especialidade === f.medicoEspecialidade);
        if (existing) {
          existing.quantidade++;
          existing.total += f.total;
        } else {
          acc.push({ especialidade: f.medicoEspecialidade, quantidade: 1, total: f.total });
        }
        return acc;
      }, [] as { especialidade: string; quantidade: number; total: number }[]),
      porPagamento: {
        dinheiro: faturasDia.filter(f => f.formaPagamento === 'dinheiro').reduce((acc, f) => acc + f.total, 0),
        multicaixa: faturasDia.filter(f => f.formaPagamento === 'multicaixa').reduce((acc, f) => acc + f.total, 0),
        transferencia: faturasDia.filter(f => f.formaPagamento === 'transferencia').reduce((acc, f) => acc + f.total, 0),
        seguro: faturasDia.filter(f => f.formaPagamento === 'seguro').reduce((acc, f) => acc + f.total, 0),
      }
    };
  };

  return {
    faturasConsultas,
    emitirFaturaConsulta,
    getFaturaByConsultaId,
    getFaturasConsultasDoDia,
    getResumoConsultasDia,
  };
}