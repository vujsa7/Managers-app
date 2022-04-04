import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'map-background',
  templateUrl: './map-background.component.html',
  styleUrls: ['./map-background.component.scss']
})
export class MapBackgroundComponent implements OnInit {

  viewBox = {x: 1400, y: 790, w: 1920, h: 1080};
  svgSize = {w: 1920 , h: 1080 };
  isPanning = false;
  startPoint = {x: 0, y: 0};
  endPoint = {x: 0, y: 0};;
  scale = this.svgSize.w / this.viewBox.w;
  svgContainer: any;
  svgImage: any;

  constructor() { }

  ngOnInit(): void {
    this.svgContainer = document.getElementById("map");
    this.svgImage = document.getElementById("map-background");
  }

  mouseWheelFn(e: any) {
    e.preventDefault();
    var w = this.viewBox.w;
    var h = this.viewBox.h;
    var mx = e.offsetX;
    var my = e.offsetY;
    var dw = w * Math.sign(e.deltaY) * 0.05;
    var dh = h * Math.sign(e.deltaY) * 0.05;
    var dx = dw * mx / this.svgSize.w;
    var dy = dh * my / this.svgSize.h;
    this.viewBox = {x: Math.max(1400, this.viewBox.x - dx), y: Math.max(790, this.viewBox.y - dy), w: Math.min(this.viewBox.w + dw, 1920), h: Math.min(this.viewBox.h + dh, 1080)};
    this.scale = this.svgSize.w / this.viewBox.w;
    this.svgImage.setAttribute('viewBox', `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.w} ${this.viewBox.h}`);
  }

  mouseDownFn(e: any): void{
    this.isPanning = true;
    this.startPoint = {x: e.x, y: e.y};   
  }

  mouseMoveFn(e: any): void{
    if (this.isPanning){
      this.endPoint = {x:e.x, y:e.y};
      var dx = (this.startPoint.x - this.endPoint.x) / this.scale;
      var dy = (this.startPoint.y - this.endPoint.y) / this.scale;
      var movedViewBox = {x: this.viewBox.x + dx, y: this.viewBox.y + dy, w: this.viewBox.w, h:this.viewBox.h};
      this.svgImage.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
    }
  }

  mouseUpFn(e: any): void{
    if (this.isPanning){ 
      this.endPoint = {x:e.x, y:e.y};
      var dx = (this.startPoint.x - this.endPoint.x) / this.scale;
      var dy = (this.startPoint.y - this.endPoint.y) / this.scale;
      if(this.viewBox.x + dx + this.viewBox.w > 3320 || this.viewBox.x + dx < 1400)
        dx = 0
      if(this.viewBox.y + dy + this.viewBox.h > 1870 || this.viewBox.y + dy < 790)
        dy = 0
      this.viewBox = {x:this.viewBox.x + dx, y: this.viewBox.y + dy, w: this.viewBox.w, h: this.viewBox.h};
      this.svgImage.setAttribute('viewBox', `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.w} ${this.viewBox.h}`);
      this.isPanning = false;
    }
  }

  mouseLeaveFn(e: any): void{
    this.isPanning = false;
  }

}
