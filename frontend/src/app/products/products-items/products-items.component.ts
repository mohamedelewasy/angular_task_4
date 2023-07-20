import { Component, Input } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-products-items',
  templateUrl: './products-items.component.html',
  styleUrls: ['./products-items.component.css'],
})
export class ProductsItemsComponent {
  @Input() products!: Product[];
}
