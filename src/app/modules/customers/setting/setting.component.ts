import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { HttpReponseModel } from 'src/app/core-module/models/ResponseHttp';
import { toasterService } from 'src/app/core-module/UIServices/toaster.service';
import { EmployeeService } from '../../employees/services/employee.service';
import { ICustomer } from '../models/customer.interface';
import { ITechnitianLog } from '../models/ITechnitianLog.interface';

@Component({
	selector: 'app-setting',
	templateUrl: './setting.component.html'
})
export class SettingComponent implements OnInit {
	@HostBinding('class') class =
		'menu menu-sub menu-sub-dropdown w-250px w-md-300px';
	@HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

	employeeProfile: ICustomer = {} as ICustomer;

	@Output() emitter = new EventEmitter<ITechnitianLog>();
	@Output() emitForActiveProp = new EventEmitter<boolean>();
	@Input() set _Employee(value: ICustomer) {
		this.employeeProfile = value;
	}

	constructor(private service: EmployeeService, private dialog: MatDialog,private toaster: toasterService) { }

	ngOnInit(): void {
	}

	toggleActive() {
		this.service.toggleActive(this.employeeProfile.id).subscribe(
			(data: HttpReponseModel) => {
				this.toaster.openSuccessSnackBar(data.message);
				this.employeeProfile.isDataComplete = !this.employeeProfile.isDataComplete;
				this.emitForActiveProp.emit(this.employeeProfile.isDataComplete);
			},
			(error) => {
				this.toaster.openWarningSnackBar(error.toString().replace("Error:", ""));
			}
		)
	}


	toggleIsTechnician() {

	/*	if (this.employeeProfile.isTechnician == true) {

			this.technicianService.toggleIsTechnician(this.employeeProfile.id).subscribe(
				(data: HttpReponseModel) => {
					this.toaster.openSuccessSnackBar(data.message);
					this.employeeProfile.isTechnician = false;
				}, (error) => {
					this.toaster.openWarningSnackBar(error.toString().replace("Error:", ""));
					this.employeeProfile.isTechnician = false;
				}
			)

		}

		else {
			this.openDialog();
		}*/

	}


	

}
