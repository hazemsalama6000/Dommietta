import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { EmployeeService } from "src/app/modules/hr/services/employee.service";
import { LookUpModel } from "src/app/shared-module/models/lookup";
import { IOnlineUsers } from "../../../models/IOnlineUsers.interface";
import { IOnlineUsersCountPerCompany } from "../../../models/IOnlineUsersCountPerCompany.interface";
import { IOnlineUsersSearch } from '../../../models/IOnlineUsersSearch.interface'
import { IUserLogsSearchBox } from "../../../models/IUserLogsSearchBox.interface";
import { OnlineUsersService } from "../../../services/onlineUsers.service";
@Component({
	selector: "search-user-logs",
	templateUrl: './search-user-logs.component.html',
	styleUrls: ['./search-user-logs.component.scss']
})

export class SearchUserLogsComponent implements OnInit {

	SearchUsersConnectionLogsForm: FormGroup;
	dropUsersData: LookUpModel[] = []

	constructor(private fb: FormBuilder, private service: OnlineUsersService, private employeeService: EmployeeService) { }

	ngOnInit(): void {

		this.service.clickSearch$.subscribe((data: boolean) => {
			if (data) {
				document.getElementById('search')?.click();
			}
		});

		this.SearchUsersConnectionLogsForm = this.fb.group({
			empId: [''],
			startDate: [''],
			endDate:['']
		});

		this.employeeService.getLookupEmployeeData(1032).subscribe(
			(data: LookUpModel[]) => {
				this.dropUsersData = data;
			}
		);

		//this.searchOnlineUsers({companyId:undefined , userStates:true});

	}

	searchOnlineUsers(OnlineUsersModel: IUserLogsSearchBox) {

	/*	this.service.getOnlineUsersData(OnlineUsersModel.userStates, OnlineUsersModel.companyId)
			.subscribe((data: IOnlineUsers[]) => {
				this.service.bSubject.next(data);
			});

		this.service.OnlineUserCountForEachCompany(OnlineUsersModel.companyId).subscribe((data : IOnlineUsersCountPerCompany[]) => {
			this.onlineUsersGrouped = data;
		});
*/
	}



}