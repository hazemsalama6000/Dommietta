import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { LookUpModel } from "src/app/shared-module/models/lookup";

@Injectable({providedIn:'root'})

export class BranchService {

	getLookupBranchData(companyId: number): Observable<LookUpModel[]> {
		/*		return this.http.CommonGetRequests(`${localStorage.getItem("companyLink")}${HttpPaths.API_GET_EMPLOYEELOOKUP}?companyId=${companyId}`)
					.pipe(map(Items => Items.map((Item: any) => ({ Id: Item.id, Name: Item.name }) as LookUpModel)));*/
		return of([{ Id: 1, Name: 'branch1' } as LookUpModel, { Id: 3, Name: 'branch2' } as LookUpModel]);
	}

}