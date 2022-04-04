import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'doctors', loadChildren: () => import('./doctor/doctor.module').then(m => m.DoctorModule)},
  { path: 'shifts', loadChildren: () => import('./shift/shift.module').then(m => m.ShiftModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
