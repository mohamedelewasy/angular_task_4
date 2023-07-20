import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment as env } from 'src/environments/environment.development';
import { ErrorHandlerService } from '../shared/http/error-handler.service';
import { Product } from './product';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private httpClient: HttpClient,
    private errorHandler: ErrorHandlerService,
    private authService: AuthService
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

  createProduct(title: string, price: number, description: string) {
    return this.httpClient
      .post(env.api + '/products', {
        title,
        price,
        description,
      })
      .pipe(catchError(this.errorHandler.logError));
  }

  updateProduct(id: number, title: string, price: number, description: string) {
    return this.httpClient
      .patch(env.api + `/products/${id}`, { title, price, description })
      .pipe(catchError(this.errorHandler.logError));
  }

  deleteProduct(id: number) {
    return this.httpClient
      .delete(env.api + `/products/${id}`)
      .pipe(catchError(this.errorHandler.logError));
  }
}
