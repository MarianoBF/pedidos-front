import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  token$: Observable<any> = new Observable();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  handleLogin(values: any) {
    this.authService.login(values).subscribe((token) => {
      console.log(token);
      localStorage.setItem('pedidos_jwt_token', token.token)
    });
  }
}
