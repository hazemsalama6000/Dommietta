import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

export interface PeriodicElement {
	id:number;
	name: string;
  }
  
  const ELEMENT_DATA: PeriodicElement[] = [
	{id: 1, name: 'Hydrogen'},
	{id: 2, name: 'Helium'},
  ];

@Component({
	selector:'list_content',
	templateUrl:'./list_content.component.html',
	styleUrls:['./list_content.component.scss']
})

export class ListContentComponent implements AfterViewInit{

	displayedColumns: string[] = ['name','action'];
	dataSource = new MatTableDataSource(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator:MatPaginator;

	ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
	}

	applyFilter(event: Event) {
	  const filterValue = (event.target as HTMLInputElement).value;
	  this.dataSource.filter = filterValue.trim().toLowerCase();
	}
	
}