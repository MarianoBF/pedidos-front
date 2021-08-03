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
  modifyID: number = -1;

  constructor(private orderService: OrdersService) {
    this.orderService.getOrders().subscribe(data => this.dataSource = data);
   }

  ngOnInit(): void {
  }

  updatePedido(id: number) {
    console.log("modificar pedido", id)
    this.modifyID = id;
    this.changeStatus = true;
  }

  statusUpdate([status, id]:any[]){
    console.log(status, this.modifyID)
    this.orderService.updateOrder(this.modifyID, {estado: status}).subscribe(data=> console.log(data))

  }

}
