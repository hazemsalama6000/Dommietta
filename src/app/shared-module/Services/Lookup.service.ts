import { Injectable } from "@angular/core";
import { Tab } from "bootstrap";
import { map, Observable, tap } from "rxjs";
import { CommonHttpService } from "src/app/core-module/CommonHttpService.service";
import { HttpPaths } from "src/app/modules/auth/Enums/HttpPaths.enum";
import { environment } from "src/environments/environment";
import { LookUpModel } from "../models/lookup";

@Injectable({
	providedIn:'root'
})

export class LookupService 
{
    	

	constructor(private http:CommonHttpService){}
    
	getLookupData():Observable<LookUpModel[]>{
            return this.http.CommonGetRequests(`${localStorage.getItem("companyLink")}${HttpPaths.API_JOB_GETALL}`)
			.pipe( tap(data=>console.log(data) ) );
	}




}