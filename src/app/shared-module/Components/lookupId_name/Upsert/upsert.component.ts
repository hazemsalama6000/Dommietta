import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { catchError, EMPTY, throwError } from "rxjs";
import { ErrorResponse } from "src/app/core-module/httpServices/ErrorResponse.service";
import { HttpReponseModel } from "src/app/core-module/models/ResponseHttp";
import { toasterService } from "src/app/core-module/UIServices/toaster.service";
import { LookUpModel } from "src/app/shared-module/models/lookup";
import { LookupService } from "src/app/shared-module/Services/Lookup.service";


interface ClientError {
	code: string;
	description: string;
}

@Component({
	selector: 'upsert',
	templateUrl: './upsert.component.html',
	styleUrls: ['./upsert.component.scss']
})

export class UpsertComponent {

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

	constructor(private fb: FormBuilder, private toaster: toasterService, private service: LookupService, private ErrorService: ErrorResponse) { }


	ngOnInit(): void {
		this.messageErrors = "";
		this.toggleAddEditButton = true;
		this.initForm();
		this.ErrorService.SubscribeToError().subscribe((data: any) => {
			if (data) {
				this.messageErrors = data;
			}
		});
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
						console.log(error);
					},
					() => 
					{
						console.log('complete');
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
					console.log(error);
				});

		}

	}


}