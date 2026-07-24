import { create } from "zustand";

type InputModeStore = {
  inputMode: string;
  setInput: (newInput: string) => void;
};

export const useInputModeStore = create<InputModeStore>((set) => ({
  inputMode: "insertion",
  setInput: (newInput) => set({ inputMode: newInput }),
}));
