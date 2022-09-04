import { Injectable } from '@angular/core';
import { map, Observable, of, Subject } from 'rxjs';
import { CommonHttpService } from 'src/app/core-module/httpServices/CommonHttpService.service';
import { HttpReponseModel } from 'src/app/core-module/models/ResponseHttp';
import { LookUpModel } from 'src/app/shared-module/models/lookup';
import { HttpPaths } from '../../auth/Enums/HttpPaths.enum';
import { IReading, IReadingList } from '../models/IReading.interface';
import { IReadingSearch } from '../models/IReadingSearch.interface';
import { IUpdateReading } from '../models/IUpdateReading.interface';

@Injectable({
	providedIn: 'root'
})
export class ReadingService {

	searchUpdateAction: Subject<boolean> = new Subject<boolean>();
	searchUpdate$ = this.searchUpdateAction.asObservable();

	constructor(private http: CommonHttpService) { }

	getReadingsData(searchModel: any): Observable<IReading> {
		let queryString = Object.keys(searchModel).map((key: string) =>
			searchModel[key] != null && searchModel[key] != '' && searchModel[key] != undefined ? key + '=' + searchModel[key] : null
		).filter(x => x != null).join('&');

		return this.http.CommonGetRequests(`${localStorage.getItem("companyLink")}${HttpPaths.API_GET_READINGS}${queryString}`)
			.pipe(map(Items => Items.data as IReading));
		// return of({
		// 	totalRecords:1000,
		// 	data:[
		// 		{
		// 			branchName:'xxx',
		// 			collectorId:1,
		// 			collectorName:'ssss',
		// 			customerCode:'12',
		// 			customerId:11,
		// 			customerName:'222',
		// 			isPosted:false,
		// 			isRevised:true,
		// 			id:123,
		// 			issueDate:new Date(),
		// 			issueName:"2022",
		// 			issueStatus:'ddd',
		// 			lastReading:852,
		// 			meterReadingDate:new Date(),
		// 			meterStatus:'wwww',
		// 			notes:'wqqqqq',
		// 			value:78955,

		// 		}
		// 	]
		// }as IReading)
	}

	PostIsreviseOrIsPost(reading: IUpdateReading[]): Observable<HttpReponseModel> {
		return this.http.CommonPutRequests(reading, `${localStorage.getItem("companyLink")}${HttpPaths.API_UPDATE_READINGS}`);
	}


	updatemeterreadingvalue(reading: any): Observable<HttpReponseModel> {
		return this.http.CommonPostRequests(reading, `${localStorage.getItem("companyLink")}${HttpPaths.API_UPDATE_READINGS_VALUE}`);
	}
}
