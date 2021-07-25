import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http
      .get<User[]>(this.apiURL + 'usuarios')
      .pipe(tap((users) => console.log('retrieved users', users)));
  }

  addUser(user: User) {
    return this.http
      .post<User>(this.apiURL + 'usuario/crear', user)
      .pipe(tap((user) => console.log('added user', user)));
  }

  updateUser(id: number, user: User) {
    return this.http
      .put<User>(this.apiURL + 'usuario/' + id, user)
      .pipe(tap((user) => console.log('updated user', user)));
  }

  deleteUser(id: number) {
    return this.http
      .delete<any>(this.apiURL + 'usuario/' + id)
      .pipe(tap((user) => console.log('deleted user', user, 'with id', id)));
  }
}
