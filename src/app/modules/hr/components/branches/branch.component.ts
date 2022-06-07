import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LookUpModel } from "src/app/shared-module/models/lookup";

@Component({
	selector: "branchs-c",
	templateUrl: './branch.component.html',
	styleUrls: ['./branch.component.scss']
})

export class BranchComponent {

	title: string;
	icon: string;
	model: LookUpModel;

	@Input() companyId : number;


}