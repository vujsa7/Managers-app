import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { D3Service } from '@app/modules/map/services/d3.service';
import { RoomType } from '@app/shared/models/room-type.enum';
import { RoomTypeToStringPipe } from '@app/shared/pipes/room-type-to-string.pipe';
import { FloorEquipment } from './models/floor-equipment.model';
import { FloorRoom } from './models/floor-room.model';
import { Select, Store } from '@ngxs/store';
import { MapState } from '@app/state/map/map.state';
import { Observable } from 'rxjs';
import { GetFloorEquipment, GetFloorRooms } from '@app/state/map/map.actions';
import { FloorPlanState } from './state/floor-plan.state';
import { UpdateSelectedRoomId } from './state/floor-plan.actions';


@Component({
  selector: 'app-floor-plan',
  templateUrl: './floor-plan.component.html',
  styleUrls: ['./floor-plan.component.scss']
})
export class FloorPlanComponent implements OnInit {

  svg: any;
  rooms: FloorRoom[] = [];
  @Select(MapState.selectFloorRooms) rooms$!: Observable<FloorRoom[]>;
  equipment: FloorEquipment[] = [];
  @Select(MapState.selectFloorEquipment) equipment$!: Observable<FloorEquipment[]>;
  selectedFloor: number = 0;
  @Select(FloorPlanState.selectSelectedRoomId) selectedRoomId$!: Observable<number>;
  selectedRoomId!: number;
  floors: number[] = [];
  mode!: string;

  constructor(private store: Store, private d3Service: D3Service, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Subscribing to any room changes if they occur
    this.rooms$.subscribe((data) => {
      if(data.length > 0){
        this.rooms = data;
        this.drawRooms();
        this.countNumberOfFloors(this.rooms);
      }
    });

    this.selectedRoomId$.subscribe(roomId => {
      if(roomId != -1){
        this.selectedFloor = this.rooms.find(x => x.id == roomId)!.floor;
        this.selectedFloorChanged(this.selectedFloor);
        this.selectedRoomId = roomId;
        this.highlightRoom();
      }
    })

    this.equipment$.subscribe((data) => {
      if(data.length > 0)
        this.equipment = data;
    })
    
    this.route.queryParams.subscribe(params => {
      // Dispatching action to fetch floor rooms
      this.store.dispatch([new GetFloorRooms(parseInt(params['buildingId'])), new GetFloorEquipment()]);
    });    
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
      let self = this;
      roomComponent.on('click', function (d: any, i: any) {
        self.store.dispatch(new UpdateSelectedRoomId(room.id));
        self.highlightRoom();
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
    this.unhighlightRooms();
    this.filterRooms();
  }

  onFloorChanged(){
    this.selectedRoomId = -1;
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
          this.highlightRoom();
        })
        .style("cursor", "pointer");
    }
    this.svg.selectAll('text')
      .style('font-size', '16px')
      .style('text-align', 'center')
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

  onModeChanged(data: any){
    this.mode = data;
  }
}
