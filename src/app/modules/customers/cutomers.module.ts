import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SettingComponent } from './setting/setting.component';
import { OverviewComponent } from './overview/overview.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/shared-module/shared-module.module';
import { TranslationModule } from '../i18n';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CutomersComponent } from './cutomers.component';
import { CustomerRoutingModule } from './cutomers-routing.module';

@NgModule({
  declarations: [
    SettingComponent,
    OverviewComponent,
	CutomersComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    InlineSVGModule,
    TranslationModule,
    NgApexchartsModule,
    SharedModule,
    TranslationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [DatePipe]

})
export class CustomerModule { }
