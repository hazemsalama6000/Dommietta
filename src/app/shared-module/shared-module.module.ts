import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModules } from './AngularMaterialModules';
import { UpsertComponent } from './Components/lookupId_name/Upsert/upsert.component';
import { ListContentComponent } from './Components/lookupId_name/list_content/list_content.component';
import { LookupIdNameComponent } from './Components/lookupId_name/lookupId_name.component';



@NgModule({
  declarations: [
	 UpsertComponent,
	 ListContentComponent,
	 LookupIdNameComponent
],
  imports: [
	  MaterialsModules,
      CommonModule
  ],
  exports:[
	  MaterialsModules,
	  UpsertComponent,
	  ListContentComponent,
	  LookupIdNameComponent
]
})
export class SharedModule { }
