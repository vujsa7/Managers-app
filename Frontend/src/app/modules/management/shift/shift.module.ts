import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftComponent } from './components/shift/shift.component';
import { CreateShiftDialogComponent } from './components/create-shift-dialog/create-shift-dialog.component';
import { UpdateShiftDialogComponent } from './components/update-shift-dialog/update-shift-dialog.component';
import { SharedModule } from '@app/shared/shared.module';
import { ShiftRoutingModule } from './shift-routing.module';
import { ShiftCRUDService } from './services/shift-crud.service';

@NgModule({
  declarations: [
    ShiftComponent,
    CreateShiftDialogComponent,
    UpdateShiftDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShiftRoutingModule
  ],
  providers: [ShiftCRUDService]
})
export class ShiftModule { }
