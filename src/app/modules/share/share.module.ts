import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  shareRoutingModule } from './share-routing.module';
import { TranslationModule } from '../i18n';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StateRegionComponent } from './Components/state_region/state_region.component';

import { SharedModule } from 'src/app/shared-module/shared-module.module';
import { StateListContentComponent } from './Components/state_region/state/state_list_content/state_list_content.component';
import { StateUpsertComponent } from './Components/state_region/state/state_Upsert/state-upsert.component';
import { StateComponent } from './Components/state_region/state/state.component';
import { RegionComponent } from './Components/state_region/region/region.component';
import { RegionUpsertComponent } from './Components/state_region/region/region_Upsert/region-upsert.component';
import { RegionListContentComponent } from './Components/state_region/region/region_list_content/region_list_content.component';


@NgModule({
  declarations: [
	StateRegionComponent,
	StateComponent,
	StateUpsertComponent,
	StateListContentComponent,
	RegionComponent,
	RegionUpsertComponent,
	RegionListContentComponent
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
