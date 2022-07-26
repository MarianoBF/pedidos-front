import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../common/guards/auth.guard';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';

const routes: Routes = [
  {path: '', children: [
  { path: 'pedir', component: AddOrderComponent, canActivate: [AuthGuard], title:'Realizar un pedido' },
  { path: 'misPedidos', component: ViewOrdersComponent, canActivate: [AuthGuard], title: 'Ver los pedidos que realicé' },
  { path: '**', redirectTo: 'misPedidos' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
