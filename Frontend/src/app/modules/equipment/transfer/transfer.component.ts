import { Component, ViewChild } from '@angular/core';
import { EquipmentTransfer } from '@app/shared/models/equipment-transfer.model';

import { DestinationRoomComponent } from './components/destination-room/destination-room.component';

@Component({
  selector: 'equipment-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent{

  completedSteps: number = 0;
  mode: string = "equipment-overview";
  equipmentTransfer: EquipmentTransfer = new EquipmentTransfer(-1, "", 0, -1, "", 0, 1, -1, -1, new Date());
  @ViewChild(DestinationRoomComponent,{static: false}) destinationRoomComponent : any;

  confirmEquipmentQuantity(){
    this.completedSteps += 1;
    this.mode = "destination-room";
  }

  selectDestinationRoom(){
    this.completedSteps += 1;
    this.mode = "transfer-time";
  }

  onEquipmentTransferChanged() : void{
    this.destinationRoomComponent.updateEquipmentTransfer(this.equipmentTransfer);
    this.completedSteps = 0;
  }

  onModeChanged(mode: string){
    this.mode = mode;
  }

}
