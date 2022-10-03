import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { CommonHttpService } from 'src/app/core-module/httpServices/CommonHttpService.service';
import { LookUpModel } from 'src/app/shared-module/models/lookup';
import { HttpPaths } from '../../auth/Enums/HttpPaths.enum';
import { IStatisticBlills } from '../models/IStatisticBlills.interface';
import { IStatisticEmployee } from '../models/IStatisticEmployee.interface';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  branchId = new BehaviorSubject<number>(0);

  constructor(private http: CommonHttpService) { }



  getData2() {
    // this.http.CommonGetRequests("https://localhost:7173/api/v1/dashboard/getcollectorbillsstatistics",)
    // .pipe(map(items=>{}))

    return of({
      labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13', '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17'],
      datasets: [
        {
          label: "الشكاوى",
          data: ['467', '576', '572', '79', '92', '574', '573', '576'],
          borderColor: 'blue',
          backgroundColor: 'blue'
        },
        {
          label: "القراءات",
          data: ['542', '542', '536', '327', '17', '0.00', '538', '541'],
          borderColor: 'limegreen',
          backgroundColor: 'limegreen'
        },
        {
          label: "التحصيلات",
          data: ['50', '100', '200', '250', '100', '300', '150', '500'],
          borderColor: 'red',
          backgroundColor: 'red'
        },
      ]

    })
  }

  getMonthlyStatisticEmployee(searchModel: any): Observable<IStatisticEmployee[]> {
    let queryString = Object.keys(searchModel).map((key: string) =>
      searchModel[key] != null && searchModel[key] != '' && searchModel[key] != undefined ? key + '=' + searchModel[key] : null
    ).filter(x => x != null).join('&');
    return this.http.CommonGetRequests(`${localStorage.getItem('companyLink')}${HttpPaths.API_GET_MONTHLY_EMPLOYEE_STATISTIC}${queryString ? '?' + queryString : ''}`)
      .pipe(map(Items => Items.data as IStatisticEmployee[]))
  }

  getDailyStatisticEmployee(searchModel: any): Observable<IStatisticEmployee[]> {
    let queryString = Object.keys(searchModel).map((key: string) =>
      searchModel[key] != null && searchModel[key] != '' && searchModel[key] != undefined ? key + '=' + searchModel[key] : null
    ).filter(x => x != null).join('&');
    return this.http.CommonGetRequests(`${localStorage.getItem('companyLink')}${HttpPaths.API_GET_DIALY_EMPLOYEE_STATISTIC}${queryString ? '?' + queryString : ''}`)
      .pipe(map(Items => Items.data as IStatisticEmployee[]))
  }

  getDataForLineBar(searchModel: any): Observable<IStatisticBlills[]> {
    let queryString = Object.keys(searchModel).map((key: string) =>
      searchModel[key] != null && searchModel[key] != '' && searchModel[key] != undefined ? key + '=' + searchModel[key] : null
    ).filter(x => x != null).join('&');
    return this.http.CommonGetRequests(`${localStorage.getItem('companyLink')}${HttpPaths.API_GET_BILL_STATISTIC}${queryString ? '?' + queryString : ''}`)
      .pipe(map(Items => Items.data as IStatisticBlills[]))
  }

  getUserEmployee(branchId: number) {
    return this.http.CommonGetRequests(`${localStorage.getItem('companyLink')}${HttpPaths.API_LIST_OF_USER_EMPLOYEE}${branchId}`).pipe(
      map(Items => Items.data.map((item: any) => ({ Id: item.id, Name: item.name }) as LookUpModel))
    )
  }

}
