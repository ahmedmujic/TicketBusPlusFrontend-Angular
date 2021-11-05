import { ActivateUser, UserInfo, UserLogin } from './../models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { Company } from 'src/app/auth/models/company-register.model';
import { UserRegister } from 'src/app/auth/models/user-register.model';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { ChangePassword } from 'src/app/auth/models/change-password.model';

@Injectable()
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject
    .asObservable();
  constructor(private http: HttpClient) { }

  setUser(user: User) {
    this.currentUserSubject.next(user);
  }

  get userValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: UserLogin) {
    return this.http.post(`${environment.apiUrl}/api/auth/authenticate`, user);
  }

  registerUser(user: UserRegister | Company) {
    return this.http.post(`${environment.apiUrl}/api/auth/user`, user);
  }

  refreshToken() {
    return this.http
      .post(
        `${environment.apiUrl}/api/auth/token/refresh`,
        {
          clientId: environment.clientId,
          clientSecret: environment.clientSecret,
        }
      )
      .pipe(
        tap((token: any) => {
          return token;
        }),
        catchError((error) => {
          return throwError(<ErrorEvent>error);
        })
      );
  }

  acivateAccount(activateUser: ActivateUser) {
    return this.http.post(
      `${environment.apiUrl}/api/auth/confirm`,
      activateUser
    );
  }

  resendEmail(userId: string) {
    return this.http.post(
      `${environment.apiUrl}/api/auth/resend/${userId}`,
      {}
    );
  }

  resetPassword(email: string) {
    return this.http.post(
      `${environment.apiUrl}/api/auth/password/request-reset`,
      {
        email: email,
      }
    );
  }

  changePassword(passwordRequest: ChangePassword) {
    return this.http.post(
      `${environment.apiUrl}/api/auth/password/reset`,
      passwordRequest
    );
  }

  getUserInfo() {
    return this.http.get(`${environment.apiUrl}/api/auth/user`);
  }

  logout() {
    return this.http.post(`${environment.apiUrl}/api/auth/token/revoke`, {
      clientId: environment.clientId,
      clientSecret: environment.clientSecret
    }).subscribe(_ => this.currentUserSubject.next(new User()));
  }
}
