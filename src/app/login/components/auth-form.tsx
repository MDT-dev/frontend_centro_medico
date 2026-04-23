"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { LoaderPinwheel } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useAuthStore } from "@/store/auth"
import { useToast } from "@/hooks/use-toast"

// ✅ schema com Zod
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
})

type LoginForm = z.infer<typeof loginSchema>

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function AuthForm({ className, ...props }: AuthFormProps) {
  const router = useRouter()
  const { toast } = useToast()

  const login = useAuthStore((s) => s.login)
  const loading = useAuthStore((s) => s.loading)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password)
      toast({
        title: "Login realizado com sucesso!",
        description: "Redirecionando para a página inicial.",
        className: "bg-cyan-600 text-white",
        duration: 3000,
      })
     window.location.href = "/";
    } catch (err: any) {
      toast({
        title: "Erro ao fazer login",
        description: err?.response?.data?.message || "Tente novamente mais tarde.",
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mt-2 mb-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Bem vindo, bom te ver novamente!
            </span>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Usuário</Label>
            <Input
              id="email"
              placeholder="seuusuario"
              {...register("email")}
              className="focus-visible:ring-cyan-900 border-cyan-600"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className="focus-visible:ring-cyan-900 border-cyan-600"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="bg-cyan-600 hover:bg-cyan-700"
          >
            {loading && (
              <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>
          <Link
            href="/esqueci-senha"
            className="text-sm text-accent-plum-600 hover:underline block text-right"
          >
            Esqueceu a senha?


          </Link>

        </div>
      </form>
    </div>
  )
}