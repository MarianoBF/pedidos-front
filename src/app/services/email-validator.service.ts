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
  private apiUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    const email = control.value;

    console.log("email valid", email,this.apiUrl)

    return of(null)

    // return this.http.get<any>(this.apiUrl + 'usuarios/checkMail?email=' + email).pipe(map(res => {
    //   console.log(res)
    //   if (res.available === "no") {
    //     return { emailTaken: res.message };
    //   } else {
    //     return null
    //   }
    // }))
  }
}
