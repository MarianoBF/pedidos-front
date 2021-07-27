import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';



@NgModule({
  declarations: [
    AddOrderComponent,
    ViewOrdersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CustomerModule { }
