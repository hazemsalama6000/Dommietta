import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { HttpReponseModel } from "src/app/core-module/models/ResponseHttp";
import { toasterService } from "src/app/core-module/UIServices/toaster.service";
import { IRegion } from "src/app/modules/share/models/IRegion.interface";
import { ISection } from "src/app/modules/share/models/ISection.interface";
import { DepartmentService } from "src/app/modules/share/Services/department_section/department.service";
import { SectionService } from "src/app/modules/share/Services/department_section/section.service";
import { LookUpModel } from "src/app/shared-module/models/lookup";

@Component({
	selector: 'section_list_content',
	templateUrl: './section_list_content.component.html',
	styleUrls: ['./section_list_content.component.scss']
})

export class SectionListContentComponent {

	currentDepartmentId=0;

	@Output() edit: EventEmitter<ISection> = new EventEmitter();
	
	displayedColumns: string[] = ['name' , 'state' , 'action'];

	dataSource:any;

	currentSelected:ISection;

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private service: SectionService, private toaster: toasterService ,private DepartmentService:DepartmentService) {
		this.currentSelected = {department_Id:0 , id:0 , isActive:false , name:"" ,isEdit:false ,isAdd:false};
//subscribe here to invoke when insert done in upsert component
		this.service.selectFromStore().subscribe(data => {
			this.getallData(this.currentDepartmentId);
		});

        this.DepartmentService.getDepartmentIdObservable().subscribe((data:LookUpModel) => {
			this.currentDepartmentId=data.Id;
			console.log(this.currentDepartmentId);
			this.getallData(this.currentDepartmentId);
		});

	}
	addNewRow() {
		let Item: Array<ISection> = this.dataSource.data.filter((a: ISection) => a.id == 0);
		if (Item.length == 0) {
			let newRow: ISection = { id: 0, name: "", isActive: true, isAdd: true, isEdit: false, department_Id:0 }
			this.dataSource.data = [newRow, ...this.dataSource.data];
			document.getElementById("NameForAdd")?.focus();
		}
	}

	deleteRow() {
		this.dataSource.data = this.dataSource.data.filter((a: ISection) => a.id != 0);
	}


	rowClicked(model:ISection){
		this.currentSelected = model;
	}

//emit model to upsert component for updating
	Edit(model: ISection) {
		model.department_Id=this.currentDepartmentId;
		this.edit.emit(model);
	}


	Remove(model: IRegion){
		this.service.DeleteLookupData(model.id).subscribe(
			(data: HttpReponseModel) => {
				this.toaster.openSuccessSnackBar(data.message);
				this.getallData(this.currentDepartmentId);
			},
			(error:any) => {
				this.toaster.openErrorSnackBar(error);
			 });
	}
	toggleActiveDeactive(element:ISection){
		this.service.toggleActiveDeactive(element).subscribe(
			(data: HttpReponseModel) => {
				this.toaster.openSuccessSnackBar(data.message);
				this.getallData(this.currentDepartmentId);
			},
			(error:any) => {
				console.log(error);
			 });
	}
	Submit(model: ISection) {
		model.department_Id = this.currentDepartmentId;
		if (model.id == 0) {

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
						this.toaster.openWarningSnackBar(error);
					}
				);

		}

		else {
			this.service.UpdateLookupData(model).subscribe(
				(data: any) => {
					this.toaster.openSuccessSnackBar(data.message);
				//	this.service.bSubject.next(true);
				},
				(error: any) => {
					this.toaster.openWarningSnackBar(error);
				});

		}

	}

// getting data and initialize data Source and Paginator
	getallData(stateId:number) {
		this.service.getLookupData(this.currentDepartmentId).subscribe(
			(data: ISection[]) => {
				this.dataSource = new MatTableDataSource<ISection>(data);
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