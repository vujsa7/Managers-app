import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferRoutingModule } from './transfer-routing.module';
import { SelectEquipmentComponent } from './components/select-equipment/select-equipment.component';
import { DestinationRoomComponent } from './components/destination-room/destination-room.component';
import { SharedModule } from '@app/shared/shared.module';
import { EquipmentTransferService } from './services/equipment-transfer.service';
import { DestinationRoomCardComponent } from './components/destination-room-card/destination-room-card.component';
import { EquipmentCardComponent } from './components/equipment-card/equipment-card.component';
import { StepsComponent } from './components/steps/steps.component';
import { TransferComponent } from './transfer.component';
import { TimeComponent } from './components/time/time.component';


@NgModule({
  declarations: [
    SelectEquipmentComponent,
    DestinationRoomComponent,
    DestinationRoomCardComponent,
    EquipmentCardComponent,
    StepsComponent,
    TransferComponent,
    TimeComponent,
  ],
  imports: [
    CommonModule,
    TransferRoutingModule,
    SharedModule
  ],
  providers: [
    EquipmentTransferService
  ]
})
export class TransferModule { }
