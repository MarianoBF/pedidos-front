import { Component } from '@angular/core';
import { Order } from 'src/app/common/interfaces';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent {

  displayedColumns: string[] = ['orderNumber', 'status', 'time', 'amount', 'type', 'user'];
  dataSource: Order[] = [];
  currentStatus: string = "";
  modifyID: number = -1;

  constructor(private orderService: OrdersService) {
    this.orderService.getOrdersForUser().subscribe(data => this.dataSource = data);
  }
}
