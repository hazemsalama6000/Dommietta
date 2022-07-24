import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import * as FileSaver from 'file-saver';
import { Subscription } from 'rxjs';
import { AreaService } from 'src/app/core-module/LookupsServices/area.service';
import { BlockService } from 'src/app/core-module/LookupsServices/block.service';
import { BranchService } from 'src/app/core-module/LookupsServices/branch.service';
import { HttpReponseModel } from 'src/app/core-module/models/ResponseHttp';
import { toasterService } from 'src/app/core-module/UIServices/toaster.service';
import { AuthService } from 'src/app/modules/auth';
import { IUserData } from 'src/app/modules/auth/models/IUserData.interface';
import { EmployeeService } from 'src/app/modules/employees/services/employee.service';
import { LookUpModel } from 'src/app/shared-module/models/lookup';
import { IComplain } from '../../models/IComplain.interface';
import { IComplainSearch } from '../../models/IComplainSearch.interface';
import { ComplainService } from '../../services/complain.service';
import { ViewimagesComponent } from './viewimages/viewimages.component';

@Component({
  selector: 'app-complain-list',
  templateUrl: './complain-list.component.html',
  styleUrls: ['./complain-list.component.scss']
})
export class ComplainListComponent implements OnInit {
  btnIsPost: boolean = false;
  btnIsRevise: boolean = false;

  branchDropdown: LookUpModel[];
  areaDropdown: LookUpModel[];
  blockDropdown: LookUpModel[];
  customerDropdown: LookUpModel[];
  collectorDropdown: LookUpModel[];

  complainData: IComplain[] = [];
  searchObject: IComplainSearch;
  totalRecords: number;

  userData: IUserData;
  loading: boolean = true;
  private unsubscribe: Subscription[] = [];

  constructor(
    private complainService: ComplainService,
    private branchService: BranchService,
    private areaService: AreaService,
    private blockService: BlockService,
    private employeeService: EmployeeService,
    private authService: AuthService,
    private toaster: toasterService,
    private datePipe: DatePipe,
    public dialog: MatDialog
  ) {

    this.searchObject = {
      pageNumber: 1,
      pageSize: 10,
    };

  }

  ngOnInit() {
    const data = this.authService.userData.subscribe(res => {
      this.userData = res;
      this.fillDropdowns();
      this.getComplainData();
    });
    this.unsubscribe.push(data);
  }

  // Change pagination page
  changePage(e: any) {
    this.searchObject.pageSize = e.rows;
    this.searchObject.pageNumber = e.page + 1;
    this.getComplainData();
  }

  //this function to create search object and reload data in table
  myfilter(columnname: string) {
    console.log(this.searchObject)
    switch (columnname) {
      case "branch":
        this.areaService.getLookupAreaData(this.searchObject.branchId ?? 0).subscribe(
          (data: LookUpModel[]) => { this.areaDropdown = data; });
        break;
      case "area":
        this.blockService.getLookupBlockData(this.searchObject.areaId ?? 0).subscribe(
          (data: LookUpModel[]) => { this.blockDropdown = data; });
        this.complainService.getLookupCustomerData({ areaId: this.searchObject.areaId })
          .subscribe((data: LookUpModel[]) => { this.customerDropdown = data; });
        break;
      case "block":
        this.complainService.getLookupCustomerData({ areaId: this.searchObject.areaId, blockId: this.searchObject.blockId })
          .subscribe((data: LookUpModel[]) => { this.customerDropdown = data; });
        break;
      default:
        break;
    }

    columnname != 'branch' ? this.getComplainData() : null;
  }

  //this function to fill dropdowns data
  fillDropdowns() {
    this.branchService.getLookupBranchData(1005).subscribe((data: LookUpModel[]) => { this.branchDropdown = data; });
    this.employeeService.getLookupEmployeeData(this.userData.companyId).subscribe((res: LookUpModel[]) => this.collectorDropdown = res);
  }

  //this function to get data from employee 
  getComplainData() {
    this.loading = true;
    this.complainService.getReadingsData(this.searchObject).subscribe(
      (res: IComplain[]) => {
        this.complainData = res;
        //this.totalRecords = res.pageSize;
      },
      (err: any) => { console.log(err); this.loading = false },
      () => { this.loading = false });
  }

  setAllIsPostOrIsRevise(type: string) {
    console.log(this.complainData)
    if (type == 'revise') {
      for (let index = 0; index < this.complainData.length; index++) {
        this.complainData[index].IsRevised = this.btnIsRevise;
      }
    }
  }

  postAllDataToChecked() {
    this.postReviseOrPost(this.complainData);
  }

  ActivePostOrRevise(complain: IComplain) {
    this.postReviseOrPost([complain])
  }

  postReviseOrPost(complain: IComplain[]) {
    this.complainService.PostIsreviseOrIsPost(complain).
      subscribe(
        (data: HttpReponseModel) => {
          if (data.isSuccess) {
            this.toaster.openSuccessSnackBar(data.message);
          }
          else if (data.isExists)
            this.toaster.openWarningSnackBar(data.message);
        },
        (error: any) => {
          console.log(error);
          this.toaster.openWarningSnackBar(error.toString().replace("Error:", ""));
        }
      )
  }


  exportExcel() {
    let selectedColumns: string[] = [
      'Id',
      'Date',
      'CollectorName',
      'CustomerName',
      'BranchName',
      'AreaName',
      'BlockName',
      'IssueName',
      'X',
      'Y',
      'Details',
      'IsRevised',
      'ComplaintTypeName'];
    let complainFiltered: any[] = [];
    this.complainData.map((x: any) => {
      let obj: any = {};

      for (let index = 0; index < selectedColumns.length; index++) {
        if (selectedColumns[index].includes('Date')) {
          obj[selectedColumns[index]] = this.datePipe.transform(x[selectedColumns[index]], 'dd/MM/yyyy');
        } else {
          obj[selectedColumns[index]] = x[selectedColumns[index]];
        }
      }

      complainFiltered.push(obj)
    })

    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(complainFiltered);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "complain");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + this.datePipe.transform(new Date(), 'MM/dd/yyyy') + EXCEL_EXTENSION);
  }
  // End Export Functions

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe);
  }

  openDialog(complain:IComplain){
    // const dialogPosition: DialogPosition = {
		// 	top: '0px',
		// 	right: '0px'
		// };

		const dialogRef = this.dialog.open(ViewimagesComponent,
			{
				/*maxWidth: '50vw',
				maxHeight: '100vh',*/
				maxHeight: '100vh',
				height: '50%',
        width:'50%',

				//panelClass: 'full-screen-modal',*/
				// position: dialogPosition,
				data: { complain:complain}
			});
  }

}
