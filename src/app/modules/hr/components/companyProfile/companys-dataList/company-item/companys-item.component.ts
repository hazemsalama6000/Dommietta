import { Component, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ICompanyDisplayData } from "src/app/modules/hr/models/ICompanyDisplayData";
import { CompanyUpsertComponent } from "./companys-upsert/company-upsert.component";
@Component({
	selector: "company-item",
	templateUrl: './companys-item.component.html',
	styleUrls: ['./companys-item.component.scss']
})

export class CompanyItemComponent {

	@Input() company: ICompanyDisplayData;

	panelOpenState: boolean = false;

	constructor(private dialog: MatDialog) { }

	ngOnInit() { }

	openDialog(companyId: number) {

		const dialogRef = this.dialog.open(CompanyUpsertComponent,
			{
				height: '100%',
				width: '90%',
				data: { companyId: companyId }
			});

		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
		});

	}



}