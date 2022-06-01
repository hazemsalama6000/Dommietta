import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HttpReponseModel } from "src/app/core-module/models/ResponseHttp";
import { dropdownSettings } from "src/app/core-module/UIServices/dropdownsetting";
import { toasterService } from "src/app/core-module/UIServices/toaster.service";
import { ICompany } from "src/app/modules/hr/models/ICompany";
import { CompanyService } from "src/app/modules/hr/services/company.service";
import { IRegion } from "src/app/modules/share/models/IRegion.interface";
import { RegionService } from "src/app/modules/share/Services/region.service";
import { StatesService } from "src/app/modules/share/Services/state.service";
import { LookUpModel } from "src/app/shared-module/models/lookup";

@Component({
	selector: "company-upsert",
	templateUrl: './companys-upsert.component.html',
	styleUrls: ['./company-upsert.component.scss']
})

export class CompanyUpsertComponent implements OnInit {

	logoWebFile: File;
	logoPrintFile: File;

	isEditable: boolean = false;
	dropdownListDataForState: any = [];
	selectedItemState: any = [];

	dropdownListDataForRegion: any = [];
	selectedItemForRegion: any = [];

	dropdownListDataForResponsible: any = [];
	selectedItemForResponsible: any = [];

	dropdownSettings = dropdownSettings;

	panelOpenState: boolean = true;

	companyDataForm: FormGroup;
	companyConnectionForm: FormGroup;
	companyTaxForm: FormGroup;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private fb: FormBuilder,
		private toaster: toasterService,
		private stateService: StatesService,
		private regionService: RegionService,
		private service: CompanyService
	) {

		//here get data of company and put data in  the form
		if (data.companyId) {
			console.log(data);
		}

	}

	ngOnInit() {

		this.initForm();

		this.stateService.getLookupData().subscribe(
			(data: LookUpModel[]) => {
				this.dropdownListDataForState = data;
			}
		);

		this.selectedItemState = [
			{ id: 3, name: 'Pune' },
		];


		this.dropdownListDataForRegion = [];

		this.selectedItemForRegion = [
			{ id: 3, name: 'Pune' },
		];


	}

	onItemSelectState(item: any) {

		this.regionService.getLookupData(item.Id).subscribe(
			(data: IRegion[]) => {
				this.dropdownListDataForRegion = data.map(item => ({ Id: item.id, Name: item.name }) as LookUpModel)
			}
		);

	}

	onSelectAll(items: any) {
		console.log(items);
	}

	// initialize Form With Validations
	initForm() {

		this.companyDataForm = this.fb.group({
			id: [0],
			code: ['', Validators.compose([Validators.required])],
			companyName: ['', Validators.compose([Validators.required])],
			activity: ['', Validators.compose([Validators.required])],
			address: ['', Validators.compose([Validators.required])],
			mobileUserNumber: ['', Validators.compose([Validators.required])],
			region_Id: ['', Validators.compose([Validators.required])],
			isActive: [false,],
			logoPrint: ['', Validators.compose([Validators.required])],
			logoWeb: ['', Validators.compose([Validators.required])],
		});

		this.companyConnectionForm = this.fb.group({
			phoneNumber: ['', Validators.compose([Validators.required])],
			email: ['',],
			managerName: ['', Validators.compose([Validators.required])],
			managerPosition: ['', Validators.compose([Validators.required])],
		});

		this.companyTaxForm = this.fb.group({
			commercialRecord: ['', Validators.compose([Validators.required])],
			taxCardNo: ['', Validators.compose([Validators.required])],
			vatTax: [0,],
			isValTaxActive: [false,],
			hasDirectTransferForStocks: [false,],
			wTax: [0,],
			isWTaxActive: [false,],
		});

	}

	logoPrintChange(event: any) {
		this.logoPrintFile = <File>event.target.files[0];
	}

	logoWebChange(event: any) {
		this.logoWebFile = <File>event.target.files[0];
	}
	/*closeEdit() {
		this.companyForm.setValue({ Id: 0, Name: '' });
	}*/


	// for Insert And Delete distingush them with model.id

	mapFormGroupsToModel(companyTaxForm: any, companyConnectionForm: any, companyDataForm: any): ICompany {

		let model: any = {};

		model.id = companyDataForm.id;
		model.code = companyDataForm.code;
		model.companyName = companyDataForm.companyName;
		model.activity = companyDataForm.activity;
		model.address = companyDataForm.address;
		model.mobileUserNumber = companyDataForm.mobileUserNumber;
		model.region_Id = companyDataForm.region_Id[0].Id;
		model.isActive = companyDataForm.isActive;

		model.phoneNumber = companyConnectionForm.phoneNumber;
		model.email = companyConnectionForm.email;
		model.managerName = companyConnectionForm.managerName;
		model.managerPosition = companyConnectionForm.managerPosition;

		model.commercialRecord = companyTaxForm.commercialRecord;
		model.taxCardNo = companyTaxForm.taxCardNo;
		model.wTax = companyTaxForm.wTax;
		model.vatTax = companyTaxForm.vatTax;
		model.isValTaxActive = companyTaxForm.isValTaxActive;
		model.isWTaxActive = companyTaxForm.isWTaxActive;
		model.hasDirectTransferForStocks = companyTaxForm.hasDirectTransferForStocks;

		return model;

	}


	Submit(companyTaxForm: any, companyConnectionForm: any, companyDataForm: any) {

		let model: ICompany = this.mapFormGroupsToModel(companyTaxForm, companyConnectionForm, companyDataForm);

		this.isEditable = true;

		console.log(model);

		if (model.id == 0) {

			const fd = new FormData();

			fd.append('logoPrintPhoto', this.logoPrintFile,this.logoPrintFile.name);
			fd.append('logoWebPhoto', this.logoWebFile,this.logoWebFile.name);

			fd.append('id',model.id.toString() );
			fd.append('code',model.code );
			fd.append('companyName',model.companyName );
			fd.append('activity',model.activity );
			fd.append('address',model.address );
			fd.append('mobileUserNumber',model.mobileUserNumber.toString() );
			fd.append('region_Id',model.region_Id.toString() );
			fd.append('isActive',model.isActive.toString() );
	
			fd.append('phoneNumber',model.phoneNumber );
			fd.append('email',model.email );
			fd.append('managerName',model.managerName );
			fd.append('managerPosition',model.managerPosition);
	
			fd.append('commercialRecord',model.commercialRecord );
			fd.append('taxCardNo',model.taxCardNo );
			fd.append('wTax',model.wTax.toString() );
			fd.append('vatTax',model.vatTax.toString() );
			fd.append('isValTaxActive',model.isValTaxActive.toString() );
			fd.append('isWTaxActive',model.isWTaxActive.toString() );
			fd.append('hasDirectTransferForStocks',model.hasDirectTransferForStocks.toString() );
	

			this.service.PostCompanyData(fd).
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
			this.service.UpdateCompanyData(model).subscribe(
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