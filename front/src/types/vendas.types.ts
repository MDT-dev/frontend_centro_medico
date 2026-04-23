// types/vendas.types.ts
export interface ProdutoVenda {
  id: number;
  nome: string;
  preco: number;
  stock: number;
  codigo?: string;
}

export interface ItemCarrinho {
  id: number;
  produtoId: number;
  nome: string;
  preco: number;
  quantidade: number;
  subtotal: number;
}

export interface FaturaProforma {
  id: string;
  numeroProforma: string;
  data: Date;
  cliente: string;
  clienteTipo: 'particular' | 'empresa' | 'convenio';
  nif?: string;
  endereco?: string;
  telefone?: string;
  items: ItemCarrinho[];
  subtotal: number;
  desconto: number;
  iva: number;
  total: number;
  validade: Date; // Data de validade da proforma
  status: 'ativa' | 'convertida' | 'expirada' | 'cancelada';
  observacoes?: string;
  atendente: string;
}

export interface FaturaFinal {
  id: string;
  numeroFatura: string;
  numeroProformaOriginal?: string; // Se veio de uma proforma
  data: Date;
  cliente: string;
  clienteTipo: 'particular' | 'empresa' | 'convenio';
  nif?: string;
  endereco?: string;
  telefone?: string;
  items: ItemCarrinho[];
  subtotal: number;
  desconto: number;
  iva: number;
  total: number;
  formaPagamento: 'dinheiro' | 'multicaixa' | 'transferencia' | 'seguro';
  status: 'concluida' | 'cancelada';
  atendente: string;
  observacoes?: string;
}

export interface Venda extends FaturaFinal {} // Para compatibilidade

export interface FechoDia {
  data: Date;
  totalVendas: number;
  quantidadeVendas: number;
  totalDinheiro: number;
  totalMulticaixa: number;
  totalTransferencia: number;
  totalSeguro: number;
  valorAbertura: number;
  valorFecho: number;
  diferenca: number;
  observacoes?: string;
}