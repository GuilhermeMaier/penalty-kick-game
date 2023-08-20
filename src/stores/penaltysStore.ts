import storeTable from "@utils/types/storeTable";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IPenaltysStore {
  kicks: number;
  setKicks: (kicks: number) => void;
}

export const usePenaltysStore = create<IPenaltysStore>()(
  persist(
    (set) => ({
      kicks: 0,
      setKicks: (kicks) => set(() => ({ kicks })),
    }),
    {
      name: storeTable.penaltysStore,
    }
  )
);
