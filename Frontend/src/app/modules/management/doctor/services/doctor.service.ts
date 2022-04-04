import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Doctor } from "@app/shared/models/doctor.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'any'
})
export class DoctorService {

    private baseUrl: string = environment.baseUrlHospital + 'doctors';

    constructor(private http: HttpClient) { }

    getDoctor(id: number): Observable<Doctor>{
        return this.http.get<Doctor>(this.baseUrl + "/" + id);
    }
}