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
import { LoggingService } from '../services/Logging.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
   
    constructor(private Logging: LoggingService,private ErrorService:ErrorResponse) { }

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
					return throwError(() => new Error(error));
                }
                  
				if (requestError.status == 400) {
	
                    this.Logging.LogRequestError({
                        severity: 'error',
                        summary: `HTTP Error - ${requestError.status}`,
                        detail: error.errors.Name
                    });
					
					this.ErrorService.Subject.next(error.errors.Name);

                   // console.log(error.errors.Name);
				   //return throwError(() => new Error(error.errors.Name));
				   return  EMPTY;
				}

				else{
					return EMPTY;
				}

            
			})
        );
    
    }

}