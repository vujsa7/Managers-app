import { Injectable } from '@angular/core';
import buildingsJson from 'src/assets/buildingComponents.json';

@Injectable({
  providedIn: 'any'
})
export class BuildingComponentsService {

    constructor() { }

    getMainBuildingComponents() : any {
      return buildingsJson[0];
    }

    getTherapyBuildingComponents() : any {
      return buildingsJson[1];
    }

}