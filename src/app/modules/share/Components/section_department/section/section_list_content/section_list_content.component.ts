import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { catchError, EMPTY } from "rxjs";
import { HttpReponseModel } from "src/app/core-module/models/ResponseHttp";
import { toasterService } from "src/app/core-module/UIServices/toaster.service";
import { IRegion } from "src/app/modules/share/models/IRegion.interface";
import { RegionService } from "src/app/modules/share/Services/region.service";
import { StatesService } from "src/app/modules/share/Services/state.service";
import { LookUpModel } from "src/app/shared-module/models/lookup";

@Component({
	selector: 'section_list_content',
	templateUrl: './section_list_content.component.html',
	styleUrls: ['./section_list_content.component.scss']
})

export class SectionListContentComponent {

	currentStateId=0;

	@Output() edit: EventEmitter<IRegion> = new EventEmitter();
	
	displayedColumns: string[] = ['name', 'action'];

	dataSource:any;

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private service: RegionService, private toaster: toasterService ,private StatesService:StatesService) {
//subscribe here to invoke when insert done in upsert component
		this.service.selectFromStore().subscribe(data => {
			this.getallData(this.currentStateId);
		});

        this.StatesService.getStateIdObservable().subscribe((data:LookUpModel) => {
			this.currentStateId=data.Id;
			console.log(this.currentStateId);
			this.getallData(this.currentStateId);
		});

	}

//emit model to upsert component for updating
	Edit(model: IRegion) {
		model.state_Id=this.currentStateId;
		this.edit.emit(model);
	}


	Remove(model: IRegion){
		this.service.DeleteLookupData(model.id).subscribe(
			(data: HttpReponseModel) => {
				this.toaster.openSuccessSnackBar(data.message);
				this.getallData(this.currentStateId);
			},
			(error:any) => {
				this.toaster.openErrorSnackBar(error);
			 });
	}

// getting data and initialize data Source and Paginator
	getallData(stateId:number) {
		this.service.getLookupData(this.currentStateId).subscribe(
			(data: IRegion[]) => {
				this.dataSource = new MatTableDataSource<IRegion>(data);
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