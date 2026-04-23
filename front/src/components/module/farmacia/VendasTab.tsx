// components/VendasTab.tsx (atualizado com ambos os tipos de fatura)
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    ShoppingCart,
    Plus,
    Minus,
    Trash2,
    CreditCard,
    Wallet,
    Building2,
    Shield,
    Receipt,
    TrendingUp,
    Package,
    Search,
    FileText,
    FileCheck,
    History,
} from 'lucide-react';
import { ProdutoVenda } from '@/types/vendas.types';
import { useVendas } from '@/hooks/useVendas';
import { FaturaProformaModal } from './FaturaProformaModal';
import { FaturaFinalModal } from './FaturaFinalModal';
import { ListaFaturasModal } from './ListaFaturasModal';
import { FechoDiaModal } from './FechoDiaModal';

// Mock de produtos
const produtosMock: ProdutoVenda[] = [
    { id: 1, nome: "Paracetamol 500mg", preco: 550, stock: 120, codigo: "PAR-001" },
    { id: 2, nome: "Amoxicilina 250mg", preco: 1290, stock: 45, codigo: "AMX-001" },
    { id: 3, nome: "Ibuprofeno 400mg", preco: 875, stock: 15, codigo: "IBU-001" },
    { id: 4, nome: "Omeprazol 20mg", preco: 1530, stock: 50, codigo: "OME-001" },
    { id: 5, nome: "Dipirona 500mg", preco: 390, stock: 8, codigo: "DIP-001" },
];

export function VendasTab() {
    const [searchProduto, setSearchProduto] = useState('');
    const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);
    const [clienteNome, setClienteNome] = useState('');
    const [clienteTipo, setClienteTipo] = useState<'particular' | 'empresa' | 'convenio'>('particular');
    const [clienteNif, setClienteNif] = useState('');
    const [clienteEndereco, setClienteEndereco] = useState('');
    const [clienteTelefone, setClienteTelefone] = useState('');
    const [formaPagamento, setFormaPagamento] = useState<'dinheiro' | 'multicaixa' | 'transferencia' | 'seguro'>('dinheiro');
    const [observacoes, setObservacoes] = useState('');
    const [tipoEmissao, setTipoEmissao] = useState<'proforma' | 'final'>('final');

    const [showProformaModal, setShowProformaModal] = useState(false);
    const [showFaturaModal, setShowFaturaModal] = useState(false);
    const [showListaModal, setShowListaModal] = useState(false);
    const [showFechoModal, setShowFechoModal] = useState(false);

    const {
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
        getResumoDia,
        getFaturasDoDia,
    } = useVendas();

    const { subtotal, desconto, iva, total } = calcularTotais();
    const resumoDia = getResumoDia();
    const { proformas: proformasDia, finais: faturasDia } = getFaturasDoDia();

    const produtosFiltrados = produtosMock.filter(p =>
        p.nome.toLowerCase().includes(searchProduto.toLowerCase()) ||
        p.codigo?.toLowerCase().includes(searchProduto.toLowerCase())
    );

    const handleAdicionarProduto = (produto: ProdutoVenda) => {
        if (produto.stock >= quantidadeSelecionada) {
            adicionarAoCarrinho(produto, quantidadeSelecionada);
            setQuantidadeSelecionada(1);
        } else {
            alert(`Stock insuficiente. Disponível: ${produto.stock}`);
        }
    };

    const handleEmitirDocumento = () => {
        if (carrinho.length === 0) {
            alert('Adicione produtos ao carrinho primeiro');
            return;
        }
        if (!clienteNome) {
            alert('Informe o nome do cliente');
            return;
        }

        const dadosBase = {
            cliente: clienteNome,
            clienteTipo,
            nif: clienteNif || undefined,
            endereco: clienteEndereco || undefined,
            telefone: clienteTelefone || undefined,
            observacoes: observacoes || undefined,
        };

        if (tipoEmissao === 'proforma') {
            const proforma = emitirProforma({
                ...dadosBase,
                validadeDias: 30,
            });
            setShowProformaModal(true);
        } else {
            const fatura = emitirFaturaFinal({
                ...dadosBase,
                formaPagamento,
            });
            setShowFaturaModal(true);
        }

        // Limpar formulário
        setClienteNome('');
        setClienteNif('');
        setClienteEndereco('');
        setClienteTelefone('');
        setObservacoes('');
    };

    const handleConverterProforma = (proforma: any) => {
        const fatura = converterProformaParaFatura(proforma, formaPagamento);
        setShowProformaModal(false);
        setShowFaturaModal(true);
    };

    return (
        <div className="space-y-4">
            {/* Header com Resumo Rápido */}
            <div className="grid grid-cols-4 gap-3">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <CardContent className="pt-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs opacity-90">Faturas Hoje</p>
                                <p className="text-xl font-bold">{resumoDia.quantidadeVendas}</p>
                            </div>
                            <FileCheck className="h-6 w-6 opacity-80" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                    <CardContent className="pt-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs opacity-90">Proformas Hoje</p>
                                <p className="text-xl font-bold">{resumoDia.quantidadeProformas}</p>
                            </div>
                            <FileText className="h-6 w-6 opacity-80" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <CardContent className="pt-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs opacity-90">Total Hoje</p>
                                <p className="text-sm font-bold">
                                    {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(resumoDia.totalVendas)}
                                </p>
                            </div>
                            <TrendingUp className="h-6 w-6 opacity-80" />
                        </div>
                    </CardContent>
                </Card>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setShowListaModal(true)}
                    >
                        <History className="h-4 w-4 mr-2" />
                        Histórico
                    </Button>
                    <Button
                        className="bg-orange-500 hover:bg-orange-600 flex-1"
                        onClick={() => setShowFechoModal(true)}
                    >
                        <Wallet className="h-4 w-4 mr-2" />
                        Fecho do Dia
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Painel de Produtos */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package className="h-5 w-5" />
                            Produtos
                        </CardTitle>
                        <div className="relative mt-2">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Pesquisar por nome ou código..."
                                value={searchProduto}
                                onChange={(e) => setSearchProduto(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[400px] pr-4">
                            <div className="grid grid-cols-2 gap-2">
                                {produtosFiltrados.map((produto) => (
                                    <div key={produto.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-medium text-sm">{produto.nome}</p>
                                                <p className="text-xs text-gray-500">{produto.codigo}</p>
                                                <p className="text-blue-600 font-bold mt-1">
                                                    {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(produto.preco)}
                                                </p>
                                                <Badge variant={produto.stock < 10 ? 'destructive' : 'outline'} className="mt-1">
                                                    Stock: {produto.stock}
                                                </Badge>
                                            </div>
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="flex items-center gap-1">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-6 w-6 p-0"
                                                        onClick={() => setQuantidadeSelecionada(Math.max(1, quantidadeSelecionada - 1))}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="w-8 text-center text-sm">{quantidadeSelecionada}</span>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-6 w-6 p-0"
                                                        onClick={() => setQuantidadeSelecionada(quantidadeSelecionada + 1)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    className="mt-1 h-7 px-2"
                                                    onClick={() => handleAdicionarProduto(produto)}
                                                    disabled={produto.stock === 0}
                                                >
                                                    <ShoppingCart className="h-3 w-3 mr-1" />
                                                    Adicionar
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Carrinho de Compras */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <ShoppingCart className="h-5 w-5" />
                                Carrinho
                            </span>
                            {carrinho.length > 0 && (
                                <Button variant="ghost" size="sm" onClick={limparCarrinho}>
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                            )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ScrollArea className="h-[250px]">
                            {carrinho.length === 0 ? (
                                <div className="text-center py-8 text-gray-400">
                                    <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">Carrinho vazio</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {carrinho.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                                            <div className="flex-1">
                                                <p className="font-medium text-sm">{item.nome}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-6 w-6 p-0"
                                                        onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="text-sm w-8 text-center">{item.quantidade}</span>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-6 w-6 p-0"
                                                        onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="text-sm ml-2">
                                                        {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(item.subtotal)}
                                                    </span>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removerDoCarrinho(item.id)}
                                            >
                                                <Trash2 className="h-4 w-4 text-red-400" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ScrollArea>

                        <Separator />

                        {/* Dados do Cliente */}
                        <div className="space-y-2">
                            <div>
                                <Label>Cliente</Label>
                                <Input
                                    placeholder="Nome do cliente"
                                    value={clienteNome}
                                    onChange={(e) => setClienteNome(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <Label>Tipo</Label>
                                    <Select value={clienteTipo} onValueChange={(v: any) => setClienteTipo(v)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="particular">Particular</SelectItem>
                                            <SelectItem value="empresa">Empresa</SelectItem>
                                            <SelectItem value="convenio">Convénio</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {clienteTipo !== 'particular' && (
                                    <div>
                                        <Label>NIF</Label>
                                        <Input
                                            placeholder="NIF"
                                            value={clienteNif}
                                            onChange={(e) => setClienteNif(e.target.value)}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <Label>Telefone</Label>
                                    <Input
                                        placeholder="Telefone"
                                        value={clienteTelefone}
                                        onChange={(e) => setClienteTelefone(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Endereço</Label>
                                    <Input
                                        placeholder="Endereço"
                                        value={clienteEndereco}
                                        onChange={(e) => setClienteEndereco(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Totais */}
                        <div className="space-y-1 bg-gray-50 p-3 rounded-lg">
                            <div className="flex justify-between text-sm">
                                <span>Subtotal:</span>
                                <span>{new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>IVA (7%):</span>
                                <span>{new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(iva)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold">
                                <span>TOTAL:</span>
                                <span className="text-blue-600 text-lg">{new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(total)}</span>
                            </div>
                        </div>

                        {/* Tipo de Emissão */}
                        <div className="flex gap-2">
                            <Button
                                variant={tipoEmissao === 'proforma' ? 'default' : 'outline'}
                                className="flex-1 gap-2"
                                onClick={() => setTipoEmissao('proforma')}
                            >
                                <FileText className="h-4 w-4" />
                                Proforma
                            </Button>
                            <Button
                                variant={tipoEmissao === 'final' ? 'default' : 'outline'}
                                className="flex-1 gap-2"
                                onClick={() => setTipoEmissao('final')}
                            >
                                <FileCheck className="h-4 w-4" />
                                Fatura Final
                            </Button>
                        </div>

                        {/* Forma de Pagamento (apenas para fatura final) */}
                        {tipoEmissao === 'final' && (
                            <div>
                                <Label>Forma de Pagamento</Label>
                                <div className="grid grid-cols-2 gap-2 mt-1">
                                    <Button
                                        variant={formaPagamento === 'dinheiro' ? 'default' : 'outline'}
                                        className="gap-2"
                                        onClick={() => setFormaPagamento('dinheiro')}
                                    >
                                        <Wallet className="h-4 w-4" />
                                        Dinheiro
                                    </Button>
                                    <Button
                                        variant={formaPagamento === 'multicaixa' ? 'default' : 'outline'}
                                        className="gap-2"
                                        onClick={() => setFormaPagamento('multicaixa')}
                                    >
                                        <CreditCard className="h-4 w-4" />
                                        Multicaixa
                                    </Button>
                                    <Button
                                        variant={formaPagamento === 'transferencia' ? 'default' : 'outline'}
                                        className="gap-2"
                                        onClick={() => setFormaPagamento('transferencia')}
                                    >
                                        <Building2 className="h-4 w-4" />
                                        Transferência
                                    </Button>
                                    <Button
                                        variant={formaPagamento === 'seguro' ? 'default' : 'outline'}
                                        className="gap-2"
                                        onClick={() => setFormaPagamento('seguro')}
                                    >
                                        <Shield className="h-4 w-4" />
                                        Seguro
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Observações */}
                        <div>
                            <Label>Observações (opcional)</Label>
                            <Input
                                placeholder="Notas adicionais..."
                                value={observacoes}
                                onChange={(e) => setObservacoes(e.target.value)}
                            />
                        </div>

                        <Button
                            className="w-full bg-green-600 hover:bg-green-700"
                            size="lg"
                            onClick={handleEmitirDocumento}
                            disabled={carrinho.length === 0 || !clienteNome}
                        >
                            {tipoEmissao === 'proforma' ? (
                                <>
                                    <FileText className="h-4 w-4 mr-2" />
                                    Emitir Proforma
                                </>
                            ) : (
                                <>
                                    <Receipt className="h-4 w-4 mr-2" />
                                    Emitir Fatura Final
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Modais */}
    // Modais - versão corrigida
            <FaturaProformaModal
                fatura={faturaAtual && 'numeroProforma' in faturaAtual ? faturaAtual : null}
                open={showProformaModal}
                onClose={() => setShowProformaModal(false)}
                onConverter={handleConverterProforma}
            />

            <FaturaFinalModal
                fatura={faturaAtual && 'numeroFatura' in faturaAtual ? faturaAtual : null}
                open={showFaturaModal}
                onClose={() => setShowFaturaModal(false)}
            />

            <ListaFaturasModal
                open={showListaModal}
                onClose={() => setShowListaModal(false)}
                proformas={faturasProforma}
                faturasFinais={faturasFinais}
                onVerProforma={(p) => {
                    // Implementar visualização
                    console.log('Ver proforma:', p);
                }}
                onVerFatura={(f) => {
                    // Implementar visualização
                    console.log('Ver fatura:', f);
                }}
                onConverterProforma={handleConverterProforma}
            />

            <FechoDiaModal
                open={showFechoModal}
                onClose={() => setShowFechoModal(false)}
                vendasDoDia={faturasDia}
                resumoDia={resumoDia}
                onConfirmarFecho={(dados) => {
                    console.log('Fecho confirmado:', dados);
                    setShowFechoModal(false);
                }}
            />
        </div>
    );
}