import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthStore } from "@/store/auth"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function DropdownMenuProfile() {

    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user); // pegar role
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 pl-2 md:pl-3 border-l border-border">
                    <Avatar className="w-7 h-7 md:w-8 md:h-8 ring-2 ring-primary/20 transition-all duration-300 hover:ring-primary/40">
                        <AvatarImage src="/profile.jpg" alt="Jessin Sam" />
                        <AvatarFallback className="text-xs">EU</AvatarFallback>
                    </Avatar>
                    <div className="text-xs hidden sm:block">
                        <p className="font-semibold text-foreground">{user?.firstName}  {user?.lastName}</p>
                        <p className="text-muted-foreground text-[10px]">{user?.email}</p>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
                <DropdownMenuGroup>
                    <DropdownMenuLabel >Minha Conta</DropdownMenuLabel>
                    <Link href="/admin/perfil">
                        <DropdownMenuItem >
                            Profile
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>

                    <DropdownMenuItem>
                        Definições
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuSeparator />

                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleLogout}>
                        Terminar sessão
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
