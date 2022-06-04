import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/common/interfaces';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit {

  userList: User[] = [];
  loading = true;

  @Output() evtUpdateUser: EventEmitter<User>;

  constructor(private userService: UsersService) {
    this.evtUpdateUser = new EventEmitter();
  }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => { this.userList = users.datos; this.loading = false })
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe()
    const toDelete = this.userList.findIndex(item => item.id_usuario === id);
    this.userList.splice(toDelete, 1);

  }
  updateUser(user: User) {
    this.evtUpdateUser.emit(user);
  }

}
