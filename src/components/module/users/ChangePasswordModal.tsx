"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field"; 
import {
  changePasswordSchema,
  ChangePasswordInput,
} from "@/lib/schemas/user";
import { useChangePassword } from "@/lib/hooks/useUsers";
import { useEffect } from "react";
import { toast } from "sonner";

interface ChangePasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

export function ChangePasswordModal({
  open,
  onOpenChange,
  userId,
}: ChangePasswordModalProps) {
  const mutation = useChangePassword();
  const form = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success("Senha alterada com sucesso!");
      onOpenChange(false);
      form.reset();
    }
  }, [mutation.isSuccess, onOpenChange, form]);

  useEffect(() => {
    if (mutation.isError) {
      toast.error("Erro ao alterar senha");
    }
  }, [mutation.isError]);

  const handleSubmit = async (data: ChangePasswordInput) => {
    await mutation.mutateAsync(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Alterar Senha</DialogTitle>
          <DialogDescription>
            Digite sua senha atual e a nova senha desejada
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FieldGroup>
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha Atual *</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nova Senha *</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha *</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••"
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
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Alterando..." : "Alterar Senha"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
