import { Injectable } from '@angular/core';
import { ProductInCart } from '../common/models/interfaces';
import { Product } from '../common/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: ProductInCart[] = [];

  constructor() {
  }

  getCart(): ProductInCart[] {
    return this.cart
  }

  addToCart(product: Product, quantity: number = 1): void {
    if (this.cart.findIndex(item => item.id_producto === product.id_producto) === -1) {
      const ProdToAdd = { ...product, quantity }
      this.cart.push(ProdToAdd)
    }
  }

  updateCart(product: Product, action: string): void {
    action === "add" ? this.cart[(this.cart.findIndex(item => item.id_producto === product.id_producto))].quantity++ : this.cart[(this.cart.findIndex(item => item.id_producto === product.id_producto))].quantity > 1 ? this.cart[(this.cart.findIndex(item => item.id_producto === product.id_producto))].quantity-- : null;
  }

  removeFromCart(product: Product): void {
    this.cart.splice(this.cart.findIndex(item => item.id_producto === product.id_producto), 1);
  }

  getCartItems() {
    return this.cart.reduce((a, b) => a + b.quantity, 0)
  }

  getCartDistinctItems() {
    return this.cart.length
  }

  getCartTotal() {
    return this.cart.reduce((a, b) => a + (b.quantity * b.precio), 0)
  }

  inCart(product: Product): boolean {
    return this.cart.some(item => item.id_producto === product.id_producto)
  }

  clear():void {
    this.cart = [];
  }

}
