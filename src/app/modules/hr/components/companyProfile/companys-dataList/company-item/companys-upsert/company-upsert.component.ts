import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { dropdownSettings } from "src/app/core-module/UIServices/dropdownsetting";
import { toasterService } from "src/app/core-module/UIServices/toaster.service";
import { ICompany } from "src/app/modules/hr/models/ICompany";

@Component({
	selector: "company-upsert",
	templateUrl: './companys-upsert.component.html',
	styleUrls: ['./company-upsert.component.scss']
})

export class CompanyUpsertComponent implements OnInit{

	dropdownListDataForState :any= [];
	selectedItemState:any = [];
  
	dropdownListDataForRegion :any= [];
	selectedItemForRegion:any = [];
  
	dropdownListDataForResponsible :any= [];
	selectedItemForResponsible:any = [];
  
	dropdownSettings = dropdownSettings;
  
	panelOpenState:boolean=true;
	
	companyForm:FormGroup;
	
	constructor(@Inject(MAT_DIALOG_DATA) public data: any , private fb : FormBuilder, private toaster: toasterService) {
	
		//here get data of company and put data in  the form
		if(data.companyId){
			console.log(data);
		}

	}

  ngOnInit() {

	this.initForm();


    this.dropdownListDataForState = [
      { id: 1, name: 'Mumbai' },
      { id: 2, name: 'Bangaluru' },
      { id: 3, name: 'Pune' },
      { id: 4, name: 'Navsari' },
      { id: 5, name: 'New Delhi' }
    ];

    this.selectedItemState = [
      { id: 3, name: 'Pune' },
    ];


	this.dropdownListDataForRegion = [
		{ id: 1, name: 'Mumbai' },
		{ id: 2, name: 'Bangaluru' },
		{ id: 3, name: 'Pune' },
		{ id: 4, name: 'Navsari' },
		{ id: 5, name: 'New Delhi' }
	  ];
  
	  this.selectedItemForRegion = [
		{ id: 3, name: 'Pune' },
	  ];
  

  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

// initialize Form With Validations
	initForm() {

		this.companyForm = this.fb.group({
			id: [''],
			code: ['', Validators.compose([Validators.required])] ,
			companyName: ['' , Validators.compose([Validators.required])],
			activity : ['',Validators.compose([Validators.required])] ,
			address : ['',Validators.compose([Validators.required])] ,
			phoneNumber : ['',Validators.compose([Validators.required])] ,
			commercialRecord : ['',Validators.compose([Validators.required])] ,
			taxCardNo : ['',Validators.compose([Validators.required])] ,
			//taxFileNo : ['',Validators.compose([Validators.required])] ,
		//	vatTaxNum : ['',Validators.compose([Validators.required])] ,
			vatTax : ['',] ,
			isValTaxActive	 : ['',] ,
			hasDirectTransferForStocks : ['',] ,
			wTax : ['',] ,
			isWTaxActive : ['',] ,
			email : ['',] ,
			isActive : ['',] ,
			mobileUserNumber : ['',Validators.compose([Validators.required])] ,
			region_Id : ['',Validators.compose([Validators.required])] ,
			managerName : ['',Validators.compose([Validators.required])] ,
			managerPosition : ['',Validators.compose([Validators.required])] 
		});
	}


	closeEdit() {
		this.companyForm.setValue({ Id: 0, Name: '' });
	}
	

// for Insert And Delete distingush them with model.id

	Submit(model: ICompany) {

console.log(model);
		/*
		model.company_Id = 1;

		if (model.Id == 0) {

			this.service.PostLookupData(model).
				subscribe(
					(data: HttpReponseModel) => {

						if(data.isSuccess){
							this.toaster.openSuccessSnackBar(data.message);
						// TODO	this.service.bSubject.next(true);	
						}
						else if(data.isExists){
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
					this.service.bSubject.next(true);
				},
				(error: any) => {
					this.toaster.openWarningSnackBar(error);
				});

		}
*/
	}



}