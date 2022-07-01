import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { EmployeesComponent } from './employees.component';
import { technicianLogComponent } from './technician-log/technician-log.component';

const routes: Routes = [

	{
		path: '',
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
