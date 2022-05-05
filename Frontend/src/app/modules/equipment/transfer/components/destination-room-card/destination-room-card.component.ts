import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Room } from '../../models/room';

@Component({
  selector: 'tr-destination-room-card',
  templateUrl: './destination-room-card.component.html',
  styleUrls: ['./destination-room-card.component.scss']
})
export class DestinationRoomCardComponent implements OnChanges {

  @Input() room!: Room;
  @Input() selectedRoomId: number = -1;
  @Output() destinationRoomSelected = new EventEmitter<number>();
  isCardSelected : boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedRoomId']) {
      if(changes.selectedRoomId.currentValue == this.room.id)
        this.isCardSelected = true;
      else 
        this.isCardSelected = false;
    }
  }

  notifyDestinationRoomSelected(): void{
    this.destinationRoomSelected.emit(this.room.id);
  }

}
