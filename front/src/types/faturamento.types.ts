// consultas/types/faturamento.types.ts

export interface ServicoConsulta {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: 'consulta' | 'exame' | 'procedimento' | 'taxa';
}

export interface ItemFaturaConsulta {
  id: string;
  descricao: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
  tipo: 'consulta' | 'exame' | 'medicamento' | 'procedimento' | 'taxa';
}

export interface FaturaConsulta {
  id: string;
  numeroFatura: string;
  consultaId: number;
  data: Date;
  pacienteId: number;
  pacienteNome: string;
  pacienteNif?: string;
  medicoNome: string;
  medicoEspecialidade: string;
  items: ItemFaturaConsulta[];
  subtotal: number;
  desconto: number;
  iva: number;
  total: number;
  formaPagamento: 'dinheiro' | 'multicaixa' | 'transferencia' | 'seguro';
  status: 'pendente' | 'paga' | 'cancelada' | 'isenta';
  observacoes?: string;
  atendente: string;
}

export interface FechoDiaConsolidado {
  data: Date;
  consultas: {
    total: number;
    quantidade: number;
    porMedico: { medico: string; quantidade: number; total: number }[];
    porEspecialidade: { especialidade: string; quantidade: number; total: number }[];
  };
  farmacia: {
    total: number;
    quantidade: number;
    porPagamento: {
      dinheiro: number;
      multicaixa: number;
      transferencia: number;
      seguro: number;
    };
  };
  totalGeral: number;
  quantidadeTotal: number;
  valorAbertura: number;
  valorFecho: number;
  diferenca: number;
  observacoes?: string;
}

// Preços dos serviços
export const servicosConsultas: ServicoConsulta[] = [
  { id: 'cons1', nome: 'Consulta Clínica Geral', descricao: 'Consulta médica padrão', preco: 5000, categoria: 'consulta' },
  { id: 'cons2', nome: 'Consulta Pediatria', descricao: 'Consulta para crianças', preco: 5500, categoria: 'consulta' },
  { id: 'cons3', nome: 'Consulta Cardiologia', descricao: 'Especialidade cardíaca', preco: 7500, categoria: 'consulta' },
  { id: 'cons4', nome: 'Consulta Dermatologia', descricao: 'Especialidade de pele', preco: 6500, categoria: 'consulta' },
  { id: 'exame1', nome: 'Análises Clínicas', descricao: 'Exames de sangue', preco: 3000, categoria: 'exame' },
  { id: 'exame2', nome: 'Raio-X', descricao: 'Exame radiológico', preco: 4000, categoria: 'exame' },
  { id: 'exame3', nome: 'Eletrocardiograma', descricao: 'Exame cardíaco', preco: 3500, categoria: 'exame' },
  { id: 'exame4', nome: 'Ultrassom', descricao: 'Ultrassonografia', preco: 6000, categoria: 'exame' },
  { id: 'proc1', nome: 'Pequena Cirurgia', descricao: 'Procedimento cirúrgico ambulatorial', preco: 10000, categoria: 'procedimento' },
  { id: 'proc2', nome: 'Curativo Especial', descricao: 'Curativo complexo', preco: 1500, categoria: 'procedimento' },
  { id: 'taxa1', nome: 'Taxa de Urgência', descricao: 'Atendimento de urgência', preco: 2000, categoria: 'taxa' },
];