import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/modules/auth';
import { IJob, IJobSub } from 'src/app/modules/share/models/IJob.interface';
import { ISection } from 'src/app/modules/share/models/ISection.interface';
import { DepartmentService } from 'src/app/modules/share/Services/department_section/department.service';
import { SectionService } from 'src/app/modules/share/Services/department_section/section.service';
import { JobService } from 'src/app/modules/share/Services/job.service';
import { LookUpModel } from 'src/app/shared-module/models/lookup';
import { IBranch } from '../../models/IBranch';
import { IEmployeeList } from '../../models/IEmployeeList.interface';
import { BranchService } from '../../services/branch.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class Employee_listComponent implements OnInit {

  employeeDropdown: LookUpModel[];
  branchDropdown: IBranch[];
  departmentDropdown: LookUpModel[];
  sectionDropdown: ISection[];
  jobDropdown: IJobSub[];

  searchObject: IEmployeeSearch;

  employees: IEmployeeList[];
  representatives: any[];
  statuses: any[];
  loading: boolean = true;

  companyId: number = 1005;

  constructor(
    private employeeService: EmployeeService,
    private branchService: BranchService,
    private authService: AuthService,
    private departmentService: DepartmentService,
    private sectionService: SectionService,
    private jobService: JobService
  ) {

    this.searchObject = {
      branchesIds: [],
      departmentsIds: [],
      employeesIds: [],
      jobsIds: [],
      sectionsIds: []
    };

  }


  ngOnInit() {
    this.fillDropdowns();
    this.getEmployeeData();
    this.loading = false;


    this.representatives = [
      { name: "Amy Elsner", image: "amyelsner.png" },
      { name: "Anna Fali", image: "annafali.png" },
      { name: "Asiya Javayant", image: "asiyajavayant.png" },
      { name: "Bernardo Dominic", image: "bernardodominic.png" },
      { name: "Elwin Sharvill", image: "elwinsharvill.png" },
      { name: "Ioni Bowcher", image: "ionibowcher.png" },
      { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
      { name: "Onyama Limba", image: "onyamalimba.png" },
      { name: "Stephen Shaw", image: "stephenshaw.png" },
      { name: "XuXue Feng", image: "xuxuefeng.png" }
    ];

    this.statuses = [
      { label: "Unqualified", value: "unqualified" },
      { label: "Qualified", value: "qualified" },
      { label: "New", value: "new" },
      { label: "Negotiation", value: "negotiation" },
      { label: "Renewal", value: "renewal" },
      { label: "Proposal", value: "proposal" }
    ];
  }

  myfilter(ids: any, columnname: string) {
    switch (columnname) {
      case "employee":
        this.searchObject.employeesIds = ids.map((a: any) => a.Id);
        break;
      case "branch":
        this.searchObject.branchesIds = ids.map((a: any) => a.id);
        break;
      case "department":
        this.searchObject.departmentsIds = ids.map((a: any) => a.Id);
        this.sectionService.getLookupData(this.searchObject.departmentsIds[0]).subscribe((res: ISection[]) =>
          this.sectionDropdown = res
        );
        break;
      case "section":
        this.searchObject.sectionsIds = ids.map((a: any) => a.Id);
        this.jobService.getLookUpData(this.searchObject.sectionsIds[0]).subscribe((res: IJob) =>
          this.jobDropdown = res.jobs.filter(x => x.isSelected == true)
        );
        break;
      case "job":
        this.searchObject.jobsIds = ids.map((a: any) => a.Id);
        break;
      default:
        break;
    }

    this.getEmployeeData();
    console.log(this.searchObject,columnname)
  }

  fillDropdowns() {

    this.employeeService.getLookupEmployeeData(this.companyId).subscribe((data: LookUpModel[]) => {
      this.employeeDropdown = data;
    });

    this.branchService.getBranchData(this.companyId).subscribe((data: IBranch[]) => this.branchDropdown = data);

    this.departmentService.getLookupData(this.companyId).subscribe((res: LookUpModel[]) => this.departmentDropdown = res);

  }



  getEmployeeData() {
    this.loading = true;
    this.employeeService.getEmployeesData(this.searchObject).subscribe(
      res => this.employees = res,
      err => console.log(err),
      () => { this.loading = false });
  }

}


export interface IEmployeeSearch {
  branchesIds: number[];
  employeesIds: number[];
  departmentsIds: number[];
  sectionsIds: number[];
  jobsIds: number[];
}



const domedata: IEmployeeList[] = [
  {
    id: 1,
    name: 'Hydrogen',
    mobile: "01236987455",
    branch: "xxx",
    department: "sds",
    section: "sdsaa",
    job: "erf",
    code: 1,
    address: 'H',
  },

];
