import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IComplain } from '../../../models/IComplain.interface';

@Component({
  selector: 'app-viewimages',
  templateUrl: './viewimages.component.html',
  styleUrls: ['./viewimages.component.scss']
})
export class ViewimagesComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { complain: IComplain }) { }

  ngOnInit() {
    console.log(this.data)
  }

}
