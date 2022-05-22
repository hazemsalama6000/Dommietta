import { Component } from "@angular/core";

@Component({
	selector:'upsert',
	templateUrl:'./upsert.component.html',
	styleUrls:['./upsert.component.scss']
})

export class UpsertComponent {
	toggleAddEditButton:boolean;
	
	ngOnInit(): void {
		this.toggleAddEditButton=false;
	}

	closeEdit(){
		this.toggleAddEditButton=true;
		console.log(this.toggleAddEditButton);
	}
}