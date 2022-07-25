import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { LookUpModel } from "src/app/shared-module/models/lookup";

@Injectable({providedIn:'root'})

export class AreaService {

	getLookupAreaData(branchId: number): Observable<LookUpModel[]> {
		/*		return this.http.CommonGetRequests(`${localStorage.getItem("companyLink")}${HttpPaths.API_GET_EMPLOYEELOOKUP}?companyId=${companyId}`)
					.pipe(map(Items => Items.map((Item: any) => ({ Id: Item.id, Name: Item.name }) as LookUpModel)));*/
		return of([{ Id: 1, Name: 'Area1' } as LookUpModel, { Id: 1, Name: 'Area2' } as LookUpModel]);
	}

}