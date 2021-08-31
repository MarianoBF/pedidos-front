import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { loggedInUser, loginCredentialsForm, tokenResponse } from '../common/interfaces';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiURL;
  private _userData: loggedInUser = {name: "", token: ""};
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('pedidos456');
    if (storedUser) {this._userData = JSON.parse(storedUser||'[]')};
  }

  get userData() {
    if (this._userData.name) {
    return this._userData;
    }
    return {name: "", token: ""};
  }

    //TODO provisorio ejemplo -- o con un método checkauth? 
  get logged () {
    return this.userData?.token !== ""
  }

  get role() {
    if (this.userData.token) {
      let role: any = jwt_decode(this.userData.token)
      role = role.rol
      return role}
    return null
  }

  login(values: loginCredentialsForm) {
    const credentials = {
      nombre_usuario: values.userName,
      password: values.password,
    }
    return this.http
      .post<tokenResponse>(this.apiUrl+"usuario/login", credentials, this.httpOptions)
      .pipe(tap(res => {
        console.log('Login attemp for', values.userName)
        localStorage.setItem('pedidos456', JSON.stringify({token:res.token, name:values.userName}));
        this._userData = {name: String(values.userName), token: String(res.token)};
      }),map(_=>true),catchError(err=>of(false)));
  }
   
  logout() {
    localStorage.removeItem('pedidos456')
    this._userData = {name: "", token: ""};
  }

  refreshToken() {
    return this.http.get<tokenResponse>(this.apiUrl+"usuarios/refreshToken")
    .pipe(tap(res => {
      localStorage.setItem('pedidos456', JSON.stringify({token:res.token, name:this.userData.name}));
      this._userData = {name: String(this.userData.name), token: String(res.token)};
    }),map(_=>true),catchError(err=>of(false)));

  }
}
