import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { CutomersComponent } from './cutomers.component';

const routes: Routes = [
	{
		path: 'cutomerprofile',
		component: CutomersComponent,
		children: [
			{
				path: 'overview',
				component: OverviewComponent,
			},
			/*{
				path: 'technicianlog/:employeeId',
				component: technicianLogComponent
			},*/
		/*	{
				path: 'employeeblocks',
				component: EmployeeBlocksComponent
			},*/

			{ path: '', redirectTo: 'overview', pathMatch: 'full' },
			{ path: '**', redirectTo: 'overview', pathMatch: 'full' },
		],
	},

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CustomerRoutingModule { }
