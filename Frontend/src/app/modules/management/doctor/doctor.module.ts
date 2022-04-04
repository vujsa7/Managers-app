import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { AssignHolidayDialogComponent } from './components/assign-holiday-dialog/assign-holiday-dialog.component';
import { AssignOnCallShiftDialogComponent } from './components/assign-on-call-shift-dialog/assign-on-call-shift-dialog.component';
import { AssignShiftDialogComponent } from './components/assign-shift-dialog/assign-shift-dialog.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendarcomponent';
import { SharedModule } from '@app/shared/shared.module';
import { DoctorService } from './services/doctor.service';
import { HolidayService } from './services/holiday.service';
import { WorkloadComponent } from './components/workload/workload.component';

@NgModule({
  declarations: [
    AssignHolidayDialogComponent,
    AssignOnCallShiftDialogComponent,
    AssignShiftDialogComponent,
    ScheduleComponent,
    ScheduleCalendarComponent,
    WorkloadComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule,
  ],
  providers:[
    DatePipe,
    DoctorService,
    HolidayService
  ]
})
export class DoctorModule { }
