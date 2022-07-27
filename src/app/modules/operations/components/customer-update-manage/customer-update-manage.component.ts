import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AreaService } from "src/app/core-module/LookupsServices/area.service";
import { BlockService } from "src/app/core-module/LookupsServices/block.service";
import { BranchService } from "src/app/core-module/LookupsServices/branch.service";
import { UpdateTypeService } from "src/app/core-module/LookupsServices/updateType.service";
import { toasterService } from "src/app/core-module/UIServices/toaster.service";
import { AuthService } from "src/app/modules/auth";
import { IUserData } from "src/app/modules/auth/models/IUserData.interface";
import { CutomerService } from "src/app/modules/customers/services/customer.service";
import { ISearch } from "src/app/modules/employees/models/ISearch.interface";
import { EmployeeService } from "src/app/modules/employees/services/employee.service";
import { LookUpModel } from "src/app/shared-module/models/lookup";
import { ICustomerEditManageSearch } from "../../models/cutomer-editmanage/ICustomerEditManageSearch.interface";
import { ICustomerEditResponse } from "../../models/cutomer-editmanage/ICustomerEditResponse.interface";
import { customerUpdateManageService } from "../../services/customer-update-manage.service";


@Component({
	selector: 'customer-update-manage',
	templateUrl: './customer-update-manage.component.html',
	styleUrls: ['./customer-update-manage.component.scss'],
})

export class CustomerUpdateManageComponent implements OnInit {
	dropdownEmployeeData: LookUpModel[] = [];
	dropdownCustomerData: LookUpModel[] = [];
	dropdownBranchData: LookUpModel[] = [];
	dropdownAreaData: LookUpModel[] = [];
	dropdownBlockData: LookUpModel[] = [];
	dropdownUpdateTypeData: LookUpModel[] = [];
	customerEditSearchForm: FormGroup;
	searchModel: ICustomerEditManageSearch = {} as ICustomerEditManageSearch;

	constructor(
		private customerEditManageService: customerUpdateManageService,
		private service: EmployeeService,
		private customerService: CutomerService,
		private blockService: BlockService,
		private areaService: AreaService,
		private branchService: BranchService,
		private updateTypeService: UpdateTypeService,
		private toaster: toasterService, private fb: FormBuilder,
		private auth: AuthService,private datePipe: DatePipe) {
	}

	ngOnInit(): void {
		this.customerEditSearchForm = this.fb.group({
			customerCode: [0],
			branchId: [],
			areaId: [],
			blockId: [],
			customerId: [],
			employee_id: [],
			updatingStartDate: [new Date().toISOString()],
			updatingEndDate: [new Date().toISOString()],
			updatingTypeId: [],
		});

		this.auth.userData.subscribe((data: IUserData) => {
			this.branchService.getLookupBranchData(data.companyId).subscribe((data: LookUpModel[]) => {
				this.dropdownBranchData = data;
			});
			
			this.updateTypeService.getLookupUpdateTypeData(data.companyId).subscribe((data: LookUpModel[]) => {
				this.dropdownUpdateTypeData = data;
			});
		});

	}

	searchCustomerEdits(model: ICustomerEditManageSearch) {
		model.updatingStartDate = this.datePipe.transform(model.updatingStartDate, 'MM/dd/yyyy')!;
		model.updatingEndDate = this.datePipe.transform(model.updatingEndDate, 'MM/dd/yyyy')!;
		console.log(model);
		this.customerEditManageService.searchCustomerUpdate(model).subscribe(
			(data: ICustomerEditResponse[]) => {
				this.customerEditManageService.searchUpdateUserManageAction.next(data);
			}
		);
	}

	branchSelectListOnChange(selectedItem: LookUpModel) {
		this.areaService.getLookupAreaData(selectedItem.Id)
			.subscribe(
				(data: LookUpModel[]) => {
					this.dropdownAreaData = data;
				}
			);
		this.searchModel.branchId = selectedItem.Id;
		this.searchEmployeeAndCustomer();
	}

	areaSelectListOnChange(selectedItem: LookUpModel) {
		this.blockService.getLookupBlockData(selectedItem.Id)
			.subscribe(
				(data: LookUpModel[]) => {
					this.dropdownBlockData = data;
				}
			);
		this.searchModel.areaId = selectedItem.Id;
		this.searchEmployeeAndCustomer();
	}


	blockSelectListOnChange(selectedItem: LookUpModel) {
		this.searchModel.blockId = selectedItem.Id;
		this.searchEmployeeAndCustomer();
	}

	searchEmployeeAndCustomer() {
		let search: ISearch = { branchId: this.searchModel.branchId, AreaId: this.searchModel.areaId, Block: this.searchModel.blockId };
		this.service.getLookupEmployeeDataByParam(search)
			.subscribe(
				(data: LookUpModel[]) => {
					this.dropdownEmployeeData = data;
				}
			);

		this.customerService.getLookupCustomerDataByParam(this.searchModel)
			.subscribe(
				(data: LookUpModel[]) => {
					this.dropdownCustomerData = data;
				}
			);
	}

	employeeSelectListOnChange(selectedItem: LookUpModel) {
		this.searchCustomerByEmployee(selectedItem.Id);
	}

	searchCustomerByEmployee(employeeId: number) {
		this.customerService.getLookupCutomerDataByEmployee(employeeId)
			.subscribe(
				(data: LookUpModel[]) => {
					this.dropdownCustomerData = data;
				}
			);
	}



}