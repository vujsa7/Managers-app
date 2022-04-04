import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EquipmentTransfer } from "@app/shared/models/equipment-transfer.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'any'
})
export class EquipmentTransferService {

    private baseUrl: string = environment.baseUrlHospital;

    constructor(private http: HttpClient) { }

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