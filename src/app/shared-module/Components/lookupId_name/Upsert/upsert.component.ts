import { Component, Input } from "@angular/core";
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
	@Input() set Editmodel(value: any) {
		if (value) {
			this.UpsertForm.setValue(value);
			this.toggleAddEditButton=false;
		}
	}

	constructor(private fb: FormBuilder, private toaster: toasterService) { }

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
	}

//for Insert And Delete
// TODO Save Data here
	Submit(model: LookUpModel) {
		this.toaster.openSuccessSnackBar("close me");
		console.log(model);
	}


}