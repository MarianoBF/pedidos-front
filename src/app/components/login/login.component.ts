import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Router }  from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // token$: Observable<any> = new Observable();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.logged) {
      console.log("logged", this.authService.logged)
      this.router.navigate(['/admin/pedidos']);
    }
  }

  handleLogin(values: any) {
    this.authService.login(values).subscribe(()=>this.router.navigate(['/admin/pedidos']));
  }
}
