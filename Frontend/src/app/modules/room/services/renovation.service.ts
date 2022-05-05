import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from '@app/core/services/base-http.service';
import { Observable } from 'rxjs';
import { MergeRenovation } from '../models/merge-renovation.model';
import { SplitRenovation } from '../models/split-renovation.model';

@Injectable({
  providedIn: 'any'
})
export class RenovationService extends BaseHttpService  {

  postSplitRenovation(splitRenovation: SplitRenovation): Observable<SplitRenovation> {
    return this.http.post<SplitRenovation>(this.baseUrl + 'splitRenovations', splitRenovation);
  }

  postMergeRenovation(mergeRenovation: MergeRenovation) : Observable<MergeRenovation> {
    return this.http.post<MergeRenovation>(this.baseUrl + 'mergeRenovations', mergeRenovation);
  }

  getSplitRenovationsForRoom(roomId: number): Observable<SplitRenovation[]> {
    return this.http.get<SplitRenovation[]>(this.baseUrl + 'splitRenovations/' + roomId);
  }

  getMergeRenovationsForRoom(roomId: number): Observable<MergeRenovation[]> {
    return this.http.get<MergeRenovation[]>(this.baseUrl + 'mergeRenovations/' + roomId);
  }

  deleteSplitRenovation(splitRenovation: SplitRenovation): Observable<SplitRenovation> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: 
      splitRenovation    
    } 
    return this.http.delete<SplitRenovation>(this.baseUrl + 'splitRenovations', options);
  }

  deleteMergeRenovation(mergeRenovation: MergeRenovation): Observable<MergeRenovation> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: 
      mergeRenovation    
    } 
    return this.http.delete<MergeRenovation>(this.baseUrl + 'mergeRenovations', options);
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

}
