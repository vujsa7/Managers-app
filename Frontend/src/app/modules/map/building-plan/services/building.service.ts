import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import buildingsJson from 'src/assets/buildingComponents.json';
import { BaseHttpService } from "@app/core/services/base-http.service";
import { Building } from "../models/building.model";

@Injectable({
    providedIn: 'any'
})
export class BuildingService extends BaseHttpService{

    getBuildings(): Observable<Building[]> {
        return this.http.get<Building[]>(this.baseUrl + 'buildings');
    }

    getMainBuildingComponents(): any {
        return buildingsJson[0];
    }

    getTherapyBuildingComponents(): any {
        return buildingsJson[1];
    }
}