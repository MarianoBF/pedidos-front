import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { loggedInUser } from './common/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user?: loggedInUser = this.authService.userData;
  logged = false;
  role = "";
  openMenu = false;
  visitor = false;

  constructor (private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // this.user = this.authService.userData;
    this.authService.loggedStatus.subscribe(res=>this.logged = res);
    this.authService.userInfo.subscribe(res=>{
      this.user = res;
      this.role = res.role});
    this.authService.visitor.subscribe(
      res=>this.visitor = res)
  }

  logout() {
    this.logged = false;
    this.authService.logout();
    this.router.navigate(['/login'])
    
  }

  close() {
    this.openMenu = false;
  }

  registerVisitor() {
    this.authService.setVisitor(false);
    this.router.navigate(['/cliente/registro'])
  }

}
