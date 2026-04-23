import { create } from "zustand"
import { persist } from "zustand/middleware"
import { api } from "@/lib/api"

type User = { id: string; email: string; role: string,firstName: string, lastName: string }

type AuthState = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  fetchMe: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,

      login: async (email, password) => {
        set({ loading: true })
        try {
          const { data } = await api.post("/auth/login", { email, password })
          set({ user: data.user, loading: false })
        } catch (err) {
          set({ loading: false })
          throw err
        }
      },

      logout: async () => {
        await api.post("/auth/logout")
        set({ user: null })
      },

      fetchMe: async () => {
        try {
          const { data } = await api.get("/auth/me")
          set({ user: data.user })
        } catch {
          set({ user: null })
        }
      },
    }),
    { name: "auth-storage" }
  )
)