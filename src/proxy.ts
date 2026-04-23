import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const roleHomePages: Record<string, string> = {
  ADMIN: "/admin",
  GERENTE: "/dashboard",
  MEDICO: "/doctor-portal",
  RECEPCIONISTA: "/recepcionista",
  PACIENTE: "/portal-paciente",
};

export function proxy(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const { pathname } = req.nextUrl;

  // 1. Se estiver na página de login e tiver token, manda para a home da Role
  if (pathname === "/login") {
    if (token) {
      const role = getRoleFromToken(token);
      if (role) return NextResponse.redirect(new URL(roleHomePages[role] || "/", req.url));
    }
    return NextResponse.next();
  }

  // 2. Se for a raiz "/" e tiver token, redireciona para a home específica
  if (pathname === "/" && token) {
    const role = getRoleFromToken(token);
    if (role) return NextResponse.redirect(new URL(roleHomePages[role] || "/", req.url));
  }

  // 3. Proteção: Se não tiver token, volta para o login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 4. Validação de Acesso (RBAC)
  const userRole = getRoleFromToken(token);
  if (!userRole) {
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("auth_token");
    return res;
  }

  // Se o usuário tentar acessar um painel que não é dele (ex: Medico tentando entrar no /admin)
  const allowedPrefix = roleHomePages[userRole];
  if (allowedPrefix && !pathname.startsWith(allowedPrefix)) {
     // Redireciona ele de volta para a home correta dele
     return NextResponse.redirect(new URL(allowedPrefix, req.url));
  }

  return NextResponse.next();
}

// Função auxiliar para decodificar o JWT no Middleware
function getRoleFromToken(token: string): string | null {
  try {
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    // Verifica expiração
    if (Date.now() >= payload.exp * 1000) return null;
    return payload.role;
  } catch {
    return null;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|assets|.*\\.png|.*\\.jpg).*)",
  ],
};