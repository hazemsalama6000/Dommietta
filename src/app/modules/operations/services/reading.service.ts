import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { CommonHttpService } from 'src/app/core-module/httpServices/CommonHttpService.service';
import { HttpReponseModel } from 'src/app/core-module/models/ResponseHttp';
import { LookUpModel } from 'src/app/shared-module/models/lookup';
import { HttpPaths } from '../../auth/Enums/HttpPaths.enum';
import { IReading, IReadingList } from '../models/IReading.interface';
import { IReadingSearch } from '../models/IReadingSearch.interface';

@Injectable({
  providedIn: 'root'
})
export class ReadingService {

  constructor(private http: CommonHttpService) { }


  getReadingsData(searchModel: any): Observable<IReading> {
    let queryString = Object.keys(searchModel).map((key: string) =>
    searchModel[key] != null && searchModel[key] != '' && searchModel[key] != undefined ? key + '=' + searchModel[key] : null
  ).filter(x => x != null).join('&');

  return this.http.CommonGetRequests(`${localStorage.getItem("companyLink")}${HttpPaths.API_GET_READINGS}${queryString}`)
    .pipe(map(Items => ({ ...Items.data }) as IReading));
  }

  getLookupCustomerData(search: any): Observable<LookUpModel[]> {
    // this.http.CommonPostRequests(search, `${localStorage.getItem("companyLink")}${HttpPaths.API_GET_EMPLOYEES_DATA}`)
    // 	.pipe(map(Items => Items.map((Item: any) => ({ Id: Item.id, Name: Item.name }) as LookUpModel)));
    return of([{ Id: 1, Name: 'Zomm' } as LookUpModel, { Id: 1, Name: 'Ahmed' } as LookUpModel]);
  }

  PostIsreviseOrIsPost(reading:IReadingList[]):Observable<HttpReponseModel>{
      return this.http.CommonPostRequests(reading, `${localStorage.getItem("companyLink")}${HttpPaths.API_TOGGLE_EMPLOYEE_ACTIVE}`); 
  }
}
