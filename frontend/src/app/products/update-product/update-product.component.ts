import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
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
    this.spinner.show();
    const { title, price, description } = this.updateForm.value;
    this.productsService
      .updateProduct(this.productId, title, price, description)
      .subscribe(
        () => {
          this.spinner.hide();
          this.toastr.success('product updated.');
          this.router.navigate([`/products/${this.productId}`], {
            onSameUrlNavigation: 'reload',
          });
        },
        (err) => {
          this.spinner.hide();
          this.toastr.error(err.error.message, undefined, { timeOut: 5000 });
        }
      );
  }

  deleteProduct() {
    this.spinner.show();
    this.productsService.deleteProduct(this.productId).subscribe(
      () => {
        this.spinner.hide();
        this.toastr.success('product deleted.');
        this.router.navigate(['/']);
      },
      (err) => {
        this.spinner.hide();
        this.toastr.error(err.error.message, undefined, { timeOut: 5000 });
      }
    );
  }
}
