import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User, UserInfo } from '../models/user.model';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(request)
    return next.handle(request).pipe(
      catchError((error) => {
        if (
          //vdsdasd
          error instanceof HttpErrorResponse &&
          (<HttpErrorResponse>error).status == 401
        ) {
          return this.authService.refreshToken().pipe(
            switchMap((data: any) => {
              request = request.clone({
                withCredentials: true,
                setHeaders: {
                  Authorization: `Bearer ${data.token}`,
                },
              });

              return next.handle(request);
            }),

            catchError((err) => {
              return throwError(err);
            })
          );
        }
        return throwError(error);
      })
    );
  }
}
