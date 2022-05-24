import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, from, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorResponse } from 'src/app/core-module/httpServices/ErrorResponse.service';
import { toasterService } from 'src/app/core-module/UIServices/toaster.service';
import { LoggingService } from '../services/Logging.service';

//500 get model Of response 
//400 get dotnet Core Model
//Error in angular when return throw ite gives another response 401 unAuthorized without model to return 

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

	constructor(private Logging: LoggingService, private ErrorService: ErrorResponse,private toaster:toasterService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		return next.handle(request).pipe(

			catchError((requestError) => {

				const { error } = requestError;

				if (requestError.status == 401) {
					this.Logging.LogRequestError({
						severity: 'error',
						summary: `HTTP Error - ${requestError.status}`,
						detail: error && error.message,
					});
				//	return throwError(() => new Error(error));
				}
				  
				if (requestError.status == 400) {
	
					this.Logging.LogRequestError({
						severity: 'error',
						summary: `HTTP Error - ${requestError.status}`,
						detail: error.errors.Name
					});

					this.toaster.openWarningSnackBar(error.errors.Name);

					//this.ErrorService.Subject.next(error.errors.Name);

				   // console.log(error.errors.Name);
				   //return throwError(() => new Error(error.errors.Name));
				   return  EMPTY;
				}


				if (requestError.status == 500) {
	
					this.Logging.LogRequestError({
						severity: 'error',
						summary: `HTTP Error - ${requestError.status}`,
						detail: error.message
					});

				    this.toaster.openWarningSnackBar(error.message);

					//this.ErrorService.Subject.next(error.message);
					
				   // console.log(error.errors.Name);
				  // return throwError(() => new Error(error.errors.Name));
				   return  EMPTY;
				}
				else{
					return EMPTY;
				}


			})
		);

	}

}




/*
 this Code Under catchError ()
 -----------------------------
/*if (error) {
					switch (error.status) {
						
						case 400:
							if (error.error.errors) {
								const modelStateErrors = [];
								for (const key in error.error.errors) {
									if (error.error.errors[key]) {
										modelStateErrors.push(error.error.errors[key]);
									}
								}

								console.error(error.statusText, error.status);

								//throw ([] as string[]).concat(...modelStateErrors);
							} 
							else {
								console.error(error.statusText, error.status);
							}
							break;

						case 401:
							console.error(error.statusText, error.status);
							break;


						case 404:
							console.error(error.statusText, error.status);
							break;


						case 500:
							console.error(error.statusText, error.status);
							break;

						default:
							//console.error(error.statusText, error.status);
							break;

					}

				}*/

			/*	console.log('error');
				return throwError(()=>new Error(error));
*/

