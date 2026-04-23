"use client";
import { Sidebar } from "@/components/dashboard/sidebar"
import { UserManagementPage } from "@/components/module/users-main/UserManagementPage";

export default function UsersPage() {
    
    return (
       
            <main className="p-6">
               <UserManagementPage></UserManagementPage>
            </main>
    );
}
