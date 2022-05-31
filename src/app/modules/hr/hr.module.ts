import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrRoutingModule } from './hr-routing.module';
import { SharedModule } from 'src/app/shared-module/shared-module.module';
import { TranslationModule } from '../i18n';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CompanyComponent } from './components/companyProfile/company.component';
import { CompanysDataListComponent } from './components/companyProfile/companys-dataList/companys-dataList.component';
import { CompanyItemComponent } from './components/companyProfile/companys-dataList/company-item/companys-item.component';
import { CompanyUpsertComponent } from './components/companyProfile/companys-dataList/company-item/companys-upsert/company-upsert.component';


@NgModule({
  declarations: [
	  CompanyComponent,
	  CompanysDataListComponent,
	  CompanyItemComponent,
	  CompanyUpsertComponent
  ],
  imports: [
    CommonModule,
    HrRoutingModule,
	SharedModule,
    TranslationModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class HrModule { }
