import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room, RoomType } from '../../models/rooms/room.model';
import { D3Service } from '../../shared/services/d3.service';
import { RoomsService } from '../../shared/services/rooms.service';

@Component({
  selector: 'app-floor-plan',
  templateUrl: './floor-plan.component.html',
  styleUrls: ['./floor-plan.component.scss'],
  providers: [RoomsService]
})

export class FloorPlanComponent implements OnInit {
  buildingId: number = 0;
  svg: any;
  rooms: Room[] = [];
  selectedFloor: number = 0;
  @Input() selectedRoom: Room | undefined;
  roomInfoFormVisible: boolean = false;
  roomSelected: boolean = false;

  constructor(private d3Service: D3Service, private roomsService: RoomsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
        this.buildingId = params['buildingId'];
        this.roomsService.getRooms(this.buildingId).subscribe(
          data => {
            this.rooms = data;
            this.drawRooms();
            
            let rooms = this.d3Service.selectByClass('main-building-room');
            let component = this;
            rooms.on('click', function(d: any, i: any){
              component.selectedRoom = i;
              component.roomSelected = true;
              component.highlightRoom();
            })
          }
        );
    });
  }

  private drawRooms() {
    this.svg = this.d3Service.selectById('svg-floor');
    this.d3Service.drawPlainRectangles(this.svg, this.rooms, 'main-building-room');
    this.drawRoomNames();
    this.filterRooms();   
  }

  private filterRooms(): void {
    this.svg.selectAll('.main-building-room')
      .style('visibility', 'hidden');
    this.svg.selectAll('.floor-' + this.selectedFloor)
      .style('visibility', 'visible');
  }

  selectedFloorChanged(selectedFloor: number): void {
    this.selectedFloor = selectedFloor; 
    this.filterRooms();
    this.roomSelected = false;
  }

  showMapView(): void{
    this.router.navigate(['/hospital-map'], { relativeTo: this.route })
  }

  showRoomInfoForm(){
    this.roomInfoFormVisible = true;
  }

  onNotifyHideRoomInfo(){
    this.roomInfoFormVisible = false;
  }

  drawRoomNames(): void {
    for (const room of this.rooms){
      this.d3Service.addText(this.svg, RoomType[room.type] + ' ' + room.name, { x: room.x + room.width/2, y: room.y + room.height/2 }, 'floor-' + room.floor + ' main-building-room', 'room-' + room.id);
    }
    this.svg.selectAll('text')
      .style('font-size', '14px')
  }

  highlightRoom(): void {
    this.svg.selectAll('.main-building-room')
      .style('fill', '#cccccc');
    this.svg.selectAll('text')
      .style('fill', '#214975');
    this.svg.selectAll('#room-' + this.selectedRoom?.id)
      .style('fill', '#214975');
    this.svg.selectAll('text#room-' + this.selectedRoom?.id)
      .style('fill', '#ffffff');
  }

}