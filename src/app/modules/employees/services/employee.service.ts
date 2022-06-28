import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonHttpService } from "src/app/core-module/httpServices/CommonHttpService.service";
import { HttpPaths } from "../../auth/Enums/HttpPaths.enum";
import { IEmployee } from "../models/employee.interface";

@Injectable()

export class EmployeeService {

	constructor(private http: CommonHttpService) { }

	getEmployeeById(EmployeeId: number): Observable<IEmployee[]> {
		return this.http.CommonGetRequests(`${localStorage.getItem("companyLink")}${HttpPaths.API_GET_EMPLOYEEBY_ID}${EmployeeId}`);
	}

}