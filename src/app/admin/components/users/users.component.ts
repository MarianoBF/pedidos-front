import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/interfaces';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  editing: boolean = false;
  add: boolean = false;
  user?: User;

  constructor() {}

  ngOnInit(): void {}

  addUser() {
    this.add = true;
  }

  updateUser(user: User) {
    this.editing = true;
    this.user = user;
  }

  handleFinish() {
    this.user = undefined;
    this.add = false;
    this.editing = false;
  }
}
