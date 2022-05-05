import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    { path: 'building-plan', loadChildren: () => import('./building-plan/building-plan.module').then(m => m.BuildingPlanModule) }, 
    { path: 'floor-plan', loadChildren: () => import('./floor-plan/floor-plan.module').then(m => m.FloorPlanModule) },
    { path: '**', redirectTo: 'building-plan' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MapRoutingModule { }