import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Room } from "../models/room.model";


@Injectable({
    providedIn: 'any'
})
export class RoomService {

    private baseUrl: string = environment.baseUrlHospital + 'rooms';

    constructor(private http: HttpClient) { }

    getRoomDetailsWithEquipment(roomId: number): Observable<Room> {
        return this.http.get<Room>(this.baseUrl + '/' + roomId + '/equipment')
    }

    updateRoom(room: Room): Observable<Room> {
        return this.http.put<Room>(this.baseUrl + '/' + room.id, room);
    }
}
