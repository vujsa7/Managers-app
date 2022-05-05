import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EquipmentTransfer } from '@app/modules/equipment/transfer/models/equipment-transfer.model';
import { BaseHttpService } from '@app/core/services/base-http.service';
import { Observable } from 'rxjs';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'any'
})
export class EquipmentTransferService extends BaseHttpService{

  getEquipment(): Observable<any> {
    return this.http.get(this.baseUrl + 'equipment');
  }

  getAvailableTimeSlots(start: string, end: string, duration: string, firstRoomId: number, secondRoomId?: number): Observable<Date[]> {
    let params = new HttpParams()
        .set('start', start)
        .set('end', end)
        .set('duration', duration)
        .set('firstRoomId', firstRoomId);
    if(secondRoomId){
        params = new HttpParams()
        .set('start', start)
        .set('end', end)
        .set('duration', duration)
        .set('firstRoomId', firstRoomId)
        .set('secondRoomId', secondRoomId);
    }
    return this.http.get<Date[]>(this.baseUrl + "availableTimeSlots", {params});
  }
  
  postEquipmentTransfer(equipmentTransfer: EquipmentTransfer): Observable<EquipmentTransfer> {
    return this.http.post<EquipmentTransfer>(this.baseUrl + 'transfers', equipmentTransfer);
  }

  // TODO: put in schedule calendar service
  deleteEquipmentTransfer(equipmentTransfer: EquipmentTransfer): Observable<EquipmentTransfer>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: 
      equipmentTransfer    
    }
    return this.http.delete<EquipmentTransfer>(this.baseUrl + 'transfers', options);
  }

  getDestinationRooms(buildingId: number): Observable<Room[]> {
    let params = new HttpParams().set('buildingId', buildingId)
    return this.http.get<Room[]>(this.baseUrl + 'rooms', { params: params });
  }
}