import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { MaterialUIModule } from '../material-ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';
import { ProductsListComponent } from './components/add-order/products-list/products-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DirectivesModule } from '../directives/directives.module';



@NgModule({
  declarations: [
    AddOrderComponent,
    ViewOrdersComponent,
    ProductsListComponent,
  ],
  imports: [
    CommonModule,
    MaterialUIModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerRoutingModule,
    FlexLayoutModule,
    DirectivesModule,
  ]
})
export class CustomerModule { }
