import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { CommonHttpService } from "src/app/core-module/httpServices/CommonHttpService.service";
import { HttpPaths } from "src/app/modules/auth/Enums/HttpPaths.enum";
import { LookUpModel } from "src/app/shared-module/models/lookup";
import { ICompanyDisplayData } from "../models/ICompanyDisplayData";

@Injectable({
	providedIn:'root'
})

export class CompanyService 
{

	constructor(private http:CommonHttpService){}
    
	getCompanyData():Observable<ICompanyDisplayData[]>{
            return this.http.CommonGetRequests(`${localStorage.getItem("companyLink")}${HttpPaths.API_COMPANY_GETALL}`)
			.pipe( map(Items=> Items.map( (Item:ICompanyDisplayData) => ({
				 id:Item.id ,
				 companyName:Item.companyName  ,  
				 address:Item.address,
				 code:Item.code,
				 activity:Item.activity,
				 phoneNumber:Item.phoneNumber,
				 logoWeb:Item.logoWeb,
				 hasDirectTransferForStocks:Item.hasDirectTransferForStocks,
				 email:Item.email,
				 isActive:Item.isActive,
				 mobileUserNumber:Item.mobileUserNumber,
				 region:Item.region,
				 managerName:Item.managerName,
				 managerPosition:Item.managerPosition,
				
				
				}) as ICompanyDisplayData )  ) );
	}

	DeleteCompanyData(id:number):Observable<any>{
		return this.http.CommonDeleteRequest(`${localStorage.getItem("companyLink")}${HttpPaths.API_STATE_DELETE}${id}`);
	}
	
	PostCompanyData(model:LookUpModel):Observable<any>{
      return this.http.CommonPostRequests(model,`${localStorage.getItem("companyLink")}${HttpPaths.API_STATE_ADD}`);
	}

	UpdateCompanyData(model:LookUpModel):Observable<any>{
		return this.http.CommonPutRequests(model,`${localStorage.getItem("companyLink")}${HttpPaths.API_STATE_UPDATE}${model.Id}`);
	  }


}