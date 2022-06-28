import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LookupIdNameComponent } from 'src/app/shared-module/Components/lookupId_name/lookupId_name.component';
import { BranchComponent } from './components/branches/branch.component';
import { CompanyComponent } from './components/companyProfile/company.component';
import { Employee_listComponent } from './components/employee-list/employee-list.component';

const routes: Routes = [
	{path:'jobs' , component:LookupIdNameComponent},
	{path:'company',component:CompanyComponent },
  {path:'employeelist',component:Employee_listComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }
