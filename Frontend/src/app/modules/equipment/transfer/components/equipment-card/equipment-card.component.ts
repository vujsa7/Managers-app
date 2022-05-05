import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { EquipmentWithRoom } from '../../models/equipment-with-room';

@Component({
  selector: 'tr-equipment-card',
  templateUrl: './equipment-card.component.html',
  styleUrls: ['./equipment-card.component.scss']
})
export class EquipmentCardComponent implements OnChanges {

  @Input() equipment!: EquipmentWithRoom;
  @Input() selectedEquipmentId: number = -1;
  @Output() selectedEquipment = new EventEmitter<EquipmentWithRoom>();
  isCardSelected : boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedEquipmentId']) {
      if(this.equipment.id == changes.selectedEquipmentId.currentValue)
        this.isCardSelected = true;
      else 
        this.isCardSelected = false;
    }
  }

  notifySelectedEquipment() : void{
    this.selectedEquipment.emit(this.equipment);
  }

}
