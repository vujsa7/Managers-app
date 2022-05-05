import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FloorEquipment } from '../../models/floor-equipment.model';
import { FloorRoom } from '../../models/floor-room.model';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnChanges {

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedFloor']) {
      this.selectedFloor = changes.selectedFloor.currentValue;
    }
    else if (changes['isRoomSelected']) {
      this.isRoomSelected = changes.isRoomSelected.currentValue;
    }
    else if (changes['selectedRoomId']) {
      this.selectedRoomId = changes.selectedRoomId.currentValue;
    }
  }

  @Input() rooms: FloorRoom[] = [];
  @Input() equipment: FloorEquipment[] = [];
  @Input() selectedFloor: number = 0;
  @Input() isRoomSelected: boolean = false;
  @Input() selectedRoomId: number = -1;
  @Output() notifyDisplayRoom = new EventEmitter<number>();
  searchInput: string = "";
  searchFilter: string = "";
  scrollBoxTitle: string = "Rooms on this floor";
  mode: string = "rooms";
  isSearchActive: boolean = false;

  onNotifyDisplayRoom(roomId: number) {
    this.notifyDisplayRoom.emit(roomId);
  }

  changeMode(mode: string) {
    this.mode = mode;
    if (mode == "rooms") {
      this.scrollBoxTitle = "Rooms on this floor";
    } else if (mode == "equipment") {
      this.scrollBoxTitle = "Equipment on this floor"
    }
  }

  search(): void {
    if (this.searchInput != "") {
      this.isSearchActive = true;
      this.searchFilter = this.searchInput.toLowerCase();
      this.scrollBoxTitle = "Search results";
    }
  }

  removeFilter(): void {
    this.isSearchActive = false;
    this.searchInput = "";
    if (this.mode == "rooms") {
      this.scrollBoxTitle = "Rooms on this floor";
    }
    else if (this.mode == "equipment") {
      this.scrollBoxTitle = "Equipment on this floor";
    }
  }

}
