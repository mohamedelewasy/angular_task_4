import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsItemsComponent } from './products-items/products-items.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../shared/http/token.interceptor';
import { UpdateProductComponent } from './update-product/update-product.component';
import { RouteReuseStrategy } from '@angular/router';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsItemsComponent,
    ProductDetailsComponent,
    CreateProductComponent,
    UpdateProductComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
})
export class ProductsModule {}
