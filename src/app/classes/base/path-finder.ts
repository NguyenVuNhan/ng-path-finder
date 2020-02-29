import {Node} from "./node";
import {MapConfigSyncService} from "../../service/map-config-sync.service";

export class PathFinder {
  protected map: Node[][];
  protected start: Node;
  protected end: Node;
  protected width;
  protected height;
  protected stop;

  constructor(private mapConfigSyncService: MapConfigSyncService) {
    this.mapConfigSyncService.mapDataSync.subscribe(data => {
      this.map = data.map;
      this.start = data.start;
      this.end = data.end;
      this.width = data.width;
      this.height = data.height;
    });
    this.mapConfigSyncService.onStop.subscribe(value => {
      this.stop = value;
    });
  }

  async pathFinder() {
    // TODO: add error component
    alert("Not implemented");
  }

  generateMap(w: number, h: number, ww: number, hh: number, size: number) {
    this.width = w;
    this.height = h;
    for (let x = 0; x < w; x++) {
      const row: Node[] = [];
      for (let y = 0; y < h; y++) {
        row.push(new Node(x, y, "B"));
      }
      this.map.push(row);
    }
    this.sync();
  }

  setStartNode(x: number, y: number) {
    if (this.start !== null) {
      return;
    }
    this.start = this.map[x][y];
    this.start.type = "S";
    this.sync();
  }

  setEndNode(x: number, y: number) {
    if (this.end !== null) {
      return;
    }
    this.end = this.map[x][y];
    this.end.type = "E";
    this.sync();
  }

  toggleWall(x: number, y: number) {
    if (this.map[x][y].type === "W" || this.map[x][y].type === "B") {
      this.map[x][y].type = this.map[x][y].type === "W" ? "B" : "W";
    }
  }

  toggleMountain(x: number, y: number) {
    if (this.map[x][y].type === "M" || this.map[x][y].type === "B") {
      if (this.map[x][y].type === "M") {
        this.map[x][y].type = "B";
        this.map[x][y].cost = 1;
      } else {
        this.map[x][y].type = "M";
        this.map[x][y].cost = 10;
      }
    }
  }

  getNode(x: number, y: number) {
    return this.map[x][y];
  }

  reset() {
    this.map = [];
    this.start = null;
    this.end = null;
  }

  clean() {
    this.map.forEach(row => {
      row.forEach(node => {
        if (node.type === "P") {
          node.type = "B";
        }
        node.visited = false;
        node.currentCost = 0;
        node.preNode = null;
      });
    });
  }

  private sync() {
    this.mapConfigSyncService.mapDataSync.next({
      map: this.map,
      start: this.start,
      end: this.end,
      width: this.width,
      height: this.height
    });
  }
}
