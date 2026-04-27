// modules/recepcionista/hooks/useAtendimento.ts
import { useState, useEffect } from 'react';
import { Atendimento, Paciente } from '../types/servicos.types';

export function useAtendimento() {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [filaEspera, setFilaEspera] = useState<Atendimento[]>([]);
  const [emAtendimento, setEmAtendimento] = useState<Atendimento[]>([]);

  // Carregar do localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('atendimentos');
      if (stored) {
        const parsed = JSON.parse(stored);
        setAtendimentos(parsed.map((a: any) => ({ ...a, dataChegada: new Date(a.dataChegada) })));
      }
    }
  }, []);

  const salvarAtendimentos = (novos: Atendimento[]) => {
    setAtendimentos(novos);
    localStorage.setItem('atendimentos', JSON.stringify(novos));
    atualizarFilas(novos);
  };

  const atualizarFilas = (todos: Atendimento[]) => {
    setFilaEspera(todos.filter(a => a.status === 'aguardando').sort((a, b) => {
      if (a.prioridade === 'emergencia' && b.prioridade !== 'emergencia') return -1;
      if (a.prioridade === 'urgente' && b.prioridade === 'normal') return -1;
      return new Date(a.dataChegada).getTime() - new Date(b.dataChegada).getTime();
    }));
    setEmAtendimento(todos.filter(a => a.status === 'em_atendimento' || a.status === 'aguardando_exames'));
  };

  // Registrar novo atendimento vindo do WhatsApp
  const registrarAtendimentoWhatsApp = (
    paciente: Paciente,
    observacoes?: string
  ): Atendimento => {
    const novoAtendimento: Atendimento = {
      id: Date.now().toString(),
      pacienteId: paciente.id,
      pacienteNome: paciente.nome,
      pacienteTelefone: paciente.telefone,
      origem: 'whatsapp',
      status: 'aguardando',
      prioridade: 'normal',
      dataChegada: new Date(),
      observacoes
    };

    const novos: Atendimento[] = [...atendimentos, novoAtendimento];
    salvarAtendimentos(novos);
    return novoAtendimento;
  };

  // Registrar atendimento presencial
  const registrarAtendimentoPresencial = (
    paciente: Paciente,
    prioridade: 'normal' | 'urgente' | 'emergencia' = 'normal',
    observacoes?: string
  ): Atendimento => {
    const novoAtendimento: Atendimento = {
      id: Date.now().toString(),
      pacienteId: paciente.id,
      pacienteNome: paciente.nome,
      pacienteTelefone: paciente.telefone,
      origem: 'presencial',
      status: 'aguardando',
      prioridade,
      dataChegada: new Date(),
      observacoes
    };

    const novos = [...atendimentos, novoAtendimento];
    salvarAtendimentos(novos);
    return novoAtendimento;
  };

  // Iniciar atendimento
  const iniciarAtendimento = (atendimentoId: string) => {
    const novos: Atendimento[] = atendimentos.map(a =>
      a.id === atendimentoId
        ? { ...a, status: 'em_atendimento' }
        : a
    );
    salvarAtendimentos(novos);
  };

  // Encaminhar para exames
  const encaminharParaExames = (atendimentoId: string) => {
    const novos: Atendimento[] = atendimentos.map(a =>
      a.id === atendimentoId
        ? { ...a, status: 'aguardando_exames' }
        : a
    );
    salvarAtendimentos(novos);
  };

  // Concluir atendimento
  const concluirAtendimento = (atendimentoId: string) => {
    const novos: Atendimento[] = atendimentos.map(a =>
      a.id === atendimentoId
        ? { ...a, status: 'concluido', dataConclusao: new Date() }
        : a
    );
    salvarAtendimentos(novos);
  };

  // Cancelar atendimento
  const cancelarAtendimento = (atendimentoId: string) => {
    const novos: Atendimento[] = atendimentos.map(a =>
      a.id === atendimentoId
        ? { ...a, status: 'cancelado', dataConclusao: new Date() }
        : a
    );
    salvarAtendimentos(novos);
  };

  // Buscar atendimento por ID
  const getAtendimento = (id: string) => {
    return atendimentos.find(a => a.id === id);
  };

  // Obter atendimentos do dia
  const getAtendimentosHoje = () => {
    const hoje = new Date().toDateString();
    return atendimentos.filter(a => new Date(a.dataChegada).toDateString() === hoje);
  };

  return {
    atendimentos,
    filaEspera,
    emAtendimento,
    registrarAtendimentoWhatsApp,
    registrarAtendimentoPresencial,
    iniciarAtendimento,
    encaminharParaExames,
    concluirAtendimento,
    cancelarAtendimento,
    getAtendimento,
    getAtendimentosHoje
  };
}