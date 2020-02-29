import {IPoint, PointType} from "../../interfaces/grid-map";

export class Node implements IPoint {
  x: number;
  y: number;
  cost: number;
  type: PointType;
  visited: boolean;
  preNode: Node;
  currentCost: number;

  constructor(x: number, y: number, type: PointType,
              preNode: Node = null, currentCost: number = 0) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.visited = false;
    switch (this.type) {
      case "B":
        this.cost = 1;
        break;
      case "M":
        this.cost = 5;
        break;
      default:
        this.cost = -1;
    }
    this.preNode = preNode;
    this.currentCost = currentCost;
  }
}

