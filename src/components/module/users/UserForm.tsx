"use client";

import { useForm } from "react-hook-form";
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
import { FieldGroup } from "@/components/ui/field";

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
          fullName: user.firstName + " " + user.lastName,
          phone: user.phone || "",
          role: user.role,
        }
      : {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          fullName: "",
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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FieldGroup>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo *</FormLabel>
                <FormControl>
                  <Input placeholder="João Silva" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primeiro Nome *</FormLabel>
                <FormControl>
                  <Input placeholder="João" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
             <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sobrenome *</FormLabel>
                <FormControl>
                  <Input placeholder="Silva" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldGroup>

        <FieldGroup>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="joao@centro.med" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Função *</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={UserRole.ADMIN}>Administrador</SelectItem>
                    <SelectItem value={UserRole.GERENTE}>Gerente</SelectItem>
                    <SelectItem value={UserRole.MEDICO}>Médico</SelectItem>
                    <SelectItem value={UserRole.RECEPCIONISTA}>
                      Recepcionista
                    </SelectItem>
                    <SelectItem value={UserRole.PACIENTE}>Paciente</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldGroup>

        {!user && (
          <FieldGroup>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha *</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FieldGroup>
        )}

        <FieldGroup>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="11999999999"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

         
        </FieldGroup>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Salvando..." : user ? "Atualizar" : "Criar Usuário"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
