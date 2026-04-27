// modules/recepcionista/types/servicos.types.ts

export interface Paciente {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  nif?: string;
  endereco?: string;
}

export interface Atendimento {
  id: string;
  pacienteId: string;
  pacienteNome: string;
  pacienteTelefone: string;
  origem: 'whatsapp' | 'presencial' | 'telefone';
  status: 'aguardando' | 'em_atendimento' | 'aguardando_exames' | 'concluido' | 'cancelado';
  prioridade: 'normal' | 'urgente' | 'emergencia';
  dataChegada: Date;
  dataAtendimento?: Date;
  dataConclusao?: Date;
  observacoes?: string;
}

export interface Servico {
  id: string;
  nome: string;
  categoria: 'consulta' | 'exame' | 'procedimento' | 'taxa';
  descricao: string;
  preco: number;
  duracaoMinutos?: number;
  preparoNecessario?: string;
  ativo: boolean;
}

export interface ItemFatura {
  id: string;
  servicoId: string;
  servicoNome: string;
  categoria: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

export interface Fatura {
  id: string;
  numeroFatura: string;
  pacienteId: string;
  pacienteNome: string;
  pacienteNif?: string;
  atendimentoId?: string;
  data: Date;
  items: ItemFatura[];
  subtotal: number;
  desconto: number;
  iva: number;
  total: number;
  formaPagamento: 'dinheiro' | 'multicaixa' | 'transferencia' | 'seguro';
  status: 'pendente' | 'paga' | 'cancelada';
  observacoes?: string;
  atendente: string;
}

export interface FechoDia {
  data: Date;
  totalFaturas: number;
  quantidadeAtendimentos: number;
  totalConsultas: number;
  quantidadeConsultas: number;
  totalExames: number;
  quantidadeExames: number;
  porPagamento: {
    dinheiro: number;
    multicaixa: number;
    transferencia: number;
    seguro: number;
  };
  valorAbertura: number;
  valorFecho: number;
  diferenca: number;
}