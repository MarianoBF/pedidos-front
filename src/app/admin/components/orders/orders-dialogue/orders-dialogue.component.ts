import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersService } from '../../../../services/orders.service';
import { ProductsService } from '../../../../services/products.service';
import { Order } from '../../../../common/models/interfaces';

@Component({
  selector: 'app-orders-dialogue',
  templateUrl: './orders-dialogue.component.html',
  styleUrls: ['./orders-dialogue.component.css']
})
export class OrdersDialogueComponent implements OnInit {
  status: string = "";
  items: any;
  loading = true;
  observaciones = "";

  constructor(private dialogRef: MatDialogRef<OrdersDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {pedido: Order, status: string, show:string}, private ordersService: OrdersService, private ProductsService: ProductsService) {
      this.observaciones = data.pedido.observaciones!
    }

  ngOnInit(): void {
    if (this.data.show === 'details') {
      this.ordersService.getAllProductsForOrder(this.data.pedido.id_pedido!).toPromise().then(res=>{
        this.items = res;
        this.loading = false;
        this.ProductsService.getProducts().toPromise().then(res=> {
          for (let item of this.items) {
            const prodData = res.find(elem => elem.id_producto === item.id_producto)
            item.precio = prodData?.precio;
            item.nombre = prodData?.nombre;
          }
        })
      })
    }
  }

  handleSelect(status: any) {
    this.status = status.target.value;
  }

  save() {
    this.dialogRef.close(this.status)
  }

  saveObs() {
    this.dialogRef.close(this.observaciones)
  }

  close() {
    this.dialogRef.close()
  }

}
