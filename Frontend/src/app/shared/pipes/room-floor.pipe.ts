import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'roomFloor'
})
export class RoomFloorPipe implements PipeTransform {

    transform(value: number): string {
        if (value == 0) {
            return 'Ground level';
        }
        else if (value > 0) {
            return 'Floor ' + value;
        }
        return '';
    }
}