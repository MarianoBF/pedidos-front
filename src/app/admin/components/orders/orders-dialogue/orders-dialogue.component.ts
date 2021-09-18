import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersService } from '../../../../services/orders.service';

@Component({
  selector: 'app-orders-dialogue',
  templateUrl: './orders-dialogue.component.html',
  styleUrls: ['./orders-dialogue.component.css']
})
export class OrdersDialogueComponent implements OnInit {
  status: string = "";
  show = 'status'

  constructor(private dialogRef: MatDialogRef<OrdersDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number, status: string, show?:string}, private ordersService: OrdersService) { }

  ngOnInit(): void {
    console.log(this.data)
    if (this.data.show === 'details') {
      this.ordersService.getAllProductsForOrder(this.data.id).toPromise().then(res=>console.log(res))
    }
  }

  handleSelect(status: any) {
    this.status = status.target.value;
  }

  save() {
    this.dialogRef.close(this.status)
  }

  close() {
    this.dialogRef.close()
  }

}
