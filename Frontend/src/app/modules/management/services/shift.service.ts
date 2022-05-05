import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Shift } from "../models/shift.model";
import { BaseHttpService } from "@app/core/services/base-http.service";


@Injectable({
    providedIn: 'any'
})
export class ShiftService extends BaseHttpService {

    getShiftsFromDate(startDate: string): Observable<Shift[]> {
        return this.http.get<Shift[]>(this.baseUrl + 'shifts' + '?start=' + startDate);
    }

    getShiftsInDateRange(startDate: string, endDate: string): Observable<Shift[]> {
        return this.http.get<Shift[]>(this.baseUrl + 'shifts' + '?start=' + startDate + "&end=" + endDate);
    }

    getAllShifts(): Observable<Shift[]> {
        return this.http.get<Shift[]>(this.baseUrl + 'shifts');
    }

}