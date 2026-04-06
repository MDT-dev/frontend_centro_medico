"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserForm } from "./UserForm";
import {
  CreateUserInput,
  UpdateUserInput,
  User,
} from "@/lib/schemas/user";
import { useCreateUser, useUpdateUser } from "@/lib/hooks/useUsers";
import { useEffect } from "react";
import { toast } from "sonner";

interface UserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User;
}

export function UserModal({ open, onOpenChange, user }: UserModalProps) {
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

  const isLoading = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (createMutation.isSuccess) {
      toast.success(
        user ? "Usuário atualizado com sucesso!" : "Usuário criado com sucesso!"
      );
      onOpenChange(false);
    }
  }, [createMutation.isSuccess, user, onOpenChange]);

  useEffect(() => {
    if (updateMutation.isSuccess) {
      toast.success("Usuário atualizado com sucesso!");
      onOpenChange(false);
    }
  }, [updateMutation.isSuccess, onOpenChange]);

  useEffect(() => {
    if (createMutation.isError) {
      toast.error("Erro ao criar usuário");
    }
    if (updateMutation.isError) {
      toast.error("Erro ao atualizar usuário");
    }
  }, [createMutation.isError, updateMutation.isError]);

  const handleSubmit = async (data: CreateUserInput | UpdateUserInput) => {
    if (user) {
      await updateMutation.mutateAsync(data as UpdateUserInput);
    } else {
      await createMutation.mutateAsync(data as CreateUserInput);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {user ? "Editar Usuário" : "Novo Usuário"}
          </DialogTitle>
          <DialogDescription>
            {user
              ? "Atualize as informações do usuário"
              : "Preencha os dados para criar um novo usuário"}
          </DialogDescription>
        </DialogHeader>
        <UserForm
          user={user}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
