import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  createForm!: FormGroup;
  title!: FormControl;
  price!: FormControl;
  description!: FormControl;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.title = new FormControl<string>('', Validators.required);
    this.price = new FormControl<number>(0, [
      Validators.required,
      Validators.min(0.01),
    ]);
    this.description = new FormControl<string>('', [Validators.required]);
    this.createForm = new FormGroup({
      title: this.title,
      price: this.price,
      description: this.description,
    });

    // TODO:
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  submit() {
    this.spinner.show();
    const { title, price, description } = this.createForm.value;
    this.productsService.createProduct(title, price, description).subscribe(
      () => {
        this.toastr.success('product created.');
        this.createForm.reset();
        this.router.navigate(['/']);
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        this.toastr.error(err.error.message, undefined, { timeOut: 5000 });
      }
    );
  }
}
