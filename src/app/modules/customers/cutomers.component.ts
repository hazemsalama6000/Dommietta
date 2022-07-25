import { Component, OnInit } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { AreaService } from 'src/app/core-module/LookupsServices/area.service';
import { BlockService } from 'src/app/core-module/LookupsServices/block.service';
import { BranchService } from 'src/app/core-module/LookupsServices/branch.service';
import { toasterService } from 'src/app/core-module/UIServices/toaster.service';
import { LookUpModel } from 'src/app/shared-module/models/lookup';
import { EmployeeService } from '../employees/services/employee.service';
import { ICustomer } from './models/customer.interface';
import { ISearch } from './models/ISearch.interface';
import { ITechnitianLog } from './models/ITechnitianLog.interface';
import { CutomerService } from './services/customer.service';
import { AddTechnitianLogComponent } from './setting/Add-technitian-Log/add-technitian-Log.component';

@Component({
	selector: 'app-cutomers',
	templateUrl: './cutomers.component.html',
	styleUrls: ['./cutomers.component.scss'],

})
export class CutomersComponent implements OnInit {
	imageFile: File;

	dropdownEmployeeData: LookUpModel[] = [];
	dropdownBranchData: LookUpModel[] = [];
	dropdownAreaData: LookUpModel[] = [];
	dropdownBlockData: LookUpModel[] = [];
	searchModel: ISearch = {} as ISearch;
	employeeDisplay: ICustomer = {} as ICustomer;

	constructor(
		private service: CutomerService,
		private employeeService: EmployeeService,
		
		private blockService: BlockService,
		private areaService: AreaService,
		private branchService: BranchService,
		private toaster: toasterService,
		public dialog: MatDialog) {
	}

	ngOnInit(): void {
		this.branchService.getLookupBranchData(1005).subscribe((data: LookUpModel[]) => {
			this.dropdownBranchData = data;
		});
	}


	branchSelectListOnChange(selectedItem: LookUpModel) {
		this.areaService.getLookupAreaData(selectedItem.Id)
			.subscribe(
				(data: LookUpModel[]) => {
					this.dropdownAreaData = data;
				}
			);
		this.searchModel.branchId = selectedItem.Id;
		this.searchEmployee();
		this.searchCustomer();

	}

	areaSelectListOnChange(selectedItem: LookUpModel) {
		this.blockService.getLookupBlockData(selectedItem.Id)
			.subscribe(
				(data: LookUpModel[]) => {
					this.dropdownBlockData = data;
				}
			);
		this.searchModel.AreaId = selectedItem.Id;
		this.searchEmployee();
		this.searchCustomer();

	}


	blockSelectListOnChange(selectedItem: LookUpModel) {
		this.searchModel.Block = selectedItem.Id;
		this.searchEmployee();
		this.searchCustomer();
	}

	employeeSelectListOnChange(selectedItem: LookUpModel){
		this.searchCustomer();
	}
	
	searchEmployee() {
		this.employeeService.getLookupEmployeeDataByParam(this.searchModel)
			.subscribe(
				(data: LookUpModel[]) => {
					this.dropdownEmployeeData = data;
				}
			);
	}

	searchCustomer() {
		this.service.getLookupCustomerDataByParam(this.searchModel)
			.subscribe(
				(data: LookUpModel[]) => {
					this.dropdownEmployeeData = data;
				}
			);
	}

	customerSelectListOnChange(selectedItem: LookUpModel) {
		this.service.getCutomerById(selectedItem.Id)
			.subscribe(
				(data: ICustomer) => {
					this.employeeDisplay = data;
					this.service.currentEmployeeSelected = data;
					console.log(this.employeeDisplay);
				}
				, (error:any) => {
					this.toaster.openWarningSnackBar(error.toString().replace("Error:", ""));
				}
			);
	}

	editEmployeeTechnicialData(value: ITechnitianLog) {

	/*	this.employeeDisplay.Technician = {
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
		this.employeeDisplay.Technician.maxOfflineWorkingHours = value.maxOfflineWorkingHours;*/
	}
	
	editActiveProp(value: boolean) {
		this.employeeDisplay.isDataComplete = value;
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
				this.employeeDisplay.isDataComplete = true;
				this.editEmployeeTechnicialData(result);
			}
			else {
				this.employeeDisplay.isDataComplete = false;
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
				this.employeeDisplay.isDataComplete = true;
				this.editEmployeeTechnicialData(result);
			}
			else {
				this.employeeDisplay.isDataComplete = false;
			}
		});

	}

}