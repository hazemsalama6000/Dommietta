import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LookupIdNameComponent } from 'src/app/shared-module/Components/lookupId_name/lookupId_name.component';
import { StateRegionComponent } from './Components/state_region/state_region.component';

const routes: Routes = [
	{path:'state_region' , component:StateRegionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class shareRoutingModule { }
