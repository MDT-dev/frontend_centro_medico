import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/lib/api";
import Cookies from "js-cookie";

type User = {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,

      login: async (email, password) => {
        set({ loading: true });
        try {
          const { data } = await api.post("/auth/login", { email, password });
          
          // 1. Salva o token que veio do backend no Cookie
          // Isso permite que o Middleware da Vercel leia o token
          Cookies.set("auth_token", data.token, { 
            expires: 1, // 1 dia
            secure: true, 
            sameSite: 'lax' 
          });

          set({ user: data.user, loading: false });
        } catch (err) {
          set({ loading: false });
          throw err;
        }
      },

      logout: async () => {
        try {
          await api.post("/auth/logout");
        } finally {
          // Remove o cookie e limpa o estado
          Cookies.remove("auth_token");
          set({ user: null });
          localStorage.removeItem("auth-storage");
        }
      },

      fetchMe: async () => {
        try {
          const { data } = await api.get("/auth/me");
          set({ user: data.user });
        } catch {
          Cookies.remove("auth_token");
          set({ user: null });
        }
      },
    }),
    { name: "auth-storage" }
  )
);
