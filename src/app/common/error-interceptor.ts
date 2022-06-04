import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private _snackBar: MatSnackBar) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err) {
                if (err.error) {
                    this._snackBar.open(err.error, "Cerrar", {
                        duration: 8000,
                        verticalPosition: 'top',
                        horizontalPosition: 'end'
                    })
                }
                else {
                    this._snackBar.open(err.statusText, "Cerrar", {
                        duration: 8000,
                        verticalPosition: 'top',
                        horizontalPosition: 'end'
                    })
                }
            }
            if (err.status === 401) {
                this._snackBar.open("Problema de autenticación, reingrese datos de login", "Cerrar", {
                    duration: 5000,
                    verticalPosition: 'top',
                    horizontalPosition: 'end'
                })
                this.authService.logout();
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}