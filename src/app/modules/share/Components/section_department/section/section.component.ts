import { Component, OnInit } from "@angular/core";
import { LookUpModel } from "src/app/shared-module/models/lookup";
import { IRegion } from "../../../models/IRegion.interface";

@Component({
	selector:"section-c",
	templateUrl:'./section.component.html',
	styleUrls:['./section.component.scss']
})

export class SectionComponent 
{
	
	title:string;
	icon:string;
    model:IRegion;

	edit(model:IRegion){
          this.model = model;
	}

}