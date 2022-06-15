import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { loggedInUser, loginCredentialsForm, tokenResponse, decodedToken } from '../common/models/interfaces';
import jwt_decode from "jwt-decode";
import { AES, enc } from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiURL;
  private debug = environment.debug;
  private _userData: loggedInUser = { name: "", token: "", role: "", id: 0 };

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private logged = new BehaviorSubject<boolean>(this._userData.token !== '')
  public loggedStatus = this.logged.asObservable();

  private _userInfo = new BehaviorSubject<loggedInUser>({ name: "", token: "", role: "", id: 0 })
  public userInfo = this._userInfo.asObservable();

  private _visitor = new BehaviorSubject<boolean>(false)
  public visitor = this._visitor.asObservable();

  constructor(private http: HttpClient) {
    let storedUser = '';
    try {
        storedUser = AES.decrypt(
        localStorage.getItem('pedidos456') || '', environment.seed)
            .toString(enc.Utf8)
    } catch (error) {
        localStorage.removeItem('pedidos456');
        if (environment.debug) console.log("error", error)
    }
    if (storedUser) { this._userData = JSON.parse(storedUser || '[]') };
    const storedVisitor = localStorage.getItem('pedidos456Visitor');
    if (storedVisitor) { this._visitor.next(JSON.parse(storedVisitor)) };
  }

  get userData() {
    if (this._userData.name) {
      return this._userData;
    }
    return { name: "", token: "", role: "", id: 0 };
  }

  get isVisitor() {
    return this._visitor.value
  }

  login(values: loginCredentialsForm) {
    const credentials = {
      nombre_usuario: values.userName,
      password: values.password,
    }
    return this.http
      .post<tokenResponse>(this.apiUrl + "usuario/login", credentials, this.httpOptions)
      .pipe(tap(res => {
        if (this.debug) console.log('Login attemp for', values.userName)
        let decoded: decodedToken = jwt_decode(res.token)
        if (this.debug) console.log("decoded", decoded)
        this._userData = { name: decoded.nombre_usuario, token: String(res.token), id: Number(decoded.id_usuario), role: decoded.rol };
        this.logged.next(this._userData.token !== '')
        this._userInfo.next(this._userData)
        const encUserData = AES.encrypt(JSON.stringify(this._userData), environment.seed).toString();
        localStorage.setItem('pedidos456', encUserData);
      }), map(_ => true), catchError(err => { if (this.debug) console.log(err); return of(false) }));
  }

  logout() {
    localStorage.removeItem('pedidos456')
    this._userData = { name: "", token: "", role: "", id: 0 };
  }

  refreshToken() {
    return this.http.get<tokenResponse>(this.apiUrl + "usuarios/refreshToken")
      .pipe(tap(res => {
        const encUserData = AES.encrypt(JSON.stringify(this._userData), environment.seed).toString();
        localStorage.setItem('pedidos456', encUserData);
        let decoded: decodedToken = jwt_decode(this.userData.token)
        this._userData = { name: decoded.nombre_usuario, token: String(res.token), id: Number(decoded.id_usuario), role: decoded.rol };
        this.logged.next(this._userData.token !== '')
        this._userInfo.next(this._userData)
      }), map(_ => true), catchError(err => of(false)));
  }

  loggedRes() {
    return this.loggedStatus.toPromise();
  }

  setVisitor(status: boolean = false): void {
    if (this.debug) console.log("status", status)
    this._visitor.next(status);
    if (status) {
      localStorage.setItem('pedidos456Visitor', JSON.stringify(this.isVisitor));
    } else {
      localStorage.removeItem('pedidos456Visitor');
    }
  }


}
