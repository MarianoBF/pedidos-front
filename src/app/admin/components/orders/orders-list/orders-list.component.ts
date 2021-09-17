import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
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

  displayedColumns: string[] = ['orderNumber', 'status', 'hora', 'pago_monto', 'type', 'user'];
  dataSource: Order[] = [];
  currentStatus: string = "";
  modifyID: number = -1;

  constructor(private orderService: OrdersService, public dialog: MatDialog) {
    this.orderService.getOrders().subscribe(data => this.dataSource = data);
  }

  ngOnInit(): void {
  }
  
  sortData(sort: Sort) {
    const data = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = data;
      return;
    }
    this.dataSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'hora': return compare(String(a.hora), String(b.hora), isAsc);
        case 'pago_monto': return compare(a.pago_monto, b.pago_monto, isAsc);
        default: return 0;
      }
    });
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

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}