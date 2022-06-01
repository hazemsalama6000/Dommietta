import { Component } from "@angular/core";
import { environment } from "src/environments/environment";
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

		this.companyService.bSubject.subscribe(data => {

			this.companyService.getCompanyData().subscribe(
				(data: Array<ICompanyDisplayData>) => {
					this.companys = data.map(item => ({ ...item, logoWeb: `${localStorage.getItem('companyLink')}${item.logoWeb}` }) as ICompanyDisplayData);
					console.log(this.companys);
				}
			);

		});
	}





}