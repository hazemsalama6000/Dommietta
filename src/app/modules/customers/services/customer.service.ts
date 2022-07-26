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
		return this.http.CommonGetRequests(`${localStorage.getItem("companyLink")}${HttpPaths.API_GET_LISTOFCUSTOMER}?
			areaId=${model.AreaId == undefined ? '' : model.AreaId}&blockId=${model.Block == undefined ? '' : model.Block}`)
			.pipe(map(Items => Items.data?.map((Item: any) => ({ Id: Item.id, Name: Item.name }) as LookUpModel)));
	}

	getLookupCutomerData(companyId: number): Observable<LookUpModel[]> {
		return this.http.CommonGetRequests(`${localStorage.getItem("companyLink")}${HttpPaths.API_GET_EMPLOYEELOOKUP}?companyId=${companyId}`)
			.pipe(map(Items => Items.map((Item: any) => ({ Id: Item.id, Name: Item.name }) as LookUpModel)));
	}
	// note
	getCutomerById(customerId: number): Observable<ICustomer> {
		/*return this.http.CommonGetRequests(`${localStorage.getItem("companyLink")}${HttpPaths.API_GET_EMPLOYEEBY_ID}?EmployeeId=${employeeId}`).pipe(
			map((data: HttpReponseModel) => data.data)
		);*/

		return of(
			{
				id: 1,
				name: "zomm",
				code: "ZZZ",
				actualName: "zzzz",
				startIssue: new Date(),
				activityStartIssue: new Date(),
				actualActivity: "zzzz",
				blockName: "zzzz",
				areaName: "zzzz",
				numOfUnits: 3,
				meterChassisNum: 3,
				meterStartReading: 3,
				meterStartDate: new Date(),
				meterStartIssue: new Date(),
				hasSewage: true,
				x: 30.5,
				y: 30.54,
				imagePath: '',
				isDataComplete: true,
			} as ICustomer);
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