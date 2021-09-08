import { Injectable } from '@angular/core';
import { Product } from '../common/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Product[] = [];

  constructor() {
  }

  addToCart(product: Product) {
    this.cart.push(product)
    console.log(this.cart)
  }

  removeFromCart(product: Product) {
    this.cart.splice(this.cart.findIndex(item=>item.id_producto = product.id_producto), 1);
    console.log(this.cart)
  }

}
