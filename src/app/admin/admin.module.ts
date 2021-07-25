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

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';



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
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,

  ],
})
export class AdminModule { }
