import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { DetailsComponent } from './components/details/details.component';
import { DetailsEditComponent } from './components/details-edit/details-edit.component';
import { RenovationComponent } from './components/renovation/renovation.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendar.component';
import { EquipmentTransferService } from './services/equipment-transfer.service';
import { RenovationService } from './services/renovation.service';
import { RoomService } from './services/room.service';
import { DoctorService } from './services/doctor.service';


@NgModule({
  declarations: [
    DetailsComponent,
    DetailsEditComponent,
    RenovationComponent,
    ScheduleComponent,
    ScheduleCalendarComponent
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    SharedModule,
  ],
  providers: [
    EquipmentTransferService,
    DoctorService,
    RenovationService,
    RoomService
  ]
})
export class RoomModule { }
