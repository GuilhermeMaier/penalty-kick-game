import { KickTarget } from "@utils/types/kickTarget";
import storeTable from "@utils/types/storeTable";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IPenaltysStore {
  isGameStarted: boolean;
  setIsGameStarted: (isGameStarted: boolean) => void;
  kicks: number;
  setKicks: (kicks: number) => void;
  goals: number;
  setGoals: (goals: number) => void;
  defenses: number;
  setDefenses: (defenses: number) => void;
  kickTargetsVisible: boolean;
  setKickTargetsVisible: (kickTargetsVisible: boolean) => void;
  kickTarget: KickTarget;
  setKickTarget: (kickTarget: KickTarget) => void;
  reset: () => void;
}

export const usePenaltysStore = create<IPenaltysStore>()(
  persist(
    (set) => ({
      isGameStarted: false,
      setIsGameStarted: (isGameStarted) => set(() => ({ isGameStarted })),
      kicks: 0,
      setKicks: (kicks) => set(() => ({ kicks })),
      goals: 0,
      setGoals: (goals) => set(() => ({ goals })),
      defenses: 0,
      setDefenses: (defenses) => set(() => ({ defenses })),
      kickTargetsVisible: null,
      setKickTargetsVisible: (kickTargetsVisible) =>
        set(() => ({ kickTargetsVisible })),
      kickTarget: null,
      setKickTarget: (kickTarget) => set(() => ({ kickTarget })),
      reset: () =>
        set(() => ({
          isGameStarted: false,
          kicks: 0,
          goals: 0,
          defenses: 0,
          kickTarget: null,
          kickTargetsVisible: false,
        })),
    }),
    {
      name: storeTable.penaltysStore,
    }
  )
);
