import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productId!: string;
  product!: Product;
  constructor(
    private router: ActivatedRoute,
    private productsService: ProductsService
  ) {
    router.params.subscribe((params) => (this.productId = params['id']));
  }
  ngOnInit(): void {
    this.productsService
      .getProduct(+this.productId)
      .subscribe((data) => (this.product = data));
  }
}
