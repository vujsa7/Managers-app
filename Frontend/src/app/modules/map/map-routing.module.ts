import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FloorPlanComponent } from "./components/floor-plan/floor-plan.component";
import { MapComponent } from "./map.component";

const routes: Routes = [
    { path: '', component: MapComponent },
    { path: 'floor-plan', component: FloorPlanComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MapRoutingModule { }