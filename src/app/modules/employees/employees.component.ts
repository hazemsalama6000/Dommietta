import { Component, OnInit } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { AreaService } from 'src/app/core-module/LookupsServices/area.service';
import { BlockService } from 'src/app/core-module/LookupsServices/block.service';
import { HttpReponseModel } from 'src/app/core-module/models/ResponseHttp';
import { toasterService } from 'src/app/core-module/UIServices/toaster.service';
import { LookUpModel } from 'src/app/shared-module/models/lookup';
import { BranchService } from '../hr/services/branch.service';
import { IEmployee } from './models/employee.interface';
import { ITechnitianLog } from './models/ITechnitianLog.interface';
import { EmployeeService } from './services/employee.service';
import { AddTechnitianLogComponent } from './setting/Add-technitian-Log/add-technitian-Log.component';

@Component({
	selector: 'app-employees',
	templateUrl: './employees.component.html',
	styleUrls: ['./employees.component.scss'],

})
export class EmployeesComponent implements OnInit {
	imageFile: File;

	dropdownEmployeeData: LookUpModel[] = [];
	employeeDisplay: IEmployee = {} as IEmployee;
	constructor(
		private service: EmployeeService,
		private blockService:BlockService,
		private areaService:AreaService,
		private branchService:BranchService,
		private toaster: toasterService,
		public dialog: MatDialog) {

	}

	ngOnInit(): void {
		/*this.service.getLookupEmployeeData(1005).subscribe((data: LookUpModel[]) => {
			this.dropdownEmployeeData = data;
		});*/
	}


	employeeSelectListOnChange(selectedItem: LookUpModel) {
		this.service.getEmployeeById(selectedItem.Id)
			.subscribe(
				(data: IEmployee) => {
					this.employeeDisplay = data;
					console.log(this.employeeDisplay);
				}
				, (error) => {
					this.toaster.openWarningSnackBar(error.toString().replace("Error:", ""));
				}
			);
	}


	editEmployeeTechnicialData(value: ITechnitianLog) {

		this.employeeDisplay.Technician = {
			employee_Id: 0
			, id: 0
			, isActive: false
			, attachImageEditCustomer: false
			, attachImageRead: false
			, canCollect: false
			, canComplain: false
			, canEditCustomer: false
			, canRead: false
			, maxOfflineWorkingBills: 0
			, maxOfflineWorkingHours: 0
		};

		this.employeeDisplay.isTechnician = true;
		this.employeeDisplay.Technician.employee_Id = value.employee_Id;
		this.employeeDisplay.Technician.isActive = true;
		this.employeeDisplay.Technician.attachImageEditCustomer = value.attachImageEditCustomer;
		this.employeeDisplay.Technician.attachImageRead = value.attachImageRead;
		this.employeeDisplay.Technician.canCollect = value.attachImageRead;
		this.employeeDisplay.Technician.canComplain = value.attachImageRead;
		this.employeeDisplay.Technician.canEditCustomer = value.attachImageRead;
		this.employeeDisplay.Technician.canRead = value.attachImageRead;
		this.employeeDisplay.Technician.maxOfflineWorkingBills = value.maxOfflineWorkingBills;
		this.employeeDisplay.Technician.maxOfflineWorkingHours = value.maxOfflineWorkingHours;
	}

	editActiveProp(value: boolean) {
		this.employeeDisplay.userIsActive = value;
	}




	openDialogForEmployee() {
		const dialogPosition: DialogPosition = {
			top: '0px',
			right: '0px'
		};

		const dialogRef = this.dialog.open(AddTechnitianLogComponent,
			{
				/*maxWidth: '50vw',
				maxHeight: '100vh',*/
				maxHeight: '100vh',
				height: '100%',

				//panelClass: 'full-screen-modal',*/
				position: dialogPosition,
				data: { employeeId: this.employeeDisplay.id }
			});

		dialogRef.afterClosed().subscribe((result: ITechnitianLog) => {
			if (result.employee_Id !== undefined) {
				this.employeeDisplay.isTechnician = true;
				this.editEmployeeTechnicialData(result);
			}
			else {
				this.employeeDisplay.isTechnician = false;
			}
		});

	}



	openDialog() {
		const dialogPosition: DialogPosition = {
			top: '0px',
			right: '0px'
		};

		const dialogRef = this.dialog.open(AddTechnitianLogComponent,
			{
				/*maxWidth: '50vw',
				maxHeight: '100vh',*/
				maxHeight: '100vh',
				height: '100%',

				//panelClass: 'full-screen-modal',*/
				position: dialogPosition,
				data: { employeeId: this.employeeDisplay.id }
			});

		dialogRef.afterClosed().subscribe((result: ITechnitianLog) => {
			if (result.employee_Id !== undefined) {
				this.employeeDisplay.isTechnician = true;
				this.editEmployeeTechnicialData(result);
			}
			else {
				this.employeeDisplay.isTechnician = false;
			}
		});

	}

}
