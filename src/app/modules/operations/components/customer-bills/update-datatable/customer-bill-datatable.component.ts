
import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { customerUpdateManageService } from "../../../services/customer-update-manage.service";
import { ICustomerEditResponse } from "../../../models/cutomer-editmanage/ICustomerEditResponse.interface";
import { DialogPosition, MatDialog } from "@angular/material/dialog";
import { CustomerBillsService } from "../../../services/customer-bills.service";
import { ICustomerBIllsReponse } from "../../../models/bills/ICustomerBillsReponse.interface";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ICustomerEditManageSearch } from "../../../models/cutomer-editmanage/ICustomerEditManageSearch.interface";
import { MatSort } from "@angular/material/sort";
import { map, merge, Subscription, switchMap } from "rxjs";
import { toasterService } from "src/app/core-module/UIServices/toaster.service";
import { IUserData } from "src/app/modules/auth/models/IUserData.interface";
import { AuthService } from "src/app/modules/auth";

export interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
	description: string;
}


@Component({
	selector: 'customer-bill-datatable',
	templateUrl: './customer-bill-datatable.component.html',
	styleUrls: ['./customer-bill-datatable.component.scss'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})

export class BillDatatableComponent {

	//dataSource = ELEMENT_DATA;
	columnsToDisplay = ['payDate', 'totalAmount', 'branch',
		'area',
		'block',
		'customerCode',
		'customerName',
		'collectorName',
		'notes',
		'action'];
	columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
	expandedElement: PeriodicElement | null;

	data: ICustomerBIllsReponse[] = [];
	currentSearchParameter: ICustomerEditManageSearch = {} as ICustomerEditManageSearch;
	resultsLength = 0;
	isLoadingResults = true;
	isRateLimitReached = false;
	userData:IUserData;
	unsubscribe:Subscription[]=[];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(private service: CustomerBillsService,private auth:AuthService, public dialog: MatDialog,private toaster:toasterService) { 
		let data=auth.userData.subscribe(res=>this.userData=res);
		this.unsubscribe.push(data)
	}

	ngAfterViewInit() {
		// If the user changes the sort order, reset back to the first page.

		merge(this.paginator.page, this.service.searchUpdateUserManageStream$)
			.pipe(
				switchMap(() => {
					this.isLoadingResults = true;
					this.currentSearchParameter.PageNumber = this.paginator.pageIndex + 1;
					this.currentSearchParameter.PageSize = this.paginator.pageSize;

					// console.log(this.currentSearchParameter);

					return this.service.searchCustomerBills(this.currentSearchParameter);
				}),
				map((data: ItemsWithPagesCustomeBills) => {
					this.isLoadingResults = false;
					this.isRateLimitReached = data === null;
					if (data === null) {
						return [];
					}
					this.resultsLength = data.totalCount;
					return data.data;
				}),
			)
			.subscribe((data) => { this.data = data; });

		this.service.searchUpdateUserManageAction.next(true);
	}


	ngOnInit(): void {

		this.service.searchParameterStream$.subscribe(
			(data: ICustomerEditManageSearch) => {
				this.currentSearchParameter = data;
			}
		);
	}

	rowClicked(model: ICustomerEditResponse) {

	}

	
	changeIsActiveReprint(model:ICustomerBIllsReponse) {
		let obj = { billPaymentId: model.id, userId: this.userData.userId };
		console.log(obj)
		this.service.toggleIsActiveReprintBill(obj).subscribe(res => {
			if (res.isSuccess){
				this.toaster.openSuccessSnackBar(res.message);
				this.service.searchUpdateUserManageAction.next(true);}
			else
				this.toaster.openErrorSnackBar(res.message);
		}, err => console.log(err))
	}

}

export interface ItemsWithPagesCustomeBills {
	data: ICustomerBIllsReponse[];
	totalCount: number;
}
