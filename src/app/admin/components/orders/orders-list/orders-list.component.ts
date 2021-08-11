import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { switchMap, filter } from 'rxjs/operators';
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
  currentStatus: string = "";
  modifyID: number = -1;

  constructor(private orderService: OrdersService, public dialog: MatDialog) {
    this.orderService.getOrders().subscribe(data => this.dataSource = data);
  }

  ngOnInit(): void {
  }

  updatePedido(id: number, status: string) {
    console.log("modificar pedido", id);
    this.modifyID = id;
    this.currentStatus = status;
    const dialog = this.dialog.open(OrdersDialogueComponent, {
      width: '300px',
      data: { id: this.modifyID, status: this.currentStatus }
    })
    dialog.afterClosed().pipe(filter(res => res && res.length > 1), switchMap(res =>
      this.orderService.updateOrder(
        this.modifyID, { estado: res }))).subscribe(
          data => {console.log(data);
            this.orderService.getOrders().subscribe(data => this.dataSource = [...data]);
          })


  }
}
