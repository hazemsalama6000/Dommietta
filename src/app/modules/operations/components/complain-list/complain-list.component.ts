import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth';
import { IUserData } from 'src/app/modules/auth/models/IUserData.interface';
import { IBranch } from 'src/app/modules/hr/models/IBranch';
import { BranchService } from 'src/app/modules/hr/services/branch.service';
import { IJobSub } from 'src/app/modules/share/models/IJob.interface';
import { ISection } from 'src/app/modules/share/models/ISection.interface';
import { DepartmentService } from 'src/app/modules/share/Services/department_section/department.service';
import { SectionService } from 'src/app/modules/share/Services/department_section/section.service';
import { JobService } from 'src/app/modules/share/Services/job.service';
import { LookUpModel } from 'src/app/shared-module/models/lookup';
import { IComplain } from '../../models/IComplain.interface';
import { IComplainSearch } from '../../models/IComplainSearch.interface';
import { IReading } from '../../models/IReading.interface';
import { IReadingSearch } from '../../models/IReadingSearch.interface';
import { ComplainService } from '../../services/complain.service';

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
    private authService: AuthService,
    private departmentService: DepartmentService,
    private sectionService: SectionService,
    private jobService: JobService,
    private datePipe: DatePipe
  ) {

    this.searchObject = {
      pageNumber: 1,
      pageSize: 10,
    };

  }

  ngOnInit() {
    // const data = this.authService.userData.subscribe(res => {
    // this.userData = res;
    //this.fillDropdowns();
    this.getReadingData();
    // });
    // this.unsubscribe.push(data);
  }

  // Change pagination page
  changePage(e: any) {
    this.searchObject.pageSize = e.rows;
    this.searchObject.pageNumber = e.page + 1;
    this.getReadingData();
  }

  //this function to create search object and reload data in table
  myfilter(columnname: string) {
    console.log(this.searchObject)
    // switch (columnname) {
    //   case "employee":
    //     this.searchObject.employeesIds = ids.map((a: any) => a.Id);
    //     break;
    //   case "branch":
    //     ids != null ? this.searchObject.branchesIds = [ids.id] : this.searchObject.branchesIds = [];
    //     break;
    //   case "department":
    //     if (ids != null) {
    //       this.searchObject.departmentsIds = [ids.Id];
    //       this.sectionService.getLookupData(ids.id).subscribe((res: ISection[]) =>
    //         this.sectionDropdown = res
    //       );
    //     } else this.searchObject.departmentsIds = [];
    //     break;
    //   case "section":
    //     if (ids != null) {
    //       this.searchObject.sectionsIds = [ids.id];
    //       this.jobService.getLookUpData(this.searchObject.sectionsIds[0]).subscribe((res: IJob) =>
    //         this.jobDropdown = res.jobs.filter(x => x.isSelected == true)
    //       );
    //     } else this.searchObject.sectionsIds = [];
    //     break;
    //   case "job":
    //     this.searchObject.jobsIds = ids.map((a: any) => a.Id);
    //     break;
    //   default:
    //     break;
    // }

    this.getReadingData();
  }

  //this function to fill dropdowns data
  fillDropdowns() {

    // this.branchService.getBranchData(this.userData.companyId).subscribe((data: IBranch[]) => this.branchDropdown = data);

    // this.departmentService.getLookupData(this.userData.companyId).subscribe((res: LookUpModel[]) => this.departmentDropdown = res);

  }

  //this function to get data from employee 
  getReadingData() {
    this.loading = false;
    let ispost = true;
    for (let index = 1; index < 10; index++) {
      ispost = !ispost;
      this.complainData.push({
        Id: index,
        Date: new Date(),
        CollectorName: 'CollectorName' + index,
        CustomerName: 'CustomerName' + index,
        BranchName: 'BranchName' + index,
        AreaName: 'AreaName' + index,
        BlockName: 'BlockName' + index,
        IssueName: 'IssueName' + index,
        X: 54645,
        Y: 36646,
        Details: 'Details' + index,
        IsRevised: ispost,
        ComplaintTypeName: 'ComplaintTypeName' + index,
        ComplaintImagesPath: ['r' + index, 's' + index],
      })
    }
    this.loading = false;
    // this.readingService.getReadingsData(this.searchObject).subscribe(
    //   (res:any) => {
    //     this.readingData = res.employeeRecords;
    //     this.totalRecords = res.pageSize;
    //   },
    //   (err:any) => { console.log(err); this.loading = false },
    //   () => { this.loading = false });
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
    //data.map((x:IReading)=>{delete x.lastPosted});
    console.log(this.complainData)
  }

  ActivePostOrRevise(read?: IReading) {
    console.log(read);
  }


  exportExcel() {
    // let employeeFiltered: any[] = [];
    // this.employees.map((x: any) => {
    //   let obj: any = {};
    //   for (let index = 0; index < this.selectedColumns.length; index++) {
    //     if (this.selectedColumns[index].propName.includes('Date')) {
    //       obj[this.selectedColumns[index].propName] = this.datePipe.transform(x[this.selectedColumns[index].propName], 'dd/MM/yyyy');
    //     } else {
    //       obj[this.selectedColumns[index].propName] = x[this.selectedColumns[index].propName];
    //     }
    //   }

    //   employeeFiltered.push(obj)
    // })

    // import("xlsx").then(xlsx => {
    //   const worksheet = xlsx.utils.json_to_sheet(employeeFiltered);
    //   const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    //   const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    //   this.saveAsExcelFile(excelBuffer, "Employees");
    // });
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


}