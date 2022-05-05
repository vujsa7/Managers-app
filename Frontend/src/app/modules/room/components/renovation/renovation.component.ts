import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FloorRoom } from '@app/modules/map/floor-plan/models/floor-room.model';
import { FloorPlanService } from '@app/modules/map/floor-plan/services/floor-plan.service';
import { RenovationPreviewComponent } from '@app/modules/map/floor-plan/components/renovation-preview/renovation-preview.component';
import { RoomStatus } from '@app/shared/models/room-status.enum';
import { RoomType } from '@app/shared/models/room-type.enum';
import { RoomTypeToStringPipe } from '@app/shared/pipes/room-type-to-string.pipe';
import { MergeRenovation } from '../../models/merge-renovation.model';
import { NewRoomInfo } from '../../models/new-room-info.model';
import { SplitRenovation } from '../../models/split-renovation.model';

@Component({
  selector: 'room-renovation',
  templateUrl: './renovation.component.html',
  styleUrls: ['./renovation.component.scss']
})
export class RenovationComponent implements AfterViewInit  {

  roomsOnThisFloor: FloorRoom[] = [];
  room!: FloorRoom;
  renovationType: string = "null";
  @ViewChild('renovationpreview') renovationPreviewComponent!:RenovationPreviewComponent;
  roomStatuses: RoomStatus[] = [
    RoomStatus.Occupied,
    RoomStatus.Unoccupied,
    RoomStatus.NotActive
  ];
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
  ];
  
  roomsForMerge: FloorRoom[] = [];
  selectedRoom!: FloorRoom;
  splitRenovation: SplitRenovation = new SplitRenovation(-1, new NewRoomInfo('', RoomType.OperatingRoom, RoomStatus.Occupied), new NewRoomInfo('', RoomType.OperatingRoom, RoomStatus.Occupied), new Date(), new Date(), '');
  mergeRenovation: MergeRenovation = new MergeRenovation(-1, -1, new NewRoomInfo('', RoomType.OperatingRoom, RoomStatus.Occupied), new Date(), new Date());
  isTimeSlotScreenVisible: boolean = false;

  constructor(private floorPlanService: FloorPlanService, private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    this.route.params.subscribe(params => {
      let roomId = params['id'];
      this.floorPlanService.getFloorRoom(roomId).subscribe(
        data => {
          this.room = data;
          this.renovationPreviewComponent.room = this.room;
          this.mergeRenovation.firstOldRoomId = this.room.id;
          this.floorPlanService.getFloorRoomsInBuilding(this.room.buildingId).subscribe(
            data => {
              this.roomsOnThisFloor = data.filter(r => r.floor == this.room.floor);
              this.renovationPreviewComponent.roomsOnThisFloor = this.roomsOnThisFloor;
              this.renovationPreviewComponent.drawRooms();
              this.renovationPreviewComponent.drawRoomNames();
              this.renovationPreviewComponent.highlightRoom(roomId);
              this.getRoomsForMerge();
            });
        });
    })
  }

  onRenovationTypeChange(): void {
    if (this.renovationType == "split") {
      this.splitRenovation.roomId = this.room.id;
      this.renovationPreviewComponent.removeMergeInfo();
      this.splitRenovation.roomId = this.room.id;
      this.renovationPreviewComponent.drawSplitLine();
      this.drawSplitText();
    }
    else if (this.renovationType == "merge") {
      this.renovationPreviewComponent.removeSplitInfo();
      this.mergeRoomSelected();
    }
  }

  drawSplitText(): void {
    const roomTypePipe = new RoomTypeToStringPipe();
    let room1Text = roomTypePipe.transform(this.splitRenovation.firstNewRoomInfo.roomType) + " " + this.splitRenovation.firstNewRoomInfo.roomName;
    if (this.splitRenovation.firstNewRoomInfo.roomType == RoomType.Restroom)
      room1Text = this.splitRenovation.firstNewRoomInfo.roomName + " " + "WC";
    let room2Text = roomTypePipe.transform(this.splitRenovation.secondNewRoomInfo.roomType) + " " + this.splitRenovation.secondNewRoomInfo.roomName;
    if (this.splitRenovation.secondNewRoomInfo.roomType == RoomType.Restroom)
      room2Text = this.splitRenovation.secondNewRoomInfo.roomName + " " + "WC";
    this.renovationPreviewComponent.drawSplitText(room1Text, room2Text);
  }

  getRoomsForMerge() {
    this.roomsForMerge = []
    for (let room of this.roomsOnThisFloor) {
      if (this.room.id != room.id) {
        if (this.room.y == room.y && this.room.height == room.height) {
          let distance1 = (this.room.x + this.room.width + 5) - room.x
          let distance2 = (room.x + room.width + 5) - this.room.x
          if (distance1 > 0 && distance1 < 10)
            this.roomsForMerge.push(room)
          if (distance2 > 0 && distance2 < 10)
            this.roomsForMerge.push(room)
        }
        if (this.room.x == room.x && this.room.width == room.width) {
          let distance1 = (this.room.y + this.room.height + 5) - room.y
          let distance2 = (room.y + room.height + 5) - this.room.y
          if (distance1 > 0 && distance1 < 10)
            this.roomsForMerge.push(room)
          if (distance2 > 0 && distance2 < 10)
            this.roomsForMerge.push(room)
        }
      }
    }
    this.renovationPreviewComponent.roomsForMerge = this.roomsForMerge;
  }

  mergeRoomSelected() {
    if (this.selectedRoom) {
      this.renovationPreviewComponent.removeMergeInfo();
      this.renovationPreviewComponent.selectedRoom = this.selectedRoom;
      this.mergeRenovation.secondOldRoomId = this.selectedRoom.id;
      this.renovationPreviewComponent.higlightMerge();
      this.renovationPreviewComponent.drawMergeLine();
      this.drawMergedRoomName();
    }
  }

  drawMergedRoomName() {
    const roomTypePipe = new RoomTypeToStringPipe();
    let newRoomText = roomTypePipe.transform(this.mergeRenovation.newRoomInfo.roomType) + " " + this.mergeRenovation.newRoomInfo.roomName;
      if (this.mergeRenovation.newRoomInfo.roomType == RoomType.Restroom)
        newRoomText = this.mergeRenovation.newRoomInfo.roomName + " " + "WC";
    this.renovationPreviewComponent.drawMergedRoomName(newRoomText);
  }

  isMergeButtonDisabled(): boolean {
    if (this.mergeRenovation.newRoomInfo.roomName.length == 0 || this.selectedRoom == null) {
      return true;
    }
    return false;
  }

  isSplitButtonDisabled(): boolean {
    if (this.splitRenovation.firstNewRoomInfo.roomName.length == 0 || this.splitRenovation.secondNewRoomInfo.roomName.length == 0) {
      return true;
    }
    return false;
  }

  displayTimeSlotScreen(): void {
    this.isTimeSlotScreenVisible = true;
  }

}
