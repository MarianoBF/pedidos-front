import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') loginForm!: NgForm
  logged = false;
  loading = false;
  role = '';

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.logged = !!this.authService.userData.token
    this.role = this.authService.userData.role
    console.log("logged", this.logged, this.role)
    if (this.logged) {
      if (this.role === 'administrador') {
        this.router.navigate(['/admin/pedidos']);
      } else {
        this.router.navigate(['/cliente/pedir']);
      }
    }
  }

  handleLogin() {
    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe((res) => {
      if (res) {
        this.authService.userData.role === 'administrador' ? this.router.navigate(['/admin/pedidos']) : this.router.navigate(['/cliente/pedir'])
      } else {
        this.loading = false;
        this._snackBar.open('No se pudo loguear, revise los datos ingresados', 'Cerrar', {
          duration: 4000,
        });
      }

    })
      ;
  }

  isVisitor() {
    this.authService.setVisitor(true)
  }
}
