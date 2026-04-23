"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  Edit3,
  Save,
  X,
  Camera,
  Briefcase,
  Building,
  Loader2,
  AlertCircle,
  KeyRound,
  ChevronLeft,
} from "lucide-react"
import { api } from "@/lib/api"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ChangePasswordDialog } from "./change-password-dialog"
import { useRouter } from "next/navigation"

export type UserProfileType = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role:"ADMIN" | "GERENTE" | "MEDICO" | "RECEPCIONISTA" | "PACIENTE";
  isActive: boolean
  createdAt: string
  updatedAt: string
}

type UpdateUserInput = {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
}

type ValidationErrors = {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
}

async function getProfile(): Promise<UserProfileType> {
  const { data } = await api.get("/users/me")
  return data
}

async function updateProfile(id: string, payload: UpdateUserInput): Promise<UserProfileType> {
  const { data } = await api.put(`/users/${id}`, payload)
  return data
}

const roleLabels: Record<UserProfileType["role"], string> = {
  ADMIN: "Super Administrador",
  GERENTE: "Gerente",
  MEDICO: "Médico",
  RECEPCIONISTA: "Recepcionista",
  PACIENTE: "Paciente"
}

export function ProfileModule() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState<UpdateUserInput>({})
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)

  const {
    data: profile,
    error,
    isLoading,
  } = useQuery<UserProfileType>({
    queryKey: ["me"],
    queryFn: getProfile,
    staleTime: 30000,
  })

  const router = useRouter();

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserInput }) =>
      updateProfile(id, payload),

    onSuccess: (data) => {
      queryClient.setQueryData(["me"], data)
      setIsEditing(false)
      setEditedData({})

      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso.",
      })
    },

    onError: (error: any) => {
      toast({
        title: "Erro ao atualizar",
        description:
          error?.response?.data?.message ||
          "Não foi possível salvar as alterações.",
        variant: "destructive",
      })
    },
  })


  const validateFirstName = (firstName: string): string | undefined => {
    if (!firstName || firstName.trim().length === 0) {
      return "Nome é obrigatório"
    }
    if (firstName.trim().length < 3) {
      return "Nome deve ter pelo menos 3 caracteres"
    }
    if (firstName.trim().length > 50) {
      return "Nome deve ter no máximo 50 caracteres"
    }
    return undefined
  }

   const validateLastName = (lastName: string): string | undefined => {
    if (!lastName || lastName.trim().length === 0) {
      return "Sobrenome é obrigatório"
    }
    if (lastName.trim().length < 3) {
      return "Sobrenome deve ter pelo menos 3 caracteres"
    }
    if (lastName.trim().length > 50) {
      return "Sobrenome deve ter no máximo 50 caracteres"
    }
    return undefined
  }

  const validateEmail = (email: string): string | undefined => {
    if (!email || email.trim().length === 0) {
      return "Email é obrigatório"
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return "Email inválido"
    }
    return undefined
  }

  const validatePhone = (phone: string): string | undefined => {
    if (!phone || phone.trim().length === 0) {
      return "Telefone é obrigatório"
    }
    const phoneRegex = /^\+244\s?[9]\d{2}\s?\d{3}\s?\d{3}$/
    if (!phoneRegex.test(phone)) {
      return "Telefone inválido. Use o formato: +244 900 000 000"
    }
    return undefined
  }

  const formatPhoneNumber = (value: string): string => {
    const cleaned = value.replace(/[^\d+]/g, "")
    if (!cleaned.startsWith("+244")) {
      if (cleaned.startsWith("244")) {
        return "+244"
      }
      if (cleaned.startsWith("+")) {
        return "+244"
      }
      return "+244"
    }
    const digits = cleaned.slice(4)
    if (digits.length <= 3) {
      return `+244 ${digits}`
    } else if (digits.length <= 6) {
      return `+244 ${digits.slice(0, 3)} ${digits.slice(3)}`
    } else {
      return `+244 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`
    }
  }

  const handleEdit = () => {
    if (profile) {
      setEditedData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
      })
    }
    setValidationErrors({})
    setIsEditing(true)
  }

  const handleSave = () => {
    const errors: ValidationErrors = {}

    if (editedData.firstName !== undefined) {
      const firstNameError = validateFirstName(editedData.firstName)
      if (firstNameError) errors.firstName = firstNameError
    }

    if (editedData.lastName !== undefined) {
      const lastNameError = validateLastName(editedData.lastName)
      if (lastNameError) errors.lastName = lastNameError
    }

    if (editedData.email !== undefined) {
      const emailError = validateEmail(editedData.email)
      if (emailError) errors.email = emailError
    }

    if (editedData.phone !== undefined) {
      const phoneError = validatePhone(editedData.phone)
      if (phoneError) errors.phone = phoneError
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      toast({
        title: "Erro de validação",
        description: "Por favor, corrija os erros antes de salvar.",
        variant: "destructive",
      })
      return
    }


    if (Object.keys(editedData).length > 0 && profile) {
      updateMutation.mutate({
        id: profile.id, payload: editedData
      }
      )


    }
  }

  const handleCancel = () => {
    setEditedData({})
    setValidationErrors({})
    setIsEditing(false)
  }

  const handleInputChange = (field: keyof UpdateUserInput, value: string) => {
    let processedValue = value

    if (field === "phone") {
      processedValue = formatPhoneNumber(value)
    }

    setEditedData((prev) => ({
      ...prev,
      [field]: processedValue,
    }))

    let error: string | undefined
    if (field === "firstName") {
      error = validateFirstName(processedValue)
    } else if (field === "lastName") {
      error = validateLastName(processedValue)
    } else if (field === "email") {
      error = validateEmail(processedValue)
    } else if (field === "phone") {
      error = validatePhone(processedValue)
    }

    setValidationErrors((prev) => ({
      ...prev,
      [field]: error,
    }))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-AO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-AO", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Carregando perfil...</p>
        </div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Perfil do Usuário</h2>
          <p className="text-muted-foreground">Visualize e edite suas informações pessoais</p>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Não foi possível carregar os dados do perfil. Tente novamente mais tarde.</AlertDescription>
        </Alert>
      </div>
    )
  }

  const displayData = isEditing ? { ...profile, ...editedData } : profile
  const hasValidationErrors = Object.values(validationErrors).some((error) => error !== undefined)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Perfil do Usuário</h2>
          <p className="text-muted-foreground">Visualize e edite suas informações pessoais</p>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <Button onClick={handleEdit} className="gap-2">
                <Edit3 className="h-4 w-4" />
                Editar Perfil
              </Button>
              <Button onClick={() => setIsPasswordDialogOpen(true)} variant="outline" className="gap-2">
                <KeyRound className="h-4 w-4" />
                Alterar Senha
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleSave}
                className="gap-2"
                disabled={updateMutation.isPending || Object.keys(editedData).length === 0 || hasValidationErrors}
              >
                {updateMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Salvar
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="gap-2 bg-transparent"
                disabled={updateMutation.isPending}
              >
                <X className="h-4 w-4" />
                Cancelar
              </Button>
            </>
          )}
        </div>
      </div>
      <div>
        <Button variant={"ghost"} onClick={()=> router.back()}> <ChevronLeft className="h-4 w-4" /> Voltar </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="relative mx-auto">
              <Avatar className="h-24 w-24">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.firstName}`} />
                <AvatarFallback className="text-lg">
                  {profile.firstName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                  title="Alterar foto"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="space-y-2">
              <CardTitle className="text-xl">{profile.firstName} {profile.lastName}</CardTitle>
              <p className="text-sm text-muted-foreground">{roleLabels[profile.role]}</p>
              <Badge variant={profile.isActive ? "default" : "secondary"}>
                {profile.isActive ? "Ativo" : "Inativo"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span>Desde {formatDate(profile.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-balance">Atualizado em {formatDateTime(profile.updatedAt)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nome de Usuário</Label>
                {isEditing ? (
                  <>
                    <Input
                      id="firstName"
                      value={displayData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Digite seu nome"
                      className={validationErrors.firstName ? "border-destructive focus-visible:ring-destructive" : ""}
                      aria-invalid={!!validationErrors.firstName}
                      aria-describedby={validationErrors.firstName ? "firstName-error" : undefined}
                    />
                    {validationErrors.firstName && (
                      <p id="firstName-error" className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {validationErrors.firstName}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                    <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="truncate">{profile.firstName} </span>
                  </div>
                )}
              </div>
               <div className="space-y-2">
                <Label htmlFor="lastName">Nome de Usuário</Label>
                {isEditing ? (
                  <>
                    <Input
                      id="lastName"
                      value={displayData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Digite seu nome"
                      className={validationErrors.lastName ? "border-destructive focus-visible:ring-destructive" : ""}
                      aria-invalid={!!validationErrors.lastName}
                      aria-describedby={validationErrors.lastName ? "lastName-error" : undefined}
                    />
                    {validationErrors.lastName && (
                      <p id="lastName-error" className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {validationErrors.lastName}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                    <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="truncate">{profile.lastName}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <>
                    <Input
                      id="email"
                      type="email"
                      value={displayData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="seu@email.com"
                      className={validationErrors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                      aria-invalid={!!validationErrors.email}
                      aria-describedby={validationErrors.email ? "email-error" : undefined}
                    />
                    {validationErrors.email && (
                      <p id="email-error" className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {validationErrors.email}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                    <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="truncate">{profile.email}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                {isEditing ? (
                  <>
                    <Input
                      id="phone"
                      value={displayData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+244 900 000 000"
                      className={validationErrors.phone ? "border-destructive focus-visible:ring-destructive" : ""}
                      aria-invalid={!!validationErrors.phone}
                      aria-describedby={validationErrors.phone ? "phone-error" : undefined}
                      maxLength={17}
                    />
                    {validationErrors.phone && (
                      <p id="phone-error" className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {validationErrors.phone}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                    <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span>{profile.phone}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Função</Label>
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                  <Briefcase className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>{roleLabels[profile.role]}</span>
                </div>
              </div>

              
            </div>

            <Separator />

            <div className="grid gap-4 sm:grid-cols-2 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">ID do Usuário</p>
                <p className="font-mono text-xs bg-muted/50 p-2 rounded-md break-all">{profile.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Status da Conta</p>
                <p className="font-medium">{profile.isActive ? "Ativa" : "Inativa"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <ChangePasswordDialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen} />
    </div>
  )
}