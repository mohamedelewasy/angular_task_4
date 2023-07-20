import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor() {}

  logError(error: HttpErrorResponse) {
    if (error instanceof ErrorEvent) {
      console.log('client error', error);
    } else {
      console.log('server error', error);
    }
    return new Observable<any>();
  }
}
