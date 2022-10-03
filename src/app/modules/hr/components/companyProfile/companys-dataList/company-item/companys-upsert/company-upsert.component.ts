import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HttpReponseModel } from "src/app/core-module/models/ResponseHttp";
import { dropdownSettings } from "src/app/core-module/UIServices/dropdownsetting";
import { toasterService } from "src/app/core-module/UIServices/toaster.service";
import { ICompany } from "src/app/modules/hr/models/ICompany";
import { CompanyService } from "src/app/modules/hr/services/company.service";
import { EmployeeService } from "src/app/modules/employees/services/employee.service";
import { IRegion } from "src/app/modules/share/models/IRegion.interface";
import { RegionService } from "src/app/modules/share/Services/region.service";
import { StatesService } from "src/app/modules/share/Services/state.service";
import { LookUpModel } from "src/app/shared-module/models/lookup";
import { ChangeDetectorRef } from '@angular/core';

@Component({
	selector: "company-upsert",
	templateUrl: './companys-upsert.component.html',
	styleUrls: ['./company-upsert.component.scss']
})

export class CompanyUpsertComponent implements OnInit {

	saveButtonClickedFlag = false;

	isEdit = false;
	company: ICompany;
	logoWebFile: File;
	logoPrintFile: File;
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

	panelOpenState: boolean = true;

	companyDataForm: FormGroup;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,private dialog:MatDialogRef<CompanyUpsertComponent>,
		private fb: FormBuilder,
		private toaster: toasterService,
		private service: CompanyService,
		private employeeService: EmployeeService,
		private rcd: ChangeDetectorRef
	) {

		//here get data of company and put data in the form

	}

	setDefaultForForm() {

		if (this.data.companyId != 0) {  //for edit
			this.isEdit = true;

			this.companyDataForm = this.fb.group({
				id: [0],
				companyCode: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
				companyName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
				activity: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
				address: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
				phoneNumber: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(11), Validators.pattern("^[0-9]*$")])],
				isActive: [false],

				mobileUsersCount: [0],
				logoPrint: [''],
				logoWeb: [''],
				email: [''],
				managerName: [''],
				managerPosition: [''],
				CompanyServiceName: [''],

			});
		}
		else {  // for add
			this.isEdit = false;
			this.companyDataForm = this.fb.group({
				id: [0],
				companyCode: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
				companyName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
				activity: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
				address: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
				phoneNumber: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(11), Validators.pattern("^[0-9]*$")])],
				isActive: [false,],
				mobileUsersCount: [0, Validators.compose([Validators.required, Validators.pattern("^[1-9][0-9]*$")])],
				logoPrint: ['', Validators.compose([Validators.required])],
				logoWeb: ['', Validators.compose([Validators.required])],
				email: ['', Validators.compose([Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")])],
				managerName: ['', Validators.compose([Validators.required])],
				managerPosition: ['', Validators.compose([Validators.required])],
				CompanyServiceName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
			});

		}

	}

	fillDropDowns() {
		// this.dropdownListDataForEmployee = this.employeeService.employees;
		if (this.isEdit) {
			// //get selected employee
			// this.employeeService.getLookupEmployeeData(this.company.id).subscribe(
			// 	(data: LookUpModel[]) => {
			// 		this.dropdownListDataForEmployee = data.map(item => ({ Id: item.Id, Name: item.Name }) as LookUpModel)
			// 	}
			// );
			setTimeout(() => { this.passingCompanyToFormData(); }, 1000);
		}
	}

	ngOnInit() {
		this.setDefaultForForm();

		this.initForm();
	}

	passingCompanyToFormData() {
		this.companyDataForm.controls['id'].setValue(this.company.id);
		this.companyDataForm.controls['companyCode'].setValue(this.company.code);
		this.companyDataForm.controls['companyCode'].disable();
		this.companyDataForm.controls['companyName'].setValue(this.company.companyName);
		this.companyDataForm.controls['activity'].setValue(this.company.activity);
		this.companyDataForm.controls['address'].setValue(this.company.address);
		this.companyDataForm.controls['mobileUsersCount'].setValue(this.company.mobileUsersCount);
		this.companyDataForm.controls['mobileUsersCount'].disable();
		this.companyDataForm.controls['CompanyServiceName'].setValue(this.company.companyServiceName);
		this.companyDataForm.controls['CompanyServiceName'].disable();

		this.companyDataForm.controls['isActive'].setValue(this.company.isActive);

		this.companyDataForm.controls['phoneNumber'].setValue(this.company.phoneNumber);
		this.companyDataForm.controls['email'].setValue(this.company.email);
	}

	// initialize Form With Validations
	initForm() {

		this.company = {
			id: 0,
			code: '',
			companyName: '',
			activity: '',
			address: '',
			mobileUsersCount: 0,
			isActive: false,
			logoPrint: '',
			companyServiceName: '',
			logoWeb: '',
			phoneNumber: '0',
			email: '',
			managerName: '',
			managerPosition: '',
		};

		if (this.isEdit) {
			this.service.getCompanyDataById(this.data.companyId).subscribe(
				(data: ICompany) => {
					this.company = data;
					this.isEdit = true;
					this.fillDropDowns();
				}
			)
		} else {
			this.fillDropDowns();
		}
	}

	logoPrintChange(event: any) {
		this.logoPrintFile = <File>event.target.files[0];
	}

	logoWebChange(event: any) {
		this.logoWebFile = <File>event.target.files[0];
	}


	mapFormGroupsToModel(companyDataForm: any): ICompany {

		let model: any = {};

		model.id = companyDataForm.id;
		model.code = companyDataForm.code;
		model.companyName = companyDataForm.companyName;
		model.activity = companyDataForm.activity;
		model.address = companyDataForm.address;
		model.mobileUsersCount = companyDataForm.mobileUsersCount;
		model.isActive = companyDataForm.isActive;
		model.companyServiceName = companyDataForm.CompanyServiceName;
		model.phoneNumber = companyDataForm.phoneNumber;
		model.email = companyDataForm.email;
		model.managerName = companyDataForm.managerName;
		model.managerPosition = companyDataForm.managerPosition;

		return model;
	}


	Submit(companyDataForm: any) {
		console.log(companyDataForm, 'hhhhh')
		if (this.companyDataForm.valid) {

			let model: ICompany = this.mapFormGroupsToModel(companyDataForm);

			this.isEditable = true;

			if (companyDataForm.id == 0) {
				console.log(model)
				const fd = new FormData();

				fd.append('Id', model.id.toString());
				fd.append('CompanyCode', model.code);
				fd.append('CompanyName', model.companyName);
				fd.append('Activity', model.activity);
				fd.append('Address', model.address);
				fd.append('PhoneNumber', model.phoneNumber);
				fd.append('LogoPrintPhoto', this.logoPrintFile, this.logoPrintFile.name);
				fd.append('LogoWebPhoto', this.logoWebFile, this.logoWebFile.name);
				fd.append('IsActive', model.isActive.toString());
				fd.append('MobileUsersCount', model.mobileUsersCount.toString());
				fd.append('ManagerName', model.managerName);
				fd.append('Job', model.managerPosition);
				fd.append('CompanyServiceName', model.companyServiceName);
				fd.append('Is_SuperAdmin', 'false');
				fd.append('RoleName', 'admin');

				this.service.PostCompanyData(fd).subscribe((data: HttpReponseModel) => {
					if (data.isSuccess) {
						this.toaster.openSuccessSnackBar(data.message);
						this.dialog.close();
						this.service.bSubject.next(true);
					}
					else if (data.isExists) {
						this.toaster.openWarningSnackBar(data.message);
					}
				},
					(error: any) => {
						console.log(error);
						this.toaster.openWarningSnackBar(error.toString().replace("Error:", ""));
					}
				);

			} else {
				model.CompanyCode = this.company.code;
				this.service.UpdateCompanyData(model).subscribe(
					(data: any) => {
						this.toaster.openSuccessSnackBar(data.message);
						this.dialog.close();
						this.service.bSubject.next(true);
					},
					(error: any) => {
						this.toaster.openWarningSnackBar(error.toString().replace("Error:", ""));
					});
			}

		}

	}



}