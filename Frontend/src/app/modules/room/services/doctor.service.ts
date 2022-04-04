import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Doctor } from "../models/doctor.model";

@Injectable({
    providedIn: 'any'
})
export class DoctorService {

    private baseUrl: string = environment.baseUrlHospital + 'doctors';

    constructor(private http: HttpClient) { }

    getDoctorForRoom(roomId: number): Observable<Doctor> {
        return this.http.get<Doctor>(this.baseUrl + "?roomId=" + roomId);
    }
}