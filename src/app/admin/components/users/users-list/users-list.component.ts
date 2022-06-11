import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../../common/models/interfaces';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit {

  userList: User[] = [];
  loading = true;

  @Output() evtUpdateUser: EventEmitter<User>;

  constructor(private userService: UsersService,
              private _snackBar: MatSnackBar
  ) {
    this.evtUpdateUser = new EventEmitter();
  }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => { this.userList = users.datos; this.loading = false })
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      _ => {
        this._snackBar.open("Usuario borrado con éxito", "Cerrar", {
          duration: 4000
        })

      }
    )
    const toDelete = this.userList.findIndex(item => item.id_usuario === id);
    this.userList.splice(toDelete, 1);

  }
  updateUser(user: User) {
    this.evtUpdateUser.emit(user);
  }

}
