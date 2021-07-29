import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/common/interfaces';
import { OrdersService } from '../../../../services/orders.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  displayedColumns: string[] = ['status', 'time', 'amount', 'type'];
  dataSource: Order[] = [];

  constructor(private orderService: OrdersService) {
    this.orderService.getOrders().subscribe(data => this.dataSource = data);
   }

  ngOnInit(): void {
  }

}