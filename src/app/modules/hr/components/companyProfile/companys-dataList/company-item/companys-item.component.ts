import { Component, Input } from "@angular/core";
import { ICompanyDisplayData } from "src/app/modules/hr/models/ICompanyDisplayData";
@Component({
	selector: "company-item",
	templateUrl: './companys-item.component.html',
	styleUrls: ['./companys-item.component.scss']
})

export class CompanyItemComponent {
	
	@Input() company : ICompanyDisplayData;

	panelOpenState: boolean = false;

	ngOnInit() {

	}

}