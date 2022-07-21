import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AreaService } from "src/app/core-module/LookupsServices/area.service";
import { BlockService } from "src/app/core-module/LookupsServices/block.service";
import { BranchService } from "src/app/core-module/LookupsServices/branch.service";
import { UpdateTypeService } from "src/app/core-module/LookupsServices/updateType.service";
import { toasterService } from "src/app/core-module/UIServices/toaster.service";
import { EmployeeService } from "src/app/modules/employees/services/employee.service";
import { LookUpModel } from "src/app/shared-module/models/lookup";
import { ICustomerEditManageSearch } from "../../models/cutomer-editmanage/ICustomerEditManageSearch.interface";


@Component({
	selector: 'customer-update-manage',
	templateUrl: './customer-update-manage.component.html',
	styleUrls: ['./customer-update-manage.component.scss']
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
		private service: EmployeeService,
		private blockService: BlockService,
		private areaService: AreaService,
		private branchService: BranchService,
		private updateTypeService: UpdateTypeService,
		private toaster: toasterService) {
	}

	ngOnInit(): void {
		this.branchService.getLookupBranchData(1005).subscribe((data: LookUpModel[]) => {
			this.dropdownBranchData = data;
		});
		this.updateTypeService.getLookupUpdateTypeData(1005).subscribe((data: LookUpModel[]) => {
			this.dropdownUpdateTypeData = data;
		});
	}

	searchCustomerEdits(model:ICustomerEditManageSearch){

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
		this.service.getLookupEmployeeDataForCustomerEditMange(this.searchModel)
			.subscribe(
				(data: LookUpModel[]) => {
					this.dropdownEmployeeData = data;
				}
			);

		this.service.getLookupEmployeeDataForCustomerEditMange(this.searchModel)
			.subscribe(
				(data: LookUpModel[]) => {
					this.dropdownCustomerData = data;
				}
			);

	}

	employeeSelectListOnChange(selectedItem: LookUpModel) {

	}


}