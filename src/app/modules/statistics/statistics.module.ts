import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { StatisticsComponent } from './statistics.component';
import { StatisticRoutingModule } from './statistic-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslationModule } from '../i18n/translation.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SharedModule } from 'src/app/shared-module/shared-module.module';
import { ColumnchartComponent } from './components/columnchart/columnchart.component';
import { LinechartComponent } from './components/linechart/linechart.component';
import { LinebarchartComponent } from './components/linebarchart/linebarchart.component';
import { ViewdataComponent } from './components/columnchart/viewdata/viewdata.component';

@NgModule({
  declarations: [
    StatisticsComponent,
    ColumnchartComponent,
    LinechartComponent,
    LinebarchartComponent,
    ViewdataComponent
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
    StatisticRoutingModule
  ],
  providers:[DatePipe]
})
export class StatisticsModule { }
