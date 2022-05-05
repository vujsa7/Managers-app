import { Component } from '@angular/core';
import { RoomType } from '@app/shared/models/room-type.enum';
import { RoomTypeToStringPipe } from '@app/shared/pipes/room-type-to-string.pipe';
import { FloorRoom } from '../../models/floor-room.model';
import { D3Service } from '../../../services/d3.service';

@Component({
  selector: 'app-renovation-preview',
  templateUrl: './renovation-preview.component.html',
  styleUrls: ['./renovation-preview.component.scss']
})
export class RenovationPreviewComponent {

  svg: any;
  roomsOnThisFloor: FloorRoom[] = [];
  roomsForMerge: FloorRoom[] = [];
  room!: FloorRoom;
  selectedRoom!: FloorRoom;

  constructor(private d3Service: D3Service) { }

  drawRooms() {
    this.svg = this.d3Service.selectById('svg-floor');
    this.d3Service.drawPlainRectangles(this.svg, this.roomsOnThisFloor, 'main-building-room');
  }

  drawRoomNames() {
    const roomTypePipe = new RoomTypeToStringPipe();
    for (const room of this.roomsOnThisFloor) {
      let roomText = roomTypePipe.transform(room.type) + " " + room.name;
      if (room.type == RoomType.Restroom)
        roomText = room.name + " " + "WC";
      this.d3Service.addText(this.svg, roomText, { x: room.x + room.width / 2, y: room.y + room.height / 2 }, 'floor-' + room.floor + ' main-building-room', 'room-' + room.id);
    }
    this.svg.selectAll('text')
      .style('font-size', '14px')
  }

  highlightRoom(roomId: number) {
    this.svg.selectAll('#room-' + roomId)
      .style('fill', '#214975');
    this.svg.selectAll('text#room-' + roomId)
      .style('fill', '#ffffff');
  }

  drawSplitLine(): void {
    let roomSvg = this.d3Service.selectById("svg-floor");
    roomSvg.append('line')
      .attr('id', "room-split-line")
      .style("stroke", "white")
      .style("stroke-width", 7)
      .attr("x1", this.room.x)
      .attr("y1", this.room.y + this.room.height / 2)
      .attr("x2", this.room.x + this.room.width)
      .attr("y2", this.room.y + this.room.height / 2);
  }

  drawSplitText(room1Text: string, room2Text: string): void {
    this.svg.selectAll('text#room-' + this.room.id)
      .remove();
    this.d3Service.addText(this.svg, room1Text, { x: this.room.x + this.room.width / 2, y: this.room.y + this.room.height / 4 + 5 }, 'floor-' + this.room.floor + ' main-building-room', 'room-' + this.room.id);
    this.d3Service.addText(this.svg, room2Text, { x: this.room.x + this.room.width / 2, y: this.room.y + 3 * this.room.height / 4 + 5 }, 'floor-' + this.room.floor + ' main-building-room', 'room-' + this.room.id);
    this.svg.selectAll('text#room-' + this.room.id)
      .style('fill', '#ffffff')
      .style('font-size', '14px');
  }

  removeSplitInfo() {
    this.svg.selectAll('text#room-' + this.room.id)
      .remove();
    this.d3Service.selectById('room-split-line').remove();
    const roomTypePipe = new RoomTypeToStringPipe();
    let roomText = roomTypePipe.transform(this.room.type) + " " + this.room.name;
    if (this.room.type == RoomType.Restroom)
      roomText = this.room.name + " " + "WC";
    this.d3Service.addText(this.svg, roomText, { x: this.room.x + this.room.width / 2, y: this.room.y + this.room.height / 2 }, 'floor-' + this.room.floor + ' main-building-room', 'room-' + this.room.id);
    this.svg.selectAll('text#room-' + this.room.id)
      .style('fill', '#ffffff')
      .style('font-size', '14px');
  }

  drawMergedRoomName(newRoomText: string) {
    if (this.selectedRoom) {
      this.svg.selectAll('text#room-' + this.room.id)
        .remove();
      if (this.roomsStartInSameX(this.room, this.selectedRoom)) {
        this.d3Service.addText(this.svg, newRoomText, { x: this.room.x + this.room.width / 2, y: Math.min(this.room.y, this.selectedRoom.y) + (this.room.height + this.selectedRoom.height) / 2 }, 'floor-' + this.room.floor + ' main-building-room', 'room-' + this.room.id);
      } else if (this.roomsStartInSameY(this.room, this.selectedRoom)) {
        this.d3Service.addText(this.svg, newRoomText, { x: Math.min(this.room.x, this.selectedRoom.x) + (this.room.width + this.selectedRoom.width) / 2, y: this.room.y + this.room.height / 2 }, 'floor-' + this.room.floor + ' main-building-room', 'room-' + this.room.id);
      }
      this.svg.selectAll('text#room-' + this.room.id)
        .style('fill', '#ffffff')
        .style('font-size', '14px');
    }
  }

  higlightMerge(): void {
    this.svg.selectAll('#room-' + this.selectedRoom.id)
      .style('fill', '#214975');
    this.svg.selectAll('text#room-' + this.selectedRoom.id)
      .style('fill', '#214975');
    this.svg.selectAll('text#room-' + this.room.id)
      .style('fill', '#214975');
  }

  removeMergeInfo(): void {
    if (this.selectedRoom) {
      this.svg.selectAll('#room-' + this.selectedRoom.id)
        .style('fill', '#cccccc');
      this.svg.selectAll('text#room-' + this.selectedRoom.id)
        .style('fill', '#214975');
      this.d3Service.selectById('room-merge-line').remove();
    }
  }

  drawMergeLine() {
    this.d3Service.selectById('room-merge-line').remove();
    let roomSvg = this.d3Service.selectById("svg-floor");
    if (this.selectedRoom.x > this.room.x && this.selectedRoom.y == this.room.y) {
      roomSvg.append('line')
        .attr('id', "room-merge-line")
        .style("stroke", "#214975")
        .style("stroke-width", 12)
        .attr("x1", this.room.x + this.room.width)
        .attr("y1", this.room.y + 4)
        .attr("x2", this.room.x + this.room.width)
        .attr("y2", this.room.y + this.room.height - 4);
    }
    else if (this.selectedRoom.x < this.room.x && this.selectedRoom.y == this.room.y) {
      roomSvg.append('line')
        .attr('id', "room-merge-line")
        .style("stroke", "#214975")
        .style("stroke-width", 12)
        .attr("x1", this.room.x)
        .attr("y1", this.room.y + 4)
        .attr("x2", this.room.x)
        .attr("y2", this.room.y + this.room.height - 4);
    }
    else if (this.selectedRoom.y > this.room.y && this.selectedRoom.x == this.room.x) {
      roomSvg.append('line')
        .attr('id', "room-merge-line")
        .style("stroke", "#214975")
        .style("stroke-width", 12)
        .attr("x1", this.room.x + 4)
        .attr("y1", this.room.y + this.room.height)
        .attr("x2", this.room.x + this.room.width - 4)
        .attr("y2", this.room.y + this.room.height);
    }
    else {
      roomSvg.append('line')
        .attr('id', "room-merge-line")
        .style("stroke", "#214975")
        .style("stroke-width", 12)
        .attr("x1", this.room.x + 4)
        .attr("y1", this.room.y)
        .attr("x2", this.room.x + this.room.width - 4)
        .attr("y2", this.room.y);
    }
  }

  private roomsStartInSameX(room1: FloorRoom, room2: FloorRoom): Boolean {
    let roomDesignError = 5;
    if (room1.x < room2.x + roomDesignError && room1.x > room2.x - roomDesignError)
      return true;
    return false;
  }

  private roomsStartInSameY(room1: FloorRoom, room2: FloorRoom): Boolean {
    let roomDesignError = 5;
    if (room1.y < room2.y + roomDesignError && room1.y > room2.y - roomDesignError)
      return true;
    return false;
  }

}
