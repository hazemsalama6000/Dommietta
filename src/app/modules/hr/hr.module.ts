import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrRoutingModule } from './hr-routing.module';
import { SharedModule } from 'src/app/shared-module/shared-module.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HrRoutingModule,
	SharedModule
  ]
})
export class HrModule { }
