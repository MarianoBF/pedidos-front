import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Observable, of, timer } from 'rxjs';
import { debounceTime, delay, first, map, switchMap } from 'rxjs/operators';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
// export class EmailValidatorService implements AsyncValidator {
  
//   constructor(private http: HttpClient) { }

//   validate(control: AbstractControl): Observable<ValidationErrors | null> {

//     const email = control.value;

//     console.log("email valid", email, environment.apiURL);
//     if (email === '' || !email || email.length < 5) {
//     return of(null)
//     }

//      return of(email).pipe(debounceTime(10),delay(1000),switchMap(email =>
//       this.http.get<any>(environment.apiURL + 'usuarios/checkMail/' + email)),map(
//       res => {
//       console.log(res)
//       if (res.available === "no") {
//         return of({invalidAsync: true});
//       } else if (res.available === "yes") {
//         return of(null)
//       } else {
//         return of(null)
//       }
//     }),first())
//   }
// }
export class EmailValidatorService{

  static validate(usersSrv: UsersService) {


    return (control:AbstractControl) => {

      if (control.pristine) {
        return of(null); 
      } 

      return timer(500).pipe(
          switchMap(()=>{
            return usersSrv.checkMail(control.value)
          }), map (res=> res?.available==="yes" ? null : {emailTaken: true})
          )
    }

  }
}