import { Injectable } from '@angular/core';
import { Product, ProductInCart } from '../common/interfaces';

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
    if (this.cart.findIndex(item => item.id_producto = product.id_producto) === -1) {
      const ProdToAdd = { ...product, quantity }
      this.cart.push(ProdToAdd)
      console.log("cart", this.cart)
    }
  }

  updateCart(product: Product, action: string): void {
    action === "add" ? this.cart[(this.cart.findIndex(item => item.id_producto = product.id_producto))].quantity++ : this.cart[(this.cart.findIndex(item => item.id_producto = product.id_producto))].quantity--;
    console.log("cart", this.cart)
  }

  removeFromCart(product: Product): void {
    this.cart.splice(this.cart.findIndex(item => item.id_producto = product.id_producto), 1);
    console.log("cart", this.cart)
  }

}