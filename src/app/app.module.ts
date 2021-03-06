import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './common/interceptors/auth-interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages-auth/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './admin/admin.module';

import { AdminRoutingModule } from './admin/admin-routing.module';
import { MaterialUIModule } from './material-ui.module';
import { ErrorInterceptor } from './common/interceptors/error-interceptor';
import { RegisterComponent } from './pages-auth/register/register.component';
import { AdminMenuComponent } from './admin/components/admin-menu/admin-menu.component';
import { CustomerMenuComponent } from './customer/components/customer-menu/customer-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminMenuComponent,
    CustomerMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AdminModule,
    MaterialUIModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
