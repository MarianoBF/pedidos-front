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