import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { UsersComponent } from './components/users/users.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'pedidos', component: OrdersComponent },
  { path: 'productos', component: ProductsComponent },
  { path: 'usuarios', component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
