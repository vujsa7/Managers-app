import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Room } from "@app/shared/models/room.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class RoomService {

    private baseUrl: string = environment.baseUrlHospital + 'rooms';

    constructor(private http: HttpClient) { }


    getRoom(roomId: number): Observable<Room> {
        return this.http.get<Room>(this.baseUrl + '/' + roomId);
    }

    getRooms(buildingId: number): Observable<Room[]> {
        let params = new HttpParams().set('buildingId', buildingId)
        return this.http.get<Room[]>(this.baseUrl, { params: params });
    }



}
