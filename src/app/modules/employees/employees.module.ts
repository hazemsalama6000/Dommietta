import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { SettingComponent } from './setting/setting.component';
import { OverviewComponent } from './overview/overview.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { EditemployeeComponent } from './editemployee/editemployee.component';
import { Employee_listComponent } from './employee-list/employee-list.component';
import { SharedModule } from 'src/app/shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslationModule } from '../i18n/translation.module';

@NgModule({
  declarations: [
    EmployeesComponent,
    SettingComponent,
    OverviewComponent,
    EditemployeeComponent,
    Employee_listComponent,
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    InlineSVGModule,
    TranslationModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers:[DatePipe]

})
export class EmployeesModule { }
