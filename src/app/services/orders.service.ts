import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { NewOrder, Order, OrderToUpdate } from '../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http
      .get<Order[]>(this.apiURL + 'pedidos')
      .pipe(tap((orders) => console.log('retrieved order', orders)));
  }

  addOrder(method: string, notes:string, user: number) {
    const data = {
      pago_via: method,
      id_usuario: user,
      observaciones: notes,
    }
    return this.http
      .post<Order>(this.apiURL + 'pedido/', data)
      .pipe(tap((order) => console.log('added order', order)));
  }

  addProductToOrder(orderID:number, userID: number, productID:number, Quantity:number) {
    const data = {
      id_usuario: userID,
      id_producto: productID,
      cantidad_producto: Quantity
    }
    console.log("ID", orderID)
    return this.http
      .post<any>(this.apiURL + 'detallePedido/' + orderID, data)
      .pipe(tap((prod) => console.log('added product', prod)));
  }

  updateOrder(id: number, status: OrderToUpdate) {
    return this.http
      .patch<Order>(this.apiURL + 'pedido/' + id, status)
      .pipe(tap((order) => console.log('updated order', order)));
  }
  
  updateOrderObs(id: number, observaciones: any) {
    return this.http
      .patch<Order>(this.apiURL + 'pedidoObs/' + id, observaciones)
      .pipe(tap((order) => console.log('updated order', order)));
  }

  updateOrderAmount(id: number, pago_monto: number) {
    return this.http
      .patch<Order>(this.apiURL + 'pedidoAmo/' + id, {pago_monto})
      .pipe(tap((order) => console.log('updated order amount for', order)));
  }

  deleteOrder(id: number) {
    return this.http
      .delete<any>(this.apiURL + 'pedido/' + id)
      .pipe(tap((data) => console.log('deleted order', data)));
  }

  //return orders of the user with the current token
  getOrdersForUser() {
    return this.http
      .get<Order[]>(this.apiURL + 'pedidos')
      .pipe(tap((orders) => console.log('retrieved orders', orders)));
  }

  getAllProductsForOrder(id:number) {
    return this.http
      .get<Order[]>(this.apiURL + 'detallePedido/' + id)
      .pipe(tap((orders) => console.log('retrieved order details', orders)));
  }
}
