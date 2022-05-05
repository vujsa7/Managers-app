import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingComponent } from './modules/onboarding/onboarding.component';

const routes: Routes = [
  { path: 'map', loadChildren: () => import('./modules/map/map.module').then(m => m.MapModule) }, 
  { path: 'rooms', loadChildren: () => import('./modules/room/room.module').then(m => m.RoomModule) }, 
  { path: 'management', loadChildren: () => import('./modules/management/management.module').then(m => m.ManagementModule) }, 
  { path: 'equipment', loadChildren: () => import('./modules/equipment/equipment.module').then(m => m.EquipmentModule) }, 
  { path: '', loadChildren: () => import('./modules/onboarding/onboarding.module').then(m => m.OnboardingModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
