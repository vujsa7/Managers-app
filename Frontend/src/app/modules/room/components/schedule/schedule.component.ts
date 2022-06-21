import { Component, OnInit } from '@angular/core';
import { RoomType } from '@app/shared/models/room-type.enum';
import { RoomTypeToStringPipe } from '@app/shared/pipes/room-type-to-string.pipe';
import { NgxSpinnerService } from 'ngx-spinner';
import { MergeRenovation } from '../../models/merge-renovation.model';
import { SplitRenovation } from '../../models/split-renovation.model';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService } from '../../services/schedule.service';
import { RoomBasicInfo } from '@app/shared/models/room-basic-info.model';
import { RoomDetailsService } from '../../services/room-details.service';
import { EquipmentTransfer } from '@app/shared/models/equipment-transfer.model';

@Component({
  selector: 'room-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  roomId!: number;
  room!: RoomBasicInfo;
  showServerErrorMessage: boolean = false;
  equipmentTransfers: EquipmentTransfer[] = [];
  splitRenovations: SplitRenovation[] = [];
  mergeRenovations: MergeRenovation[] = [];

  constructor(private scheduleService: ScheduleService, private roomDetailsService: RoomDetailsService,
     private spinner: NgxSpinnerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.showServerErrorMessage = true;
    }, 5000);
    this.route.params.subscribe(params => {
      this.roomId = params['id'];
      this.roomDetailsService.getRoom(this.roomId).subscribe(
        data => {
          this.room = data;
        }
      );
      this.scheduleService.getTransfersForRoom(this.roomId).subscribe(
        data => {
          this.equipmentTransfers = data;
          this.spinner.hide();
        }
      );
      this.scheduleService.getSplitRenovationsForRoom(this.roomId).subscribe(
        data => {
          this.splitRenovations = data;
          this.spinner.hide();
        }
      );
      this.scheduleService.getMergeRenovationsForRoom(this.roomId).subscribe(
        data => {
          this.mergeRenovations = data;
          this.spinner.hide();
        }
      );
    });
  }

  public getRoomText() {
    const roomTypePipe = new RoomTypeToStringPipe();
    if (this.room) {
      let roomText = roomTypePipe.transform(this.room.type) + " " + this.room.name;
      if (this.room.type == RoomType.Restroom)
        roomText = this.room.name + " " + "WC";
      return roomText;
    } else {
      return null;
    }

  }

  onDeleteEquipmentTransfer(selectedEquipmentTransfer: EquipmentTransfer){
    this.scheduleService.deleteEquipmentTransfer(selectedEquipmentTransfer).subscribe();
  }

}
