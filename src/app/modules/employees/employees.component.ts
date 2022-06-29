import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { HttpReponseModel } from 'src/app/core-module/models/ResponseHttp';
import { toasterService } from 'src/app/core-module/UIServices/toaster.service';
import { LookUpModel } from 'src/app/shared-module/models/lookup';
import { IEmployee } from './models/employee.interface';
import { ITechnitianLog } from './models/ITechnitianLog.interface';
import { EmployeeService } from './services/employee.service';

@Component({
	selector: 'app-employees',
	templateUrl: './employees.component.html',
	styleUrls: ['./employees.component.scss'],

})
export class EmployeesComponent implements OnInit {
	imageFile: File;

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

	imageChange(event: any) {

		this.imageFile = <File>event.target.files[0];

		const fd = new FormData();
		fd.append('image', this.imageFile, this.imageFile.name.toString());
		fd.append('employee_Id', this.employeeDsiaplay.id.toString());
		this.service.changeEmployeeImageData(fd).
			subscribe(
				(data: HttpReponseModel) => {

					if (data.isSuccess) {
						this.toaster.openSuccessSnackBar(data.message);
						console.log(data.data);
						this.employeeDsiaplay.imagePath = `${localStorage.getItem('companyLink')}${data.data}`
						console.log(this.employeeDsiaplay.imagePath);
						//	this.service.bSubject.next(true);
					}
					else if (data.isExists) {
						this.toaster.openWarningSnackBar(data.message);
					}
				},
				(error: any) => {
					console.log(error);
					this.toaster.openWarningSnackBar(error.toString().replace("Error:", ""));
				}
			);
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
					console.log(this.employeeDsiaplay);
				}
				, (error) => {
					this.toaster.openWarningSnackBar(error.toString().replace("Error:", ""));
				}
			);

	}


	editEmployeeTechnicialData(value: ITechnitianLog) {

		this.employeeDsiaplay.techTechnician = {employee_Id:0,id:0,isActive:false,returnFromBill:false,useGps:false};
		this.employeeDsiaplay.isTechnician = true;
		this.employeeDsiaplay.techTechnician.employee_Id = value.employeeId;
		this.employeeDsiaplay.techTechnician.isActive = true;
		this.employeeDsiaplay.techTechnician.returnFromBill = value.returnFromBill;
		this.employeeDsiaplay.techTechnician.useGps = value.useGps;
	}

	editActiveProp(value: boolean) {
		this.employeeDsiaplay.isActive = value;
	}

}
