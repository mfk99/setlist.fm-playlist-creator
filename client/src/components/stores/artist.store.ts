import { create } from "zustand";

type ArtistStore = {
  artist: string;
  setArtist: (newArtist: string) => void;
};

export const useArtistStore = create<ArtistStore>((set) => ({
  artist: "",
  setArtist: (newArtist) => set({ artist: newArtist }),
}));
