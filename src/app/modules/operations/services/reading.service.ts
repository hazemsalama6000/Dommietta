import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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


  getReadingsData(searchModel: IReadingSearch): Observable<IReading> {
    // return this.http.CommonPostRequests(searchModel, `${localStorage.getItem("companyLink")}${HttpPaths.API_GET_EMPLOYEES_DATA}`)
    //  .pipe(map(Items => Items.map((Item: any) => ({ ...Item }))));
    let readingData: IReading={pageSize:100,readingsRecords:[]};
    let ispost = true;
    for (let index = 1; index < searchModel.pageSize; index++) {
      ispost = !ispost;
      readingData.readingsRecords.push({
        Id: index,
        CollectorId: index,
        BranchName: "BranchName" + index,
        CollectorName: "CollectorName" + index,
        CustomerCode: "CustomerCode" + index,
        IsPotsed: ispost,
        IsRevised: !ispost,
        CustomerName: "CustomerName" + index,
        IssueDate: new Date(),
        MeterStatus: "MeterStatus" + index,
        IssueName: "202204" + index,
        CustomerId: 2 + index,
        Value: 96325,
        IssueStatus: "IssueStatus" + index,
        ReadingImagePath:'',
        X: 1245242 + index,
        Y: 6464646 + index,
        LastReading: 4556456,
        Notes: "Notes" + index,
        lastPosted: ispost
      })
    }
    return of(readingData);

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
