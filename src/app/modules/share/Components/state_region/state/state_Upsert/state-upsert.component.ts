import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { catchError, EMPTY, throwError } from "rxjs";
import { ErrorResponse } from "src/app/core-module/httpServices/ErrorResponse.service";
import { HttpReponseModel } from "src/app/core-module/models/ResponseHttp";
import { toasterService } from "src/app/core-module/UIServices/toaster.service";
import { StatesService } from "src/app/modules/share/Services/state.service";
import { LookUpModel } from "src/app/shared-module/models/lookup";
import { LookupService } from "src/app/shared-module/Services/Lookup.service";


interface ClientError {
	code: string;
	description: string;
}

@Component({
	selector: 'state-upsert',
	templateUrl: './state-upsert.component.html',
	styleUrls: ['./state-upsert.component.scss']
})

export class StateUpsertComponent {

	messageErrors: string;

	toggleAddEditButton: boolean;

	UpsertForm: FormGroup;

//setter for binded model to update
	@Input() set Editmodel(value: any) {
		if (value) {
			this.UpsertForm.setValue(value);
			this.toggleAddEditButton = false;
		}
	}

	constructor(private fb: FormBuilder, private toaster: toasterService, private service: StatesService) { }


	ngOnInit(): void {
		this.messageErrors = "";
		this.toggleAddEditButton = true;
		this.initForm();
		
	}

// initialize Form With Validations
	initForm() {
		this.UpsertForm = this.fb.group({
			Id: [''],
			Name: ['', Validators.compose([
				Validators.required
			])]
		});
	}


	closeEdit() {
		this.toggleAddEditButton = true;
		this.UpsertForm.setValue({ Id: 0, Name: '' });
	}


// for Insert And Delete distingush them with model.id

	Submit(model: LookUpModel) {

		model.company_Id = 1;

		if (model.Id == 0) {

			this.service.PostLookupData(model).
				subscribe(
					(data: HttpReponseModel) => {

						if(data.isSuccess){
							this.toaster.openSuccessSnackBar(data.message);
							this.service.bSubject.next(true);	
						}
						else if(data.isExists){
							this.toaster.openWarningSnackBar(data.message);
						}
						this.messageErrors="";
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

	}


}