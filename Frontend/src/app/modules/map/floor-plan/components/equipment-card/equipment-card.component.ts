import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FloorEquipment } from '../../models/floor-equipment.model';

@Component({
  selector: 'floor-equipment-card',
  templateUrl: './equipment-card.component.html',
  styleUrls: ['./equipment-card.component.scss']
})
export class EquipmentCardComponent {

  @Input() equipment!: FloorEquipment;
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
