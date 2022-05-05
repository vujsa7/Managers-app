import { Injectable } from '@angular/core';
import { BaseHttpService } from '@app/core/services/base-http.service';
import { Doctor } from '@app/shared/models/doctor.model';
import { RoomBasicInfo } from '@app/shared/models/room-basic-info.model';
import { Observable } from 'rxjs';
import { RoomWithEquipment } from '../models/room-with-equipment.model';

@Injectable({
  providedIn: 'any'
})
export class RoomDetailsService extends BaseHttpService {

  updateRoom(room: RoomWithEquipment): Observable<RoomWithEquipment> {
    return this.http.put<RoomWithEquipment>(this.baseUrl + 'rooms/' + room.id, room);
  }

  getRoomDetailsWithEquipment(roomId: number): Observable<RoomWithEquipment> {
    return this.http.get<RoomWithEquipment>(this.baseUrl + 'rooms/' + roomId + '/equipment')
  }

  getDoctorForRoom(roomId: number): Observable<Doctor> {
    return this.http.get<Doctor>(this.baseUrl + 'doctors?roomId=' + roomId);
  }

  getRoom(roomId: number): Observable<RoomBasicInfo> {
    return this.http.get<RoomBasicInfo>(this.baseUrl + 'rooms/' + roomId);
  }
}
