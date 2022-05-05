import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { D3Service } from '@app/modules/map/services/d3.service';
import { RoomType } from '@app/shared/models/room-type.enum';
import { RoomTypeToStringPipe } from '@app/shared/pipes/room-type-to-string.pipe';
import { FloorEquipment } from './models/floor-equipment.model';
import { FloorRoom } from './models/floor-room.model';
import { FloorPlanService } from './services/floor-plan.service';

@Component({
  selector: 'app-floor-plan',
  templateUrl: './floor-plan.component.html',
  styleUrls: ['./floor-plan.component.scss']
})
export class FloorPlanComponent implements OnInit {

  buildingId: number = 0;
  svg: any;
  rooms: FloorRoom[] = [];
  equipment: FloorEquipment[] = [];
  selectedFloor: number = 0;
  selectedRoomId: number = -1;
  isRoomSelected: boolean = false;
  floors: number[] = [];

  constructor(private d3Service: D3Service, private floorPlanService: FloorPlanService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.buildingId = params['buildingId'];
      this.floorPlanService.getFloorRoomsInBuilding(this.buildingId).subscribe(
        data => {
          this.rooms = data;
          this.drawRooms();
          this.countNumberOfFloors(this.rooms);
        }
      );
    });

    this.floorPlanService.getEquipmentInBuilding().subscribe(
      data => {
        this.equipment = data;
      }
    )
  }

  onNotifyDisplayRoom(roomId: number) {
    this.selectedFloor = this.rooms.find(x => x.id == roomId)!.floor;
    this.selectedFloorChanged(this.selectedFloor);
    this.isRoomSelected = true;
    this.selectedRoomId = roomId;
    this.highlightRoom();
  }

  private drawRooms() {
    this.svg = this.d3Service.selectById('svg-floor');
    this.d3Service.drawPlainRectangles(this.svg, this.rooms, 'main-building-room');
    this.drawRoomNames();
    this.addClickEventToRooms();
    this.filterRooms();
  }

  private countNumberOfFloors(rooms: FloorRoom[]) {
    let maxFloor = 0;
    for (const room of rooms) {
      if (room.floor > maxFloor)
        maxFloor = room.floor;
    }
    this.floors = Array(maxFloor + 1).fill(0).map((x, i) => i);
    this.floors.reverse();
  }

  private addClickEventToRooms() {
    for (const room of this.rooms) {
      let roomComponent = this.d3Service.selectById('room-' + room.id);
      let component = this;
      roomComponent.on('click', function (d: any, i: any) {
        component.selectedRoomId = room.id;
        component.isRoomSelected = true;
        component.highlightRoom();
      })
      roomComponent.on("mouseover", () => {
        if (this.selectedRoomId != room.id)
          roomComponent.style("fill", "#ADD3FF").style("cursor", "pointer")
      });
      roomComponent.on("mouseout", () => {
        if (this.selectedRoomId != room.id)
          roomComponent.style("fill", "#cccccc")
      });
    }
  }

  private filterRooms(): void {
    this.svg.selectAll('.main-building-room')
      .style('visibility', 'hidden');
    this.svg.selectAll('.floor-' + this.selectedFloor)
      .style('visibility', 'visible');
  }

  selectedFloorChanged(selectedFloor: number): void {
    this.selectedFloor = selectedFloor;
    this.selectedRoomId = -1;
    this.isRoomSelected = false;
    this.unhighlightRooms();
    this.filterRooms();

  }

  drawRoomNames(): void {
    const roomTypePipe = new RoomTypeToStringPipe();

    for (const room of this.rooms) {
      let roomText = roomTypePipe.transform(room.type) + " " + room.name;
      if (room.type == RoomType.Restroom)
        roomText = room.name + " " + "WC";
      this.d3Service.addText(this.svg, roomText, { x: room.x + room.width / 2, y: room.y + room.height / 2 }, 'floor-' + room.floor + ' main-building-room', 'room-' + room.id + '-text');
      this.d3Service.selectById('room-' + room.id + "-text")
        .on("mouseover", () => {
          if (this.selectedRoomId != room.id)
            this.d3Service.selectById('room-' + room.id).style("fill", "#ADD3FF")
        })
        .on("click", () => {
          this.selectedRoomId = room.id;
          this.isRoomSelected = true;
          this.highlightRoom();
        })
        .style("cursor", "pointer");
    }
    this.svg.selectAll('text')
      .style('font-size', '14px')
  }

  highlightRoom(): void {
    this.unhighlightRooms();
    this.svg.selectAll('#room-' + this.selectedRoomId)
      .style('fill', '#214975');
    this.svg.selectAll('text#room-' + this.selectedRoomId + "-text")
      .style('fill', '#ffffff');
  }

  unhighlightRooms(): void {
    this.svg.selectAll('.main-building-room')
      .style('fill', '#cccccc');
    this.svg.selectAll('text')
      .style('fill', '#214975');
  }
}
