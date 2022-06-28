import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { toasterService } from 'src/app/core-module/UIServices/toaster.service';
import { LookUpModel } from 'src/app/shared-module/models/lookup';
import { IEmployee } from './models/employee.interface';
import { EmployeeService } from './services/employee.service';

@Component({
	selector: 'app-employees',
	templateUrl: './employees.component.html',
	styleUrls: ['./employees.component.scss'],

})
export class EmployeesComponent implements OnInit {

	dropdownEmployeeData: LookUpModel[] = [];
	employeeDsiaplay: IEmployee = {} as IEmployee;
	constructor(private service: EmployeeService,
		private toaster: toasterService) {

	}

	ngOnInit(): void {
		this.service.getLookupEmployeeData(1005).subscribe((data: LookUpModel[]) => {
			this.dropdownEmployeeData = data;
		});
	}

	employeeSelectListOnChange(selectedItem: LookUpModel) {
		this.service.getEmployeeById(selectedItem.Id)
			.pipe(
				map(
					(data: IEmployee) => ({ ...data, imagePath: `${localStorage.getItem("companyLink")}${data.imagePath}` }) as IEmployee
				)
			)
			.subscribe(
				(data: IEmployee) => {
					this.employeeDsiaplay = data;
				}
				, (error) => {
					this.toaster.openWarningSnackBar(error.toString().replace("Error:", ""));
				}
			);

	}



}
