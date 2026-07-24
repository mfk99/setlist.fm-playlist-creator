import { create } from "zustand";

type PageModeStore = {
  pageMode: string;
  setPage: (newPage: string) => void;
};

export const usePageModeStore = create<PageModeStore>((set) => ({
  pageMode: "insertion",
  setPage: (newPage) => set({ pageMode: newPage }),
}));
