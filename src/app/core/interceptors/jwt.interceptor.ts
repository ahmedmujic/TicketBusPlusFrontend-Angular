import { environment } from './../../../environments/environment.prod';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.authService.currentUser.subscribe((user: User) => {
      request = request.clone({
        withCredentials: true,
      });
      if (user.token != null) {
        request = request.clone({
          withCredentials: true,
          setHeaders: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      }
    });
    return next.handle(request);
  }
}
