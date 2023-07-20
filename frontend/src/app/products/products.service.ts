import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment as env } from 'src/environments/environment.development';
import { ErrorHandlerService } from '../shared/http/error-handler.service';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private httpClient: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>(env.api + '/products')
      .pipe(catchError(this.errorHandler.logError));
  }

  getProduct(id: number): Observable<Product> {
    return this.httpClient
      .get<Product>(env.api + `/products/${id}`)
      .pipe(catchError(this.errorHandler.logError));
  }
}
