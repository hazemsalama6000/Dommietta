import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { toasterService } from "src/app/core-module/UIServices/toaster.service";
import { LookUpModel } from "src/app/shared-module/models/lookup";

@Component({
	selector: 'upsert',
	templateUrl: './upsert.component.html',
	styleUrls: ['./upsert.component.scss']
})

export class UpsertComponent {

	toggleAddEditButton: boolean;
	UpsertForm: FormGroup;

	constructor(private fb: FormBuilder ,private toaster : toasterService) {}

	ngOnInit(): void {
		this.toggleAddEditButton = true;
		this.initForm();
	}

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
		console.log(this.toggleAddEditButton);
	}

	Submit(model : LookUpModel)
	{
		this.toaster.openSuccessSnackBar("close me");
        console.log(model);
	}


}