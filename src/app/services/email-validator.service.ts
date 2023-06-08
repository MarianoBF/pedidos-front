import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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

      return timer(1500).pipe(
          switchMap(()=>{
            return usersSrv.checkMail(control.value)
          }), map (res=> res?.available==="yes" ? null : {emailTaken: true})
          )
    }

  }
}