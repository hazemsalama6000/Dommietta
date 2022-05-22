import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonHttpService } from "src/app/core-module/CommonHttpService.service";
import { LookUpModel } from "../models/lookup";

@Injectable({
	providedIn:'root'
})

export class LookupService 
{

	constructor(private http:CommonHttpService){}
    
	getLookupData():Observable<LookUpModel>{
            return this.http.CommonGetRequests('');
	}




}