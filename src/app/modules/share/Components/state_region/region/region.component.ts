import { Component, OnInit } from "@angular/core";
import { LookUpModel } from "src/app/shared-module/models/lookup";

@Component({
	selector:"region",
	templateUrl:'./region.component.html',
	styleUrls:['./region.component.scss']
})

export class RegionComponent 
{
	
	title:string;
	icon:string;
    model:LookUpModel;

	edit(model:LookUpModel){
          this.model=model;
	}

}