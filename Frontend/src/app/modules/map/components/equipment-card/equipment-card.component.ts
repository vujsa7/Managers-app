import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Equipment } from '@app/modules/map/models/equipment.model';

@Component({
  selector: 'map-equipment-card',
  templateUrl: './equipment-card.component.html',
  styleUrls: ['./equipment-card.component.scss']
})
export class EquipmentCardComponent {

  @Input() equipment!: Equipment;
  @Input() selectedEquipmentId : number = -1; 
  @Output() notifyDisplayRoom = new EventEmitter<number>();
  isCardSelected : boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedEquipmentId']) {
      this.selectedEquipmentId = changes.selectedEquipmentId.currentValue;
      if(this.equipment.id == this.selectedEquipmentId)
        this.isCardSelected = true;
      else 
        this.isCardSelected = false;
    }
  }

  displayRoomOnMap() : void{
    this.notifyDisplayRoom.emit(this.equipment.roomId);
  }

}
