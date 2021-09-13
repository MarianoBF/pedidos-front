import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';
import { ProductInCart, Product } from '../../../common/interfaces';
import { OrdersService } from '../../../services/orders.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  cart: ProductInCart[] = [];
  paymentMethod: "efectivo" | "tarjeta" = "efectivo";

  constructor(private cartService: CartService, private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  handleProductUpdate($event:any){
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

  distinctQuantity(): number {
    return this.cartService.getCartDistinctItems()
  }

  total(): number {
    return this.cartService.getCartTotal()
  }

  confirm(): void {
    console.log("adding order")
    this.ordersService.addOrder(this.paymentMethod, 3).subscribe(res=>console.log(res))
  }

}
