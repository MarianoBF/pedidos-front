import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Order } from '../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http
      .get<Order[]>(this.apiURL + 'pedidos')
      .pipe(tap((prods) => console.log('retrieved products', prods)));
  }

  addOrder(product: Order) {
    return this.http
      .post<any>(this.apiURL + 'pedido/', product)
      .pipe(tap((order) => console.log('retrieved products', order)));
  }

  updateOrder(id: number, product: Order) {
    return this.http
      .put<any>(this.apiURL + 'pedido/' + id, product)
      .pipe(tap((order) => console.log('retrieved products', order)));
  }

  deleteOrder(id: number) {
    return this.http
      .delete<any>(this.apiURL + 'pedido/' + id)
      .pipe(tap((order) => console.log('retrieved products', order)));
  }
}
