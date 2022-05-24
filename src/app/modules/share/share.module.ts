import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  shareRoutingModule } from './share-routing.module';
import { TranslationModule } from '../i18n';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StateRegionComponent } from './Components/state_region/state_region.component';
import { StateComponent } from './Components/state_region/lookupId_name/state.component';
import { StateUpsertComponent } from './Components/state_region/lookupId_name/stateUpsert/state-upsert.component';
import { SharedModule } from 'src/app/shared-module/shared-module.module';
import { StateListContentComponent } from './Components/state_region/lookupId_name/state_list_content/state_list_content.component';


@NgModule({
  declarations: [
	StateRegionComponent,
	StateComponent,
	StateUpsertComponent,
	StateListContentComponent
  ],
  imports: [
    CommonModule,
    shareRoutingModule,
    TranslationModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
	SharedModule
  ]
})
export class shareModule { }
