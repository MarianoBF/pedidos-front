import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:8500/api/v1';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  login(values: any) {
    const credentials = {
      nombre_usuario: values.userName,
      password: values.password,
    }
    return this.http
      .post<any>(this.apiUrl+"/usuario/login", credentials, this.httpOptions)
      .pipe(tap((user) => console.log('Login attemp for', user)));
  }
}
