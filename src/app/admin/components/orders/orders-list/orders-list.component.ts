import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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

  displayedColumns: string[] = ['id_pedido', 'estado', 'hora', 'pago_monto', 'pago_via', 'id_usuario', 'details'];
  // dataSource: Order[] = [];
  currentStatus: string = "";
  modifyID: number = -1;
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private orderService: OrdersService, public dialog: MatDialog) {
    this.orderService.getOrders().subscribe(data => {
      this.dataSource =  new MatTableDataSource<Order>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    })
  }

  ngOnInit(): void {
  }

  filter = ($event: any) => {
    this.dataSource.filter = $event.target.value.trim().toLocaleLowerCase();
  }

  showDetails(id:number) {
    const dialog = this.dialog.open(OrdersDialogueComponent, {
      width: '300px',
      data: { id , status: null, show: 'details' }
    })
  }

  updatePedido(id: number, status: string) {
    console.log("modificar pedido", id);
    this.modifyID = id;
    this.currentStatus = status;
    const dialog = this.dialog.open(OrdersDialogueComponent, {
      width: '300px',
      data: { id: this.modifyID, status: this.currentStatus, show: 'status' }
    })
    dialog.afterClosed().pipe(filter(res => res && res.length > 1), switchMap(res =>
      this.orderService.updateOrder(
        this.modifyID, { estado: res }))).subscribe(
          data => {console.log(data);
            this.orderService.getOrders().subscribe(data => this.dataSource = [...data]);
          })


  }
}