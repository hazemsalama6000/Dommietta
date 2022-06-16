import { Component } from "@angular/core";
import { DialogPosition, MatDialog } from "@angular/material/dialog";
import { RegionService } from "src/app/modules/share/Services/region.service";
import { StatesService } from "src/app/modules/share/Services/state.service";
import { LookUpModel } from "src/app/shared-module/models/lookup";
import { ICompanyDisplayData } from "../../../models/ICompanyDisplayData";
import { CompanyService } from "../../../services/company.service";
import { EmployeeService } from "../../../services/employee.service";
@Component({
	selector: "onlineUsers-DataList",
	templateUrl: './onlineUsers-dataList.component.html',
	styleUrls: ['./onlineUsers-dataList.component.scss']
})

export class OnlineUsersDataListComponent {

	matDialogConfig:DialogPosition ;

	companys: Array<ICompanyDisplayData> = [];
	
	toolbarButtonMarginClass = 'ms-1 ms-lg-3';
	toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px';
	toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';
	toolbarButtonIconSizeClass = 'svg-icon-1';
	headerLeft: string = 'menu';
		
	constructor(private companyService: CompanyService, private dialog: MatDialog,private stateService:StatesService ,private employeeService:EmployeeService ,private regionService:RegionService) { }



	ngOnInit() {
		
		this.stateService.getLookupData().subscribe(
			(data: LookUpModel[]) => {
				this.stateService.states = data;
				
		console.log(this.stateService.states);
			}
		);


		this.companyService.bSubject.subscribe(data => {

			this.companyService.getCompanyData().subscribe(
				(data: Array<ICompanyDisplayData>) => {
					this.companys = data.map(item => ({
						...item, logoWeb: `${localStorage.getItem('companyLink')}${item.logoWeb}`
						, logoPrint: `${localStorage.getItem('companyLink')}${item.logoPrint}`
					}) as ICompanyDisplayData);
				
					console.log(this.companys);
				}
			);

		});
	}





}