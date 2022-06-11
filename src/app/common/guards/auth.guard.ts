import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  debug = environment.debug

  constructor(private authService: AuthService) { }

  canActivate(route:any): any {
    const role = this.authService.userData.role
    const userData = this.authService.userData
    const visitor = this.authService.isVisitor;

    if (visitor) {return true}

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
    const visitor = this.authService.isVisitor;
    if (this.debug) console.log("loadVisitor?", visitor)

    if (visitor) {return true}

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
