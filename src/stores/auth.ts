import { User } from "@/types/user";
import { stat } from "fs";
import { create } from "zustand";
import { persist } from "zustand/middleware";
type AuthStore = {
  user: User | null;
  accessToken: string | null;
  onAuthSuccess: ({
    user,
    accesToken,
  }: {
    user: User;
    accesToken: string;
  }) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      onAuthSuccess: (payload) => {
        set((state) => ({ ...state, ...payload }));
      },
      clearAuth: () => {
        set(() => ({
          user: null,
          accessToken: null,
        }));
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    },
  ),
);