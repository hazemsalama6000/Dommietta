import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserModel } from '../../models/user.model';
import { environment } from '../../../../../environments/environment';
import { AuthModel } from '../../models/auth.model';
import { ILoginData } from '../../models/ILoginData.interface';
import { ICompanyConfigResponse } from '../../models/ICompanyConfigResponse.interface';

const API_USERS_URL = `${environment.apiUrl}/api/v1/identity/login`;
const API_COMPANYCONFIG_URL = `${environment.apiUrl}/api/v1/identity/CompanyConfiguration`;

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient) {}

  // public methods
  login(LoginData : ILoginData): Observable<any> {
   
    return this.http.post<ICompanyConfigResponse>(`${API_COMPANYCONFIG_URL}`, {
		companyCode:LoginData.companyCode,
        password:LoginData.password,
		userName:LoginData.userName
    });

  }

  // CREATE =>  POST: add a new user to the server
  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(API_USERS_URL, user);
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_USERS_URL}/forgot-password`, {
      email,
    });
  }

  getUserByToken(token: string,userId:string): Observable<UserModel> {
    
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const params = new HttpParams().append('userId',userId);
    return this.http.get<UserModel>(`${API_USERS_URL}/getUser`, {
     
      headers: httpHeaders,
      params:params
    });
  }
}
