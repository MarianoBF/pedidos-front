import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { NewUser, User, UserResponse } from '../common/models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiURL = environment.apiURL;
  private debug = environment.debug;

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http
      .get<UserResponse>(this.apiURL + 'usuarios')
      .pipe(tap((users) => { if (this.debug) console.log('retrieved users', users) }));
  }

  addUser(user: User) {
    return this.http
      .post<User>(this.apiURL + 'usuario/crear', user)
      .pipe(tap((user) => { if (this.debug) console.log('added user', user) }));
  }

  registerUser(user: NewUser) {
    return this.http
      .post<User>(this.apiURL + 'usuario/registro', user)
      .pipe(tap((user) => { if (this.debug) console.log('added user', user) }));
  }

  updateUser(id: number, user: User) {
    return this.http
      .put<User>(this.apiURL + 'usuario/' + id, user)
      .pipe(tap((user) => { if (this.debug) console.log('updated user', user) }));
  }

  deleteUser(id: number) {
    return this.http
      .delete<any>(this.apiURL + 'usuario/' + id)
      .pipe(tap((user) => { if (this.debug) console.log('deleted user', user, 'with id', id) }));
  }

  checkMail(email: string) {
    if (this.debug) console.log("checkmail", email)
    return this.http
      .get<any>(this.apiURL + 'usuarios/checkMail/' + email)
      .pipe(tap((users) => { if (this.debug) console.log('retrieved users', users) }));
  }
}
