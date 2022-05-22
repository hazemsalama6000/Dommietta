import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { LookUpModel } from "src/app/shared-module/models/lookup";
import { LookupService } from "src/app/shared-module/Services/Lookup.service";

export interface PeriodicElement {
	id: number;
	name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
	{ id: 1, name: 'Hydrogen' },
	{ id: 2, name: 'Helium' },
];

@Component({
	selector: 'list_content',
	templateUrl: './list_content.component.html',
	styleUrls: ['./list_content.component.scss']
})

export class ListContentComponent implements AfterViewInit , OnInit{

	@Output() edit: EventEmitter<LookUpModel> = new EventEmitter();
  
	displayedColumns: string[] = ['name', 'action'];
	
	dataSource :any;
     
	@ViewChild(MatPaginator) paginator: MatPaginator;

	LookUpData: LookUpModel[] = [];

	constructor(private service: LookupService) { }

	ngOnInit(): void {
		this.getallData();
		             }

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	Edit(model: LookUpModel) {
		this.edit.emit(model);
	}

	getallData(){
	  	this.service.getLookupData().subscribe(
		/*	(data: LookUpModel[]) =>{ 
			this.dataSource	= new MatTableDataSource(data)
			}*/
			data=>console.log(data)
			);
	}


}