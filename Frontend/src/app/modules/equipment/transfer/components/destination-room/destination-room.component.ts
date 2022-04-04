import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoomService } from '@app/core/services/room.service';
import { EquipmentTransfer } from '@app/shared/models/equipment-transfer.model';
import { Room } from '@app/shared/models/room.model';
import { RoomTypeToStringPipe } from '@app/shared/pipes/room-type-to-string.pipe';

@Component({
  selector: 'app-destination-room',
  templateUrl: './destination-room.component.html',
  styleUrls: ['./destination-room.component.scss'],
  providers: [RoomTypeToStringPipe]
})
export class DestinationRoomComponent implements OnInit {

  rooms: Room[] = [];
  filteredRooms: Room[] = [];
  searchInput: string = "";
  searchFilter: string = "";
  scrollBoxTitle: string = "Select destination room";
  isSearchActive: boolean = false;
  selectedRoomId: number = -1;
  @Input() equipmentTransfer!: EquipmentTransfer;
  @Output() selectDestinationRoomEvent = new EventEmitter();

  constructor(private roomService: RoomService, private roomTypeToStringPipe: RoomTypeToStringPipe) { }

  ngOnInit(): void {
    this.roomService.getRooms(1).subscribe(
      data => {
        for (const room of data){
          if (room.id != this.equipmentTransfer.sourceRoomId){
            this.rooms.push(room);
            this.filteredRooms.push(room);
          }
        }
      }
    )
  }

  public updateEquipmentTransfer(obj: EquipmentTransfer) {
    this.equipmentTransfer  = obj;
    this.selectedRoomId = this.equipmentTransfer.destinationRoomId;
    this.filteredRooms = this.rooms.filter(x => {return x.id != this.equipmentTransfer.sourceRoomId;})
  }

  search() : void{
    if(this.searchInput != ""){
      this.searchFilter = this.searchInput.toLowerCase();
      this.scrollBoxTitle = "Search results";
      this.isSearchActive = true;
      let rooms = this.rooms;
      rooms = rooms.filter(param => (this.roomTypeToStringPipe.transform(param.type) + param.name).toLowerCase().includes(this.searchFilter));
      this.filteredRooms = rooms.filter(x => {return x.id != this.equipmentTransfer.sourceRoomId;})
    }
  }

  removeFilter() : void{
    this.isSearchActive = false;
    this.searchInput = "";
    this.filteredRooms = this.rooms.filter(x => {return x.id != this.equipmentTransfer.sourceRoomId;})
  }

  selectDestinationRoom(id: number) : void{
    this.equipmentTransfer.destinationRoomId = id;
    this.selectedRoomId = id;
    this.selectDestinationRoomEvent.emit();
  }

}
