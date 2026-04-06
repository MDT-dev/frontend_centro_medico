"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { User, UserRole } from "@/lib/schemas/user";
import { MoreHorizontal, Trash2, Edit, Lock, FileDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onChangePassword: (user: User) => void;
  onDownloadPdf: (user: User) => void;
}

const roleLabels: Record<UserRole, string> = {
  [UserRole.ADMIN]: "Administrador",
  [UserRole.GERENTE]: "Gerente",
  [UserRole.MEDICO]: "Médico",
  [UserRole.RECEPCIONISTA]: "Recepcionista",
  [UserRole.PACIENTE]: "Paciente",
};

const roleColors: Record<UserRole, string> = {
  [UserRole.ADMIN]: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  [UserRole.GERENTE]: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  [UserRole.MEDICO]: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  [UserRole.RECEPCIONISTA]: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  [UserRole.PACIENTE]: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
};

export function UsersTable({
  users,
  onEdit,
  onDelete,
  onChangePassword,
  onDownloadPdf,
}: UsersTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Nome</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Função</TableHead>
            <TableHead className="font-semibold">Telefone</TableHead>
            <TableHead className="font-semibold text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {user.email}
              </TableCell>
              <TableCell>
                <Badge className={roleColors[user.role] + " cursor-default"}>
                  {roleLabels[user.role]}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {user.phone || "—"}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem
                      onClick={() => onEdit(user)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Edit className="h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onChangePassword(user)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Lock className="h-4 w-4" />
                      Alterar Senha
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDownloadPdf(user)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <FileDown className="h-4 w-4" />
                      Baixar PDF
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete(user)}
                      className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      Deletar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
