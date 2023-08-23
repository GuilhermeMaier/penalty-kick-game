import { KickPosition } from "@utils/types/kickTarget";
import { create } from "zustand";

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
  kickTarget: KickPosition;
  setKickTarget: (kickTarget: KickPosition) => void;
  keeperTarget: KickPosition;
  setKeeperTarget: (keeperTarget: KickPosition) => void;
  reset: () => void;
}

export const usePenaltysStore = create<IPenaltysStore>()((set) => ({
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
  keeperTarget: null,
  setKeeperTarget: (keeperTarget) => set(() => ({ keeperTarget })),
  reset: () =>
    set(() => ({
      isGameStarted: false,
      kicks: 0,
      goals: 0,
      defenses: 0,
      kickTargetsVisible: false,
      kickTarget: null,
      keeperTarget: null,
    })),
}));
