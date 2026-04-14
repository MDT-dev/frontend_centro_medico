"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, Users } from "lucide-react";
import { useUsersList, useDeleteUser } from "@/lib/hooks/useUsers";
import { User } from "@/lib/schemas/user";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { downloadUserPDF } from "@/lib/utils/pdf";
import { UserModal } from "@/components/module/users/UserModal";
import { UsersTable } from "@/components/module/users/UsersTable";
import { ChangePasswordModal } from "@/components/module/users/ChangePasswordModal";
import { Sidebar } from "@/components/dashboard/sidebar"

export default function UsersPage() {
    const [selectedUser, setSelectedUser] = useState<User | undefined>();
    const [userModalOpen, setUserModalOpen] = useState(false);
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const { data: users = [], isLoading, isError } = useUsersList();
    const deleteMutation = useDeleteUser();

    const handleCreateClick = () => {
        setSelectedUser(undefined);
        setUserModalOpen(true);
    };

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setUserModalOpen(true);
    };

    const handleChangePassword = (user: User) => {
        setSelectedUser(user);
        setPasswordModalOpen(true);
    };

    const handleDeleteClick = (user: User) => {
        setUserToDelete(user);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (userToDelete) {
            try {
                await deleteMutation.mutateAsync(userToDelete.id);
                toast.success("Usuário deletado com sucesso!");
                setDeleteDialogOpen(false);
                setUserToDelete(null);
            } catch (error) {
                toast.error("Erro ao deletar usuário");
            }
        }
    };

    const handleDownloadPdf = async (user: User) => {
        try {
            downloadUserPDF(user);
            toast.success("PDF baixado com sucesso!");
        } catch (error) {
            console.error("Erro ao gerar PDF:", error);
            toast.error("Erro ao gerar PDF");
        }
    };

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-lg font-semibold mb-2">Erro ao carregar usuários</p>
                    <p className="text-muted-foreground">
                        Verifique sua conexão e tente novamente.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            <main className="flex-1 p-4 lg:p-6 lg:ml-64">
                <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                                        Gestão de Usuários
                                    </h1>
                                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                                        Gerenciamento completo de usuários do centro médico
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Create Button and Stats */}
                        <div className="mb-8 flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                    Total de usuários
                                </p>
                                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
                                    {users.length}
                                </p>
                            </div>
                            <Button onClick={handleCreateClick} className="gap-2 h-11 px-6 text-base bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                                <Plus className="h-5 w-5" />
                                Novo Usuário
                            </Button>
                        </div>

                        {/* Table */}
                        {isLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="text-center">
                                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                                    <p className="text-muted-foreground">Carregando usuários...</p>
                                </div>
                            </div>
                        ) : users.length > 0 ? (
                            <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
                                <UsersTable
                                    users={users}
                                    onEdit={handleEdit}
                                    onDelete={handleDeleteClick}
                                    onChangePassword={handleChangePassword}
                                    onDownloadPdf={handleDownloadPdf}
                                />
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-slate-800 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 p-12">
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-700 mb-4">
                                        <Users className="h-6 w-6 text-slate-400 dark:text-slate-500" />
                                    </div>
                                    <p className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                        Nenhum usuário encontrado
                                    </p>
                                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                                        Comece criando o primeiro usuário do sistema
                                    </p>
                                    <Button
                                        onClick={handleCreateClick}
                                        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                                    >
                                        Criar Primeiro Usuário
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Modals */}
                    <UserModal
                        open={userModalOpen}
                        onOpenChange={setUserModalOpen}
                        user={selectedUser}
                    />

                    <ChangePasswordModal
                        open={passwordModalOpen}
                        onOpenChange={setPasswordModalOpen}
                        userId={selectedUser?.id || ""}
                    />

                    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Deletar Usuário</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Tem certeza que deseja deletar o usuário{" "}
                                    <strong>{userToDelete?.firstName} {userToDelete?.lastName}</strong>? Esta ação não pode ser
                                    desfeita.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="flex gap-3 justify-end">
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleConfirmDelete}
                                    disabled={deleteMutation.isPending}
                                    className="bg-destructive hover:bg-destructive/90"
                                >
                                    {deleteMutation.isPending ? "Deletando..." : "Deletar"}
                                </AlertDialogAction>
                            </div>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </main>
        </div>
    );
}
