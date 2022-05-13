import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModules } from './AngularMaterialModules';



@NgModule({
  declarations: [],
  imports: [
	  MaterialsModules,
    CommonModule
  ],
  exports:[MaterialsModules]
})
export class SharedModule { }
