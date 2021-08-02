import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/common/interfaces';
import { OrdersService } from '../../../../services/orders.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  displayedColumns: string[] = ['orderNumber', 'status', 'time', 'amount', 'type', 'user'];
  dataSource: Order[] = [];
  changeStatus = false;

  constructor(private orderService: OrdersService) {
    this.orderService.getOrders().subscribe(data => this.dataSource = data);
   }

  ngOnInit(): void {
  }

  updatePedido(id: number) {
    console.log("modificar pedido", id)
    this.changeStatus = true;
  }

}
