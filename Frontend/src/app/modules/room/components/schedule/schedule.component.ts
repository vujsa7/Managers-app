import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '@app/core/services/room.service';
import { EquipmentTransfer } from '@app/shared/models/equipment-transfer.model';
import { Room, RoomType } from '@app/shared/models/room.model';
import { RoomTypeToStringPipe } from '@app/shared/pipes/room-type-to-string.pipe';
import { NgxSpinnerService } from 'ngx-spinner';
import { MergeRenovation } from '../../models/merge-renovation.model';
import { SplitRenovation } from '../../models/split-renovation.model';
import { EquipmentTransferService } from '../../services/equipment-transfer.service';
import { RenovationService } from '../../services/renovation.service';

@Component({
  selector: 'room-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit{

  roomId! : number;
  room! : Room;
  showServerErrorMessage : boolean = false;
  equipmentTransfers : EquipmentTransfer[] = [];
  splitRenovations: SplitRenovation[] = [];
  mergeRenovations: MergeRenovation[] = [];

  constructor(private renovationService : RenovationService, private equipmentTransferService: EquipmentTransferService, private roomService: RoomService, private route: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService) { }
  
  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.showServerErrorMessage = true;
    }, 5000);
    this.route.params.subscribe(params => {
      this.roomId = params['id'];
      this.roomService.getRoom(this.roomId).subscribe(
        data => {
          this.room = data;
        }
      );
      this.equipmentTransferService.getTransfersForRoom(this.roomId).subscribe(
        data => {
          this.equipmentTransfers = data;
          this.spinner.hide();
        }
      );
      this.renovationService.getSplitRenovationsForRoom(this.roomId).subscribe(
        data => {
          this.splitRenovations = data;
          this.spinner.hide();
        }
      );
      this.renovationService.getMergeRenovationsForRoom(this.roomId).subscribe(
        data => {
          this.mergeRenovations = data;
          this.spinner.hide();
        }
      );
    });
  }

  onBackToRoomDetails(): void{
    this.router.navigate(['/rooms/details/' + this.roomId])
  }

  public getRoomText(){
    const roomTypePipe = new RoomTypeToStringPipe();
    if(this.room){
        let roomText =  roomTypePipe.transform(this.room.type) + " " + this.room.name;
        if(this.room.type == RoomType.Restroom)
          roomText = this.room.name + " " + "WC";
        return roomText;
    } else {
      return null;
    }
      
  }
  
}
