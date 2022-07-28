import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonHttpService } from 'src/app/core-module/httpServices/CommonHttpService.service';
import { HttpReponseModel } from 'src/app/core-module/models/ResponseHttp';

@Injectable({
  providedIn: 'root'
})
export class ReceivedataService {

  constructor(private http: CommonHttpService) { }

  syncBranchData(): Observable<HttpReponseModel> {
    return this.http.CommonPostRequests(null, '')
  }
  
  syncAreaData(): Observable<HttpReponseModel> {
    return this.http.CommonPostRequests(null, '')
  } 
  
  syncBlockData(): Observable<HttpReponseModel> {
    return this.http.CommonPostRequests(null, '')
  }  
  
  syncIssueData(): Observable<HttpReponseModel> {
    return this.http.CommonPostRequests(null, '')
  }  
  
  syncCustomerData(): Observable<HttpReponseModel> {
    return this.http.CommonPostRequests(null, '')
  }

}
