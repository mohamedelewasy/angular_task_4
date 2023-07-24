import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  signin(username: string, password: string): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(env.api + '/auth/signin', {
      username,
      password,
    });
  }

  signup(username: string, password: string) {
    return this.httpClient.post(env.api + '/auth/signup', {
      username,
      password,
    });
  }

  verify() {
    return this.httpClient.get(env.api + '/auth/verify', {
      headers: { Authorization: `Bearer ${this.getToken}` },
    });
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
