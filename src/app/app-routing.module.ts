import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './common/guards/auth.guard';
import { LoginComponent } from './pages-auth/login/login.component';
import { RegisterComponent } from './pages-auth/register/register.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canLoad: [AuthGuard],
    data: {
      role: 'administrador'
    }
  },
  {
    path: 'cliente',
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerModule),
    canLoad: [AuthGuard],
    data: {
      role: ['usuario', 'administrador']
    }
  },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'registro', component: RegisterComponent, title: 'Registrar un Usuario'},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
