import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { catchError, EMPTY } from "rxjs";
import { HttpReponseModel } from "src/app/core-module/models/ResponseHttp";
import { toasterService } from "src/app/core-module/UIServices/toaster.service";
import { StatesService } from "src/app/modules/share/Services/state.service";
import { LookUpModel } from "src/app/shared-module/models/lookup";
import { LookupService } from "src/app/shared-module/Services/Lookup.service";
@Component({
	selector: 'region_list_content',
	templateUrl: './region_list_content.component.html',
	styleUrls: ['./region_list_content.component.scss']
})

export class RegionListContentComponent {

	currentStateId=0;

	@Output() edit: EventEmitter<LookUpModel> = new EventEmitter();
	
	displayedColumns: string[] = ['name', 'action'];

	dataSource:any;

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private service: LookupService, private toaster: toasterService ,private StatesService:StatesService) {
//subscribe here to invoke when insert done in upsert component
		this.service.selectFromStore().subscribe(data => {
			this.getallData(this.currentStateId);
		});

        this.StatesService.getStateIdObservable().subscribe((data:LookUpModel) => {
			this.currentStateId=data.Id;
			this.getallData(this.currentStateId);
		});

	}

//emit model to upsert component for updating
	Edit(model: LookUpModel) {
		this.edit.emit(model);
	}


	Remove(model: LookUpModel){
		this.service.DeleteLookupData(model.Id).subscribe(
			(data: HttpReponseModel) => {
				this.toaster.openSuccessSnackBar(data.message);
				this.getallData(this.currentStateId);
			},
			(error:any) => {
				console.log(error);
			 });
	}

// getting data and initialize data Source and Paginator
	getallData(stateId:number) {
		this.service.getLookupData().subscribe(
			(data: LookUpModel[]) => {
				this.dataSource = new MatTableDataSource<LookUpModel>(data);
				this.dataSource.paginator = this.paginator;	
			}

		);
	}

//filter from search Box
	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

}