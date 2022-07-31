import {  Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { DialogPosition, MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { LookUpModel } from "src/app/shared-module/models/lookup";
import { IUserData } from "src/app/modules/auth/models/IUserData.interface";
import { Subscription } from "rxjs";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { ComplainService } from "../../operations/services/complain.service";
import { UserLocationComponent } from "../user-locations/user-location.component";
import { IComplainDisplay } from "../../customers/models/IComplain.interface";
import { IReadingSearch } from "../../operations/models/IReadingSearch.interface";
import { IReading, IReadingList } from "../../operations/models/IReading.interface";
import { ReadingService } from "../../operations/services/reading.service";
import { UserLocationXYComponent } from "../user-locationsxy/user-locationxy.component";
@Component({
	selector: 'customer-reading',
	templateUrl: './customer-reading.component.html',
	styleUrls: ['./customer-reading.component.scss']
})

export class CustomerReadingComponent {

	@Output() edit: EventEmitter<LookUpModel> = new EventEmitter();
	NameForAdd: string;
	currentSelected: LookUpModel;

	displayedColumns: string[] = ['customerName', 'value', 
	'lastReading', 'meterStatus' , 'readingImagePath'
	 , 'issueName','issueStatus','XY','issueDate','isRevised','isPotsed','notes'];

	dataSource: any;

	@ViewChild(MatPaginator) paginator: MatPaginator;

	userdata: IUserData;
	private unsubscribe: Subscription[] = [];

	constructor(
		private service: ReadingService,
		public dialog: MatDialog,
		private route: ActivatedRoute
	) {

		this.route.paramMap.subscribe((data: ParamMap) => {
			this.getallData(+data.get('employeeId')!);
		});

	}

	currentLocation(x:number,y:number){

		const dialogPosition: DialogPosition = {
			top:'0px',
			right:'0px'
		  };

		const dialogRef = this.dialog.open(UserLocationXYComponent,
			{
				/*maxWidth: '50vw',
				maxHeight: '100vh',*/
				maxHeight: '100vh',
				height: '100%',

				//panelClass: 'full-screen-modal',*/
				position:dialogPosition,
				data: { x: x,y:y}
			});

		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
		});	}
	// getting data and initialize data Source and Paginator
	getallData(employeeId: number) {
		let search: IReadingSearch = {Employee_id:employeeId};
		this.service.getReadingsData(search).subscribe(
			(data: IReading) => {
				console.log(data);
				this.dataSource = new MatTableDataSource<IReadingList>(data.data);
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