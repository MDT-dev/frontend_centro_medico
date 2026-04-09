"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  changePasswordSchema,
  ChangePasswordInput,
} from "@/lib/schemas/user";
import { useChangePassword } from "@/lib/hooks/useUsers";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface ChangePasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

export function ChangePasswordModal({
  open,
  onOpenChange,
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
      toast({
        title: "Senha Alterada",
        description: "Sua senha foi alterada com sucesso.",
      });

      onOpenChange(false);
      form.reset();
    }
  }, [mutation.isSuccess, onOpenChange, form]);

  useEffect(() => {
    if (mutation.isError) {
      toast({
        title: "Erro",
        description: "Erro ao alterar senha.",
      });
    }
  }, [mutation.isError]);

  const handleSubmit = async (data: ChangePasswordInput) => {
    await mutation.mutateAsync({ payload: data });
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
            id="change-password-form"
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FieldGroup className="grid grid-cols-2 gap-6">
              <Controller
                name="currentPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="currentPassword">Senha Atual</FieldLabel>
                    <Input
                      {...field}
                      id="currentPassword"
                      aria-invalid={fieldState.invalid}
                      placeholder="Senha Atual"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="newPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="newPassword">Nova Senha</FieldLabel>
                    <Input
                      {...field}
                      id="newPassword"
                      aria-invalid={fieldState.invalid}
                      placeholder="Nova Senha"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="confirmPassword">Confirmar Senha</FieldLabel>
                    <Input
                      {...field}
                      id="confirmPassword"
                      aria-invalid={fieldState.invalid}
                      placeholder="Confirmar Senha"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />


            </FieldGroup>
          </form>
        </Form>
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Cancelar
            </Button>
          </DialogClose>

          <Button
            type="submit"
            form="change-password-form"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Alterando..." : "Alterar Senha"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
