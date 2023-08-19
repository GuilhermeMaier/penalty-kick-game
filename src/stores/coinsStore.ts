import storeTable from "@utils/types/storeTable";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ICoinsStore {
  coins: number;
  setCoins: (coins: number) => void;
  coinsFormatted: string;
}

export const useCoinsStore = create<ICoinsStore>()(
  persist(
    (set) => ({
      coins: 0,
      coinsFormatted: "0",
      setCoins: (coins) =>
        set(() => ({
          coins,
          coinsFormatted: new Intl.NumberFormat().format(coins),
        })),
    }),
    {
      name: storeTable.coinsStore,
    }
  )
);
