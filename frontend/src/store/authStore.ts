import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";

interface AuthState {
  user: any;
  token: string | null;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      error: null,

      login: async (email, password) => {
        try {
          const response = await axios.post("/api/login", { email, password });
          set({
            user: response.data.user,
            token: response.data.token,
            error: null,
          });
        } catch (error: any) {
          set({ error: error.response?.data?.message || "Error en login" });
        }
      },

      register: async (name, email, password) => {
        try {
          const response = await axios.post("/api/register", {
            email,
            password,
            name,
          });
          set({ user: response.data, token: null, error: null });
        } catch (error: any) {
          set({ error: error.response?.data?.message || "Error en registro" });
        }
      },

      logout: () => {
        set({ user: null, token: null, error: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
