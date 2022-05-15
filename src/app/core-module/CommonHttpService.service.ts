import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, retry } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpPaths } from "../modules/auth/Enums/HttpPaths.enum";

@Injectable(
	{
		providedIn: 'root'
	}
)

export class CommonHttpService {

	
	constructor(private http: HttpClient) { }

	//used For Any insert , Update , Search
	CommonPostRequests(model: any, url: string): Observable<any> {
		return this.http.post<any>(`${url}`, model);
	}

	//used to search by Id
	CommonGetRequests(id: number, url: string): Observable<any> {
		return this.http.get<any>(`${url}?id=${id}`);
	}

	//used to delete by Id
	CommonDeleteRequest( id:number , url:string ):Observable<any>{
        return this.http.delete<any>(`${url}?id=${id}}`);
	}


}