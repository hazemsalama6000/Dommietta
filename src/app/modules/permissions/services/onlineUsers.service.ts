import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Tab } from "bootstrap";
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from "rxjs";
import { AnyCatcher } from "rxjs/internal/AnyCatcher";
import { CommonHttpService } from "src/app/core-module/httpServices/CommonHttpService.service";
import { HttpReponseModel } from "src/app/core-module/models/ResponseHttp";
import { HttpPaths } from "src/app/modules/auth/Enums/HttpPaths.enum";
import { environment } from "src/environments/environment";
import { AuthService } from "../../auth";
import { ILocationXY } from "../models/ILocationXY.interface";
import { IOnlineUsers } from "../models/IOnlineUsers.interface";
import { IOnlineUsersCountPerCompany } from "../models/IOnlineUsersCountPerCompany.interface";

@Injectable({
	providedIn: 'root'
})

export class OnlineUsersService {

	bSubject = new BehaviorSubject<IOnlineUsers[]>([]);
	clickSearch$ = new BehaviorSubject<boolean>(false);
	constructor(private http: CommonHttpService, private auth: AuthService) { }

	getOnlineUsersData(connectionStatus?: boolean, companyId?: number): Observable<IOnlineUsers[]> {
		return this.http.CommonGetRequests(`${localStorage.getItem("companyLink")}${HttpPaths.API_ONLINE_USERS}?connectionStatus=${connectionStatus == null ? '' : connectionStatus}&&companyId=${!!companyId ? companyId : ''}`)
			.pipe(map((data: HttpReponseModel) => data.data as IOnlineUsers[]));
	}

    OnlineUserCountForEachCompany(companyId?:number) : Observable<IOnlineUsersCountPerCompany[]>{
		return this.http.CommonGetRequests(`${localStorage.getItem("companyLink")}${HttpPaths.API_ONLINE_USERS_FOREACH_COMPANY}?companyId=${!!companyId ? companyId : ''}`)
		.pipe(map((data: IOnlineUsersCountPerCompany[]) => data as IOnlineUsersCountPerCompany[]));
	}


	getOnlineUsersCurrentLocationData(userId:number): Observable<ILocationXY[]> {
		return this.http.CommonGetRequests(`${localStorage.getItem("companyLink")}${HttpPaths.API_ONLINE_USERES_LASTLOCATION}?empsIds=1005`)
			.pipe(map((data: HttpReponseModel) => data.data as ILocationXY[]));
	}

}