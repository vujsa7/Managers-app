import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BuildingPlanComponent } from "./building-plan.component";

const routes: Routes = [
    { path: '', component: BuildingPlanComponent}, 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BuildingPlanRoutingModule { }