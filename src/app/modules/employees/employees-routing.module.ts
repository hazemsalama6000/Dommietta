import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { EmployeesComponent } from './employees.component';
import { Employee_listComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  { path: 'employeelist', component: Employee_listComponent },
  {
    path: '',
    component: EmployeesComponent,
    children: [
      { path: 'overview', component: OverviewComponent, },
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: '**', redirectTo: 'overview', pathMatch: 'full' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
