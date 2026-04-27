// modules/recepcionista/data/servicosData.ts
import { Servico } from '../types/servicos.types';

// Preços em Kwanza (AOA)
export const servicosDisponiveis: Servico[] = [
  // ========== CONSULTAS ==========
  {
    id: 'cons1',
    nome: 'Consulta Clínica Geral',
    categoria: 'consulta',
    descricao: 'Avaliação médica completa, histórico clínico, exame físico e diagnóstico',
    preco: 5000,
    duracaoMinutos: 30,
    ativo: true
  },
  {
    id: 'cons2',
    nome: 'Consulta Pediatria',
    categoria: 'consulta',
    descricao: 'Consulta especializada para crianças (0-12 anos)',
    preco: 5500,
    duracaoMinutos: 30,
    ativo: true
  },
  {
    id: 'cons3',
    nome: 'Consulta Ginecologia',
    categoria: 'consulta',
    descricao: 'Saúde da mulher, prevenção e acompanhamento',
    preco: 6500,
    duracaoMinutos: 40,
    ativo: true
  },
  {
    id: 'cons4',
    nome: 'Consulta Dermatologia',
    categoria: 'consulta',
    descricao: 'Avaliação de pele, cabelo e unhas',
    preco: 6000,
    duracaoMinutos: 30,
    ativo: true
  },
  {
    id: 'cons5',
    nome: 'Consulta Cardiologia',
    categoria: 'consulta',
    descricao: 'Avaliação cardiológica com eletrocardiograma',
    preco: 7500,
    duracaoMinutos: 45,
    ativo: true
  },
  {
    id: 'cons6',
    nome: 'Consulta Nutrição',
    categoria: 'consulta',
    descricao: 'Avaliação nutricional e plano alimentar',
    preco: 4500,
    duracaoMinutos: 40,
    ativo: true
  },
  {
    id: 'cons7',
    nome: 'Consulta Psicologia',
    categoria: 'consulta',
    descricao: 'Acompanhamento psicológico',
    preco: 5500,
    duracaoMinutos: 50,
    ativo: true
  },
  {
    id: 'cons8',
    nome: 'Consulta Ortopedia',
    categoria: 'consulta',
    descricao: 'Avaliação de problemas osteoarticulares',
    preco: 6000,
    duracaoMinutos: 35,
    ativo: true
  },

  // ========== EXAMES LABORATORIAIS ==========
  {
    id: 'exam1',
    nome: 'Hemograma Completo',
    categoria: 'exame',
    descricao: 'Avaliação das células sanguíneas',
    preco: 2500,
    duracaoMinutos: 15,
    preparoNecessario: 'Jejum de 4 horas',
    ativo: true
  },
  {
    id: 'exam2',
    nome: 'Glicemia (Açúcar no Sangue)',
    categoria: 'exame',
    descricao: 'Medição da glicose sanguínea',
    preco: 800,
    duracaoMinutos: 10,
    preparoNecessario: 'Jejum de 8 horas',
    ativo: true
  },
  {
    id: 'exam3',
    nome: 'Colesterol Total e Frações',
    categoria: 'exame',
    descricao: 'Perfil lipídico completo',
    preco: 1800,
    duracaoMinutos: 10,
    preparoNecessario: 'Jejum de 12 horas',
    ativo: true
  },
  {
    id: 'exam4',
    nome: 'Triglicerídeos',
    categoria: 'exame',
    descricao: 'Medição de gorduras no sangue',
    preco: 1200,
    duracaoMinutos: 10,
    preparoNecessario: 'Jejum de 12 horas',
    ativo: true
  },
  {
    id: 'exam5',
    nome: 'Urina Tipo I (EAS)',
    categoria: 'exame',
    descricao: 'Análise de urina',
    preco: 1500,
    duracaoMinutos: 15,
    preparoNecessario: 'Primeira urina da manhã',
    ativo: true
  },
  {
    id: 'exam6',
    nome: 'Teste de Gravidez (Urina)',
    categoria: 'exame',
    descricao: 'Detecção de beta HCG',
    preco: 1000,
    duracaoMinutos: 10,
    ativo: true
  },
  {
    id: 'exam7',
    nome: 'Hemoglobina Glicada',
    categoria: 'exame',
    descricao: 'Controle de diabetes (3 meses)',
    preco: 2000,
    duracaoMinutos: 10,
    preparoNecessario: 'Jejum de 8 horas',
    ativo: true
  },
  {
    id: 'exam8',
    nome: 'Creatinina',
    categoria: 'exame',
    descricao: 'Função renal',
    preco: 1000,
    duracaoMinutos: 10,
    preparoNecessario: 'Jejum de 8 horas',
    ativo: true
  },
  {
    id: 'exam9',
    nome: 'Ácido Úrico',
    categoria: 'exame',
    descricao: 'Avaliação de gota e função renal',
    preco: 1000,
    duracaoMinutos: 10,
    preparoNecessario: 'Jejum de 8 horas',
    ativo: true
  },
  {
    id: 'exam10',
    nome: 'Teste Rápido de Malária',
    categoria: 'exame',
    descricao: 'Detecção de Plasmodium',
    preco: 1500,
    duracaoMinutos: 15,
    ativo: true
  },
  {
    id: 'exam11',
    nome: 'Teste Rápido HIV',
    categoria: 'exame',
    descricao: 'Detecção de anticorpos HIV',
    preco: 2000,
    duracaoMinutos: 20,
    ativo: true
  },
  {
    id: 'exam12',
    nome: 'Teste COVID-19 (Antígeno)',
    categoria: 'exame',
    descricao: 'Detecção rápida de SARS-CoV-2',
    preco: 3000,
    duracaoMinutos: 15,
    ativo: true
  },

  // ========== EXAMES DE IMAGEM ==========
  {
    id: 'img1',
    nome: 'Raio-X Tórax (PA)',
    categoria: 'exame',
    descricao: 'Imagem radiográfica do tórax',
    preco: 3500,
    duracaoMinutos: 15,
    ativo: true
  },
  {
    id: 'img2',
    nome: 'Raio-X Membros (por região)',
    categoria: 'exame',
    descricao: 'Raio-X de braço, perna, mão ou pé',
    preco: 3000,
    duracaoMinutos: 15,
    ativo: true
  },
  {
    id: 'img3',
    nome: 'Raio-X Coluna (por segmento)',
    categoria: 'exame',
    descricao: 'Raio-X de cervical, torácica ou lombar',
    preco: 3500,
    duracaoMinutos: 20,
    ativo: true
  },
  {
    id: 'img4',
    nome: 'Ultrassom Abdominal Total',
    categoria: 'exame',
    descricao: 'Ultrassonografia de abdômen',
    preco: 6000,
    duracaoMinutos: 30,
    preparoNecessario: 'Jejum de 8 horas',
    ativo: true
  },
  {
    id: 'img5',
    nome: 'Ultrassom Pélvico',
    categoria: 'exame',
    descricao: 'Ultrassonografia pélvica',
    preco: 5000,
    duracaoMinutos: 25,
    preparoNecessario: 'Bexiga cheia',
    ativo: true
  },
  {
    id: 'img6',
    nome: 'Ultrassom Obstétrico',
    categoria: 'exame',
    descricao: 'Acompanhamento gestacional',
    preco: 5500,
    duracaoMinutos: 30,
    ativo: true
  },
  {
    id: 'img7',
    nome: 'Eletrocardiograma (ECG)',
    categoria: 'exame',
    descricao: 'Registro da atividade elétrica do coração',
    preco: 3500,
    duracaoMinutos: 20,
    ativo: true
  },
  {
    id: 'img8',
    nome: 'Ecocardiograma',
    categoria: 'exame',
    descricao: 'Ultrassom do coração',
    preco: 8000,
    duracaoMinutos: 40,
    ativo: true
  },
  {
    id: 'img9',
    nome: 'Mamografia',
    categoria: 'exame',
    descricao: 'Raio-X das mamas',
    preco: 7000,
    duracaoMinutos: 20,
    ativo: true
  },
  {
    id: 'img10',
    nome: 'Densitometria Óssea',
    categoria: 'exame',
    descricao: 'Avaliação da densidade mineral óssea',
    preco: 6500,
    duracaoMinutos: 20,
    ativo: true
  },

  // ========== PROCEDIMENTOS ==========
  {
    id: 'proc1',
    nome: 'Curativo Simples',
    categoria: 'procedimento',
    descricao: 'Limpeza e curativo de ferida',
    preco: 1000,
    duracaoMinutos: 15,
    ativo: true
  },
  {
    id: 'proc2',
    nome: 'Curativo Especial',
    categoria: 'procedimento',
    descricao: 'Curativo complexo ou com medicamento',
    preco: 2000,
    duracaoMinutos: 25,
    ativo: true
  },
  {
    id: 'proc3',
    nome: 'Remoção de Pontos',
    categoria: 'procedimento',
    descricao: 'Remoção de suturas',
    preco: 800,
    duracaoMinutos: 10,
    ativo: true
  },
  {
    id: 'proc4',
    nome: 'Inalação',
    categoria: 'procedimento',
    descricao: 'Tratamento respiratório com nebulização',
    preco: 1200,
    duracaoMinutos: 20,
    ativo: true
  },
  {
    id: 'proc5',
    nome: 'Aplicaçãode Injeção',
    categoria: 'procedimento',
    descricao: 'Aplicação de medicação injetável',
    preco: 500,
    duracaoMinutos: 5,
    ativo: true
  },
  {
    id: 'proc6',
    nome: 'Coleta de Sangue (Punção)',
    categoria: 'procedimento',
    descricao: 'Coleta para exames laboratoriais',
    preco: 800,
    duracaoMinutos: 10,
    ativo: true
  },
  {
    id: 'proc7',
    nome: 'Eletrocardiograma (ECG)',
    categoria: 'procedimento',
    descricao: 'Registro da atividade elétrica cardíaca',
    preco: 3500,
    duracaoMinutos: 20,
    ativo: true
  },
  {
    id: 'proc8',
    nome: 'Teste Ergométrico (Esteira)',
    categoria: 'procedimento',
    descricao: 'Avaliação cardiológica com esforço',
    preco: 7000,
    duracaoMinutos: 45,
    ativo: true
  },

  // ========== TAXAS ==========
  {
    id: 'taxa1',
    nome: 'Taxa de Urgência',
    categoria: 'taxa',
    descricao: 'Atendimento prioritário',
    preco: 2000,
    ativo: true
  },
  {
    id: 'taxa2',
    nome: 'Laudo Médico',
    categoria: 'taxa',
    descricao: 'Emissão de laudo ou atestado detalhado',
    preco: 1500,
    ativo: true
  },
  {
    id: 'taxa3',
    nome: '2ª Via de Documento',
    categoria: 'taxa',
    descricao: 'Reimpressão de fatura ou receita',
    preco: 500,
    ativo: true
  },
  {
    id: 'taxa4',
    nome: 'Atestado de Saúde',
    categoria: 'taxa',
    descricao: 'Atestado para fins laborais ou escolares',
    preco: 1000,
    ativo: true
  }
];

// Agrupar por categoria
export const servicosPorCategoria = {
  consultas: servicosDisponiveis.filter(s => s.categoria === 'consulta'),
  exames: servicosDisponiveis.filter(s => s.categoria === 'exame'),
  procedimentos: servicosDisponiveis.filter(s => s.categoria === 'procedimento'),
  taxas: servicosDisponiveis.filter(s => s.categoria === 'taxa')
};

// Preços especiais para combos
export const combosServicos = [
  {
    id: 'combo1',
    nome: 'Check-up Básico',
    descricao: 'Consulta + Hemograma + Glicemia',
    servicos: ['cons1', 'exam1', 'exam2'],
    precoTotal: 7500,
    desconto: 800, // desconto de 800 KZ
    ativo: true
  },
  {
    id: 'combo2',
    nome: 'Check-up Cardiológico',
    descricao: 'Consulta Cardiologia + ECG + Colesterol',
    servicos: ['cons5', 'img7', 'exam3'],
    precoTotal: 13000,
    desconto: 1500,
    ativo: true
  },
  {
    id: 'combo3',
    nome: 'Check-up Pré-Natal',
    descricao: 'Consulta + Ultrassom Obstétrico + Hemograma',
    servicos: ['cons2', 'img6', 'exam1'],
    precoTotal: 11500,
    desconto: 1500,
    ativo: true
  }
];