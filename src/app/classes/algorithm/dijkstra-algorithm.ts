import {getNeighbors} from "../../utils/map-resolver";
import {Node} from "../base/node";
import {PathFinder} from "../base/path-finder";
import {PriorityQueue} from "../helper/piority-queue";
import {async_sleep} from "../../utils/utils";
import {MapConfigSyncService} from "../../service/map-config-sync.service";

export class DijkstraAlgorithm extends PathFinder {
  constructor(mapConfigSyncService: MapConfigSyncService) {
    super(mapConfigSyncService);
  }

  async pathFinder() {
    if (this.start === null || this.end === null) {
      console.log("Unknown start and end node");
      return;
    }

    const frontier = new PriorityQueue<Node>();
    frontier.put(this.start, 0);

    while (!frontier.empty() && !this.stop) {
      const current = frontier.get();

      if (current === this.end) {
        break;
      }

      const neighbors = getNeighbors(current.x, current.y, this.width, this.height);
      for (const neighbor of neighbors) {
        const currentNeighbor = this.map[neighbor[0]][neighbor[1]];
        const newCost = current.currentCost + currentNeighbor.cost;
        if (currentNeighbor.type !== "W" &&
          (!currentNeighbor.visited || newCost < currentNeighbor.currentCost)) {
          currentNeighbor.currentCost = newCost;
          frontier.put(currentNeighbor, newCost);
          currentNeighbor.visited = true;
          currentNeighbor.preNode = current;
          if (this.stop) {
            console.log("Stop");
            return;
          }
          await async_sleep(50);
        }
      }
    }

    let current = this.end.preNode;

    while (current !== null && (current.x !== this.start.x || current.y !== this.start.y)) {
      current.type = "P";
      current = current.preNode;
    }
  }
}
