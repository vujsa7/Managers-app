import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomStatus } from '@app/shared/models/room-status.enum';
import { RoomType } from '@app/shared/models/room-type.enum';
import { UpdateRoom } from '@app/state/room/room.actions';
import { Store } from '@ngxs/store';
import { RoomWithEquipment } from '../../models/room-with-equipment.model';
import { RoomDetailsService } from '../../services/room-details.service';

@Component({
  selector: 'room-details-edit',
  templateUrl: './details-edit.component.html',
  styleUrls: ['./details-edit.component.scss']
})
export class DetailsEditComponent {

  @Input() room!: RoomWithEquipment;
  roomStatuses: RoomStatus[] = [
    RoomStatus.Occupied,
    RoomStatus.Unoccupied,
    RoomStatus.IsBeingRenovated,
    RoomStatus.NotActive
  ]
  roomTypes: RoomType[] = [
    RoomType.OperatingRoom,
    RoomType.SurgeryRoom,
    RoomType.ExaminationRoom,
    RoomType.EmergencyRoom,
    RoomType.DoctorOffice,
    RoomType.Restroom,
    RoomType.Lift,
    RoomType.Stairs,
    RoomType.Storage
  ]

  @Output() okay = new EventEmitter<any>();

  constructor(private store: Store, private dialogRef: MatDialogRef<DetailsEditComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    this.room = data.room;
  }


  @Output() notifyHideRoomInfo: EventEmitter<any> = new EventEmitter<any>();

  hideRoomInfoForm(){
    this.dialogRef.close();
  }

  updateRoomInfo(): void{
    this.store.dispatch(new UpdateRoom(this.room));
    this.hideRoomInfoForm();
  }

}
