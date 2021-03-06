import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from '../common/guards/auth.guard';

const routes: Routes = [
  {path: '', children: [
  { path: 'pedidos', component: OrdersComponent, canActivate: [AuthGuard], title: 'ABM Pedidos' },
  { path: 'productos', component: ProductsComponent, canActivate: [AuthGuard], title: 'ABM Productos' },
  { path: 'usuarios', component: UsersComponent, canActivate: [AuthGuard], title: 'ABM Usuarios' },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
