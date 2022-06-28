import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { HttpReponseModel } from 'src/app/core-module/models/ResponseHttp';
import { toasterService } from 'src/app/core-module/UIServices/toaster.service';
import { IEmployee } from '../models/employee.interface';
import { EmployeeService } from '../services/employee.service';

@Component({
	selector: 'app-setting',
	templateUrl: './setting.component.html',

})
export class SettingComponent implements OnInit {
	@HostBinding('class') class =
		'menu menu-sub menu-sub-dropdown w-250px w-md-300px';
	@HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

	employeeProfile: IEmployee = {} as IEmployee;

	@Input() set _Employee(value: IEmployee) {
		this.employeeProfile = value;
		console.log(this.employeeProfile.imagePath);
	}

	constructor(private service: EmployeeService,private toaster: toasterService) { }

	ngOnInit(): void {
	}

	toggleActive() {
		this.service.toggleActive(this.employeeProfile.id).subscribe(
			(data: HttpReponseModel) => {
				this.toaster.openSuccessSnackBar(data.message);
				this.employeeProfile.isActive = !this.employeeProfile.isActive;
			},
			(error) => {
				this.toaster.openWarningSnackBar(error.toString().replace("Error:", ""));
			}
		)
	}

}
