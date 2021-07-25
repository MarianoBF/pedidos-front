import { Component, OnInit } from '@angular/core';
import { Order } from '../../../common/interfaces';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  editing: boolean = false;
  add: boolean = false;
  order?: Order;

  constructor() { }

  ngOnInit(): void {
  }

  addOrder(): void {
    this.add = true;
  }

  updateOrder(order: Order): void {
    this.editing = true;
    console.log('editando', order);
    this.order = order;
  }

}
