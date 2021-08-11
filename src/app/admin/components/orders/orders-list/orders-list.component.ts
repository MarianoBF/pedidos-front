import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Order } from 'src/app/common/interfaces';
import { OrdersService } from '../../../../services/orders.service';
import { OrdersDialogueComponent } from '../orders-dialogue/orders-dialogue.component';

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

  constructor(private orderService: OrdersService, public dialog: MatDialog) {
    this.orderService.getOrders().subscribe(data => this.dataSource = data);
   }

  ngOnInit(): void {
  }

  updatePedido(id: number) {
    console.log("modificar pedido", id)
    this.dialog.open( OrdersDialogueComponent, {
      width: '300px'
    } )
    this.modifyID = id;
    this.changeStatus = true;
  }

  statusUpdate([status, id]:any[]){
    console.log(status, this.modifyID)
    this.orderService.updateOrder(this.modifyID, {estado: status}).subscribe(data=> console.log(data))
    this.orderService.getOrders().subscribe(data => this.dataSource = [...data]);
    this.changeStatus = false;
  }

}
