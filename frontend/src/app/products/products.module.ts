import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsItemsComponent } from './products-items/products-items.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  declarations: [ProductsComponent, ProductsItemsComponent, ProductDetailsComponent],
  imports: [CommonModule, ProductsRoutingModule],
})
export class ProductsModule {}
