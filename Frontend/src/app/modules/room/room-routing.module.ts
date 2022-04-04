import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { RenovationComponent } from './components/renovation/renovation.component';
import { ScheduleComponent } from './components/schedule/schedule.component';

const routes: Routes = [
  { path: 'details/:id', component: DetailsComponent},
  { path: 'renovation/:id', component: RenovationComponent},
  { path: 'schedule/:id', component: ScheduleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
