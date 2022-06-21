import { Component, Input, SimpleChanges } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FloorEquipment } from '../../models/floor-equipment.model';
import { UpdateSelectedEquipmentId, UpdateSelectedRoomId } from '../../state/floor-plan.actions';
import { FloorPlanState } from '../../state/floor-plan.state';

@Component({
  selector: 'floor-equipment-card',
  templateUrl: './equipment-card.component.html',
  styleUrls: ['./equipment-card.component.scss']
})
export class EquipmentCardComponent {

  @Input() equipment!: FloorEquipment;
  @Input() selectedEquipmentId : number = -1; 
  @Select(FloorPlanState.selectSelectedEquipmentId) selectedEquipmentId$!: Observable<number>;
  isCardSelected : boolean = false;

  constructor(private store: Store){}

  ngOnInit(): void {
    this.selectedEquipmentId$.subscribe(data => {
      this.isCardSelected = data == this.equipment.id;
    })
  }

  displayRoomOnMap(){
    this.isCardSelected = true;
    this.store.dispatch([new UpdateSelectedRoomId(this.equipment.roomId)]);
    this.store.dispatch([new UpdateSelectedEquipmentId(this.equipment.id)]);
  }

}
