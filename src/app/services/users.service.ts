import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http
      .get<any[]>(this.apiURL + 'usuarios')
      .pipe(tap((users) => console.log('retrieved users', users)));
  }
}
