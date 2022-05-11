import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggingService } from '../services/Logging.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
   
    constructor(private Logging: LoggingService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
        return next.handle(request).pipe(
            catchError((requestError) => {
                if (requestError.status == 401) {
                    const { error } = requestError;
                    this.Logging.LogRequestError({
                        severity: 'error',
                        summary: `HTTP Error - ${requestError.status}`,
                        detail: error && error.message,
                    });
                }
                return throwError(() => new Error(requestError));
            })
        );
    
    }

}