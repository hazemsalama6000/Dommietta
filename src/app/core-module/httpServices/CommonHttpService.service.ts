import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, retry, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpPaths } from "../../modules/auth/Enums/HttpPaths.enum";

@Injectable(
	{
		providedIn: 'root'
	}
)

export class CommonHttpService {

	
	constructor(private http: HttpClient) { }

	handleerror(error:any){
        console.log(error);
		return throwError(error.message || "server error");
		}
	//used For Any insert , Update , Search
	CommonPostRequests(model: any, url: string): Observable<any> {
		return this.http.post<any>(`${url}`, model).pipe( catchError(this.handleerror ) );
		;
	}

	//used to search by Id
	CommonPutRequests(model: any, url: string): Observable<any> {
		return this.http.put<any>(`${url}`, model);
	}

	//used to search by Id
	CommonGetRequests(url: string): Observable<any> {
		return this.http.get<any>(`${url}`);
	}

	//used to delete by Id
	CommonDeleteRequest( url:string ):Observable<any>{
        return this.http.delete<any>(`${url}`);
	}


}