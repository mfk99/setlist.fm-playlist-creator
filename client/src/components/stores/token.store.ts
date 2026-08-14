import { create } from "zustand";

type TokenStore = {
  token: string;
  setToken: (newToken: string) => void;
};

export const useTokenStore = create<TokenStore>((set) => ({
  token: "",
  setToken: (newToken) => set({ token: newToken }),
}));
