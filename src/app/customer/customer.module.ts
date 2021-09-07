import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { MaterialUIModule } from '../material-ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';
import { ProductsListComponent } from './components/add-order/products-list/products-list.component';
import { CustomerMenuComponent } from './components/customer-menu/customer-menu.component';



@NgModule({
  declarations: [
    AddOrderComponent,
    ViewOrdersComponent,
    ProductsListComponent,
    CustomerMenuComponent,
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
