import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RoomTypeToStringPipe } from '@app/shared/pipes/room-type-to-string.pipe';
import { MapState } from '@app/state/map/map.state';
import { Select } from '@ngxs/store';
import _ from 'lodash';
import { Observable } from 'rxjs';
import { FloorEquipment } from '../../models/floor-equipment.model';
import { FloorRoom } from '../../models/floor-room.model';

@Component({
  selector: 'app-scroll-box',
  templateUrl: './scroll-box.component.html',
  styleUrls: ['./scroll-box.component.scss']
})
export class ScrollBoxComponent implements OnInit, OnChanges{

  rooms: FloorRoom[] = [];
  @Select(MapState.selectFloorRooms) rooms$!: Observable<FloorRoom[]>;
  equipment: FloorEquipment[] = [];
  @Select(MapState.selectFloorEquipment) equipment$!: Observable<FloorEquipment[]>;
  filteredRooms: FloorRoom[] = [];
  filteredEquipment: FloorEquipment[] = [];
  @Input() selectedFloor: number = 0;
  @Input() searchFilter: string = "";
  @Input() isSearchActive: boolean = false;
  @Input() mode: string = "rooms";

  constructor(private roomTypeToString: RoomTypeToStringPipe){}
  
  ngOnInit(): void {
    
    this.rooms$.subscribe(data => {
      this.rooms = data;
      this.filteredRooms = _.filter(this.rooms, r => r.floor == this.selectedFloor);
    });

    this.equipment$.subscribe(data => {
      this.equipment = data;
      this.filteredEquipment = _.filter(this.equipment, e => e.roomFloor == this.selectedFloor);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedFloor']) {
      this.selectedFloor = changes.selectedFloor.currentValue;
      this.filterByFloor();
    } 
    else if(changes['searchFilter']){
      this.searchFilter = changes.searchFilter.currentValue;
      this.filterSearch();
    }
    else if(changes['isSearchActive']){
      this.isSearchActive = changes.isSearchActive.currentValue;
      this.searchActiveChanged();
    }
    else if(changes['mode']){
      this.mode = changes.mode.currentValue;
    }
  }

  searchActiveChanged() {
    if(!this.isSearchActive){
      this.filteredRooms = this.rooms;
      this.filteredEquipment = this.equipment;
    }
  }

  filterByFloor() {
    this.filteredRooms = _.filter(this.rooms, r => r.floor == this.selectedFloor);
    this.filteredEquipment = _.filter(this.equipment, e => e.roomFloor == this.selectedFloor);
  }

  filterSearch() {
    if(this.searchFilter == ""){
      this.filteredRooms = this.rooms;
      this.filteredEquipment = this.equipment;
    } else if(this.isSearchActive) {
      if(this.mode == 'rooms')// (room.type | roomTypeToString)).toLowerCase().includes(searchFilter)"
        this.filteredRooms = _.filter(this.rooms, r => this.roomTypeToString.transform(r.type).toLowerCase().includes(this.searchFilter.toLowerCase()) || r.name.toLowerCase().includes(this.searchFilter.toLowerCase()));
      else
        this.filteredEquipment = _.filter(this.equipment, e => e.equipmentItemName.toLowerCase().includes(this.searchFilter));
    }
  }

}
