'use client';

import dynamic from 'next/dynamic';

import { useState } from "react"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { ConsultasPage } from "@/components/module/consultas/consultas"

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
    <ConsultasPage />
  )
}