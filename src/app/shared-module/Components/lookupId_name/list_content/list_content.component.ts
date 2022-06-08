import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { HttpReponseModel } from "src/app/core-module/models/ResponseHttp";
import { toasterService } from "src/app/core-module/UIServices/toaster.service";
import { LookUpModel } from "src/app/shared-module/models/lookup";
import { LookupService } from "src/app/shared-module/Services/Lookup.service";
import { ConfirmDialog } from "../../confirm-dialog/confirm-dialog.component";
@Component({
	selector: 'list_content',
	templateUrl: './list_content.component.html',
	styleUrls: ['./list_content.component.scss']
})

export class ListContentComponent {

	popoverTitle = 'Popover title';
	popoverMessage = 'Popover description';
	confirmClicked = false;
	cancelClicked = false;


	@Output() edit: EventEmitter<LookUpModel> = new EventEmitter();
	NameForAdd: string;
	currentSelected: LookUpModel;

	displayedColumns: string[] = ['name', 'state', 'action'];

	dataSource: any;

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private service: LookupService, private toaster: toasterService, public dialog: MatDialog) {

		this.currentSelected = { Id: 0, Name: '', company_Id: 0 };

		//subscribe here to invoke when insert done in upsert component
		this.service.selectFromStore().subscribe(data => {
			this.getallData();
		});
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

	rowClicked(model: LookUpModel) {
		this.currentSelected = model;
	}

	Submit(model: LookUpModel) {
		console.log(model);

		model.company_Id = 1;

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
						this.toaster.openWarningSnackBar(error.toString().replace("Error:", ""));
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
					this.toaster.openWarningSnackBar(error.toString().replace("Error:", ""));
				});

		}

	}


	toggleActiveDeactive(element: LookUpModel) {
		this.service.toggleActiveDeactive(element).subscribe(
			(data: HttpReponseModel) => {
				this.toaster.openSuccessSnackBar(data.message);
				this.getallData();
			},
			(error: any) => {
				console.log(error);
			});
	}



	Remove(model: LookUpModel) {

		if (confirm("Are you sure to delete " + model.Name)) {

			this.service.DeleteLookupData(model.Id).subscribe(
				(data: HttpReponseModel) => {
					this.toaster.openSuccessSnackBar(data.message);
					this.getallData();
				},
				(error: any) => {
					this.toaster.openWarningSnackBar(error.toString().replace("Error:", ""));
				});

		}

	}

	// getting data and initialize data Source and Paginator
	getallData() {
		this.service.getLookupData().subscribe(
			(data: LookUpModel[]) => {
				console.log(data);
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