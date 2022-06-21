import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { DetailsComponent } from './components/details/details.component';
import { DetailsEditComponent } from './components/details-edit/details-edit.component';
import { RenovationComponent } from './components/renovation/renovation.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendar.component';
import { RenovationService } from './services/renovation.service';
import { MapModule } from '../map/map.module';
import { RenovationTime } from './components/renovation-time/renovation-time.component';
import { RoomState } from '@app/state/room/room.state';
import { NgxsModule } from '@ngxs/store';


@NgModule({
  declarations: [
    DetailsComponent,
    DetailsEditComponent,
    RenovationComponent,
    ScheduleComponent,
    ScheduleCalendarComponent,
    RenovationTime
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    SharedModule,
    MapModule,
    [
      NgxsModule.forFeature([RoomState]),
    ]
  ],
  providers: [
    RenovationService
  ]
})
export class RoomModule { }
