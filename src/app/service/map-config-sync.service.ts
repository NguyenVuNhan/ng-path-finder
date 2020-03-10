import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PointType } from "../interfaces/grid-map";
import { IMapData } from "../interfaces/map-config";

@Injectable({
  providedIn: "root"
})
export class MapConfigSyncService {
  private height = 25;
  private drawingState = "W";
  private mapData: IMapData = {
    map: [],
    start: null,
    end: null,
    width: 0,
    height: 0
  };

  onStop: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  heightChange: BehaviorSubject<number> = new BehaviorSubject<number>(
    this.height
  );
  onReset: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  onStart: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  drawingStateChange: BehaviorSubject<PointType> = new BehaviorSubject<
    PointType
  >(this.drawingState as "S" | "E" | "B" | "W" | "P");
  mapDataSync: BehaviorSubject<IMapData> = new BehaviorSubject<IMapData>(
    this.mapData
  );

  constructor() {
    this.heightChange.subscribe(newHeight => {
      this.height = newHeight;
    });

    this.drawingStateChange.subscribe(newDrawingState => {
      this.drawingState = newDrawingState;
    });

    this.mapDataSync.subscribe(newConfig => {
      this.mapData = newConfig;
    });
  }
}
