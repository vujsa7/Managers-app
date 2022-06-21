import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RoomStatus } from '@app/shared/models/room-status.enum';
import { RoomBasicInfo } from '@app/shared/models/room-basic-info.model';
import { Select, Store } from '@ngxs/store';
import { UpdateSelectedRoomId } from '../../state/floor-plan.actions';
import { FloorPlanState } from '../../state/floor-plan.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'floor-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss']
})
export class RoomCardComponent implements OnInit {

  @Input() room!: RoomBasicInfo;
  @Select(FloorPlanState.selectSelectedRoomId) selectedRoomId$!: Observable<number>;
  isCardSelected : boolean = false;

  constructor(private store: Store){}

  ngOnInit(): void {
    this.selectedRoomId$.subscribe(data => {
      this.isCardSelected = data == this.room.id;
    })
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
    this.isCardSelected = true;
    this.store.dispatch(new UpdateSelectedRoomId(this.room.id));
  }

}
