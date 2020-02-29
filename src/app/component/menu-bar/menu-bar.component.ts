import {Component, HostListener, OnInit} from "@angular/core";
import {MapConfigSyncService} from "../../service/map-config-sync.service";
import {PointType} from "../../interfaces/grid-map";
import {algorithms} from "../../interfaces/map-config";

@Component({
  selector: "app-menu-bar",
  templateUrl: "./menu-bar.component.html",
  styleUrls: ["./menu-bar.component.css"]
})
export class MenuBarComponent implements OnInit {
  private algorithms = Object.keys(algorithms);

  constructor(private mapConfigSyncService: MapConfigSyncService) { }

  ngOnInit() {
  }

  reset() {
    this.mapConfigSyncService.onReset.next(true);
  }

  start() {
    this.mapConfigSyncService.onStart.next(true);
  }

  changeHeight(value: number) {
    this.mapConfigSyncService.heightChange.next(value);
  }

  changeDrawingState(value: PointType) {
    this.mapConfigSyncService.drawingStateChange.next(value);
  }

  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 87: // W
        this.mapConfigSyncService.drawingStateChange.next("W");
        break;

      case 83:
        this.mapConfigSyncService.drawingStateChange.next("S");
        break;

      case 77:
        this.mapConfigSyncService.drawingStateChange.next("M");
        break;

      case 69:
        this.mapConfigSyncService.drawingStateChange.next("E");
        break;
    }
  }
}
