import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService } from '@app/core/services/base-http.service';
import { Doctor } from '@app/shared/models/doctor.model';
import { Observable } from 'rxjs';
import { Shift } from '../../models/shift.model';
import { Holiday } from '../models/holiday.model';
import { OnCallShift } from '../models/on-call-shift.model';
import { WorkdayShift } from '../models/workday-shift.model';

@Injectable({
  providedIn: 'any'
})
export class DoctorManagementService extends BaseHttpService {

  getDoctor(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(this.baseUrl + 'doctors/' + id);
  }

  getHolidays(doctorId: number): Observable<Holiday[]> {
    let params = new HttpParams().set('doctorId', doctorId)
    return this.http.get<Holiday[]>(this.baseUrl + 'holidays', { params: params });
  }

  postHoliday(holiday: Holiday): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'holidays', holiday);
  }

  updateHoliday(holiday: Holiday): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'holidays/' + holiday.id, holiday);
  }

  deleteHoliday(holiday: Holiday): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body:
        holiday
    }
    return this.http.delete<any>(this.baseUrl + 'holidays/' + holiday.id, options);
  }

  getOnCallShifts(doctorId: number): Observable<OnCallShift[]> {
    return this.http.get<OnCallShift[]>(this.baseUrl + "onCallShifts/doctor/" + doctorId);
  }

  postOnCallShift(onCallShift: Object): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + "onCallShifts", onCallShift);
  }

  deleteOnCallShift(onCallShiftId: number): Observable<any> {
    return this.http.delete<Observable<any>>(this.baseUrl + 'onCallShifts/' + onCallShiftId);
  }

  getShiftWorkdaysForDoctor(doctorId: number): Observable<WorkdayShift[]> {
    return this.http.get<WorkdayShift[]>(this.baseUrl + 'shifts' + "/doctor/" + doctorId);
  }

  getOnCallShiftsInDateRange(startDate: string, endDate: string): Observable<OnCallShift[]> {
    return this.http.get<OnCallShift[]>(this.baseUrl + 'onCallShifts' + '?start=' + startDate + "&end=" + endDate);
  }

  assignShiftToDoctor(workday: Object): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + 'workdays', workday);
  }

  removeShiftFromDoctor(workdayId: number): Observable<any> {
    return this.http.delete<Observable<any>>(this.baseUrl + 'workdays/' + workdayId);
  }

  getShift(id: number): Observable<Shift> {
    return this.http.get<Shift>(this.baseUrl + 'shifts' + "/" + id);
  }
}
