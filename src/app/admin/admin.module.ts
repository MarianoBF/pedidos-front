import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersListComponent } from './components/users/users-list/users-list.component';
import { UsersFormComponent } from './components/users/users-form/users-form.component';
import { OrdersListComponent } from './components/orders/orders-list/orders-list.component';
import { ProductsComponent } from './components/products/products.component';
import { UsersComponent } from './components/users/users.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsFormComponent } from './components/products/products-form/products-form.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialUIModule } from '../material-ui.module';
import { AdminRoutingModule } from './admin-routing.module';
import { OrdersDialogueComponent } from './components/orders/orders-dialogue/orders-dialogue.component';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    ProductsFormComponent,
    ProductsListComponent,
    UsersListComponent,
    UsersFormComponent,
    OrdersListComponent,
    ProductsComponent,
    UsersComponent,
    OrdersComponent,
    OrdersDialogueComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialUIModule,
    AdminRoutingModule,
    FlexLayoutModule,

  ],
})
export class AdminModule { }
