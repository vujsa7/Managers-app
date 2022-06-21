import { Component, OnInit } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'map-floor-plan-svg',
  templateUrl: './floor-plan-svg.component.html',
  styleUrls: ['./floor-plan-svg.component.scss']
})
export class FloorPlanSvgComponent implements OnInit {

  svgImage: any;
  initialViewBox = { x: 0, y: 0, w: 1920, h: 1080 };
  viewBox = { x: 0, y: 0, w: 1920, h: 1080 };
  viewportWidth: any;
  viewportHeight: any;

  ngOnInit(): void {
    this.svgImage = document.getElementById("svg-floor");
    this.adjustSvgViewport();
    window.addEventListener('resize', _.debounce(() => {
      this.adjustSvgViewport();
    }, 300));
  }

  adjustSvgViewport() {
    this.viewportWidth = window.innerWidth;
    this.viewportHeight = window.innerHeight;
    let xoffset = 90;
    let yoffset = 130;
    let hfactor = 1.2;
    let wfactor = 1.1;
    if (this.viewportHeight > this.viewportWidth) {
      hfactor = 1.8;
      wfactor = 1.75;
      xoffset = 360;
      yoffset = 280;
    } else if (this.viewportWidth < 900) {
      hfactor = 1.7;
      wfactor = 1.5;
      xoffset = 260;
      yoffset = 280;
    } else if (this.viewportWidth < 1100) {
      hfactor = 1.3;
      wfactor = 1.3;
      xoffset = 30;
      yoffset = 150;
    } else if (this.viewportWidth < 1400) {
      hfactor = 1.3;
      wfactor = 1.3;
      xoffset = 120;
      yoffset = 150;
    }
    this.viewBox.x = xoffset;
    this.viewBox.y = yoffset;
    this.viewBox.w = this.initialViewBox.w / wfactor;
    this.viewBox.h = this.initialViewBox.h / hfactor;
    this.svgImage.setAttribute('viewBox', `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.w} ${this.viewBox.h}`);
  }


}
