import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from '../auth.guard';
import { LoginComponent } from '../components/login/login.component';

const routes: Routes = [
  { path: 'pedidos', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'productos', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsersComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent},
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
