import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { loggedInUser } from './common/models/interfaces';
import { Subscription } from 'rxjs';

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
  subs: Subscription[] = [];

  constructor (private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // this.user = this.authService.userData;
    this.subs.push(this.authService.loggedStatus.subscribe(res=>this.logged = res));
    this.subs.push(this.authService.userInfo.subscribe(res=>{
      this.user = res;
      this.role = res.role}));
    this.subs.push(this.authService.visitor.subscribe(
      res=>this.visitor = res));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
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
    this.router.navigate(['/registro'])
  }

}
