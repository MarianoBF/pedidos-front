import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/interfaces';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {

  @Input() editing = false;
  @Input() user?: User;
  constructor() { }

  ngOnInit(): void {
  }

}
