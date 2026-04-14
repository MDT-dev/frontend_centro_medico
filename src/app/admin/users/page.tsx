"use client";
import { Sidebar } from "@/components/dashboard/sidebar"
import { UserManagementPage } from "@/components/module/users-main/UserManagementPage";

export default function UsersPage() {
    
    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            <main className="flex-1 p-4 lg:p-6 lg:ml-64">
               <UserManagementPage></UserManagementPage>
            </main>
        </div>
    );
}
