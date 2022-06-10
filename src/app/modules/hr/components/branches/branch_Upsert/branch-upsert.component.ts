import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HttpReponseModel } from "src/app/core-module/models/ResponseHttp";
import { dropdownSettings } from "src/app/core-module/UIServices/dropdownsetting";
import { toasterService } from "src/app/core-module/UIServices/toaster.service";
import { ICompany } from "src/app/modules/hr/models/ICompany";
import { CompanyService } from "src/app/modules/hr/services/company.service";
import { EmployeeService } from "src/app/modules/hr/services/employee.service";
import { IRegion } from "src/app/modules/share/models/IRegion.interface";
import { RegionService } from "src/app/modules/share/Services/region.service";
import { StatesService } from "src/app/modules/share/Services/state.service";
import { LookUpModel } from "src/app/shared-module/models/lookup";
import { IBranchUpsert } from "../../../models/IBranchUpsert.interface";
import { BranchService } from "../../../services/branch.service";

@Component({
	selector: "branch-upsert",
	templateUrl: './branch-upsert.component.html',
	styleUrls: ['./branch-upsert.component.scss']
})

export class BranchUpsertComponent implements OnInit {

	companyBranch = 1;

	branch: IBranchUpsert;

	isEditable: boolean = false;
	dropdownListDataForState: any = [];
	selectedItemState: any = [];

	dropdownListDataForRegion: any = [];
	selectedItemForRegion: any = [];

	dropdownListDataForEmployee: LookUpModel[] = [];
	selectedItemForEmployee: any = [];

	dropdownListDataForResponsible: any = [];
	selectedItemForResponsible: any = [];

	dropdownSettings = dropdownSettings;

	submitClicked: boolean = false;
	branchDataForm: FormGroup;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private fb: FormBuilder,
		private toaster: toasterService,
		private stateService: StatesService,
		private regionService: RegionService,
		private companyService: CompanyService,
		private employeeService: EmployeeService,
		private service: BranchService
	) { }

	ngOnInit() {
		this.setDefaultForForm();
		this.initForm();
	}

	setDefaultForForm() {
		this.branchDataForm = this.fb.group({
			id: [0],
			company_Id: [0],
			branchName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
			branchAddress: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
			state_Id: ['', Validators.compose([Validators.required])],
			region_Id: ['', Validators.compose([Validators.required])],
			isActive: [false,],
			isMain: [false,],
			branchManager_Id: ['', Validators.compose([Validators.required])],
			email: ['', Validators.compose([Validators.required, , Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")])],
			phoneNumber: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("^[0-9]*$")])],
		});
	}


	fillDropDowns() {

		this.stateService.getLookupData().subscribe(
			(data: LookUpModel[]) => {
				this.dropdownListDataForState = data;

				if (this.data.branchId != 0) {
					this.selectedItemState = this.dropdownListDataForState.filter(
						(data: LookUpModel) => {
							return data.Id == this.branch.stateId;
						});
				}

			}
		);

		this.dropdownListDataForRegion = [];

		if (this.data.branchId != 0) {
			//get selected region
			this.regionService.getLookupData(this.branch.stateId).subscribe(
				(data: IRegion[]) => {
					this.dropdownListDataForRegion = data.map(item => ({ Id: item.id, Name: item.name }) as LookUpModel)

					this.selectedItemForRegion = this.dropdownListDataForRegion.filter(
						(data: LookUpModel) => {
							return data.Id == this.branch.region_Id;
						});
				}
			);
		}

		//get selected employee

		this.employeeService.getLookupEmployeeData().subscribe(
			(data: LookUpModel[]) => {
				this.dropdownListDataForEmployee = data;

				if (this.data.branchId != 0) {
					this.selectedItemForEmployee = this.dropdownListDataForEmployee.filter(
						(dataa: LookUpModel) => {
							return dataa.Id == this.branch.branchManager_Id;
						});

				}
			}
		);



		setTimeout(() => {
			if (this.data.branchId != 0) {
				this.passingCompanyToFormData();
			}
		}, 1500);

	}

	onItemSelectState(item: any) {

		this.regionService.getLookupData(item.Id).subscribe(
			(data: IRegion[]) => {
				this.dropdownListDataForRegion = data.map(item => ({ Id: item.id, Name: item.name }) as LookUpModel)
			}
		);

		this.selectedItemForRegion = {};
		this.branchDataForm.controls['region_Id'].setValue(this.selectedItemForRegion);

	}



	passingCompanyToFormData() {

		this.branchDataForm.controls['id'].setValue(this.branch.id);
		this.branchDataForm.controls['company_Id'].setValue(this.branch.company_Id);
		this.branchDataForm.controls['branchName'].setValue(this.branch.branchName);
		this.branchDataForm.controls['branchManager_Id'].setValue(this.selectedItemForEmployee);
		this.branchDataForm.controls['branchAddress'].setValue(this.branch.branchAddress);
		this.branchDataForm.controls['phoneNumber'].setValue(this.branch.phoneNumber);
		this.branchDataForm.controls['state_Id'].setValue(this.selectedItemState);
		this.branchDataForm.controls['region_Id'].setValue(this.selectedItemForRegion);
		this.branchDataForm.controls['isActive'].setValue(this.branch.isActive);
		this.branchDataForm.controls['isMain'].setValue(this.branch.isMain);
		this.branchDataForm.controls['email'].setValue(this.branch.email);

	}


	// initialize Form With Validations
	initForm() {

		if (this.data.branchId != 0) {

			this.service.getBranchDataById(this.data.branchId).subscribe(
				(data: IBranchUpsert) => {
					this.branch = data;
					console.log(this.branch);
					this.fillDropDowns();
				}
			)
		}
		else {
			this.fillDropDowns();
		}

	}


	Submit(model: IBranchUpsert) {

		console.log(model);

		model.region_Id = model.region_Id[0].Id
		model.branchManager_Id = model.branchManager_Id[0].Id

		if (model.id == 0) {
			model.company_Id = this.data.companyId;
			this.service.PostBranchData(model).
				subscribe(
					(data: HttpReponseModel) => {

						if (data.isSuccess) {
							this.toaster.openSuccessSnackBar(data.message);
							console.log(data.message);
							this.service.bSubject.next(true);
						}
						else if (data.isExists) {
							this.toaster.openWarningSnackBar(data.message);
						}
					},
					(error: any) => {
						console.log(error);
						this.toaster.openWarningSnackBar(error);
					}
				);

		}

		else {
			this.service.UpdateBranchData(model).subscribe(
				(data: any) => {
					this.toaster.openSuccessSnackBar(data.message);
					this.service.bSubject.next(true);
				},
				(error: any) => {
					this.toaster.openWarningSnackBar(error);
				});

		}

	}



}