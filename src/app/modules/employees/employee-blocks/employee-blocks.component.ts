import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { HttpReponseModel } from "src/app/core-module/models/ResponseHttp";
import { toasterService } from "src/app/core-module/UIServices/toaster.service";
import { LookUpModel } from "src/app/shared-module/models/lookup";
import { ConfirmationDialogService } from "src/app/shared-module/Components/confirm-dialog/confirmDialog.service";
import { LookupService } from "src/app/shared-module/Services/Lookup.service";
import { IUserData } from "src/app/modules/auth/models/IUserData.interface";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/modules/auth";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { TechnitianService } from "../services/technitian.service";
import { ITechnitianLog } from "../models/ITechnitianLog.interface";
import { IBlock } from "../models/IBlock.interface";
import { EmployeeService } from "../services/employee.service";
@Component({
	selector: 'employee-blocks',
	templateUrl: './employee-blockscomponent.html',
	styleUrls: ['./employee-blocks.component.scss']
})

export class EmployeeBlocksComponent {

	@Output() edit: EventEmitter<LookUpModel> = new EventEmitter();
	NameForAdd: string;
	currentSelected: LookUpModel;

	displayedColumns: string[] = ['blockCode', 'blockName','areaName','startDate','endDate' ];

	dataSource: any;

	@ViewChild(MatPaginator) paginator: MatPaginator;

	userdata: IUserData;
	private unsubscribe: Subscription[] = [];

	constructor(
		private service: TechnitianService,
		public dialog: MatDialog,
		private route: ActivatedRoute,
		private employeeService : EmployeeService
	) {
		employeeService.subjectEmployeeChanged.subscribe((data)=>{
			this.getallData(this.employeeService.currentEmployeeSelected.blocks);
		});
	}


	// getting data and initialize data Source and Paginator
	getallData(data: IBlock[]) {
		
				// console.log(data);
				this.dataSource = new MatTableDataSource<IBlock>(data);
				this.dataSource.paginator = this.paginator;
		
	}

	//filter from search Box
	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	ngOnDestroy() {
		this.unsubscribe.forEach((sb) => sb.unsubscribe());
	}

}