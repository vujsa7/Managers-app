import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import buildingsJson from 'src/assets/buildingComponents.json';
import { BaseHttpService } from "@app/core/services/base-http.service";

@Injectable({
    providedIn: 'any'
})
export class BuildingService extends BaseHttpService{

    getBuildings(): Observable<any> {
        return this.http.get(this.baseUrl + 'buildings');
    }

    getMainBuildingComponents(): any {
        return buildingsJson[0];
    }

    getTherapyBuildingComponents(): any {
        return buildingsJson[1];
    }
}