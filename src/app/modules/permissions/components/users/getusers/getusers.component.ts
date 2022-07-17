import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { HttpReponseModel } from 'src/app/core-module/models/ResponseHttp';
import { toasterService } from 'src/app/core-module/UIServices/toaster.service';
import { AuthService } from 'src/app/modules/auth';
import { IUserData } from 'src/app/modules/auth/models/IUserData.interface';
import { IUserList } from '../../../models/IUserLList.interface';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-getusers',
  templateUrl: './getusers.component.html',
  styleUrls: ['./getusers.component.scss']
})
export class GetusersComponent implements OnInit, OnDestroy {
  usersList: IUserList[];
  userData: IUserData;
  private unsubscribe: Subscription[] = [];

  url: string = '';

  constructor(
    private userservice: UsersService,
    private authservice: AuthService,
    private toaster: toasterService,
    private dialog: MatDialog) {
    let getdata = this.authservice.userData.subscribe(
      res => {
        this.userData = res;
        this.getUserData();
      });

    this.unsubscribe.push(getdata);

    this.url = localStorage.getItem("companyLink") ?? '';
  }

  ngOnInit(): void { }

  getUserData(search: string = '') {
    this.userservice.GetCompanyUsers(this.userData.companyId, search).subscribe(
      (res: IUserList[]) => { this.usersList = res; console.log(res) },
      (err) => console.log(err),
      () => { }
    )
  }

  getUserWithFiltter(search: string) {
    this.getUserData(`?UserName=${search}`);
  }

  resetPassword(user: IUserList) {
    this.userservice.resetPassword(user.id).subscribe(
      (data: HttpReponseModel) => { this.toaster.openSuccessSnackBar(data.message); },
      (error: any) => { this.toaster.openWarningSnackBar(error.toString().replace("Error:", "")); }
    );
  }

  toggleActiveDeactive(user: IUserList) {
    this.userservice.activeOrNot(user.id).subscribe(
      (data: HttpReponseModel) => {
        this.toaster.openSuccessSnackBar(data.message);
        this.getUserData();
      },
      (error: any) => {
        this.toaster.openWarningSnackBar(error.toString().replace("Error:", ""));
      });
  }

  assignUserIdToRole(user: IUserList) {
    this.userservice.userid.next(user.id);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
