import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { RoomStatus } from '@app/shared/models/room-status.enum';
import { RoomBasicInfo } from '@app/shared/models/room-basic-info.model';

@Component({
  selector: 'floor-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss']
})
export class RoomCardComponent implements OnChanges {

  @Input() room!: RoomBasicInfo;
  @Input() selectedRoomId : number = -1; 
  @Output() notifyDisplayRoom = new EventEmitter<number>();
  isCardSelected : boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedRoomId']) {
      this.selectedRoomId = changes.selectedRoomId.currentValue;
      if(this.room.id == this.selectedRoomId)
        this.isCardSelected = true;
      else 
        this.isCardSelected = false;
    }
  }

  roomStatusColor() : string{
    if(this.isCardSelected)
      return "#fff";
    if(this.room.status == RoomStatus.Unoccupied)
      return "#66A182";
    else if(this.room.status == RoomStatus.Occupied)
      return "#D94848";
    else if(this.room.status == RoomStatus.NotActive)
      return "#A2A2A2";
    else 
      return "#214975";
  }

  displayRoomOnMap(){
    this.notifyDisplayRoom.emit(this.room.id);
  }

}
