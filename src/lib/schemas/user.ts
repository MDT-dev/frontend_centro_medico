import { z } from "zod";

export enum UserRole {
  ADMIN = "ADMIN",
  GERENTE = "GERENTE",
  MEDICO = "MEDICO",
  RECEPCIONISTA = "RECEPCIONISTA",
  PACIENTE = "PACIENTE",
}

export const userRoleEnum = z.enum([
  "ADMIN",
  "GERENTE",
  "MEDICO",
  "RECEPCIONISTA",
  "PACIENTE",
]);

export const createUserSchema = z.object({
  firstName: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  lastName: z
    .string()
    .min(2, "Sobrenome deve ter pelo menos 2 caracteres")
    .max(100, "Sobrenome deve ter no máximo 100 caracteres"),
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(100, "Senha deve ter no máximo 100 caracteres"),
  fullName: z
    .string()
    .min(2, "Nome completo deve ter pelo menos 2 caracteres")
    .max(100, "Nome completo deve ter no máximo 100 caracteres"),
  phone: z
    .string()
    .regex(/^\d{10,15}$/, "Telefone deve ter entre 10 e 15 dígitos")
    .optional()
    .or(z.literal("")),
  role: userRoleEnum.default("PACIENTE"),
});

export const updateUserSchema = createUserSchema
  .omit({ password: true })
  .extend({
    id: z.string(),
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Senha atual é obrigatória"),
    newPassword: z
      .string()
      .min(6, "Nova senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}
