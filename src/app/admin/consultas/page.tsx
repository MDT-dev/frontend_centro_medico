"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { TasksContent } from "@/components/tasks/tasks-content"
import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Calendar } from "@/components/ui/calendar"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

/* =========================
   SCHEMA (VALIDAÇÃO REAL)
========================= */
const formSchema = z.object({
  patient: z.string().min(2, "Nome obrigatório"),
  date: z.date({ required_error: "Data obrigatória" }),
  time: z.string().min(1, "Hora obrigatória"),
  type: z.string().min(1, "Selecione o tipo"),

  // PRONTUÁRIO
  symptoms: z.string().min(5, "Descreva os sintomas"),
  observations: z.string().optional(),
  diagnosis: z.string().optional(),
  plan: z.string().optional(),
})

export default function TasksPage() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patient: "",
      time: "",
      type: "",
      symptoms: "",
      observations: "",
      diagnosis: "",
      plan: "",
    },
  })

  async function onSubmit(values: any) {
    setLoading(true)

    // simulação API
    await new Promise((res) => setTimeout(res, 1500))

    console.log("CONSULTA:", values)

    setLoading(false)
    setOpen(false)
    form.reset()
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 p-4 lg:p-6 lg:ml-64">
        <Header
          title="Consultas"
          description="Gerencie todas as consultas e atendimentos do Centro Médico."
          actions={
            <Button onClick={() => setOpen(true)}>
              + Nova Consulta
            </Button>
          }
        />

        <div className="mt-6">
          <TasksContent onOpenModal={() => setOpen(true)} />
        </div>

        {/* =========================
            MODAL
        ========================= */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nova Consulta</DialogTitle>
              <DialogDescription>
                Registe uma nova consulta médica
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5 mt-4"
              >
                {/* PACIENTE */}
                <FormField
                  control={form.control}
                  name="patient"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Paciente</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do paciente" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* DATA */}
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="justify-start text-left"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(field.value, "PPP")
                              : "Escolher data"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Calendar
                            mode="single"
                            selected={new Date(field.value)}
                            onSelect={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* HORA */}
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hora</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* TIPO */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="geral">
                            Consulta Geral
                          </SelectItem>
                          <SelectItem value="urgencia">
                            Urgência
                          </SelectItem>
                          <SelectItem value="revisao">
                            Revisão
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* =========================
                    PRONTUÁRIO MÉDICO
                ========================= */}
                <div className="pt-4 border-t space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold">
                      Prontuário Médico
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Registo clínico da consulta
                    </p>
                  </div>

                  {/* SINTOMAS */}
                  <FormField
                    control={form.control}
                    name="symptoms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sintomas</FormLabel>
                        <FormControl>
                          <textarea
                            placeholder="Ex: Dor no peito, febre, tosse..."
                            className="w-full min-h-[90px] rounded-xl border bg-muted/30 p-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* OBSERVAÇÕES */}
                  <FormField
                    control={form.control}
                    name="observations"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observações</FormLabel>
                        <FormControl>
                          <textarea
                            placeholder="Pressão, sinais clínicos..."
                            className="w-full min-h-[90px] rounded-xl border bg-muted/30 p-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* DIAGNÓSTICO */}
                  <FormField
                    control={form.control}
                    name="diagnosis"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diagnóstico</FormLabel>
                        <FormControl>
                          <textarea
                            placeholder="Hipótese clínica..."
                            className="w-full min-h-[90px] rounded-xl border bg-muted/30 p-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* PLANO */}
                  <FormField
                    control={form.control}
                    name="plan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plano / Tratamento</FormLabel>
                        <FormControl>
                          <textarea
                            placeholder="Medicação, exames, retorno..."
                            className="w-full min-h-[90px] rounded-xl border bg-muted/30 p-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* BOTÃO */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Salvando..." : "Salvar Consulta"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}