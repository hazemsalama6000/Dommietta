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
	selector: 'state_list_content',
	templateUrl: './state_list_content.component.html',
	styleUrls: ['./state_list_content.component.scss']
})

export class StateListContentComponent {

	currentSelected: LookUpModel;
	NameForAdd: string;
	@Output() edit: EventEmitter<LookUpModel> = new EventEmitter();

	displayedColumns: string[] = ['name', 'state', 'action'];

	dataSource: any;

	@ViewChild(MatPaginator) paginator: MatPaginator;


	constructor(private service: StatesService, private toaster: toasterService) {
		//subscribe here to invoke when insert done in upsert component
		this.service.selectFromStore().subscribe(data => {
			this.getallData();
		});

		this.currentSelected = { Id: 0, Name: '', company_Id: 0 };
	}

	addNewRow() {
		let Item: Array<LookUpModel> = this.dataSource.data.filter((a: LookUpModel) => a.Id == 0);
		if (Item.length == 0) {
			let newRow: LookUpModel = { Id: 0, Name: "", isActive: true, isAdd: true, isEdit: false, company_Id: 0 }
			this.dataSource.data = [newRow, ...this.dataSource.data];
			document.getElementById("NameForAdd")?.focus();
		}
	}

	deleteRow() {
		this.dataSource.data = this.dataSource.data.filter((a: LookUpModel) => a.Id != 0);
	}

	toggleActiveDeactive(element: LookUpModel) {
		this.service.toggleActiveDeactive(element).subscribe(
			(data: HttpReponseModel) => {
				this.toaster.openSuccessSnackBar(data.message);
				this.getallData();
			},
			(error: any) => {
				this.toaster.openWarningSnackBar(error.toString().replace("Error:",""));
			});
	}

	Submit(model: LookUpModel) {

		model.company_Id = 1;
		model.isActive = true;
		if (model.Id == 0) {
			model.Id = 0;
			this.service.PostLookupData(model).
				subscribe(
					(data: HttpReponseModel) => {

						if (data.isSuccess) {
							this.toaster.openSuccessSnackBar(data.message);
							this.service.bSubject.next(true);
							this.service.addFlag.next(false);
						}
						else if (data.isExists) {
							this.toaster.openWarningSnackBar(data.message);
						}
					},
					(error: any) => {
						this.toaster.openWarningSnackBar(error.toString().replace("Error:",""));
					}
				);

		}

		else {
			this.service.UpdateLookupData(model).subscribe(
				(data: any) => {
					this.toaster.openSuccessSnackBar(data.message);
					//this.service.bSubject.next(true);
				},
				(error: any) => {
					this.toaster.openWarningSnackBar(error.toString().replace("Error:",""));
				});

		}

	}

	Remove(model: LookUpModel) {
		this.service.DeleteLookupData(model.Id).subscribe(
			(data: HttpReponseModel) => {
				this.toaster.openSuccessSnackBar(data.message);
				this.getallData();
			},
			(error: any) => {
				this.toaster.openWarningSnackBar(error.toString().replace("Error:",""));
			});
	}


	rowClicked(model: LookUpModel) {
		this.currentSelected = model;
		this.edit.emit(model);
		this.service.emitStateIdSubject.next(model);
	}



	// getting data and initialize data Source and Paginator
	getallData() {
		this.service.getLookupData().subscribe(
			(data: LookUpModel[]) => {
				this.dataSource = new MatTableDataSource<LookUpModel>(data);
				this.dataSource.paginator = this.paginator;
				this.service.addFlag.subscribe((data) => {
					if (data == true) {
						this.addNewRow();
					}
				});
			}
		);
	}




	//filter from search Box
	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

}