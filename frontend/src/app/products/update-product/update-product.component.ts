import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
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
  title!: FormControl;
  price!: FormControl;
  description!: FormControl;
  productId!: number;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.title = new FormControl('', Validators.required);
    this.price = new FormControl('', [
      Validators.required,
      Validators.min(0.01),
    ]);
    this.description = new FormControl('', Validators.required);
    this.updateForm = new FormGroup({
      title: this.title,
      price: this.price,
      description: this.description,
    });

    this.route.params.subscribe((params) => (this.productId = params['id']));
    // TODO:
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.productsService.getProduct(this.productId).subscribe((product) => {
      this.title.setValue(product.title);
      this.price.setValue(product.price);
      this.description.setValue(product.description);
    });
  }

  submit() {
    const { title, price, description } = this.updateForm.value;
    this.productsService
      .updateProduct(this.productId, title, price, description)
      .subscribe();
    this.router.navigate([`/products/${this.productId}`], {
      onSameUrlNavigation: 'reload',
    });
  }

  deleteProduct() {
    this.productsService.deleteProduct(this.productId).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
