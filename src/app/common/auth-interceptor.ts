import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const storedToken = (JSON.parse(localStorage.getItem('pedidos456') || '[]') || "")
    if (!storedToken) {
      return next.handle(req);
    }
    const headers = req.clone({
      headers: req.headers.set('x-access-token', storedToken.token),
    });
    return next.handle(headers);
  }
}
