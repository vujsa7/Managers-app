import { Component, OnInit } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'map-building-plan-svg',
  templateUrl: './building-plan-svg.component.html',
  styleUrls: ['./building-plan-svg.component.scss']
})
export class BuildingPlanSvgComponent implements OnInit {
  initialViewBox = {x: 1150, y: 950, w: 4717, h: 3208};
  viewBox = {x: 1150, y: 950, w: 4717, h: 3208};
  svgSize = {w: 4717 , h: 3208 };
  isPanning = false;
  startPoint = {x: 0, y: 0};
  endPoint = {x: 0, y: 0};
  zoom!: any;
  scale = this.svgSize.w / this.viewBox.w;
  svgContainer: any;
  svgImage: any;

  viewportWidth: any;
  viewportHeight: any;

  constructor() { }

  ngOnInit(): void {
    this.svgContainer = document.getElementById("map");
    this.svgImage = document.getElementById("map-background");
    this.adjustSvgViewport();
    window.addEventListener('resize', _.debounce(() => {
      this.adjustSvgViewport();
    }, 300)); 
  }

  adjustSvgViewport() {
    this.viewportWidth = window.innerWidth;
    this.viewportHeight = window.innerHeight;
    let xoffset = 1150;
    let hfactor = 2;
    let wfactor = 2;
    if(this.viewportHeight > this.viewportWidth * 2.05){
      hfactor = 3;
      wfactor = 4.5;
      xoffset = 1500;
    } else if(this.viewportHeight > this.viewportWidth){
      hfactor = 2.5;
      wfactor = 3;
      xoffset = 1500;
    }
    this.viewBox.x = xoffset;
    this.viewBox.w = this.initialViewBox.w / wfactor;
    this.viewBox.h = this.initialViewBox.h / hfactor;
    this.svgSize.h = this.viewBox.h;
    this.svgSize.w = this.viewBox.w;
    this.svgImage.setAttribute('viewBox', `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.w} ${this.viewBox.h}`);
  }

  mouseWheelFn(e: any) {
    e.preventDefault();
    var w = this.viewBox.w;
    var h = this.viewBox.h;
    var mx = e.offsetX*2;
    var my = e.offsetY*2;
    var dw = w * Math.sign(e.deltaY) * 0.15;
    var dh = h * Math.sign(e.deltaY) * 0.15;
    var dx = dw * mx / this.svgSize.w;
    var dy = dh * my / this.svgSize.h;
    this.viewBox = {x: this.viewBox.x - dx, y:this.viewBox.y - dy, w: this.viewBox.w + dw, h: this.viewBox.h + dh};
    this.scale = this.svgSize.w / (this.viewBox.w * 2);
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
      this.viewBox = {x:this.viewBox.x + dx, y: this.viewBox.y + dy, w: this.viewBox.w, h: this.viewBox.h};
      this.svgImage.setAttribute('viewBox', `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.w} ${this.viewBox.h}`);
      this.isPanning = false;
    }
  }

  mouseLeaveFn(e: any): void{
    this.isPanning = false;
  }

}
