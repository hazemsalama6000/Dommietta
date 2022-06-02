import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { environment } from "src/environments/environment";
import { ICompanyDisplayData } from "../../../models/ICompanyDisplayData";
import { CompanyService } from "../../../services/company.service";
import { CompanyUpsertComponent } from "./company-item/companys-upsert/company-upsert.component";
@Component({
	selector: "company-DataList",
	templateUrl: './companys-dataList.component.html',
	styleUrls: ['./companys-dataList.component.scss']
})

export class CompanysDataListComponent {
	companys: Array<ICompanyDisplayData> = [];

	constructor(private companyService: CompanyService, private dialog: MatDialog) { }


	openDialog() {

		const dialogRef = this.dialog.open(CompanyUpsertComponent,
			{
				maxWidth: '100vw',
				maxHeight: '100vh',
				height: '100%',
				width: '100%',
				panelClass: 'full-screen-modal',

				data: { companyId: 0 }
			});

		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
		});

	}

	ngOnInit() {

		this.companyService.bSubject.subscribe(data => {

			this.companyService.getCompanyData().subscribe(
				(data: Array<ICompanyDisplayData>) => {
					this.companys = data.map(item => ({
						...item, logoWeb: `${localStorage.getItem('companyLink')}${item.logoWeb}`
						, logoPrint: `${localStorage.getItem('companyLink')}${item.logoPrint}`
					}) as ICompanyDisplayData);
				}
			);

		});
	}





}