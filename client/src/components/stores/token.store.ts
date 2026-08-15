import axios from "axios";
import { create } from "zustand";
import { BASE_URL } from "../utils/env";

type TokenStore = {
  token: string | null;
  setToken: (newToken: string) => void;
  fetchToken: () => Promise<void>;
};

export const useTokenStore = create<TokenStore>((set) => ({
  token: null,
  setToken: (newToken) => set({ token: newToken }),

  fetchToken: async () => {
    const response = await axios.get(`${BASE_URL}/spotify/token`, {
      withCredentials: true,
    });

    set({ token: response.data });
  },
}));
