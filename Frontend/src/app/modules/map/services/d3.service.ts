import { Injectable } from '@angular/core';
import * as d3 from 'd3-selection';

@Injectable({
  providedIn: 'any'
})
export class D3Service {

  createSvg(viewBox:string): any {
    return d3.select('div#canvas')
      .append('svg')
      .attr('viewBox', viewBox)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append('g');
  }

  drawMulticoloredRectangles(svg:any, data: any[], className: string): void {
    svg.selectAll('.' + className)
      .data(data)
      .enter()
      .append('rect')
      .attr('x', function (d: { x: any; }) { return d.x; })
      .attr('y', function (d: { y: any; }) { return d.y; })
      .attr('width', function (d: { width: any; }) { return d.width; })
      .attr('height', function (d: { height: any; }) { return d.height; })
      .attr('fill', function (d: { fill: any; }) { return d.fill; })
      .attr('stroke', function (d: { stroke: any; }) { return d.stroke; })
      .attr('stroke-width', 8)
      .attr('class', className);
  }

  drawPolygon(svg: any, data: any, idName: string) {
    svg.append('polygon')
      .attr('points', data.points)
      .attr('id', idName)
      .style('fill', 'transparent');
  }

  drawPlainRectangles(svg:any, data: any[], className: string): void {
    svg.selectAll('.' + className)
      .data(data)
      .enter()
      .append('rect')
      .attr('x', function (d: { x: any; }) { return d.x; })
      .attr('y', function (d: { y: any; }) { return d.y; })
      .attr('width', function (d: { width: any; }) { return d.width; })
      .attr('height', function (d: { height: any; }) { return d.height; })
      .attr('class', function (d: { floor: number; }) { return 'floor-' + d.floor + ' ' + className; })
      .attr('id', function (d: { id: any; }) { return 'room-' + d.id; })
      .attr('fill', '#cccccc')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 8); 
  }
  
  addText(svg:any, text: string, coords: {x: number, y: number}, className: string, id: string) {
    svg.append('text')
      .data(text)
      .attr('x', coords.x)
      .attr('y', coords.y)
      .attr('text-anchor', 'middle')
      .style('fill', '#214975')
      .attr('font-size', '1.563rem')
      .attr('class', className)
      .attr('id', id)
      .attr('cursor', 'default')
      .text(text);
  }

  selectById(id: string) : any {
    return d3.selectAll('#' + id);
  }

  selectByClass(className: string) : any {
    return d3.selectAll('.' + className);
  }

}

