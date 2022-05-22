import { Component, OnInit } from "@angular/core";
import { LookUpModel } from "../../models/lookup";

@Component({
	selector:"lookupId_name",
	templateUrl:'./lookupId_name.component.html',
	styleUrls:['./lookupId_name.component.scss']
})

export class LookupIdNameComponent 
{
	
	title:string;
	icon:string;
    model:LookUpModel;

	edit(model:LookUpModel){
          this.model=model;
	}

}