import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import * as p5 from "p5";
import {PointType} from "../../interfaces/grid-map";
import {MapConfigSyncService} from "../../service/map-config-sync.service";
import {ActivatedRoute, Router} from "@angular/router";
import {algorithms} from "../../interfaces/map-config";

@Component({
  selector: "app-grid-map",
  templateUrl: "./grid-map.component.html",
  styleUrls: ["./grid-map.component.css"]
})
export class GridMapComponent implements OnInit, OnDestroy {
  @ViewChild("canvas", { static: false }) canvasDiv;
  private p5;

  constructor(private mapConfigSyncService: MapConfigSyncService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.p5 = new p5(this.defineSketch(this));
  }

  ngOnDestroy() {
    this.p5.noCanvas();
    this.mapConfigSyncService.onReset.unsubscribe();
    this.mapConfigSyncService.onStart.unsubscribe();
    this.mapConfigSyncService.drawingStateChange.unsubscribe();
    this.mapConfigSyncService.heightChange.unsubscribe();
  }

  defineSketch(self) {
    return (p: any) => {
      let w = 0;
      let h = 25;
      let size = 0;
      let pointType: PointType = "W";
      let lastMouseCoor = [0, 0];
      let tmpHeight = 0;
      let pathFinder = null;
      let newPathFinder = null;
      let canvasAlgin = 0;
      let isDone = false;

      self.mapConfigSyncService.onReset.subscribe(value => {
        if (value) {
          p.noLoop();
          h = tmpHeight;
          pathFinder.reset();
          setup();
          p.loop();
        }
      });

      self.mapConfigSyncService.drawingStateChange.subscribe(value => {
        pointType = value;
      });

      self.mapConfigSyncService.heightChange.subscribe(value => {
        tmpHeight = value;
      });

      self.mapConfigSyncService.onStart.subscribe(value => {
        if (value) {
          if (!isDone) {
            console.log("Host is busy");
            return;
          } else {
            isDone = false;
            pathFinder.clean();
            if (typeof(newPathFinder) !== typeof(pathFinder)) {
              pathFinder = newPathFinder;
            }
            pathFinder.pathFinder().then(() => {
              isDone = true;
            });
          }
        }
      });

      self.route.params.subscribe(routeParams => {
        p.noLoop();
        const algorithm = routeParams.algorithm;
        if (pathFinder !== null) {
          newPathFinder = new algorithms[algorithm](self.mapConfigSyncService);
        } else {
          pathFinder = new algorithms[algorithm](self.mapConfigSyncService);
        }
        p.loop();
      });

      const setup = () => {
        const p5canvas = document.getElementById("p5Canvas");
        const ww = p5canvas.offsetWidth;
        const hh = p5canvas.offsetHeight;
        const canvas = p.createCanvas(ww, hh);
        canvas.parent("p5Canvas");
        size = Math.floor(hh / h);
        w = Math.floor(ww / size);

        canvasAlgin = (ww - w * size) / 2;

        pathFinder.generateMap(w, h, ww, hh, size);
      };

      p.setup = () => {
        setup();

        // test
        pathFinder.setStartNode(5, 5);
        pathFinder.toggleWall(7, 6);
        pathFinder.toggleWall(7, 7);
        pathFinder.toggleWall(6, 7);
        pathFinder.toggleMountain(8, 6);
        pathFinder.setEndNode(10, 10);
        pathFinder.pathFinder().then(() => {
          isDone = true;
        });
      };

      p.draw = () => {
        p.translate(canvasAlgin, 0);
        p.background(0);
        for (let x = 0; x < w; x++) {
          for (let y = 0; y < h; y++) {
            const currentNode = pathFinder.getNode(x, y);
            switch (currentNode.type) {
              case "B":
                if (currentNode.visited) {
                  p.fill(127);
                } else {
                  p.fill(255);
                }
                break;

              case "W":
                p.fill(0);
                break;

              case "S":
                p.fill("#FFFF00");
                break;

              case "P":
                p.fill("#FF00FF");
                break;

              case "M":
                p.fill("#00F000");
                break;

              case "E":
                p.fill("#FF0000");
                break;
            }
            p.square(x * size, y * size, size);
          }
        }
      };

      p.mousePressed = () => {
        const x = Math.floor((p.mouseX - canvasAlgin) / size);
        const y = Math.floor(p.mouseY / size);

        if ((0 <= x && 0 <= y) && (x < w && y < h) && (lastMouseCoor[0] !== x || lastMouseCoor[1] !== y)) {
          switch (pointType) {
            case "S":
              pathFinder.setStartNode(x, y);
              break;

            case "E":
              pathFinder.setEndNode(x, y);
              break;

            case "M":
              pathFinder.toggleMountain(x, y);
              break;

            default:
              pathFinder.toggleWall(x, y);
              break;
          }
        }
        lastMouseCoor = [x, y];
      };

      p.mouseDragged = p.mousePressed;
    };
  }
}
