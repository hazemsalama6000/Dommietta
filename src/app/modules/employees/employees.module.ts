import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { SettingComponent } from './setting/setting.component';
import { OverviewComponent } from './overview/overview.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { EditemployeeComponent } from './editemployee/editemployee.component';

@NgModule({
  declarations: [
    EmployeesComponent,
    SettingComponent,
    OverviewComponent,
    EditemployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    InlineSVGModule,
    NgApexchartsModule,
  ],
 
})
export class EmployeesModule { }
