import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/login"];

// Mapeia rota inicial por role
const roleHomePages: Record<string, string> = {
  ADMIN: "/admin",
  GERENTE: "/dashboard",
  MEDICO: "/medico",
  RECEPCIONISTA: "/recepcionista",
  PACIENTE: "/paciente",
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const { pathname } = req.nextUrl;

  // 1️⃣ Rota pública
  if (publicRoutes.some((r) => pathname.startsWith(r))) {
    // Se tiver token, redireciona para home da role
    if (token) {
      try {
        const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
        const role = payload.role;
        const homePage = roleHomePages[role] || "/";
        return NextResponse.redirect(new URL(homePage, req.url));
      } catch {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // 2️⃣ Sem token
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 3️⃣ Decodifica JWT
  let payload: any;
  try {
    payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  } catch {
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("auth_token");
    return res;
  }

  // 4️⃣ Expiração
  if (Date.now() >= payload.exp * 1000) {
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("auth_token");
    return res;
  }

  // 5️⃣ Valida role e prefixo
  const userRole = payload.role;
  const allowedPrefix = roleHomePages[userRole];

  if (allowedPrefix && !pathname.startsWith(allowedPrefix)) {
    return NextResponse.redirect(new URL(allowedPrefix, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.webp).*)",
  ],
};