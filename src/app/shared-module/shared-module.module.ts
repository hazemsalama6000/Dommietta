import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModules } from './AngularMaterialModules';
import { UpsertComponent } from './Components/lookupId_name/Upsert/upsert.component';
import { ListContentComponent } from './Components/lookupId_name/list_content/list_content.component';
import { LookupIdNameComponent } from './Components/lookupId_name/lookupId_name.component';
import { TranslationModule } from '../modules/i18n';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

@NgModule({
  declarations: [
	 UpsertComponent,
	 ListContentComponent,
	 LookupIdNameComponent
	],
  imports: [
	  MaterialsModules,
      CommonModule
	  ,TranslationModule,
	  FormsModule,
	  ReactiveFormsModule,
	  HttpClientModule
  ],
  exports:[
	  MaterialsModules,
	  UpsertComponent,
	  ListContentComponent,
	  LookupIdNameComponent
]
})
export class SharedModule { }
