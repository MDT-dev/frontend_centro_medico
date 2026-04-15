"use client"
import { useParams, usePathname, useRouter } from "next/navigation"
import Link from "next/link"



import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import {  Building2, ChevronDown,Home, LogOut, LucideIcon, Settings,  Users } from 'lucide-react'
import { useAuthStore } from "@/store/auth"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { Logo } from "../ui-system/logo"

type NavItem = {
    title: string
    href?: string
    icon?: LucideIcon
    items?: NavItem[]
}

const modules: NavItem[] = [
    { title: "Dashboard", icon: Home, href: "/" },

    {
        title: "Pacientes",
        icon: Users,
        href: "/admin/pacientes"
    },

    {
        title: "Usuários",
        href: "/admin/users",
        icon: Building2,
    },

     {
        title: "Consultas",
        href: "/admin/consultas",
        icon: Building2,
    },
     {
        title: "Financeiro",
        href: "/admin/financeiro",
        icon: Building2,
    },
     {
        title: "Farmacia",
        href: "/admin/farmacia",
        icon: Building2,
    },

    {
        title: "settings",
        icon: Settings,
        items: [
            { title: "Currency", href: "/settings/currency" },
            { title: "Location", href: "/settings/location" },
            { title: "My Location", href: "/settings/my-location" },
            { title: "Partner", href: "/settings/partner" },
            { title: "Title", href: "/settings/title" },
        ],
    },
]


// Render recursivo de nav com Collapsible
function MenuTree({
    items,
    level = 0,
}: {
    items: NavItem[]
    level?: number
}) {

    return (
        <>
            {items.map((item) => {
                const hasChildren = !!item.items?.length
                if (level === 0) {
                    // nível raiz
                    if (hasChildren) {
                        return (
                            <Collapsible key={item.title} className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip={item.title}>
                                            {item.icon ? <item.icon /> : null}
                                            <span>{item.title}</span>
                                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <MenuTree items={item.items!} level={level + 1} />
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        )
                    }
                    // folha no raiz
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild tooltip={item.title}>
                                <Link href={item.href!}>
                                    {item.icon ? <item.icon /> : null}
                                    <span>{item.title}</span>
                                </Link>

                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                } else {
                    // níveis abaixo do raiz
                    if (hasChildren) {
                        return (
                            <SidebarMenuSubItem key={item.title}>
                                <Collapsible className="group/collapsible w-full">
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuSubButton>
                                            {/* Ícones opcionais em subníveis */}
                                            {item.icon ? <item.icon /> : null}
                                            <span>{item.title}</span>
                                            <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                        </SidebarMenuSubButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <MenuTree items={item.items!} level={level + 1} />
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </Collapsible>
                            </SidebarMenuSubItem>
                        )
                    }
                    return (
                        <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton asChild>
                                <Link href={item.href!}>
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                    )
                }
            })}
        </>
    )
}




export function AppSidebar() {
    const logout = useAuthStore((state) => state.logout);
    const userRole = useAuthStore((state) => state.user?.role); // pegar role
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };


    // Filtra os módulos que o TECH não deve ver
    const filteredModules = modules.filter((mod) => {
        if (userRole === "TECH") {
            // TECH não vê Personnel nem Settings
            return mod.title !== "Personnel" && mod.title !== "settings";
        }
        return true;
    });

    return (
        <Sidebar
            side="left"
            variant="sidebar"
            collapsible="icon"
            className=" [--sidebar-background:#fff] [--sidebar-text:#000] [--sidebar-foreground:0_0%_98%] [--sidebar-accent:194_65%_22%] [--sidebar-accent-foreground:0_0%_98%] [--sidebar-border:194_35%_22%]"
        >
            <SidebarHeader>
                <SidebarMenu >
                    <SidebarMenuItem>
                        <SidebarMenuButton variant="outline" size="lg" asChild>
                            <Link href={`/admin`}>
                                <Logo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu >
                            <MenuTree items={filteredModules} />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="text-gray-50">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href={`/admin`}>
                                <Settings />
                                <span>Account</span>
                            </Link>
                        </SidebarMenuButton>
                        <SidebarMenuButton asChild>
                            <button onClick={handleLogout}>
                                <LogOut />
                                <span>Logout</span>
                            </button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
