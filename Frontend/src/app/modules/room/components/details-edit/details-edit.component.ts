import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoomStatus } from '@app/shared/models/room-status.enum';
import { RoomType } from '@app/shared/models/room-type.enum';
import { RoomDetailsService } from '../../services/room-details.service';

@Component({
  selector: 'room-details-edit',
  templateUrl: './details-edit.component.html',
  styleUrls: ['./details-edit.component.scss']
})
export class DetailsEditComponent {

  @Input() selectedRoom: any;
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
  constructor(private roomDetailsService: RoomDetailsService) { }

  @Output() notifyHideRoomInfo: EventEmitter<any> = new EventEmitter<any>();

  hideRoomInfoForm(){
    this.notifyHideRoomInfo.emit();
  }

  updateRoomInfo(): void{
    this.roomDetailsService.updateRoom(this.selectedRoom).subscribe();
    this.hideRoomInfoForm();
  }

}
