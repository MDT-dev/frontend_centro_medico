"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

// Dados estáticos (simulando backend)
const initialMedicamentos = [
  {
    id: 1,
    nome: "Paracetamol 500mg",
    stock: 120,
    vendidos: 340,
    validade: "2026-06-10",
    status: "ok",
  },
  {
    id: 2,
    nome: "Amoxicilina 250mg",
    stock: 0,
    vendidos: 210,
    validade: "2025-12-01",
    status: "expirado",
  },
  {
    id: 3,
    nome: "Ibuprofeno 400mg",
    stock: 15,
    vendidos: 890,
    validade: "2026-01-20",
    status: "expirando",
  },
];

export  function FarmaciaPage() {
  const [medicamentos] = useState(initialMedicamentos);

  const totalVendidos = medicamentos.reduce(
    (acc, m) => acc + m.vendidos,
    0
  );

  const expirados = medicamentos.filter(
    (m) => m.status === "expirado"
  ).length;

  const expirando = medicamentos.filter(
    (m) => m.status === "expirando"
  ).length;

  const semStock = medicamentos.filter((m) => m.stock === 0).length;

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-700">
            Farmácia - Centro Médico
          </h1>
          <p className="text-sm text-gray-500">
            Gestão de medicamentos e stock em tempo real
          </p>
        </div>

        <Button className="bg-blue-600 hover:bg-blue-700">
          + Novo Medicamento
        </Button>
      </div>

      {/* CARDS KPI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">
              Total Vendidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">
              {totalVendidos}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">
              Expirados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-500">
              {expirados}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">
              Por Expirar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-500">
              {expirando}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">
              Sem Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-700">
              {semStock}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* IMAGEM / BANNER */}
      <div className="rounded-xl overflow-hidden border">
        <img
          src="https://images.unsplash.com/photo-1584362917165-526a968579e8"
          className="w-full h-56 object-cover"
        />
      </div>

      {/* SEARCH */}
      <div className="flex gap-3">
        <Input placeholder="Pesquisar medicamento..." />
        <Button variant="outline">Filtrar</Button>
      </div>

      {/* TABELA */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Medicamentos</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Vendidos</TableHead>
                <TableHead>Validade</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {medicamentos.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-medium">
                    {m.nome}
                  </TableCell>
                  <TableCell>{m.stock}</TableCell>
                  <TableCell>{m.vendidos}</TableCell>
                  <TableCell>{m.validade}</TableCell>
                  <TableCell>
                    {m.status === "expirado" && (
                      <Badge className="bg-red-500">Expirado</Badge>
                    )}

                    {m.status === "expirando" && (
                      <Badge className="bg-yellow-500">
                        Por expirar
                      </Badge>
                    )}

                    {m.status === "ok" && (
                      <Badge className="bg-blue-600">OK</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}