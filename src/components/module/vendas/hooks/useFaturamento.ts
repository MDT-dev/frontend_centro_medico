// modules/recepcionista/hooks/useFaturamento.ts
import { useState, useEffect } from 'react';
import { Fatura, ItemFatura, Servico } from '../types/servicos.types';
import { servicosDisponiveis } from '../data/servicosData';

export function useFaturamento() {
  const [faturas, setFaturas] = useState<Fatura[]>([]);
  const [carrinho, setCarrinho] = useState<ItemFatura[]>([]);

  // Carregar do localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('faturas_recepcionista');
      if (stored) {
        const parsed = JSON.parse(stored);
        setFaturas(parsed.map((f: any) => ({ ...f, data: new Date(f.data) })));
      }
    }
  }, []);

  const salvarFaturas = (novas: Fatura[]) => {
    setFaturas(novas);
    localStorage.setItem('faturas_recepcionista', JSON.stringify(novas));
  };

  // Gerar número de fatura
  const gerarNumeroFatura = () => {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    const faturasHoje = faturas.filter(f => 
      new Date(f.data).toDateString() === hoje.toDateString()
    ).length;
    return `FAT-${ano}${mes}${dia}-${String(faturasHoje + 1).padStart(4, '0')}`;
  };

  // Adicionar serviço ao carrinho
  const adicionarAoCarrinho = (servico: Servico, quantidade: number = 1) => {
    const itemExistente = carrinho.find(item => item.servicoId === servico.id);
    
    if (itemExistente) {
      setCarrinho(carrinho.map(item =>
        item.servicoId === servico.id
          ? {
              ...item,
              quantidade: item.quantidade + quantidade,
              subtotal: (item.quantidade + quantidade) * item.precoUnitario
            }
          : item
      ));
    } else {
      setCarrinho([...carrinho, {
        id: Date.now().toString(),
        servicoId: servico.id,
        servicoNome: servico.nome,
        categoria: servico.categoria,
        quantidade,
        precoUnitario: servico.preco,
        subtotal: servico.preco * quantidade
      }]);
    }
  };

  // Remover do carrinho
  const removerDoCarrinho = (itemId: string) => {
    setCarrinho(carrinho.filter(item => item.id !== itemId));
  };

  // Atualizar quantidade
  const atualizarQuantidade = (itemId: string, quantidade: number) => {
    if (quantidade <= 0) {
      removerDoCarrinho(itemId);
      return;
    }
    setCarrinho(carrinho.map(item =>
      item.id === itemId
        ? { ...item, quantidade, subtotal: item.precoUnitario * quantidade }
        : item
    ));
  };

  // Limpar carrinho
  const limparCarrinho = () => {
    setCarrinho([]);
  };

  // Calcular totais
  const calcularTotais = (desconto: number = 0) => {
    const subtotal = carrinho.reduce((acc, item) => acc + item.subtotal, 0);
    const subtotalComDesconto = subtotal - desconto;
    const iva = subtotalComDesconto * 0.07;
    const total = subtotalComDesconto + iva;
    return { subtotal, iva, total };
  };

  // Emitir fatura
  const emitirFatura = (
    pacienteId: string,
    pacienteNome: string,
    formaPagamento: Fatura['formaPagamento'],
    atendimentoId?: string,
    pacienteNif?: string,
    desconto: number = 0,
    observacoes?: string
  ): Fatura => {
    const { subtotal, iva, total } = calcularTotais(desconto);
    
    const novaFatura: Fatura = {
      id: Date.now().toString(),
      numeroFatura: gerarNumeroFatura(),
      pacienteId,
      pacienteNome,
      pacienteNif,
      atendimentoId,
      data: new Date(),
      items: [...carrinho],
      subtotal,
      desconto,
      iva,
      total,
      formaPagamento,
      status: 'paga',
      observacoes,
      atendente: 'Recepcionista'
    };

    const novasFaturas = [...faturas, novaFatura];
    salvarFaturas(novasFaturas);
    limparCarrinho();

    return novaFatura;
  };

  // Obter fatura por atendimento
  const getFaturaByAtendimento = (atendimentoId: string) => {
    return faturas.find(f => f.atendimentoId === atendimentoId);
  };

  // Obter faturas do dia
  const getFaturasHoje = () => {
    const hoje = new Date().toDateString();
    return faturas.filter(f => new Date(f.data).toDateString() === hoje && f.status === 'paga');
  };

  // Obter resumo do dia
  const getResumoDia = () => {
    const faturasHoje = getFaturasHoje();
    const total = faturasHoje.reduce((acc, f) => acc + f.total, 0);
    
    return {
      total,
      quantidade: faturasHoje.length,
      porPagamento: {
        dinheiro: faturasHoje.filter(f => f.formaPagamento === 'dinheiro').reduce((acc, f) => acc + f.total, 0),
        multicaixa: faturasHoje.filter(f => f.formaPagamento === 'multicaixa').reduce((acc, f) => acc + f.total, 0),
        transferencia: faturasHoje.filter(f => f.formaPagamento === 'transferencia').reduce((acc, f) => acc + f.total, 0),
        seguro: faturasHoje.filter(f => f.formaPagamento === 'seguro').reduce((acc, f) => acc + f.total, 0),
      }
    };
  };

  return {
    faturas,
    carrinho,
    adicionarAoCarrinho,
    removerDoCarrinho,
    atualizarQuantidade,
    limparCarrinho,
    calcularTotais,
    emitirFatura,
    getFaturaByAtendimento,
    getFaturasHoje,
    getResumoDia
  };
}