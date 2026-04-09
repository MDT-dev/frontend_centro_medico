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
import { toast } from "@/hooks/use-toast";
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
      toast({
        description: user ? "Usuário atualizado com sucesso!" : "Usuário criado com sucesso!",
      });
      onOpenChange(false);
    }
  }, [createMutation.isSuccess, user, onOpenChange]);

  useEffect(() => {
    if (updateMutation.isSuccess) {
      toast({
        title:"Sucesso",  
        description: "Usuário atualizado com sucesso!",
      });
      onOpenChange(false);
    }
  }, [updateMutation.isSuccess, onOpenChange]);

  useEffect(() => {
    if (createMutation.isError) {
      toast({
        title: "Erro",
        description: "Erro ao criar usuário.",
      });
    }
    if (updateMutation.isError) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar usuário.",
      });
    }
  }, [createMutation.isError, updateMutation.isError]);

  const handleSubmit = async (data: CreateUserInput | UpdateUserInput) => {
    if (user) {
      const { id, ...rest } = data as UpdateUserInput

      await updateMutation.mutateAsync({
        id: id!,
        payload: rest,
      })
    } else {
      await createMutation.mutateAsync(data as CreateUserInput)
    }
  }

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
