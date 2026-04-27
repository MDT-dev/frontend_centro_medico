// modules/recepcionista/RecepcionistaPage.tsx
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Clock, Receipt, BarChart3, Wallet } from 'lucide-react';
import { AtendimentoPanel } from './components/AtendimentoPanel';
import { ListaEsperaPanel } from './components/ListaEsperaPanel';
import { FaturamentoPanel } from './components/FaturamentoPanel';
import { RelatoriosPanel } from './components/RelatoriosPanel';
import { useAtendimento } from './hooks/useAtendimento';
import { useFaturamento } from './hooks/useFaturamento';
import { servicosDisponiveis } from './data/servicosData';
import { Button } from '@/components/ui/button';
import { FechoDiaConsolidadoModal } from '../consultas/FechoDiaConsolidadoModal';
import { useFaturamentoConsultas } from '@/hooks/useFaturamentoConsultas';

export function RecepcionistaPage() {
    const [activeTab, setActiveTab] = useState('lista-espera');
    const [showFechoConsolidadoDialog, setShowFechoConsolidadoDialog] = useState(false);


    const atendimentoHook = useAtendimento();
    const faturamentoHook = useFaturamento();
    const {
        getResumoConsultasDia,
    } = useFaturamentoConsultas();
    const getDadosFechoConsolidado = () => {
        const resumoConsultas = getResumoConsultasDia();

        // Buscar dados da farmácia do localStorage (apenas no cliente)
        let faturasFarmaciaHoje: any[] = [];
        let totalFarmacia = 0;
        let porPagamentoFarmacia = {
            dinheiro: 0,
            multicaixa: 0,
            transferencia: 0,
            seguro: 0,
        };

        // Verificar se está no cliente antes de acessar localStorage
        if (typeof window !== 'undefined') {
            const storedFaturasFarmacia = localStorage.getItem('farmacia_faturas');
            const faturasFarmacia = storedFaturasFarmacia ? JSON.parse(storedFaturasFarmacia) : [];
            faturasFarmaciaHoje = faturasFarmacia.filter((f: any) =>
                new Date(f.data).toDateString() === new Date().toDateString()
            );

            totalFarmacia = faturasFarmaciaHoje.reduce((acc: number, f: any) => acc + f.total, 0);
            porPagamentoFarmacia = {
                dinheiro: faturasFarmaciaHoje.filter((f: any) => f.formaPagamento === 'dinheiro').reduce((acc: number, f: any) => acc + f.total, 0),
                multicaixa: faturasFarmaciaHoje.filter((f: any) => f.formaPagamento === 'multicaixa').reduce((acc: number, f: any) => acc + f.total, 0),
                transferencia: faturasFarmaciaHoje.filter((f: any) => f.formaPagamento === 'transferencia').reduce((acc: number, f: any) => acc + f.total, 0),
                seguro: faturasFarmaciaHoje.filter((f: any) => f.formaPagamento === 'seguro').reduce((acc: number, f: any) => acc + f.total, 0),
            };
        }

        return {
            data: new Date(),
            consultas: {
                total: resumoConsultas.total,
                quantidade: resumoConsultas.quantidade,
                porMedico: resumoConsultas.porMedico,
                porEspecialidade: resumoConsultas.porEspecialidade,
            },
            farmacia: {
                total: totalFarmacia,
                quantidade: faturasFarmaciaHoje.length,
                porPagamento: porPagamentoFarmacia,
            },
            totalGeral: resumoConsultas.total + totalFarmacia,
            quantidadeTotal: resumoConsultas.quantidade + faturasFarmaciaHoje.length,
        };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50">
            <div className="p-6 space-y-6 max-w-7xl mx-auto">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-teal-600 to-blue-700 rounded-xl shadow-lg">
                                <Users className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-700 to-blue-800 bg-clip-text text-transparent">
                                    Recepção - Centro Médico
                                </h1>
                                <p className="text-sm text-slate-500 mt-1">
                                    Gestão de atendimentos, faturamento e relatórios
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TABS */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                    <TabsList className="bg-white shadow-sm">
                        <TabsTrigger value="lista-espera" className="gap-2">
                            <Clock className="h-4 w-4" />
                            Lista de Espera
                        </TabsTrigger>
                        <TabsTrigger value="atendimentos" className="gap-2">
                            <Users className="h-4 w-4" />
                            Atendimentos
                        </TabsTrigger>
                        <TabsTrigger value="faturamento" className="gap-2">
                            <Receipt className="h-4 w-4" />
                            Faturamento
                        </TabsTrigger>
                        <TabsTrigger value="relatorios" className="gap-2">
                            <BarChart3 className="h-4 w-4" />
                            Relatórios
                        </TabsTrigger>
                        <TabsTrigger value="fecho" className="gap-2">
                            <BarChart3 className="h-4 w-4" />
                            Fecho do dia
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="lista-espera">
                        <ListaEsperaPanel
                            filaEspera={atendimentoHook.filaEspera}
                            emAtendimento={atendimentoHook.emAtendimento}
                            onIniciarAtendimento={atendimentoHook.iniciarAtendimento}
                            onRegistrarWhatsApp={atendimentoHook.registrarAtendimentoWhatsApp}
                            onRegistrarPresencial={atendimentoHook.registrarAtendimentoPresencial}
                        />
                    </TabsContent>

                    <TabsContent value="atendimentos">
                        <AtendimentoPanel
                            emAtendimento={atendimentoHook.emAtendimento}
                            onEncaminharExames={atendimentoHook.encaminharParaExames}
                            onConcluir={atendimentoHook.concluirAtendimento}
                            onCancelar={atendimentoHook.cancelarAtendimento}
                        />
                    </TabsContent>

                    <TabsContent value="faturamento">
                        <FaturamentoPanel
                            carrinho={faturamentoHook.carrinho}
                            onAdicionar={faturamentoHook.adicionarAoCarrinho}
                            onRemover={faturamentoHook.removerDoCarrinho}
                            onAtualizarQuantidade={faturamentoHook.atualizarQuantidade}
                            onLimparCarrinho={faturamentoHook.limparCarrinho}
                            onEmitirFatura={faturamentoHook.emitirFatura}
                            calcularTotais={faturamentoHook.calcularTotais}
                            servicosDisponiveis={servicosDisponiveis}
                        />
                    </TabsContent>

                    <TabsContent value="relatorios">
                        <RelatoriosPanel
                            faturas={faturamentoHook.faturas}
                            atendimentos={atendimentoHook.atendimentos}
                            resumoDia={faturamentoHook.getResumoDia()}
                        />
                    </TabsContent>
                    <TabsContent value="fecho">
                        <Button
                            variant="outline"
                            className="gap-2"
                            onClick={() => setShowFechoConsolidadoDialog(true)}
                        >
                            <Wallet className="h-4 w-4" />
                            Fecho Consolidado
                        </Button>
                    </TabsContent>
                </Tabs>
            </div>
            <FechoDiaConsolidadoModal
                open={showFechoConsolidadoDialog}
                onClose={() => setShowFechoConsolidadoDialog(false)}
                dados={getDadosFechoConsolidado()}
                onConfirmarFecho={(dados) => {
                    console.log('Fecho consolidado confirmado:', dados);
                    setShowFechoConsolidadoDialog(false);
                }}
            />
        </div>
    );
}