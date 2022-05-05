import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'buildingName'
})
export class BuildingNamePipe implements PipeTransform {

    transform(value: number): string {
        if (value == 1) {
            return 'Oasis Main Building';
        }
        else if (value == 2) {
            return 'Oasis Treating Center' ;
        }
        return '';
    }
}