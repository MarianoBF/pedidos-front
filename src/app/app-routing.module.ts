import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
// import { OrdersComponent } from './admin/components/orders/orders.component';
// import { ProductsComponent } from './components/products/products.component';
// import { UsersComponent } from './components/users/users.component';
// import { AuthGuard } from './auth.guard';
// import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  // { path: 'pedidos', component: OrdersComponent, canActivate: [AuthGuard] },
  // { path: 'productos', component: ProductsComponent, canActivate: [AuthGuard] },
  // { path: 'usuarios', component: UsersComponent, canActivate: [AuthGuard] },
  // { path: '', component: LoginComponent},
  // { path: '**', redirectTo: '/' }

  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canLoad: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
