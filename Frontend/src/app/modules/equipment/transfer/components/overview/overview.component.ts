import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AvailableTimeSlotsComponent } from '@app/shared/components/available-time-slots/available-time-slots.component';
import { EquipmentTransfer } from '@app/shared/models/equipment-transfer.model';
import { DestinationRoomComponent } from '../destination-room/destination-room.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {

  completedSteps: number = 0;
  mode: string = "equipment-overview";
  equipmentTransfer: EquipmentTransfer = new EquipmentTransfer(-1, "", 0, -1, "", 0, 1, -1, -1, new Date());
  @ViewChild(DestinationRoomComponent,{static: false}) destinationRoomComponent : any;
  @ViewChild(AvailableTimeSlotsComponent,{static: false}) availableTimeSlotsComponent : any;

  constructor(private router: Router) { }
  
  onBackToMap(): void{
    this.router.navigate(['/map/'])
  }

  confirmEquipmentQuantity(){
    this.completedSteps += 1;
    this.mode = "destination-room";
  }

  selectDestinationRoom(){
    this.completedSteps += 1;
    this.mode = "transfer-time";
    this.availableTimeSlotsComponent.removeTimeSlots();
  }

  onEquipmentTransferChanged() : void{
    this.destinationRoomComponent.updateEquipmentTransfer(this.equipmentTransfer);
    this.completedSteps = 0;
  }

}
