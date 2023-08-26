import { KickPosition } from "./kickTarget";

export interface CommonComponentProps {
  visible?: boolean;
  selected?: boolean;
}

export interface BallAnimationProps {
  animationName: KickPosition;
}

export interface KeeperAnimationProps {
  animationName: KickPosition;
}

export const GameRules: string[] = [
  "1 moeda dá direito a 5 chutes.",
  "Se o goleiro defender 3 chutes você perde.",
  "Se acertar 3 chutes você vence.",
  "Vencer te dá 3 moedas.",
  "'Chutar' sem 'Escolher a Posição' assume uma posição de chute randômica.",
];
