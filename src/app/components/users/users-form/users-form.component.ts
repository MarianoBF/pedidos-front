import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/common/interfaces';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css'],
})
export class UsersFormComponent implements OnInit {
  @Input() editing = false;
  @Input() user?: User;

  userForm: FormGroup;

  constructor(private usersService: UsersService) {
    this.userForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      role: new FormControl(''),
      address: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    if (this.user) {
      this.userForm.patchValue({
        userName: this.user.nombre_usuario,
        fullName: this.user.nombre_completo,
        email: this.user.email,
        address: this.user.direccion,
        phone: this.user.telefono,
      });
    }
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
    if (this.editing) {
      const id = this.user?.id_usuario || 0; // TODO chequear;
      this.usersService
        .updateUser(id, user)
        .subscribe((data) => console.log(data));
    } else {
      this.usersService.addUser(user).subscribe((data) => console.log(data));
    }
  }
}
