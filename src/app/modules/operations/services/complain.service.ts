import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CommonHttpService } from 'src/app/core-module/httpServices/CommonHttpService.service';
import { HttpReponseModel } from 'src/app/core-module/models/ResponseHttp';
import { LookUpModel } from 'src/app/shared-module/models/lookup';
import { HttpPaths } from '../../auth/Enums/HttpPaths.enum';
import { IComplain, IComplainList } from '../models/IComplain.interface';
import { IComplainSearch } from '../models/IComplainSearch.interface';

@Injectable({
  providedIn: 'root'
})
export class ComplainService {

  constructor(private http: CommonHttpService) { }


  getComplainsData(searchModel: IComplainSearch): Observable<IComplain> {
    // return this.http.CommonPostRequests(searchModel, `${localStorage.getItem("companyLink")}${HttpPaths.API_GET_EMPLOYEES_DATA}`)
    //  .pipe(map(Items => Items.map((Item: any) => ({ ...Item }))));
    let complainData: IComplain={complainRecords:[],pageSize:100} ;
    let ispost = true;
    for (let index = 1; index < searchModel?.pageSize; index++) {
      ispost = !ispost;
      complainData.complainRecords.push({
        Id: index,
        Date: new Date(),
        CollectorName: 'CollectorName' + index,
        CustomerName: 'CustomerName' + index,
        BranchName: 'BranchName' + index,
        AreaName: 'AreaName' + index,
        BlockName: 'BlockName' + index,
        IssueName: 'IssueName' + index,
        X: 54645,
        Y: 36646,
        Details: 'Details' + index,
        IsRevised: ispost,
        ComplaintTypeName: 'ComplaintTypeName' + index,
        ComplaintImagesPath: ['r' + index, 's' + index],
      })
    }
    return of(complainData);

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
