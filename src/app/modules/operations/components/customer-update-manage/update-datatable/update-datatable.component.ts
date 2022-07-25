
import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { customerUpdateManageService } from "../../../services/customer-update-manage.service";
import { ICustomerEditResponse } from "../../../models/cutomer-editmanage/ICustomerEditResponse.interface";
import { UserLocationComponent } from "./user-locations/user-location.component";
import { DialogPosition, MatDialog } from "@angular/material/dialog";
@Component({
	selector: 'customer-update-datatable',
	templateUrl: './update-datatable.component.html',
	styleUrls: ['./update-datatable.component.scss']
})
export class updateCustomerManageComponent implements OnInit {

	displayedColumns: string[] = 
	    ['BranchName',
		'AreaName',
		'BlockName',
		'CustomerName',
		'CustomerCode',
		'CollectorName',
		'RequestDate',
		'UpdatedTypeName',
		'UpdatedTypeSysName'];

	dataSource: any;

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private service: customerUpdateManageService,public dialog: MatDialog) { }

	ngOnInit(): void {
		this.service.searchUpdateUserManageStream$.subscribe(
			(data: ICustomerEditResponse[]) => {

				if (data) {
					this.dataSource = new MatTableDataSource<ICustomerEditResponse>(data);
					this.dataSource.paginator = this.paginator;
				}
				else {
					this.dataSource.data = [];
				}
			}
		);
	}


	rowClicked(model: ICustomerEditResponse) {

	}

	currentLocation(x:number,y:number){

		const dialogPosition: DialogPosition = {
			top:'0px',
			right:'0px'
		  };

		const dialogRef = this.dialog.open(UserLocationComponent,
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
	//filter from search Box
	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

}