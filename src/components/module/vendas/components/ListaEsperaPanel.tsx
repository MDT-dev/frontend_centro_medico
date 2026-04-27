// modules/recepcionista/components/ListaEsperaPanel.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Atendimento, Paciente } from '../types/servicos.types';
import {
  Clock,
  AlertTriangle,
  TrendingUp,
  Phone,
  UserPlus,
  CheckCircle,
  XCircle,
  MessageCircle,
  Users,
} from 'lucide-react';

interface ListaEsperaPanelProps {
  filaEspera: Atendimento[];
  emAtendimento: Atendimento[];
  onIniciarAtendimento: (id: string) => void;
  onRegistrarWhatsApp: (paciente: Paciente, observacoes?: string) => void;
  onRegistrarPresencial: (paciente: Paciente, prioridade: 'normal' | 'urgente' | 'emergencia', observacoes?: string) => void;
}

// Mock de pacientes para exemplo (vem do módulo de pacientes)
const pacientesMock: Paciente[] = [
  { id: '1', nome: 'Maria Celeste Santos', telefone: '+244 923 456 789', email: 'maria@email.com' },
  { id: '2', nome: 'João Manuel Fernandes', telefone: '+244 912 345 678', email: 'joao@email.com' },
  { id: '3', nome: 'Ana Beatriz Silva', telefone: '+244 934 567 890', email: 'ana@email.com' },
];

export function ListaEsperaPanel({
  filaEspera,
  emAtendimento,
  onIniciarAtendimento,
  onRegistrarWhatsApp,
  onRegistrarPresencial,
}: ListaEsperaPanelProps) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [addType, setAddType] = useState<'whatsapp' | 'presencial'>('presencial');
  const [selectedPaciente, setSelectedPaciente] = useState<string>('');
  const [prioridade, setPrioridade] = useState<'normal' | 'urgente' | 'emergencia'>('normal');
  const [observacoes, setObservacoes] = useState('');
  const [whatsappNumero, setWhatsappNumero] = useState('');
  const [whatsappNome, setWhatsappNome] = useState('');

  const getPrioridadeIcon = (prioridade: string) => {
    switch (prioridade) {
      case 'emergencia': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'urgente': return <TrendingUp className="h-4 w-4 text-orange-500" />;
      default: return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  const getPrioridadeBadge = (prioridade: string) => {
    switch (prioridade) {
      case 'emergencia':
        return <Badge className="bg-red-500 text-white">EMERGÊNCIA</Badge>;
      case 'urgente':
        return <Badge className="bg-orange-500 text-white">URGENTE</Badge>;
      default:
        return <Badge variant="outline">NORMAL</Badge>;
    }
  };

  const getOrigemIcon = (origem: string) => {
    switch (origem) {
      case 'whatsapp': return <MessageCircle className="h-3 w-3 text-green-500" />;
      case 'telefone': return <Phone className="h-3 w-3 text-blue-500" />;
      default: return <Users className="h-3 w-3 text-gray-500" />;
    }
  };

  const handleRegistrar = () => {
    if (addType === 'whatsapp') {
      const novoPaciente: Paciente = {
        id: Date.now().toString(),
        nome: whatsappNome,
        telefone: whatsappNumero,
      };
      onRegistrarWhatsApp(novoPaciente, observacoes);
    } else {
      const paciente = pacientesMock.find(p => p.id === selectedPaciente);
      if (paciente) {
        onRegistrarPresencial(paciente, prioridade, observacoes);
      }
    }
    setShowAddDialog(false);
    resetForm();
  };

  const resetForm = () => {
    setSelectedPaciente('');
    setPrioridade('normal');
    setObservacoes('');
    setWhatsappNumero('');
    setWhatsappNome('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Fila de Espera */}
      <Card className="border-0 shadow-xl lg:col-span-2">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-xl">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Fila de Espera ({filaEspera.length})
            </CardTitle>
            <Button 
              variant="secondary" 
              size="sm" 
              className="gap-2"
              onClick={() => {
                setAddType('presencial');
                setShowAddDialog(true);
              }}
            >
              <UserPlus className="h-4 w-4" />
              Novo Atendimento
            </Button>
          </div>
          <p className="text-sm opacity-90 mt-1">
            Pacientes aguardando atendimento
          </p>
        </CardHeader>
        <CardContent className="p-0">
          {filaEspera.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Nenhum paciente na fila de espera</p>
            </div>
          ) : (
            <div className="divide-y">
              {filaEspera.map((atendimento, index) => (
                <div key={atendimento.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-[50px]">
                        <p className="text-2xl font-bold text-gray-400">#{index + 1}</p>
                      </div>
                      <Avatar className="h-10 w-10 bg-teal-500 text-white">
                        <AvatarFallback>
                          {atendimento.pacienteNome.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{atendimento.pacienteNome}</p>
                          {getPrioridadeBadge(atendimento.prioridade)}
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            {getOrigemIcon(atendimento.origem)}
                            {atendimento.origem === 'whatsapp' ? 'WhatsApp' : 'Presencial'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{atendimento.pacienteTelefone}</p>
                        <p className="text-xs text-gray-400">
                          Chegada: {new Date(atendimento.dataChegada).toLocaleTimeString('pt-PT')}
                        </p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => onIniciarAtendimento(atendimento.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Iniciar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Em Atendimento */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-xl">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Em Atendimento ({emAtendimento.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {emAtendimento.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Nenhum paciente em atendimento</p>
            </div>
          ) : (
            <div className="divide-y">
              {emAtendimento.map((atendimento) => (
                <div key={atendimento.id} className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 bg-blue-500 text-white">
                      <AvatarFallback>
                        {atendimento.pacienteNome.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{atendimento.pacienteNome}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-yellow-600">
                          {atendimento.status === 'em_atendimento' ? 'Em consulta' : 'Aguardando exames'}
                        </Badge>
                        <span className="text-xs text-gray-400">
                          Início: {atendimento.dataAtendimento ? new Date(atendimento.dataAtendimento).toLocaleTimeString('pt-PT') : '-'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog para Registrar Atendimento */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Registrar Novo Atendimento</DialogTitle>
          </DialogHeader>
          
          <Tabs value={addType} onValueChange={(v) => setAddType(v as any)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="presencial">Presencial</TabsTrigger>
              <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            </TabsList>

            <TabsContent value="presencial" className="space-y-4 mt-4">
              <div>
                <Label>Paciente</Label>
                <Select value={selectedPaciente} onValueChange={setSelectedPaciente}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar paciente" />
                  </SelectTrigger>
                  <SelectContent>
                    {pacientesMock.map(p => (
                      <SelectItem key={p.id} value={p.id}>{p.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Prioridade</Label>
                <Select value={prioridade} onValueChange={(v: any) => setPrioridade(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="urgente">Urgente</SelectItem>
                    <SelectItem value="emergencia">Emergência</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="whatsapp" className="space-y-4 mt-4">
              <div>
                <Label>Nome do Paciente</Label>
                <Input
                  placeholder="Nome completo"
                  value={whatsappNome}
                  onChange={(e) => setWhatsappNome(e.target.value)}
                />
              </div>
              <div>
                <Label>Número de WhatsApp</Label>
                <Input
                  placeholder="+244 923 456 789"
                  value={whatsappNumero}
                  onChange={(e) => setWhatsappNumero(e.target.value)}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div>
            <Label>Observações</Label>
            <Input
              placeholder="Motivo da consulta, sintomas, etc."
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleRegistrar}>
              Registrar Atendimento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}