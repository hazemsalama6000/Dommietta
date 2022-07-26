import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from "rxjs";
import { CommonHttpService } from "src/app/core-module/httpServices/CommonHttpService.service";
import { HttpReponseModel } from "src/app/core-module/models/ResponseHttp";
import { HttpPaths } from "src/app/modules/auth/Enums/HttpPaths.enum";
import { LookUpModel } from "src/app/shared-module/models/lookup";
import { ICustomerEditManageSearch } from "../../operations/models/cutomer-editmanage/ICustomerEditManageSearch.interface";
import { ICustomer } from "../models/customer.interface";
import { ISeachListOfCustomer } from "../models/ISeachListOfCustomer.interface";
import { ISearch } from "../models/ISearch.interface";

@Injectable({
	providedIn: 'root'
})

export class CutomerService {
	employees: LookUpModel[];
	bSubject = new BehaviorSubject(true);
	currentEmployeeSelected: ICustomer = {} as ICustomer;

	constructor(private http: CommonHttpService) { }

	getLookupCustomerDataByParam(model: ISeachListOfCustomer): Observable<LookUpModel[]> {
		return this.http.CommonGetRequests(`${localStorage.getItem("companyLink")}${HttpPaths.API_GET_LISTOFCUSTOMER}
		areaId=${model.AreaId == undefined ? '' : model.AreaId}
		&BlockId=${model.Block == undefined ? '' : model.Block}
		&branchId=${model.branchId == undefined ? '' : model.branchId}
		&employeeId=${model.employeeId == undefined ? '' : model.employeeId}`)
		.pipe(map(Items => Items.data?.map((Item: any) => ({ Id: Item.id, Name: Item.title }) as LookUpModel)));
	}

	getLookupCutomerData(companyId: number): Observable<LookUpModel[]> {
		return this.http.CommonGetRequests(`${localStorage.getItem("companyLink")}${HttpPaths.API_GET_EMPLOYEELOOKUP}?companyId=${companyId}`)
			.pipe(map(Items => Items.map((Item: any) => ({ Id: Item.id, Name: Item.name }) as LookUpModel)));
	}
	// note
	getCutomerById(customerId: number): Observable<ICustomer> {
		return this.http.CommonGetRequests(`${localStorage.getItem("companyLink")}${HttpPaths.API_GET_CUSTOMERBY_ID}${customerId}`).pipe(
			map((data: HttpReponseModel) => data.data as ICustomer)
		);
	}

	toggleActive(employeeId: number): Observable<HttpReponseModel> {
		return this.http.CommonPostRequests(null, `${localStorage.getItem("companyLink")}${HttpPaths.API_TOGGLE_EMPLOYEE_ACTIVE}?EmployeeId=${employeeId}`);
	}
	//

	selectFromStore(): Observable<any> {
		return this.bSubject.asObservable();
	}
	/*
		changeEmployeeImageData(model: any): Observable<any> {
			return this.http.CommonPostRequests(model, `${localStorage.getItem("companyLink")}${HttpPaths.API_CHANGE_EMP_IMAGE}`);
		}*/

}