import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products!: Product[];
  showCreateProduct: boolean;
  constructor(private productsService: ProductsService) {
    this.showCreateProduct = true;
  }

  ngOnInit(): void {
    this.productsService
      .getProducts()
      .subscribe((data) => (this.products = data));
  }

  showCreateProductComponent() {
    this.showCreateProduct = !this.showCreateProduct;
  }
}
