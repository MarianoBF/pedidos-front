import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";
import { decodedToken } from './common/interfaces';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //Check if token is current, 
    // const storedToken = (JSON.parse(localStorage.getItem('pedidos456') || '[]') || "")
    const userData = this.authService.userData
    if (userData.token) {
      const decodedStoredToken: decodedToken = jwt_decode(userData.token)
      if (decodedStoredToken.exp >= Date.now() / 1000) {
        return true
      }
      else {
        return false
      };
    } else {
      return false
    }
  }

  canLoad(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //Check if token is current, 
    // const storedToken = (JSON.parse(localStorage.getItem('pedidos456') || '[]') || "")
    const userData = this.authService.userData
    if (userData.token) {
      const decodedStoredToken: decodedToken = jwt_decode(userData.token)
      if (decodedStoredToken.exp >= Date.now() / 1000) {
        return true
      }
      else {
        return false
      };
    } else {
      return false
    }
  }

}
