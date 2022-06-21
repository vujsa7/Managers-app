import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from '@app/core/services/base-http.service';
import { EquipmentTransfer } from '@app/shared/models/equipment-transfer.model';
import { Observable } from 'rxjs';
import { MergeRenovation } from '../models/merge-renovation.model';
import { SplitRenovation } from '../models/split-renovation.model';

@Injectable({
  providedIn: 'any'
})
export class ScheduleService extends BaseHttpService {

  getSplitRenovationsForRoom(roomId: number): Observable<SplitRenovation[]> {
    return this.http.get<SplitRenovation[]>(this.baseUrl + 'splitRenovations/' + roomId);
  }

  getMergeRenovationsForRoom(roomId: number): Observable<MergeRenovation[]> {
    return this.http.get<MergeRenovation[]>(this.baseUrl + 'mergeRenovations/' + roomId);
  }

  getTransfersForRoom(roomId: number): Observable<EquipmentTransfer[]> {
    return this.http.get<EquipmentTransfer[]>(this.baseUrl + 'transfers/room/' + roomId);
  }

  deleteEquipmentTransfer(equipmentTransfer: EquipmentTransfer): Observable<EquipmentTransfer> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body:
        equipmentTransfer
    }
    return this.http.delete<EquipmentTransfer>(this.baseUrl + 'transfers', options);
  }
}
