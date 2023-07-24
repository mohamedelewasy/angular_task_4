import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private router: Router) {}

  logError(error: HttpErrorResponse) {
    if (error instanceof ErrorEvent) {
      console.log('client error', error);
    } else {
      console.log('server error', error);
      if (
        error.error.message === 'bad token' ||
        error.error.message === 'not authorized'
      ) {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      }
    }
    return new Observable<any>();
  }
}
