import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpReponseModel } from 'src/app/core-module/models/ResponseHttp';
import { toasterService } from 'src/app/core-module/UIServices/toaster.service';
import { LookUpModel } from 'src/app/shared-module/models/lookup';
import { ITreeMenu } from '../../../models/ITreeMenu.interface';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-addmenu',
  templateUrl: './addmenu.component.html',
  styleUrls: ['./addmenu.component.scss']
})
export class AddmenuComponent {
  labelPosition: string;
  saveButtonClickedFlag = false;
  permission: LookUpModel[] = [];

  type: string = 'list';

  menuForm: FormGroup = this.fb.group({
    Id: [0],
    Name: ['', [Validators.required]],
    ParentId: [0],
    IsLast: [false],
    Route: [''],
    Permission: [''],
    Icon: [''],
    OrderBy:[0],
    type: ['list']
  });

  constructor(
    public dialogRef: MatDialogRef<AddmenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { node: ITreeMenu, type: string },
    private fb: FormBuilder,
    private menuService: MenuService,
    private toaster: toasterService,
    public dialog: MatDialog,
  ) {
    if (this.data.type == 'edit')
      this.setValueToUpdate()
    else if (this.data.type == 'add')
      this.setValueToAdd();

    this.getPermission();
  }


  setValueToUpdate() {
    if (this.data.node.level == 3 && !this.data.node.isLast) {
      this.addValidator(['Icon']);
      this.menuForm.patchValue({
        Id: this.data.node.id,
        Name: this.data.node.name,
        ParentId: this.data.node.parentId,
        Icon: this.data.node.icon,
        Order:this.data.node.orderBy
      });
    }
    else if (this.data.node.isLast && (this.data.node.level == 4 || this.data.node.level == 3 || this.data.node.level == 2)) {
      this.addValidator(['Route', 'Permission']);
      this.menuForm.patchValue({
        Id: this.data.node.id,
        Name: this.data.node.name,
        Route: this.data.node.route,
        IsLast: this.data.node.isLast,
        ParentId: this.data.node.parentId,
        Permission: this.data.node.permission,
        Icon: this.data.node.icon,
        Order:this.data.node.orderBy
      });
    }
    else {
      this.menuForm.patchValue({
        Id: this.data.node.id,
        Name: this.data.node.name,
        ParentId: this.data.node.parentId,
        Order:this.data.node.orderBy
      });
    }

  }

  setValueToAdd() {

    if (this.data.node.level == 3)
      this.addValidator(['Route', 'Permission']);

    if (this.data.node.level == 2)
      this.addValidator(['Icon']);

  }

  addmenu() {
    if (this.menuForm.valid && this.saveButtonClickedFlag) {
      if (this.data.type == 'add') {
        this.menuForm.patchValue({ IsLast: this.type == 'child' || this.data.node.level == 3 ? true : false, ParentId: this.data.node.id });
        this.menuService.AddMenu(this.menuForm.value).subscribe(
          (data: HttpReponseModel) => {
            if (data.isSuccess) {
              this.menuService.bSubject.next(true);
              this.dialogRef.close();
              this.toaster.openSuccessSnackBar(data.message);
            }
            else if (data.isExists)
              this.toaster.openWarningSnackBar(data.message);
          },
          (error: any) => {
            console.log(error);
            this.toaster.openWarningSnackBar(error.toString().replace("Error:", ""));
          });

      } else if (this.data.type == 'edit') {

        this.menuService.UpdateMenu(this.menuForm.value).subscribe(
          (data: HttpReponseModel) => {
            if (data.isSuccess) {
              this.menuService.bSubject.next(true);
              this.dialogRef.close();
              this.toaster.openSuccessSnackBar(data.message);
            }
            else if (data.isExists)
              this.toaster.openWarningSnackBar(data.message);
          },
          (error: any) => {
            console.log(error);
            this.toaster.openWarningSnackBar(error.toString().replace("Error:", ""));
          });

      }

    }
  }

  getPermission() {
    this.menuService.GetPermission().subscribe(res => {
      this.permission = res;
    },
      (err) => console.log(err)
    );
  }

  changeMode() {
    this.type = this.menuForm.get('type')?.value;

    this.menuForm.reset();
    this.menuForm.updateValueAndValidity();

    if ((this.data.node.level == 2 || this.data.node.level == 3) && this.data.type == 'add' && this.type == 'child') {
      this.addValidator(['Route', 'Permission']);
      this.removeValidator(['Icon'])
    } else if ((this.data.node.level == 2 || this.data.node.level == 3) && this.data.type == 'add' && this.type == 'list') {
      this.addValidator(['Icon']);
      this.removeValidator(['Route', 'Permission'])
    } else if (this.data.node.level == 1 && this.data.type == 'add' && this.type == 'child') {
      this.addValidator(['Route', 'Permission', 'Icon']);
    } else {
      this.removeValidator(['Route', 'Permission', 'Icon']);
    }
  }


  addValidator(names: string[]) {
    names.map(name => {
      this.menuForm.controls[name].setValidators([Validators.required]);
      this.menuForm.controls[name].updateValueAndValidity();
    });
  }

  removeValidator(names: string[]) {
    names.map(name => {
      this.menuForm.controls[name].setValidators([]);
      this.menuForm.controls[name].updateValueAndValidity();
    });
  }

}
