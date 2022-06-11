import { Component } from '@angular/core';
import { Product } from '../../../common/models/interfaces';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  editing: boolean = false;
  add: boolean = false;
  product?: Product;

  constructor() {}


  addProduct() {
    this.add = true;
  }

  updateProduct(product: Product) {
    this.editing = true;
    this.product = product;
  }

  handleFinish() {
    this.add = false;
    this.editing = false;
    this.product = undefined;
  }
}
