import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Tab } from "bootstrap";
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from "rxjs";
import { AnyCatcher } from "rxjs/internal/AnyCatcher";
import { CommonHttpService } from "src/app/core-module/httpServices/CommonHttpService.service";
import { HttpReponseModel } from "src/app/core-module/models/ResponseHttp";
import { HttpPaths } from "src/app/modules/auth/Enums/HttpPaths.enum";
import { LookUpModel } from "src/app/shared-module/models/lookup";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn:'root'
})

export class StatesService 
{
    
    bSubject = new BehaviorSubject(true); 

	constructor(private http:CommonHttpService){}
    
	getLookupData():Observable<LookUpModel[]>{
            return this.http.CommonGetRequests(`${localStorage.getItem("companyLink")}${HttpPaths.API_STATE_GETALL}`)
			.pipe( map(Items=> Items.map( (Item:any) => ({Id:Item.id,Name:Item.name}) as LookUpModel )  ) );
	}

	DeleteLookupData(id:number):Observable<any>{
		return this.http.CommonDeleteRequest(`${localStorage.getItem("companyLink")}${HttpPaths.API_STATE_DELETE}${id}`);
	}
	
	PostLookupData(model:LookUpModel):Observable<any>{
      return this.http.CommonPostRequests(model,`${localStorage.getItem("companyLink")}${HttpPaths.API_STATE_ADD}`);
	}

	UpdateLookupData(model:LookUpModel):Observable<any>{
		return this.http.CommonPutRequests(model,`${localStorage.getItem("companyLink")}${HttpPaths.API_STATE_UPDATE}${model.Id}`);
	  }

	selectFromStore():Observable<any> {
		return this.bSubject.asObservable();
	 }


}