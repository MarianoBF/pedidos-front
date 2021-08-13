import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { loggedInUser } from './common/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user?: loggedInUser = this.authService.userData;

  constructor (private authService: AuthService, private router: Router) {}


  logout() {
    console.log("logout", "logged", this.authService.logged);
    this.authService.logout();
    this.router.navigate(['/login'])
    
  }

}
