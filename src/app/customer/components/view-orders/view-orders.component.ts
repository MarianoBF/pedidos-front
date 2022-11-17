import { Component, ViewChild, OnInit } from '@angular/core';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Order } from '../../../common/models/interfaces';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
})
export class ViewOrdersComponent implements OnInit {

  displayedColumns: string[] = ['id_pedido', 'estado', 'hora', 'pago_monto', 'pago_via'];
  dataSource: any;
  currentStatus: string = "";
  modifyID: number = -1;
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private orderService: OrdersService) {
    this.getOrders();
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrdersForUser().subscribe(data => {
      this.dataSource = new MatTableDataSource<Order>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    })
  }

  filter = ($event: any) => {
    this.dataSource.filter = $event.target.value.trim().toLocaleLowerCase();
  }
}
