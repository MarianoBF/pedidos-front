import { Input } from '@angular/core';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { User } from 'src/app/common/interfaces';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailValidatorService } from '../../services/email-validator.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {
    console.log('registrando usuario!');
    this.userForm = new FormGroup(
      {
        userName: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          this.userNameValidator,
        ]),
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
        fullName: new FormControl('', [Validators.required]),
        email: new FormControl(
          '',
          [Validators.required],
          [EmailValidatorService.validate(this.usersService)]
        ),
        role: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        // phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
        phone: new FormControl('', [Validators.required]),
      },
      { validators: this.checkEqualValidator('password', 'confirmPassword') }
    );
  }

  userNameValidator(control: FormControl) {
    const name: string = control.value?.toLowerCase();
    
    if (name?.includes('admin')) {
      return {
        nameNotValid: true,
      };
    }
    return null;
  }

  checkEqualValidator(field1: string, field2: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (
        this.userForm?.get(field1)?.value === this.userForm?.get(field2)?.value
      ) {
        this.userForm?.get(field2)?.setErrors(null);
        return null;
      }
      this.userForm?.get(field2)?.setErrors({ notEqual: true });
      return { notEqual: true };
    };
  }

  ngOnInit(): void {
    console.log(this.userForm.asyncValidator)
  }

  onCancel(): void {
    this.router.navigate(['/login']);
  }

  onSubmit(): void {
    const user: User = {
      nombre_usuario: this.userForm.value.userName,
      nombre_completo: this.userForm.value.fullName,
      email: this.userForm.value.email,
      direccion: this.userForm.value.address,
      telefono: this.userForm.value.phone,
      password: this.userForm.value.password,
      rol: this.userForm.value.role,
    };
    try {
      this.usersService.registerUser(user).subscribe((data) => {
        console.log(data);
        this._snackBar.open('Registro exitoso!', 'Cerrar', {
          duration: 4000,
        });
        const login = {
          username: this.userForm.value.userName,
          password: this.userForm.value.password,
        };
        this.authService.login(login).subscribe((res) => {
          if (res) {
            this.router.navigate(['/admin/pedidos']);
          }
        });
      });
    } catch (error) {
    
      console.log(error);
      this._snackBar.open(
        'Hubo un problema al agregar el usuario, reintente en unos minutos',
        'Cerrar',
        {
          duration: 4000,
        }
      );
    }
  }
}
