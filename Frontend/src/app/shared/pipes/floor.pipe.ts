import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'floor'
})
export class FloorPipe implements PipeTransform {

  transform(value: number): string {
    if(value > 0)
      return "Floor " + value;
    else
      return "Ground level"; 
  }

}
