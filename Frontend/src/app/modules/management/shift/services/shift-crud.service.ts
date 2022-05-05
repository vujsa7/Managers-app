import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from '@app/core/services/base-http.service';
import { Observable } from 'rxjs';
import { Shift } from '../../models/shift.model';

@Injectable({
  providedIn: 'any'
})
export class ShiftCRUDService extends BaseHttpService{

  postShift(shift: Object): Observable<Shift> {
    return this.http.post<Shift>(this.baseUrl + 'shifts', shift);
  }

  putShift(shift: Shift): Observable<Shift> {
    return this.http.put<Shift>(this.baseUrl + 'shifts', shift);
  }

  deleteShift(shift: Shift): Observable<Shift> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body:
        shift
    }
    return this.http.delete<Shift>(this.baseUrl + 'shifts', options);
  }
}
