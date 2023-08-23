export type KickTarget =
  | "bottom-left"
  | "top-left"
  | "bottom-center"
  | "top-center"
  | "bottom-right"
  | "top-right";

export enum KickPosition {
  BottomLeft = "BottomLeft",
  BottomCenter = "BottomCenter",
  BottomRight = "BottomRight",
  TopLeft = "TopLeft",
  TopCenter = "TopCenter",
  TopRight = "TopRight",
}

export enum KickPositionTranslated {
  BottomLeft = "rasteiro na esquerda",
  BottomCenter = "rasteiro no meio",
  BottomRight = "rasteiro na direita",
  TopLeft = "na gaveta esquerda",
  TopCenter = "alto no meio",
  TopRight = "na gaveta direita",
}
