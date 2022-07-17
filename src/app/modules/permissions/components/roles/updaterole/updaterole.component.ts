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
  selector: 'app-updaterole',
  templateUrl: './updaterole.component.html',
  styleUrls: ['./updaterole.component.scss']
})
export class UpdateroleComponent implements OnInit {
  rolesData: IRolesProfile;
  treePermissions: ITreeRoles[];
  private unsubscribe: Subscription[] = [];

  roleForm: FormGroup = this.fb.group({
    roleId: [0],
    roleNameNew: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
  });
  constructor(
    private rolesService: RolesService,
    private toaster: toasterService,
    private fb: FormBuilder,
  ) {
    let getdata = this.rolesService.roleid.subscribe(res => {
      this.getRoleWithPermission(res);
    });

    this.unsubscribe.push(getdata);
  }

  ngOnInit(): void {
  }

  getRoleWithPermission(roleId: string) {
    this.rolesService.GetPermissionByRole(roleId).subscribe(
      (res: IManagePermission) => {
        this.roleForm.patchValue({ roleId: res.roleId, roleNameNew: res.roleName?.split('_')[1] });
        this.treePermissions = res.roleTree
      },
      (err) => console.log(err),
      () => { },
    );
  }

  updateRole() {
    console.log(this.roleForm.value)
    if (this.roleForm.valid) {

      this.rolesService.UpdateRole(this.roleForm.value).subscribe(
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
  }

  managePermissions() {
    let permissions: IManagePermission = this.roleForm.value;
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
