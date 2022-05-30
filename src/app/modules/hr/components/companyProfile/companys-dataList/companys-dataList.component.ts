import { Component } from "@angular/core";
import { ICompanyDisplayData } from "../../../models/ICompanyDisplayData";
import { CompanyService } from "../../../services/company.service";
@Component({
	selector: "company-DataList",
	templateUrl: './companys-dataList.component.html',
	styleUrls: ['./companys-dataList.component.scss']
})

export class CompanysDataListComponent {
	companys: Array<ICompanyDisplayData> = [];

	constructor(private companyService: CompanyService) { }

	ngOnInit() {

		this.companyService.getCompanyData().subscribe(
			(data: Array<ICompanyDisplayData>) => {
				this.companys = data;
				console.log(this.companys);
			}
		);

	}


	


}