import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppInjector } from "@app/core/guards/injector.guard";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class BaseHttpService{
    
    public baseUrl: string = environment.baseUrlHospital;
    public http = AppInjector.get(HttpClient);

    constructor() { }

}