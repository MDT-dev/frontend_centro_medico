// modules/recepcionista/components/AtendimentoPanel.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Atendimento } from '../types/servicos.types';
import {
  Stethoscope,
  Microscope,
  CheckCircle,
  XCircle,
  FileText,
  Clock,
} from 'lucide-react';

interface AtendimentoPanelProps {
  emAtendimento: Atendimento[];
  onEncaminharExames: (id: string) => void;
  onConcluir: (id: string) => void;
  onCancelar: (id: string) => void;
}

export function AtendimentoPanel({
  emAtendimento,
  onEncaminharExames,
  onConcluir,
  onCancelar,
}: AtendimentoPanelProps) {
  const emConsulta = emAtendimento.filter(a => a.status === 'em_atendimento');
  const emExames = emAtendimento.filter(a => a.status === 'aguardando_exames');

  return (
    <Tabs defaultValue="consulta" className="space-y-4">
      <TabsList className="bg-white shadow-sm">
        <TabsTrigger value="consulta" className="gap-2">
          <Stethoscope className="h-4 w-4" />
          Em Consulta ({emConsulta.length})
        </TabsTrigger>
        <TabsTrigger value="exames" className="gap-2">
          <Microscope className="h-4 w-4" />
          Aguardando Exames ({emExames.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="consulta" className="space-y-4">
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-xl">
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5" />
              Pacientes em Consulta
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {emConsulta.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Stethoscope className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Nenhum paciente em consulta no momento</p>
              </div>
            ) : (
              <div className="divide-y">
                {emConsulta.map((atendimento) => (
                  <div key={atendimento.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 bg-blue-500 text-white">
                        <AvatarFallback>
                          {atendimento.pacienteNome.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{atendimento.pacienteNome}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-blue-600">
                            Em consulta
                          </Badge>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Início: {atendimento.dataAtendimento ? new Date(atendimento.dataAtendimento).toLocaleTimeString('pt-PT') : '-'}
                          </span>
                        </div>
                        {atendimento.observacoes && (
                          <p className="text-sm text-gray-500 mt-2 line-clamp-1">
                            {atendimento.observacoes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-teal-600"
                        onClick={() => onEncaminharExames(atendimento.id)}
                      >
                        <Microscope className="h-4 w-4 mr-1" />
                        Exames
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => onConcluir(atendimento.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Concluir
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onCancelar(atendimento.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="exames" className="space-y-4">
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-xl">
            <CardTitle className="flex items-center gap-2">
              <Microscope className="h-5 w-5" />
              Pacientes Aguardando Exames
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {emExames.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Microscope className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Nenhum paciente aguardando exames</p>
              </div>
            ) : (
              <div className="divide-y">
                {emExames.map((atendimento) => (
                  <div key={atendimento.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 bg-purple-500 text-white">
                        <AvatarFallback>
                          {atendimento.pacienteNome.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{atendimento.pacienteNome}</p>
                        <Badge variant="outline" className="text-purple-600">
                          Aguardando exames
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => onConcluir(atendimento.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Concluir
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}