"use client";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Download, Filter, UserCircle2 } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { AppSidebar } from "@/components/module/app-sidebar";
import { AppSidebarRecepcionista } from "@/components/module/app-sidebar-recepcionista";


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
    >
      <SidebarProvider>
        <AppSidebarRecepcionista />
        <SidebarInset>
          <header className="flex h-14 items-center gap-2 border-b px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4" />
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>

    </main>
  );
}