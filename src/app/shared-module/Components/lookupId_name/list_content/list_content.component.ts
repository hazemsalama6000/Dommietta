import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { catchError, EMPTY } from "rxjs";
import { LookUpModel } from "src/app/shared-module/models/lookup";
import { LookupService } from "src/app/shared-module/Services/Lookup.service";
@Component({
	selector: 'list_content',
	templateUrl: './list_content.component.html',
	styleUrls: ['./list_content.component.scss']
})

export class ListContentComponent implements AfterViewInit, OnInit {

	@Output() edit: EventEmitter<LookUpModel> = new EventEmitter();

	displayedColumns: string[] = ['name', 'action'];

	dataSource:any;

	@ViewChild(MatPaginator) paginator: MatPaginator;

	LookUpData: LookUpModel[] = [];

	constructor(private service: LookupService) {
		this.service.selectFromStore().subscribe(data => {
			this.getallData();
		});
	}

	ngOnInit(): void {
			
	}

	ngAfterViewInit(): void {
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	Edit(model: LookUpModel) {
		this.edit.emit(model);
	}
/*
	Remove(model: LookUpModel){
		this.service.(model).subscribe(
			(data: any) => {
				this.getallData();
			},
			(error:any) => {
				console.log(error);
			 });
	}
*/

	getallData() {
		this.service.getLookupData().subscribe(
			(data: LookUpModel[]) => {
				this.dataSource = new MatTableDataSource<LookUpModel>(data);
				this.dataSource.paginator = this.paginator;	
			}

		);
	}


}