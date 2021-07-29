import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { loggedInUser } from '../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiURL;
  private _userData: loggedInUser = {name: "", token: ""};
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  get userData() {
    return {...this._userData};
  }

    //TODO provisorio ejemplo
  get logged () {
    return this.userData.token !== ""
  }

  login(values: any) {
    const credentials = {
      nombre_usuario: values.userName,
      password: values.password,
    }
    return this.http
      .post<any>(this.apiUrl+"usuario/login", credentials, this.httpOptions)
      .pipe(tap(res => {
        console.log('Login attemp for', values.userName)
        localStorage.setItem('pedidos_jwt_token', res.token)
        this._userData = {name: String(values.userName), token: String(res.token)};
      }));
  }
   
  logout() {
    localStorage.removeItem('pedidos_jwt_token')
    this._userData = {name: "", token: ""};
  }
}
