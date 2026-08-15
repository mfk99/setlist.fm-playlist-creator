import { create } from "zustand";

type SongIdStore = {
  songIds: string[];
  appendToSongIds: (newId: string) => void;
};

export const useSongIdStore = create<SongIdStore>((set) => ({
  songIds: [],
  appendToSongIds: (newId) =>
    set((state) => ({
      songIds: [...state.songIds, newId],
    })),
}));
