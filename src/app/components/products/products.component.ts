import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/interfaces';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  editing: boolean = false;
  add: boolean = false;
  product?: Product;

  constructor() {}

  ngOnInit(): void {}

  addProduct() {
    this.add = true;
  }

  updateProduct(product: Product) {
    this.editing = true;
    console.log('editando', product);
    this.product = product;
  }

  handleFinish() {
    this.add = false;
    this.editing = false;
  }
}
