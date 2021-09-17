import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // token$: Observable<any> = new Observable();

  @ViewChild('loginForm') loginForm!: NgForm
  logged = false;

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.authService.loggedRes().then(res => {
      this.logged = res

      if (this.logged) {
        console.log("logged", this.logged)
        this.router.navigate(['/admin/pedidos']);
      }
    })
  }

  handleLogin() {
    console.log("logging in")
    this.authService.login(this.loginForm.value).subscribe((res) => {
      console.log("res login", res)
      if (res) {
        this.authService.userData.role === 'administrador' ? this.router.navigate(['/admin/pedidos']) : this.router.navigate(['/cliente/pedir'])
      } else {
        this._snackBar.open('No se pudo loguear, revise los datos ingresados', 'Cerrar', {
          duration: 4000,
        });
      }

    })
      ;
  }
}
