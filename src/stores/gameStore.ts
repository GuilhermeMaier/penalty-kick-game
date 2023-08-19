import storeTable from "@utils/types/storeTable";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IGameStore {
  kicks: number;
  setKicks: (kicks: number) => void;
}

export const useGameStore = create<IGameStore>()(
  persist(
    (set) => ({
      kicks: 0,
      setKicks: (kicks) => set(() => ({ kicks })),
    }),
    {
      name: storeTable.coinsStore,
    }
  )
);
