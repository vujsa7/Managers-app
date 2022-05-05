import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FloorEquipment } from '../../models/floor-equipment.model';
import { FloorRoom } from '../../models/floor-room.model';

@Component({
  selector: 'app-scroll-box',
  templateUrl: './scroll-box.component.html',
  styleUrls: ['./scroll-box.component.scss']
})
export class ScrollBoxComponent implements OnChanges{

  @Input() rooms: FloorRoom[] = [];
  @Input() equipment: FloorEquipment[] = [];
  @Input() selectedFloor: number = 0;
  @Input() searchFilter: string = "";
  @Input() isSearchActive: boolean = false;
  @Input() mode: string = "rooms";
  @Output() notifyDisplayRoom = new EventEmitter<number>();
  

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedFloor']) {
      this.selectedFloor = changes.selectedFloor.currentValue;
    } 
    else if(changes['searchFilter']){
      this.searchFilter = changes.searchFilter.currentValue;
    }
    else if(changes['isSearchActive']){
      this.isSearchActive = changes.isSearchActive.currentValue;
    }
    else if(changes['mode']){
      this.mode = changes.mode.currentValue;
    }
  }

  onNotifyDisplayRoom(roomId : number){
    this.notifyDisplayRoom.emit(roomId);
  }

}
