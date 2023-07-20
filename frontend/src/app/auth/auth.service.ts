import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment as env } from 'src/environments/environment.development';
import { ErrorHandlerService } from '../shared/http/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  signin(username: string, password: string): Observable<{ token: string }> {
    return this.httpClient
      .post<{ token: string }>(env.api + '/auth/signin', {
        username,
        password,
      })
      .pipe(catchError(this.errorHandler.logError));
  }

  signup(username: string, password: string) {
    return this.httpClient
      .post(env.api + '/auth/signup', {
        username,
        password,
      })
      .pipe(catchError(this.errorHandler.logError));
  }

  // verify(): Observable<{ username: string } | undefined> {
  //   if (this.isLoggedIn())
  //     return this.httpClient
  //       .get<{ username: string }>(env.api + '/auth/verify', {
  //         headers: { Authorization: `Bearer ${this.getToken()}` },
  //       })
  //       .pipe(catchError(this.errorHandler.logError));
  //   return new Observable<undefined>(undefined);
  // }

  isLoggedIn() {
    return !!this.getToken();
  }

  private getToken() {
    return localStorage.getItem('token');
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
