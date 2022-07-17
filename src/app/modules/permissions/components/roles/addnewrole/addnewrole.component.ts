import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpReponseModel } from 'src/app/core-module/models/ResponseHttp';
import { toasterService } from 'src/app/core-module/UIServices/toaster.service';
import { AuthService } from 'src/app/modules/auth';
import { IUserData } from 'src/app/modules/auth/models/IUserData.interface';
import { IManagePermission } from '../../../models/IManagePermission.interface';
import { IRolesProfile } from '../../../models/IRolesProfile.interface';
import { ITreeRoles } from '../../../models/ITreeRoles.interface';
import { RolesService } from '../../../services/roles.service';

@Component({
  selector: 'app-addnewrole',
  templateUrl: './addnewrole.component.html',
  styleUrls: ['./addnewrole.component.scss']
})
export class AddnewroleComponent implements OnInit {

  rolesData: IRolesProfile;
  userData: IUserData;
  treePermissions: ITreeRoles[];
  private unsubscribe: Subscription[] = [];

  roleForm: FormGroup = this.fb.group({
    companyId: [0],
    roleName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
  });
  constructor(
    private rolesService: RolesService,
    private authService: AuthService,
    private toaster: toasterService,
    private fb: FormBuilder,
  ) {
    let getdata = this.authService.userData.subscribe(res => {
      this.userData = res;
      this.getDefualtPermission();
      this.roleForm.patchValue({ companyId: res.companyId });
    });

    this.unsubscribe.push(getdata);
  }

  ngOnInit(): void {
  }

  getDefualtPermission() {
    this.rolesService.GetDefaultPermissionForCompany(this.userData.companyId).subscribe(
      (res: ITreeRoles[]) => this.treePermissions = res,
      (err) => console.log(err),
      () => { }
    )
  }

  addRole() {
    console.log(this.roleForm.value)
    if (this.roleForm.valid) {

      this.rolesService.AddRole(this.roleForm.value).subscribe(
        (data: HttpReponseModel) => {
          if (data.isSuccess) {
            this.toaster.openSuccessSnackBar(data.message);
            this.managePermissions(data.data.id);
            this.rolesService.bSubject.next(true);
          }
          else if (data.isExists) {
            this.toaster.openWarningSnackBar(data.message);
          }
        },
        (error: any) => {
          console.log(error);
          this.toaster.openWarningSnackBar(error.toString().replace("Error:", ""));
        }
      );
    }

  }

  managePermissions(roleId: string) {
    let permissions: IManagePermission = { roleId: roleId, roleTree: this.treePermissions };
    permissions.roleTree = this.treePermissions;
    console.log(permissions)
    this.rolesService.PostManagePermission(permissions).subscribe(
      (data: HttpReponseModel) => {
        if (data.isSuccess) {
          this.toaster.openSuccessSnackBar(data.message);
          this.rolesService.bSubject.next(true);
        }
        else if (data.isExists) {
          this.toaster.openWarningSnackBar(data.message);
        }
      },
      (error: any) => {
        console.log(error);
        this.toaster.openWarningSnackBar(error.toString().replace("Error:", ""));
      }
    );
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
