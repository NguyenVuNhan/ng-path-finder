import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {GridMapComponent} from "./component/grid-map/grid-map.component";


const routes: Routes = [
  {
    path: ":algorithm",
    component: GridMapComponent
  },
  {
    path: "",
    redirectTo: "Breadth First Search",
    pathMatch: "full"
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
