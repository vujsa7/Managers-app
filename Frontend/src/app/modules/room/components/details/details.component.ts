import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from '@app/shared/models/doctor.model';
import { RoomStatus } from '@app/shared/models/room-status.enum';
import { RoomWithEquipment } from '../../models/room-with-equipment.model';
import { RoomDetailsService } from '../../services/room-details.service';

@Component({
  selector: 'room-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  room!: RoomWithEquipment;
  doctor!: Doctor;
  roomInfoFormVisible: boolean = false;
  menuVisible: boolean = false;

  constructor(private roomDetailsService: RoomDetailsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let roomId = params['id'];

      this.roomDetailsService.getRoomDetailsWithEquipment(roomId).subscribe(
        data => {
          this.room = data;
        }
      );
      this.roomDetailsService.getDoctorForRoom(roomId).subscribe(
        data => {
          this.doctor = data;
        }
      );
    })
  }

  showRoomInfoForm() {
    this.roomInfoFormVisible = true;
  }

  onNotifyHideRoomInfo() {
    this.roomInfoFormVisible = false;
  }

  //TODO: Extract to component
  roomStatusColor(): string {
    if (this.room.status == RoomStatus.Unoccupied)
      return "#66A182";
    else if (this.room.status == RoomStatus.Occupied)
      return "#D94848";
    else if (this.room.status == RoomStatus.NotActive)
      return "#A2A2A2";
    else
      return "#214975";
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

}
