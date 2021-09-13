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

  addOrder(method: string, user: number) {
    const data = {
      pago_via: method,
      id_usuario: user
    }
    return this.http
      .post<Order>(this.apiURL + 'pedido/', data)
      .pipe(tap((order) => console.log('added order', order)));
  }

  updateOrder(id: number, product: OrderToUpdate) {
    return this.http
      .patch<Order>(this.apiURL + 'pedido/' + id, product)
      .pipe(tap((order) => console.log('updated order', order)));
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
}
