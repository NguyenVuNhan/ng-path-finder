export interface IPoint {
  readonly x: number;
  readonly y: number;
  type: PointType;
  visited: boolean;
  cost: number;
}

// Start | End | Block | Wall | Path | Mountain
export type PointType =  "S" | "E" | "B" | "W" | "P" | "M";
