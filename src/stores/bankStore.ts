import storeTable from "@utils/types/storeTable";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IBankStore {
  coinsQuantity: string;
  setCoinsQuantity: (coinsQuantity: string) => void;
}

export const useBankStore = create<IBankStore>()(
  persist(
    (set) => ({
      coinsQuantity: "0",
      setCoinsQuantity: (coinsQuantity) => set(() => ({ coinsQuantity })),
    }),
    {
      name: storeTable.coinsStore,
    }
  )
);
