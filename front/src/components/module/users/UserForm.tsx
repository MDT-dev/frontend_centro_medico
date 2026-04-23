"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserSchema,
  updateUserSchema,
  CreateUserInput,
  UpdateUserInput,
  UserRole,
  User,
} from "@/lib/schemas/user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

interface UserFormProps {
  user?: User;
  onSubmit: (data: CreateUserInput | UpdateUserInput) => Promise<void>;
  isLoading?: boolean;
}

export function UserForm({ user, onSubmit, isLoading }: UserFormProps) {
  const schema = user ? updateUserSchema : createUserSchema;
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: user
      ? {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || "",
        role: user.role,
      }
      : {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        role: UserRole.PACIENTE,
      },
  });

  const handleSubmit = async (data: any) => {
    try {
      if (user) {
        await onSubmit({ ...data, id: user.id });
      } else {
        await onSubmit(data);
      }
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  };

  return (
    <Form {...form}>
      <form id="user-form" onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FieldGroup className="grid grid-cols-2 gap-6">
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="firstName">Primeiro Nome</FieldLabel>
                <Input
                  {...field}
                  id="firstName"
                  aria-invalid={fieldState.invalid}
                  placeholder="firstName"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="lastName">Sobrenome</FieldLabel>
                <Input
                  {...field}
                  id="lastName"
                  aria-invalid={fieldState.invalid}
                  placeholder="lastName"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="email"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="role"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="flex flex-col" orientation="vertical" data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor="role">Função</FieldLabel>
                  {/* <FieldDescription>
                    Selecione a função do usuário.
                  </FieldDescription> */}
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="role"
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <SelectValue placeholder="Selecione a função" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    <SelectItem value={UserRole.ADMIN}>
                      Administrador
                    </SelectItem>
                    <SelectItem value={UserRole.GERENTE}>Gerente</SelectItem>
                    <SelectItem value={UserRole.MEDICO}>Médico</SelectItem>
                    <SelectItem value={UserRole.RECEPCIONISTA}>
                      Recepcionista
                    </SelectItem>
                    <SelectItem value={UserRole.PACIENTE}>Paciente</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="phone">Telefone</FieldLabel>
                <Input
                  {...field}
                  id="phone"
                  aria-invalid={fieldState.invalid}
                  placeholder="phone"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {!user && (
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          )}

        </FieldGroup>
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button type="submit" form="user-form" disabled={isLoading}>
            {isLoading ? "Salvando..." : user ? "Atualizar" : "Criar"}
          </Button>
        </Field>
      </form>
    </Form>
  );
}

