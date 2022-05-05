import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseHttpService } from "@app/core/services/base-http.service";
import { Observable } from "rxjs";
import { FloorEquipment } from "../models/floor-equipment.model";
import { FloorRoom } from "../models/floor-room.model";

@Injectable({
    providedIn: 'any'
})
export class FloorPlanService extends BaseHttpService {

    getFloorRoomsInBuilding(buildingId: number): Observable<FloorRoom[]> {
        let params = new HttpParams().set('buildingId', buildingId)
        return this.http.get<FloorRoom[]>(this.baseUrl + 'floor-rooms', { params: params });
    }

    getFloorRoom(roomId: number): Observable<FloorRoom> {
        return this.http.get<FloorRoom>(this.baseUrl + 'floor-rooms/' + roomId);
    }

    getEquipmentInBuilding(): Observable<FloorEquipment[]> {
        return this.http.get<FloorEquipment[]>(this.baseUrl + 'floorEquipment');
    }

}