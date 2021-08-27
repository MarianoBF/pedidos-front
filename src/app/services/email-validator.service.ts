import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {
  
  constructor(private http: HttpClient) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const email = control.value;

    console.log("email valid", email, environment.apiURL);
    if (email === '' || !email || email.length < 5) {
    return of(null)
    }

    return this.http.get<any>(environment.apiURL + 'usuarios/checkMail/' + email).pipe(map(res => {
      console.log(res)
      if (res.available === "no") {
        return of({ emailTaken: res.message });
      } else {
        return of(null)
      }
    }))
  }
}
