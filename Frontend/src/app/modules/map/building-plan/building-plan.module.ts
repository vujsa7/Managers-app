import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingService } from './services/building.service';
import { BuildingPlanSvgComponent } from './components/building-plan-svg/building-plan-svg.component';
import { BuildingPlanRoutingModule } from './building-plan-routing.module';
import { BuildingPlanComponent } from './building-plan.component';

@NgModule({
  declarations: [
    BuildingPlanComponent,
    BuildingPlanSvgComponent
  ],
  imports: [
    CommonModule,
    BuildingPlanRoutingModule
  ],
  providers: [
    BuildingService
  ]
})
export class BuildingPlanModule { }
