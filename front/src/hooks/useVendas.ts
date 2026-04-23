// hooks/useVendas.ts
import { useState, useEffect } from 'react';
import { ItemCarrinho, ProdutoVenda, FaturaProforma, FaturaFinal } from '@/types/vendas.types';

export function useVendas() {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [faturasProforma, setFaturasProforma] = useState<FaturaProforma[]>([]);
  const [faturasFinais, setFaturasFinais] = useState<FaturaFinal[]>([]);
  const [faturaAtual, setFaturaAtual] = useState<FaturaProforma | FaturaFinal | null>(null);

  // Carregar dados do localStorage
  useEffect(() => {
    const storedProformas = localStorage.getItem('farmacia_proformas');
    const storedFinais = localStorage.getItem('farmacia_faturas');
    
    if (storedProformas) setFaturasProforma(JSON.parse(storedProformas));
    if (storedFinais) setFaturasFinais(JSON.parse(storedFinais));
  }, []);

  // Salvar dados
  const salvarProformas = (novas: FaturaProforma[]) => {
    setFaturasProforma(novas);
    localStorage.setItem('farmacia_proformas', JSON.stringify(novas));
  };

  const salvarFaturasFinais = (novas: FaturaFinal[]) => {
    setFaturasFinais(novas);
    localStorage.setItem('farmacia_faturas', JSON.stringify(novas));
  };

  // Adicionar ao carrinho
  const adicionarAoCarrinho = (produto: ProdutoVenda, quantidade: number) => {
    const itemExistente = carrinho.find(item => item.produtoId === produto.id);
    
    if (itemExistente) {
      setCarrinho(carrinho.map(item =>
        item.produtoId === produto.id
          ? {
              ...item,
              quantidade: item.quantidade + quantidade,
              subtotal: (item.quantidade + quantidade) * item.preco
            }
          : item
      ));
    } else {
      setCarrinho([...carrinho, {
        id: Date.now(),
        produtoId: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        quantidade,
        subtotal: produto.preco * quantidade
      }]);
    }
  };

  const removerDoCarrinho = (itemId: number) => {
    setCarrinho(carrinho.filter(item => item.id !== itemId));
  };

  const atualizarQuantidade = (itemId: number, quantidade: number) => {
    if (quantidade <= 0) {
      removerDoCarrinho(itemId);
      return;
    }
    setCarrinho(carrinho.map(item =>
      item.id === itemId
        ? { ...item, quantidade, subtotal: item.preco * quantidade }
        : item
    ));
  };

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  const calcularTotais = () => {
    const subtotal = carrinho.reduce((acc, item) => acc + item.subtotal, 0);
    const desconto = 0;
    const iva = subtotal * 0.07;
    const total = subtotal + iva - desconto;
    return { subtotal, desconto, iva, total };
  };

  // Gerar número único
  const gerarNumero = (prefixo: string) => {
    const ano = new Date().getFullYear();
    const mes = String(new Date().getMonth() + 1).padStart(2, '0');
    const dia = String(new Date().getDate()).padStart(2, '0');
    
    let contador = 1;
    if (prefixo === 'PRO') {
      contador = faturasProforma.filter(f => 
        f.numeroProforma.includes(`${ano}${mes}`)
      ).length + 1;
    } else {
      contador = faturasFinais.filter(f => 
        f.numeroFatura.includes(`${ano}${mes}`)
      ).length + 1;
    }
    
    return `${prefixo}-${ano}${mes}${dia}-${String(contador).padStart(4, '0')}`;
  };

  // Emitir Fatura Proforma
  const emitirProforma = (dados: {
    cliente: string;
    clienteTipo: FaturaProforma['clienteTipo'];
    nif?: string;
    endereco?: string;
    telefone?: string;
    validadeDias?: number;
    observacoes?: string;
  }): FaturaProforma => {
    const { subtotal, desconto, iva, total } = calcularTotais();
    const hoje = new Date();
    const validade = new Date();
    validade.setDate(hoje.getDate() + (dados.validadeDias || 30));
    
    const novaProforma: FaturaProforma = {
      id: Date.now().toString(),
      numeroProforma: gerarNumero('PRO'),
      data: hoje,
      cliente: dados.cliente,
      clienteTipo: dados.clienteTipo,
      nif: dados.nif,
      endereco: dados.endereco,
      telefone: dados.telefone,
      items: [...carrinho],
      subtotal,
      desconto,
      iva,
      total,
      validade,
      status: 'ativa',
      observacoes: dados.observacoes,
      atendente: 'Admin',
    };

    const novasProformas = [...faturasProforma, novaProforma];
    salvarProformas(novasProformas);
    setFaturaAtual(novaProforma);
    
    return novaProforma;
  };

  // Converter Proforma para Fatura Final
  const converterProformaParaFatura = (
    proforma: FaturaProforma,
    formaPagamento: FaturaFinal['formaPagamento']
  ): FaturaFinal => {
    const novaFatura: FaturaFinal = {
      id: Date.now().toString(),
      numeroFatura: gerarNumero('FAT'),
      numeroProformaOriginal: proforma.numeroProforma,
      data: new Date(),
      cliente: proforma.cliente,
      clienteTipo: proforma.clienteTipo,
      nif: proforma.nif,
      endereco: proforma.endereco,
      telefone: proforma.telefone,
      items: proforma.items,
      subtotal: proforma.subtotal,
      desconto: proforma.desconto,
      iva: proforma.iva,
      total: proforma.total,
      formaPagamento,
      status: 'concluida',
      atendente: 'Admin',
    };

    // Atualizar status da proforma
    const proformasAtualizadas = faturasProforma.map(p =>
      p.id === proforma.id ? { ...p, status: 'convertida' as const } : p
    );
    salvarProformas(proformasAtualizadas);

    // Adicionar fatura final
    const novasFaturas = [...faturasFinais, novaFatura];
    salvarFaturasFinais(novasFaturas);
    setFaturaAtual(novaFatura);
    limparCarrinho();

    return novaFatura;
  };

  // Emitir Fatura Final Direta (sem proforma)
  const emitirFaturaFinal = (dados: {
    cliente: string;
    clienteTipo: FaturaFinal['clienteTipo'];
    nif?: string;
    endereco?: string;
    telefone?: string;
    formaPagamento: FaturaFinal['formaPagamento'];
    observacoes?: string;
  }): FaturaFinal => {
    const { subtotal, desconto, iva, total } = calcularTotais();
    
    const novaFatura: FaturaFinal = {
      id: Date.now().toString(),
      numeroFatura: gerarNumero('FAT'),
      data: new Date(),
      cliente: dados.cliente,
      clienteTipo: dados.clienteTipo,
      nif: dados.nif,
      endereco: dados.endereco,
      telefone: dados.telefone,
      items: [...carrinho],
      subtotal,
      desconto,
      iva,
      total,
      formaPagamento: dados.formaPagamento,
      status: 'concluida',
      atendente: 'Admin',
      observacoes: dados.observacoes,
    };

    const novasFaturas = [...faturasFinais, novaFatura];
    salvarFaturasFinais(novasFaturas);
    setFaturaAtual(novaFatura);
    limparCarrinho();

    return novaFatura;
  };

  // Obter faturas do dia
  const getFaturasDoDia = () => {
    const hoje = new Date().toDateString();
    return {
      proformas: faturasProforma.filter(p => 
        new Date(p.data).toDateString() === hoje && p.status === 'ativa'
      ),
      finais: faturasFinais.filter(f => 
        new Date(f.data).toDateString() === hoje && f.status === 'concluida'
      )
    };
  };

  // Obter resumo do dia
  const getResumoDia = () => {
    const { finais } = getFaturasDoDia();
    const totalVendas = finais.reduce((acc: number, f: FaturaFinal) => acc + f.total, 0);
    
    return {
      totalVendas,
      quantidadeVendas: finais.length,
      quantidadeProformas: getFaturasDoDia().proformas.length,
      porPagamento: {
        dinheiro: finais.filter((f: FaturaFinal) => f.formaPagamento === 'dinheiro').reduce((acc: number, f: FaturaFinal) => acc + f.total, 0),
        multicaixa: finais.filter((f: FaturaFinal) => f.formaPagamento === 'multicaixa').reduce((acc: number, f: FaturaFinal) => acc + f.total, 0),
        transferencia: finais.filter((f: FaturaFinal) => f.formaPagamento === 'transferencia').reduce((acc: number, f: FaturaFinal) => acc + f.total, 0),
        seguro: finais.filter((f: FaturaFinal) => f.formaPagamento === 'seguro').reduce((acc: number, f: FaturaFinal) => acc + f.total, 0),
      }
    };
  };

  return {
    carrinho,
    faturasProforma,
    faturasFinais,
    faturaAtual,
    adicionarAoCarrinho,
    removerDoCarrinho,
    atualizarQuantidade,
    limparCarrinho,
    calcularTotais,
    emitirProforma,
    emitirFaturaFinal,
    converterProformaParaFatura,
    getFaturasDoDia,
    getResumoDia,
  };
}