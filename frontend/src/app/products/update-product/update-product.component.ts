import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  updateForm!: FormGroup;
  productId!: number;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateForm = new FormGroup({
      title: new FormControl<string>(''),
      price: new FormControl<number>(0),
      description: new FormControl<string>(''),
    });

    route.params.subscribe((params) => (this.productId = params['id']));
  }

  ngOnInit(): void {
    this.productsService.getProduct(this.productId).subscribe((product) => {
      this.updateForm.controls['title'].setValue(product.title);
      this.updateForm.controls['price'].setValue(product.price);
      this.updateForm.controls['description'].setValue(product.description);
    });
  }

  submit() {
    const { title, price, description } = this.updateForm.value;
    this.productsService
      .updateProduct(this.productId, title, price, description)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  deleteProduct() {
    this.productsService.deleteProduct(this.productId).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
