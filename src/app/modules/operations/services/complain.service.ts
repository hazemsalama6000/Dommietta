import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { CommonHttpService } from 'src/app/core-module/httpServices/CommonHttpService.service';
import { HttpReponseModel } from 'src/app/core-module/models/ResponseHttp';
import { LookUpModel } from 'src/app/shared-module/models/lookup';
import { HttpPaths } from '../../auth/Enums/HttpPaths.enum';
import { IComplain, IComplainList } from '../models/IComplain.interface';

@Injectable({
  providedIn: 'root'
})
export class ComplainService {

  constructor(private http: CommonHttpService) { }


  getComplainsData(searchModel: any): Observable<IComplain> {
    let queryString = Object.keys(searchModel).map((key: string) =>
      searchModel[key] != null && searchModel[key] != '' && searchModel[key] != undefined ? key + '=' + searchModel[key] : null
    ).filter(x => x != null).join('&');

    return this.http.CommonGetRequests(`${localStorage.getItem("companyLink")}${HttpPaths.API_GET_COMPLAINTS}${queryString}`)
      .pipe(map(Items =>  Items.data  as IComplain));
  }

  getLookupCustomerData(search: any): Observable<LookUpModel[]> {
    // this.http.CommonPostRequests(search, `${localStorage.getItem("companyLink")}${HttpPaths.API_GET_EMPLOYEES_DATA}`)
    // 	.pipe(map(Items => Items.map((Item: any) => ({ Id: Item.id, Name: Item.name }) as LookUpModel)));
    return of([{ Id: 1, Name: 'Zomm' } as LookUpModel, { Id: 1, Name: 'Ahmed' } as LookUpModel]);
  }

  PostIsrevise(complain: IComplainList[]): Observable<HttpReponseModel> {
    return this.http.CommonPostRequests(complain, `${localStorage.getItem("companyLink")}${HttpPaths.API_TOGGLE_EMPLOYEE_ACTIVE}`);
  }

}
