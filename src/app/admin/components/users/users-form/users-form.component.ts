import { Input } from '@angular/core';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { User } from 'src/app/common/interfaces';
import { UsersService } from '../../../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailValidatorService } from '../../../../services/email-validator.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
})
export class UsersFormComponent implements OnInit {
  @Input() editing = false;
  @Input() user?: User;

  @Output() done: EventEmitter<boolean>;

  userForm: FormGroup;

  constructor(
    private usersService: UsersService,
    private _snackBar: MatSnackBar,
    private emailValidSvc: EmailValidatorService,
  ) {
    this.userForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        this.userNameValidator
      ]),
      password: new FormControl('', this.requiredForCreating.bind(this)),
      confirmPassword: new FormControl('', this.requiredForCreating.bind(this)),
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required], [EmailValidatorService.validate(this.usersService)]),
      role: new FormControl('', [this.requiredForEditing.bind(this)]),
      address: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    }, { validators: this.checkEqualValidator('password', 'confirmPassword') });
    this.done = new EventEmitter();
  }

  requiredForEditing(control: AbstractControl): ValidationErrors | null {
    if (this.editing && (control.value === 'administrador' || control.value === 'usuario')) {
      return null
    } else if (this.editing && control.value?.length > 1) {
      return {'invalidRole': true}
    }
    else if (!this.editing) {
      return null;
    }
    else {
      return { 'required': true }
    }
  }

  requiredForCreating(control: AbstractControl): ValidationErrors | null {
    if (!this.editing && control.value?.length > 1) {
      return null
    } else if (this.editing) {
      return null;
    }
    else {
      return { 'required': true }
    }
  }


  userNameValidator(control: FormControl) {
    const name: string = control.value?.toLowerCase()
    if (name?.includes('admin')) {
      return {
        nameNotValid: true,
      }
    }
    return null
  }

  checkEqualValidator(field1: string, field2: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.userForm?.get(field1)?.value === this.userForm?.get(field2)?.value) {
        this.userForm?.get(field2)?.setErrors(null)
        return null
      }
      this.userForm?.get(field2)?.setErrors({ notEqual: true })
      return { notEqual: true };
    }
  }

  ngOnInit(): void {
    if (this.user) {
      this.userForm.patchValue({
        userName: this.user.nombre_usuario,
        fullName: this.user.nombre_completo,
        email: this.user.email,
        address: this.user.direccion,
        phone: this.user.telefono,
        role: this.user.rol,
      });
    }
  }

  onCancel(): void {
    setTimeout(() => {
      this.done.emit(false);
      this.userForm.reset();
    }, 500);
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
      if (this.editing) {
        const id = this.user?.id_usuario || 0; // TODO chequear;
        this.usersService.updateUser(id, user).subscribe(_ => {
          this._snackBar.open('Usuario actualizado con éxito', 'Cerrar', {
            duration: 4000,
          });
        });
      } else {
        this.usersService.addUser(user).subscribe(_ => {
          this._snackBar.open('Usuario agregado con éxito', 'Cerrar', {
            duration: 4000,
          });
        });
      }
    } catch (error) {
      this._snackBar.open(
        'Hubo un problema al agregar el usuario, reintente en unos minutos',
        'Cerrar',
        {
          duration: 4000,
        }
      );
    } finally {
      setTimeout(() => {
        this.done.emit(true);
        this.userForm.reset();
      }, 4000);
    }
  }
}
