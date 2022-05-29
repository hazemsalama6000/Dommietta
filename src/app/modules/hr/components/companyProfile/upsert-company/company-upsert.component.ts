import { Component } from "@angular/core";
import {dropdownSettings} from "../../../../../core-module/UIServices/dropdownsetting"
@Component({
	selector:"company-upsert",
	templateUrl:'./company-upsert.component.html',
	styleUrls:['./company-upsert.component.scss']
})

export class CompanyUpsertComponent 
{
	
  dropdownListDataForState :any= [];
  selectedItemState:any = [];

  dropdownListDataForRegion :any= [];
  selectedItemForRegion:any = [];

  dropdownListDataForResponsible :any= [];
  selectedItemForResponsible:any = [];

  dropdownSettings = dropdownSettings;

  panelOpenState:boolean=true;

  ngOnInit() {
    this.dropdownListDataForState = [
      { id: 1, name: 'Mumbai' },
      { id: 2, name: 'Bangaluru' },
      { id: 3, name: 'Pune' },
      { id: 4, name: 'Navsari' },
      { id: 5, name: 'New Delhi' }
    ];

    this.selectedItemState = [
      { id: 3, name: 'Pune' },
    ];


	this.dropdownListDataForRegion = [
		{ id: 1, name: 'Mumbai' },
		{ id: 2, name: 'Bangaluru' },
		{ id: 3, name: 'Pune' },
		{ id: 4, name: 'Navsari' },
		{ id: 5, name: 'New Delhi' }
	  ];
  
	  this.selectedItemForRegion = [
		{ id: 3, name: 'Pune' },
	  ];
  

	  this.dropdownListDataForResponsible = [
		{ id: 1, name: 'Mumbai' },
		{ id: 2, name: 'Bangaluru' },
		{ id: 3, name: 'Pune' },
		{ id: 4, name: 'Navsari' },
		{ id: 5, name: 'New Delhi' }
	  ];
  
	  this.selectedItemForResponsible = [
		{ id: 3, name: 'Pune' },
	  ];

  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}