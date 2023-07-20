import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  createForm!: FormGroup;

  constructor(private productsService: ProductsService) {
    this.createForm = new FormGroup({
      title: new FormControl<string>(''),
      price: new FormControl<number>(0),
      description: new FormControl<string>(''),
    });
  }

  submit() {
    const { title, price, description } = this.createForm.value;
    this.productsService.createProduct(title, price, description).subscribe();
  }
}
