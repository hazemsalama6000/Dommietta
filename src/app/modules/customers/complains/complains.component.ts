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
import { ITechnitianLog } from "../models/ITechnitianLog.interface";
import { ComplainService } from "../../operations/services/complain.service";
import { IComplainDisplay } from "../models/IComplain.interface";
@Component({
	selector: 'complain-log',
	templateUrl: './complains.component.html',
	styleUrls: ['./complains.component.scss']
})

export class ComplainsComponent {

	@Output() edit: EventEmitter<LookUpModel> = new EventEmitter();
	NameForAdd: string;
	currentSelected: LookUpModel;

	displayedColumns: string[] = ['Date', 'ComplaintTypeName', 
	'CollectorName', 'IssueName' , 'Details'
	 , 'IsRevised'];

	dataSource: any;

	@ViewChild(MatPaginator) paginator: MatPaginator;

	userdata: IUserData;
	private unsubscribe: Subscription[] = [];

	constructor(
		private service: ComplainService,
		public dialog: MatDialog,
		private route: ActivatedRoute
	) {

		this.route.paramMap.subscribe((data: ParamMap) => {
			this.getallData(+data.get('customerId')!);
		});

	}

	// getting data and initialize data Source and Paginator
	getallData(employeeId: number) {
		this.service.getComplainsByCustomerId(employeeId).subscribe(
			(data: IComplainDisplay[]) => {
				console.log(data);
				this.dataSource = new MatTableDataSource<IComplainDisplay>(data);
				this.dataSource.paginator = this.paginator;
			}
		);
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