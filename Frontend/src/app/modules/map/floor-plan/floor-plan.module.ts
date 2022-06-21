import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FloorPlanRoutingModule } from './floor-plan-routing.module';
import { FloorPlanComponent } from './floor-plan.component';
import { FloorPlanSvgComponent } from './components/floor-plan-svg/floor-plan-svg.component';
import { SharedModule } from '@app/shared/shared.module';
import { ScrollBoxComponent } from './components/scroll-box/scroll-box.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { EquipmentCardComponent } from './components/equipment-card/equipment-card.component';
import { FloorPlanService } from './services/floor-plan.service';
import { RoomTypeToStringPipe } from '@app/shared/pipes/room-type-to-string.pipe';
import { NgxsModule } from '@ngxs/store';
import { FloorPlanState } from './state/floor-plan.state';


@NgModule({
  declarations: [
    FloorPlanComponent,
    FloorPlanSvgComponent,
    ScrollBoxComponent,
    SideBarComponent,
    EquipmentCardComponent,
    
  ],
  imports: [
    CommonModule,
    FloorPlanRoutingModule,
    SharedModule,
    [
      NgxsModule.forFeature([FloorPlanState]),
    ]
  ],
  providers: [
    FloorPlanService,
    RoomTypeToStringPipe
  ]
})
export class FloorPlanModule { }
