import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from '../auth.guard';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';

const routes: Routes = [
  {path: '', children: [
  { path: 'pedidos', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'productos', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'productos/:id_producto', component: ProductDetailComponent, canActivate: [AuthGuard] }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
