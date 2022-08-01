
import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { customerUpdateManageService } from "../../../services/customer-update-manage.service";
import { ICustomerEditResponse } from "../../../models/cutomer-editmanage/ICustomerEditResponse.interface";
import { DialogPosition, MatDialog } from "@angular/material/dialog";
import { CustomerBillsService } from "../../../services/customer-bills.service";
import { ICustomerBIllsReponse } from "../../../models/bills/ICustomerBillsReponse.interface";
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ICustomerEditManageSearch } from "../../../models/cutomer-editmanage/ICustomerEditManageSearch.interface";
import { MatSort } from "@angular/material/sort";
import { map, merge, switchMap } from "rxjs";

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
		state('collapsed', style({height: '0px', minHeight: '0'})),
		state('expanded', style({height: '*'})),
		transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
	  ]),
	],
  })

export class BillDatatableComponent {

	//dataSource = ELEMENT_DATA;
	columnsToDisplay = ['payDate','branch',
	'area',
	'block',
	'customerCode',
	'customerName',
	'collectorName',
	'notes'];
	columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
	expandedElement: PeriodicElement | null;

	data: ICustomerBIllsReponse[] = [];
	currentSearchParameter: ICustomerEditManageSearch = {} as ICustomerEditManageSearch;
	resultsLength = 0;
	isLoadingResults = true;
	isRateLimitReached = false;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	
	constructor(private service: CustomerBillsService, public dialog: MatDialog) { }
	
	ngAfterViewInit() {
		// If the user changes the sort order, reset back to the first page.

		merge(this.paginator.page, this.service.searchUpdateUserManageStream$)
			.pipe(
				switchMap(() => {
					this.isLoadingResults = true;
					this.currentSearchParameter.PageNumber = this.paginator.pageIndex + 1;
					console.log(this.currentSearchParameter);

					return this.service.searchCustomerBills(this.currentSearchParameter);
				}),
				map((data:ItemsWithPagesCustomeBills) => {
					this.isLoadingResults = false;
					this.isRateLimitReached = data === null;
					if (data === null) {
						return [];
					}
					this.resultsLength = data.totalPages;
					return data.data;
				}),
			)
			.subscribe((data) => {this.data = data;  });
	}

/*
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
	}*/



	rowClicked(model: ICustomerEditResponse) {

	}

	
	//filter from search Box
/*	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
*/
}

export interface ItemsWithPagesCustomeBills {
	data: ICustomerBIllsReponse[];
	totalPages: number;
}
