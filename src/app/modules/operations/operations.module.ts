import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReadingListComponent } from './components/reading-list/reading-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { TranslationModule } from '../i18n';
import { OperationsRoutingModule } from './operations-routing.module';
import { SharedModule } from 'src/app/shared-module/shared-module.module';
import { ComplainListComponent } from './components/complain-list/complain-list.component';
import { CustomerUpdateManageComponent } from './components/customer-update-manage/customer-update-manage.component';
import { updateCustomerManageComponent } from './components/customer-update-manage/update-datatable/update-datatable.component';
import { UserLocationComponent } from './components/customer-update-manage/update-datatable/user-locations/user-location.component';

@NgModule({

  declarations: [
    ReadingListComponent,
    ComplainListComponent,
	CustomerUpdateManageComponent,
	updateCustomerManageComponent,
	UserLocationComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    TranslationModule,
    SharedModule,
    TranslationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OperationsRoutingModule,

  ],
  providers: [DatePipe]
})
export class OperationsModule { }
