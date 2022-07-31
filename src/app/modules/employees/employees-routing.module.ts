import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { EmployeesComponent } from './employees.component';
import { Employee_listComponent } from './employee-list/employee-list.component';
import { technicianLogComponent } from './technician-log/technician-log.component';
import { EmployeeBlocksComponent } from './employee-blocks/employee-blocks.component';
import { ComplainsComponent } from './complains/complains.component';
import { CustomerReadingComponent } from './customer-reading/customer-reading.component';
import { UpdateRequestComponent } from './updates-request/updates-request.component';

const routes: Routes = [
	{ path: 'employeelist', component: Employee_listComponent, pathMatch: 'full' },
	{
		path: 'employeeprofile',
		component: EmployeesComponent,
		children: [
			{
				path: 'overview',
				component: OverviewComponent,
			},
			{
				path: 'technicianlog/:employeeId',
				component: technicianLogComponent
			},
			{
				path: 'employeeblocks',
				component: EmployeeBlocksComponent
			},
			{
				path: 'customercomplains/:employeeId',
				component: ComplainsComponent
			},
			{
				path: 'customerReading/:employeeId',
				component: CustomerReadingComponent
			},
			{
				path: 'updateRequest/:employeeId',
				component: UpdateRequestComponent
			},

			{ path: '', redirectTo: 'overview', pathMatch: 'full' },
			{ path: '**', redirectTo: 'overview', pathMatch: 'full' },
		],
	},

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EmployeesRoutingModule { }
