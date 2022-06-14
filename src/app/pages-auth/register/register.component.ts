import { Input } from '@angular/core';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { NewUser } from '../../common/models/interfaces';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailValidatorService } from '../../services/email-validator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userForm: UntypedFormGroup;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {
    this.userForm = new UntypedFormGroup(
      {
        userName: new UntypedFormControl('', [
          Validators.required,
          Validators.minLength(5),
          this.userNameValidator,
        ]),
        password: new UntypedFormControl('', [Validators.required]),
        confirmPassword: new UntypedFormControl('', [Validators.required]),
        fullName: new UntypedFormControl('', [Validators.required]),
        email: new UntypedFormControl(
          '',
          [Validators.required],
          [EmailValidatorService.validate(this.usersService)]
        ),
        address: new UntypedFormControl('', [Validators.required]),
        phone: new UntypedFormControl('', [Validators.required]),
      },
      { validators: this.checkEqualValidator('password', 'confirmPassword') }
    );
  }

  userNameValidator(control: UntypedFormControl) {
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
  }

  onCancel(): void {
    this.router.navigate(['/login']);
  }

  onSubmit(): void {
    const user: NewUser = {
      nombre_usuario: this.userForm.value.userName,
      nombre_completo: this.userForm.value.fullName,
      email: this.userForm.value.email,
      direccion: this.userForm.value.address,
      telefono: this.userForm.value.phone,
      password: this.userForm.value.password,
    };
    try {
      this.usersService.registerUser(user).subscribe(_ => {
        this._snackBar.open('Registro exitoso! Redirigiendo a login', 'Cerrar', {
          duration: 4000,
        });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2500)

      });
    } catch (error) {

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