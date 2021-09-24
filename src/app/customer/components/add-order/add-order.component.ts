import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';
import { ProductInCart, Product } from '../../../common/interfaces';
import { OrdersService } from '../../../services/orders.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  cart: ProductInCart[] = [];
  paymentMethod: "efectivo" | "tarjeta" = "efectivo";
  ordering = false;
  orderNumber: number = 0;
  ordered = false;
  userID: number = 0;
  orderNotes = "";

  constructor(private cartService: CartService, private ordersService: OrdersService, private authService: AuthService) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.userID = this.authService.userData.id;
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

  clear(): void {
    this.ordered = false;
    this.ordering = false;
    this.cartService.clear();
    this.cart = this.cartService.getCart();
  }

  confirm(): void {
    console.log("adding order")
    let total = 0;
    this.ordering = true;
    this.ordersService.addOrder(this.paymentMethod, this.orderNotes, 3).subscribe(res=>{
      this.orderNumber = res.id_pedido || 0;
      console.log(res.id_pedido, this.userID,)
      console.log("cart", this.cart)
      this.cart.forEach(prod=>total += prod.precio * prod.quantity)
      this.ordersService.updateOrderAmount(this.orderNumber, total).subscribe(res=>console.log(res))
      this.cart.forEach(prod=>this.ordersService.addProductToOrder(this.orderNumber, this.userID, prod.id_producto!, prod.quantity).subscribe(res=>{
        console.log("added", prod.id_producto, prod.quantity, res);
      }))
      console.log("total", total)
      this.ordered = true;
      ;
    })
  }

}
