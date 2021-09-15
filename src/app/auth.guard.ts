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

  constructor(private authService: AuthService) { }

  canActivate(route:any): any {
    const role = this.authService.userData.role
    const userData = this.authService.userData
    if (userData.token) {
      const result = this.authService.refreshToken().toPromise().then(
        res => {
          return true
        }, err => {
          return false
        }
      )
      if (route.data.role.includes(role)) {
      return result
    } else {
      return false
    }
    } else if (!userData.token) {
      return false
    }  }

  canLoad(): any {
    const userData = this.authService.userData
    if (userData.token) {
      const result = this.authService.refreshToken().toPromise().then(
        res => {
          return true
        }, err => {
          return false
        }
      )
      return result
    } else if (!userData.token) {
      return false
    }
  }
}
