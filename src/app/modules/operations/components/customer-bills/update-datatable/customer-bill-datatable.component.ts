
import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { customerUpdateManageService } from "../../../services/customer-update-manage.service";
import { ICustomerEditResponse } from "../../../models/cutomer-editmanage/ICustomerEditResponse.interface";
import { DialogPosition, MatDialog } from "@angular/material/dialog";
import { CustomerBillsService } from "../../../services/customer-bills.service";
import { ICustomerBIllsReponse } from "../../../models/bills/ICustomerBillsReponse.interface";
@Component({
	selector: 'customer-bill-datatable',
	templateUrl: './customer-bill-datatable.component.html',
	styleUrls: ['./customer-bill-datatable.component.scss']
})
export class BillDatatableComponent implements OnInit {

	displayedColumns: string[] =
		['BranchName',
			'AreaName',
			'BlockName',
			'CustomerName',
			'CustomerCode',
			'CollectorName',
			'payDate',
			'notes'];

	dataSource: any;

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private service: CustomerBillsService, public dialog: MatDialog) { }

	ngOnInit(): void {
		this.service.searchUpdateUserManageStream$.subscribe(
			(data: ICustomerBIllsReponse[]) => {
				console.log(data);
				if (data) {
					this.dataSource = new MatTableDataSource<ICustomerBIllsReponse>(data);
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

	
	//filter from search Box
	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

}