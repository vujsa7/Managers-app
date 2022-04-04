import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { WorkloadComponent } from './components/workload/workload.component';

const routes: Routes = [
  { path: ':id', component: ScheduleComponent },
  { path: 'workload/:id', component: WorkloadComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
