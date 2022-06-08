import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";


@Component({
	selector: 'dialog',
	templateUrl: './confirm-dialog.component.html',
  })
  export class ConfirmDialog {
	constructor(public dialogRef: MatDialogRef<ConfirmDialog>) {}
  }