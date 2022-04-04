import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomStatus } from '@app/shared/models/room.model';
import { Doctor } from '../../models/doctor.model';
import { Room } from '../../models/room.model';
import { DoctorService } from '../../services/doctor.service';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'room-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  room!: Room;
  doctor!: Doctor;
  roomInfoFormVisible: boolean = false;
  menuVisible: boolean = false;

  constructor(private roomService: RoomService, private doctorService: DoctorService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let roomId = params['id'];

      this.roomService.getRoomDetailsWithEquipment(roomId).subscribe(
        data => {
          this.room = data;
        }
      );
      this.doctorService.getDoctorForRoom(roomId).subscribe(
        data => {
          this.doctor = data;
        }
      );
    })
  }

  onBackToMap(): void{
    this.router.navigate(['/map/floor-plan'], { queryParams: {buildingId: this.room.buildingId}})
  }

  showRoomInfoForm(){
    this.roomInfoFormVisible = true;
  }

  showRoomRenovation(): void{
    this.router.navigate(['/rooms/renovation/' + this.room.id])
  }

  showRoomSchedule(): void{
    this.router.navigate(['/rooms/schedule/' + this.room.id])
  }

  showMakeTransfer(): void{
    this.router.navigate(['/equipment/transfer/']);
  }

  showManageDoctor(): void{
    if(this.doctor != null && this.room != null)
      this.router.navigate(['/management/doctors/' + this.doctor.id], { state: { roomId: this.room.id } })
    else
      alert("This room doesn't have a doctor!");
  }

  showDoctorWorkload(): void{
    if(this.doctor != null && this.room != null){
      this.router.navigate(['/management/doctors/workload/' + this.doctor.id], { state: { roomId: this.room.id } })
    }
  }

  onNotifyHideRoomInfo(){
    this.roomInfoFormVisible = false;
  }

  //TODO: Extract to component
  roomStatusColor() : string{
    if(this.room.status == RoomStatus.Unoccupied)
      return "#66A182";
    else if(this.room.status == RoomStatus.Occupied)
      return "#D94848";
    else if(this.room.status == RoomStatus.NotActive)
      return "#A2A2A2";
    else 
      return "#214975";
  }

  toggleMenu(): void{
    this.menuVisible = !this.menuVisible;
  }

}
