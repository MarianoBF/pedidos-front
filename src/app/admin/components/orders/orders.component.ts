import { Component } from '@angular/core';
import { Order } from '../../../common/models/interfaces';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent {
  editing = false;
  add = false;
  order?: Order;

  addOrder(): void {
    this.add = true;
  }

  updateOrder(order: Order): void {
    this.editing = true;
    this.order = order;
  }

}
