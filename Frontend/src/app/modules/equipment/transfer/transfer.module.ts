import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferRoutingModule } from './transfer-routing.module';
import { SelectEquipmentComponent } from './components/select-equipment/select-equipment.component';
import { DestinationRoomComponent } from './components/destination-room/destination-room.component';
import { OverviewComponent } from './components/overview/overview.component';
import { EquipmentService } from './services/equipment.service';
import { SharedModule } from '@app/shared/shared.module';
import { EquipmentTransferService } from './services/equipment-transfer.service';


@NgModule({
  declarations: [
    SelectEquipmentComponent,
    DestinationRoomComponent,
    OverviewComponent
  ],
  imports: [
    CommonModule,
    TransferRoutingModule,
    SharedModule
  ],
  providers: [
    EquipmentService,
    EquipmentTransferService
  ]
})
export class TransferModule { }
