import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { CommonHttpService } from 'src/app/core-module/httpServices/CommonHttpService.service';
import { HttpReponseModel } from 'src/app/core-module/models/ResponseHttp';
import { LookUpModel } from 'src/app/shared-module/models/lookup';
import { HttpPaths } from '../../auth/Enums/HttpPaths.enum';
import { IComplain, IComplainList } from '../models/IComplain.interface';
import { IUpdateComplain } from '../models/IUpdateComplain.interface';

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

  PostIsrevise(complain: IUpdateComplain[]): Observable<HttpReponseModel> {
    return this.http.CommonPutRequests(complain, `${localStorage.getItem("companyLink")}${HttpPaths.API_UPDATE_COMPLAINTS}`);
  }

}
