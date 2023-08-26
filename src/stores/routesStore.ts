import ROUTES from "@utils/types/routes";
import { create } from "zustand";

export interface IRoutesStore {
  selectedRoute: ROUTES;
  setSelectedRoute: (selectedRoute: ROUTES) => void;
}

export const useRoutesStore = create<IRoutesStore>()((set) => ({
  selectedRoute: null,
  setSelectedRoute: (selectedRoute) => set(() => ({ selectedRoute })),
}));
