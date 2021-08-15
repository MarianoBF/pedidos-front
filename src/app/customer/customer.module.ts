import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { MaterialUIModule } from '../material-ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';



@NgModule({
  declarations: [
    AddOrderComponent,
    ViewOrdersComponent
  ],
  imports: [
    CommonModule,
    MaterialUIModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerRoutingModule,
  ]
})
export class CustomerModule { }
