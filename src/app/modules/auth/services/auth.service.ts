import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription, EMPTY, ReplaySubject, throwError } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { AuthModel } from '../models/auth.model';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ILoginData } from '../models/ILoginData.interface';
import { ICompanyConfigResponse } from '../models/ICompanyConfigResponse.interface';
import { ILoginResponseInterface } from '../models/ILoginResponse.interface';
import { CommonHttpService } from 'src/app/core-module/httpServices/CommonHttpService.service';
import { HttpPaths } from '../Enums/HttpPaths.enum';
import { IUserData } from '../models/IUserData.interface';


@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  API_USERS_URL = `${HttpPaths.API_LOGIN_URL}`;
  API_COMPANYCONFIG_URL = `${environment.apiUrl}${HttpPaths.API_COMPANYCONFIG_URL}`;
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  // public fields
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  userData = new ReplaySubject<IUserData>();


  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router,
    private CommonHttp: CommonHttpService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);

    this.isLoading$ = this.isLoadingSubject.asObservable();
    /*    const subscr = this.getUserByToken().subscribe();
    */  //  this.unsubscribe.push(subscr);
  }

  // public methods
  CheckCompanyExistance(LoginData: ILoginData): Observable<ICompanyConfigResponse> {

    this.isLoadingSubject.next(true);

    return this.authHttpService.CheckCompanyExistance(LoginData).pipe(

      map((data: any) => {

        let CompanyConfig: ICompanyConfigResponse;
        CompanyConfig = data.data;
        console.log(CompanyConfig);
        return CompanyConfig;

      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  Login(LoginData: ILoginData, url: string) {

    return this.CommonHttp.CommonPostRequests(LoginData, `${url}${this.API_USERS_URL}`).pipe(

      map((LoginResponse: ILoginResponseInterface) => {
        // console.log(LoginResponse)
        return LoginResponse;
      }), catchError((err) => {
        let LoginResponse: ILoginResponseInterface = { success: "false", token: '' };
        return of(LoginResponse);
      })

    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login'], { queryParams: {} });
  }

  logoutByUserId(userId: number) {
    return this.CommonHttp.CommonPostRequests(null, `${localStorage.getItem("companyLink")}${HttpPaths.API_LOGINWITH_USERID}${userId}`);
  }

  getUserByToken(): Observable<any> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.userId) {
      return of(undefined);
    }

    // let obj: any = {
    //   "userName": "aligntech_SuperAdmin",
    //   "fullName": "Tarek",
    //   "email": null,
    //   "refreshToken": null,
    //   "jobId": null,
    //   "userId": "a6097549-b1c0-4c19-9e0b-f91b6b41d58f",
    //   "isAuthenticated": true,
    //   "roles": [],
    //   "companyId": 17,
    //   "branchId": 0,
    //   "technician_Id": 28,
    //   "appHasTutorial": false,
    //   "companyCode": "aligntech",
    //   "userCode": "1",
    //   "technician": { "employeeId": 0, "canCollect": true, "canRead": true, "canComplain": false, "canEditCustomer": true, "attachImageRead": false, "attachImageEditCustomer": false, "maxOfflineWorkingHours": 0, "maxOfflineWorkingBills": 0, "insertDate": "2022-07-25T15:25:31.1018829", "updateDate": "2022-07-25T15:25:31.1018829", "deleteDate": null, "isActive": true },
    //   "imgPath": "",
    //   "employeeId": 0,
    //   "menu": [{ "id": 1, "name": "Screen", "parentId": null, "isLast": false, "route": "", "permission": "", "icon": "", "orderBy": 0, "parent": null, "isDeleted": false, "childNode": [{ "id": 30, "name": "الرئيسية", "parentId": 1, "isLast": true, "route": "/", "permission": "Screen.Bills.Issues.View", "icon": "home", "orderBy": 1, "parent": null, "isDeleted": false, "childNode": [] }, { "id": 31, "name": "صلاحيات المدير العام", "parentId": 1, "isLast": false, "route": "", "permission": "", "icon": "", "orderBy": 2, "parent": null, "isDeleted": false, "childNode": [{ "id": 32, "name": "إعدادات", "parentId": 31, "isLast": false, "route": "", "permission": "", "icon": "manage_accounts", "orderBy": 1, "parent": null, "isDeleted": false, "childNode": [{ "id": 34, "name": "الشركات", "parentId": 32, "isLast": true, "route": "/hr/company", "permission": "Screen.Shared.Company.View", "icon": "", "orderBy": 1, "parent": null, "isDeleted": false, "childNode": [] }, { "id": 35, "name": "صلاحيات المدير", "parentId": 32, "isLast": true, "route": "/permissions/superadminroles", "permission": "Screen.Shared.Geographic.View", "icon": "", "orderBy": 2, "parent": null, "isDeleted": false, "childNode": [] }, { "id": 36, "name": "المستخدمين المتصلين", "parentId": 32, "isLast": true, "route": "/permissions/onlineUsers", "permission": "Screen.Shared.Company.View", "icon": "", "orderBy": 3, "parent": null, "isDeleted": false, "childNode": [] }] }, { "id": 33, "name": "متابعة المستخدمين", "parentId": 31, "isLast": false, "route": "", "permission": "", "icon": "people_outline", "orderBy": 2, "parent": null, "isDeleted": false, "childNode": [{ "id": 37, "name": "بيانات الدخول للمستخدمين ", "parentId": 33, "isLast": true, "route": "/permissions/userconnectionlog", "permission": "Screen.Shared.Company.View", "icon": "", "orderBy": 1, "parent": null, "isDeleted": false, "childNode": [] }] }] }, { "id": 39, "name": "شئون العاملين", "parentId": 1, "isLast": false, "route": "", "permission": "", "icon": "", "orderBy": 3, "parent": null, "isDeleted": false, "childNode": [{ "id": 41, "name": " بيانات الموظف ", "parentId": 39, "isLast": true, "route": "/employee/employeeprofile", "permission": "Screen.Shared.Company.View", "icon": "perm_identity", "orderBy": 1, "parent": null, "isDeleted": false, "childNode": [] }] }, { "id": 42, "name": "إعدادات العملاء", "parentId": 1, "isLast": false, "route": "", "permission": "", "icon": "", "orderBy": 4, "parent": null, "isDeleted": false, "childNode": [{ "id": 43, "name": " بيانات العملاء ", "parentId": 42, "isLast": true, "route": "/customer/cutomerprofile", "permission": "Screen.Customer.Customers.View", "icon": "supervisor_account", "orderBy": 1, "parent": null, "isDeleted": false, "childNode": [] }] }, { "id": 44, "name": "الفواتير", "parentId": 1, "isLast": false, "route": "", "permission": "", "icon": "", "orderBy": 5, "parent": null, "isDeleted": false, "childNode": [{ "id": 45, "name": "الفواتير", "parentId": 44, "isLast": false, "route": "", "permission": "", "icon": "receipt_long", "orderBy": 1, "parent": null, "isDeleted": false, "childNode": [{ "id": 46, "name": " فواتير العملاء ", "parentId": 45, "isLast": true, "route": "/operation/customerbills", "permission": "Screen.Shared.Company.View", "icon": "", "orderBy": 1, "parent": null, "isDeleted": false, "childNode": [] }, { "id": 47, "name": " الأصدارات ", "parentId": 45, "isLast": true, "route": "/operation/issue", "permission": "Screen.Technician.Technician.View", "icon": "", "orderBy": 2, "parent": null, "isDeleted": false, "childNode": [] }] }] }, { "id": 48, "name": "العمليات", "parentId": 1, "isLast": false, "route": "", "permission": "", "icon": "", "orderBy": 6, "parent": null, "isDeleted": false, "childNode": [{ "id": 49, "name": "الشكاوى", "parentId": 48, "isLast": false, "route": "", "permission": "", "icon": "support_agent", "orderBy": 1, "parent": null, "isDeleted": false, "childNode": [{ "id": 50, "name": " انواع الشكاوى ", "parentId": 49, "isLast": true, "route": "/operation/compainType", "permission": "Screen.Customer.Customers.View", "icon": "", "orderBy": 1, "parent": null, "isDeleted": false, "childNode": [] }, { "id": 51, "name": " الشكاوى ", "parentId": 49, "isLast": true, "route": "/operation/complainlist", "permission": "Screen.Operation.Complaints.View", "icon": "", "orderBy": 2, "parent": null, "isDeleted": false, "childNode": [] }] }, { "id": 52, "name": " القراءات ", "parentId": 48, "isLast": true, "route": "/operation/readinglist", "permission": "Screen.Operation.MeterReading.View", "icon": "checklist", "orderBy": 2, "parent": null, "isDeleted": false, "childNode": [] }, { "id": 54, "name": " ادارة تعديلات العملاء ", "parentId": 48, "isLast": true, "route": "/operation/cutomerupdatemanage", "permission": "Screen.Customer.Customers.View", "icon": "manage_accounts", "orderBy": 3, "parent": null, "isDeleted": false, "childNode": [] }, { "id": 53, "name": " سحب البيانات ", "parentId": 48, "isLast": true, "route": "/operation/receivedata", "permission": "Screen.Technician.Technician.View", "icon": "download", "orderBy": 4, "parent": null, "isDeleted": false, "childNode": [] }] }, { "id": 55, "name": "إدارة المستخدمين", "parentId": 1, "isLast": false, "route": "", "permission": "", "icon": "", "orderBy": 7, "parent": null, "isDeleted": false, "childNode": [{ "id": 56, "name": "صلاحيات المستخدمين", "parentId": 55, "isLast": false, "route": "", "permission": "", "icon": "admin_panel_settings", "orderBy": 1, "parent": null, "isDeleted": false, "childNode": [{ "id": 57, "name": "المستخدمين ", "parentId": 56, "isLast": true, "route": "/permissions/users", "permission": "Screen.Customer.Customers.View", "icon": "", "orderBy": 1, "parent": null, "isDeleted": false, "childNode": [] }, { "id": 58, "name": "الأدوار", "parentId": 56, "isLast": true, "route": "/permissions/roles", "permission": "Screen.Technician.Technician.View", "icon": "", "orderBy": 2, "parent": null, "isDeleted": false, "childNode": [] }] }] }, { "id": 64, "name": "اعدادات القائمة", "parentId": 1, "isLast": false, "route": "", "permission": "", "icon": "", "orderBy": 8, "parent": null, "isDeleted": false, "childNode": [{ "id": 65, "name": "اعدادات القائمة", "parentId": 64, "isLast": true, "route": "/permissions/managemenu", "permission": "Screen.Shared.Geographic.View", "icon": "admin_panel_settings", "orderBy": 1, "parent": null, "isDeleted": true, "childNode": [] }, { "id": 66, "name": "اعدادات القائمة", "parentId": 64, "isLast": true, "route": "/permissions/managemenu", "permission": "Screen.Shared.Geographic.View", "icon": "tune", "orderBy": 1, "parent": null, "isDeleted": false, "childNode": [] }] }] }, { "id": 6, "name": "Report", "parentId": null, "isLast": false, "route": "", "permission": "", "icon": "", "orderBy": 0, "parent": null, "isDeleted": false, "childNode": [{ "id": 62, "name": "test", "parentId": 6, "isLast": false, "route": "", "permission": "", "icon": "", "orderBy": 1, "parent": null, "isDeleted": false, "childNode": [{ "id": 63, "name": "test2541", "parentId": 62, "isLast": true, "route": "/permissions/roles", "permission": "Screen.Technician.Technician.View", "icon": "admin_panel_settings", "orderBy": 1, "parent": null, "isDeleted": false, "childNode": [] }] }] }]
    // };
    // this.userData.next(obj);
    // return of(obj);

    this.isLoadingSubject.next(true);
    return this.authHttpService.getUserByToken(auth.token).pipe(
      map((user: any) => {

        if (user) {
          this.userData.next(user.data);
        } else {
          this.logout();
        }
        return user;
      }), catchError(err => {
        this.logout();
        return throwError(err)
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  // getUserByToken1(): Observable<any> {

  //   this.isLoadingSubject.next(true);
  //   return this.authHttpService.getUserByToken1(localStorage.getItem("companyLink") as string).pipe(
  //     map((user: any) => {
  //       if (user) {
  //         this.userData.next(user.data);
  //       } else {
  //         this.logout();
  //       }

  //       return user.data;
  //     }),
  //     finalize(() => this.isLoadingSubject.next(false))
  //   );
  // }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  // private methods
  private setAuthFromLocalStorage(auth: ILoginResponseInterface): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.token) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const IsValue = localStorage.getItem('token') //localStorage.getItem(this.authLocalStorageToken);
      if (!IsValue)
        return undefined;

      let data = JSON.parse(atob(IsValue.split('.')[1]));
      let authData: AuthModel = {
        token: IsValue, userId: data.uid, expiresOn: new Date(data.exp), refreshToken: '',
        setAuth: function (auth: AuthModel): void { }
      };
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
