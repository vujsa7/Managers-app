import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EquipmentTransfer } from '@app/modules/equipment/transfer/models/equipment-transfer.model';
import { RoomTypeToStringPipe } from '@app/shared/pipes/room-type-to-string.pipe';
import { Room } from '../../models/room';
import { EquipmentTransferService } from '../../services/equipment-transfer.service';

@Component({
  selector: 'tr-destination-room',
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

  constructor(private equipmentTransferService: EquipmentTransferService, private roomTypeToStringPipe: RoomTypeToStringPipe) { }

  ngOnInit(): void {
    this.equipmentTransferService.getDestinationRooms(1).subscribe(
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

  onDestinationRoomSelected(roomId: number){
    this.equipmentTransfer.destinationRoomId = roomId;
    this.selectedRoomId = roomId;
    this.selectDestinationRoomEvent.emit();
  }

}
