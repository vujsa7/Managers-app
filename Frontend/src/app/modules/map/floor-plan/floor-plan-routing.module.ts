import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FloorPlanComponent } from './floor-plan.component';

const routes: Routes = [
  { path: '', component: FloorPlanComponent}, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FloorPlanRoutingModule { }
