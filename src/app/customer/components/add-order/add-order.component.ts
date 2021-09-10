import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';
import { ProductInCart, Product } from '../../../common/interfaces';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  cart: ProductInCart[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  handleProductUpdate($event:any){
    console.log($event)
    if ($event[1]==="add") {
      this.cartService.addToCart($event[0])
    }
    if ($event[1]==="increase") {
      this.cartService.updateCart($event[0], "add")
    }
    if ($event[1]==="decrease") {
      this.cartService.updateCart($event[0], "dec")
    }
  }

  delete(item: Product) {
    this.cartService.removeFromCart(item)
  }

  quantity(): number {
    return this.cartService.getCartItems()
  }

}
