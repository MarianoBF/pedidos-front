import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";
import { decodedToken } from './common/interfaces';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //Check if token is current, 
    const current_token: decodedToken = (jwt_decode(localStorage.getItem('pedidos_jwt_token') || ""));
    if (current_token.exp >= Date.now() / 1000) {
      return true
    }
    else {
      return false
    };
  }

  canLoad(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //Check if token is current, 
    const current_token: decodedToken = (jwt_decode(localStorage.getItem('pedidos_jwt_token') || ""));
    if (current_token.exp >= Date.now() / 1000) {
      return true
    }
    else {
      return false
    };
  }

}
