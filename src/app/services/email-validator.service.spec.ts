import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { of } from 'rxjs';
import { EmailValidatorService } from './email-validator.service';
import { UsersService } from './users.service';

describe('EmailValidatorService', () => {
  let emailValidatorService: EmailValidatorService;
  let usersService: UsersService;
  let httpClient: HttpClient

  beforeEach(async() => {
    usersService = new UsersService(httpClient); // Create a mock instance of UsersService if needed

    await TestBed.configureTestingModule({
        declarations: [],
        imports: [],
        providers: [
          { provide: UsersService, useValue: usersService },
        ]
      }).compileComponents();  

});

  it('should return null if control is pristine', (done) => {
    const control = { pristine: true } as AbstractControl;
    const validatorFn = EmailValidatorService.validate(usersService);
    const result$ = validatorFn(control);

    result$.subscribe((result) => {
      expect(result).toEqual(null);
      done();
    });

  });

  it('should return an Observable with emailTaken: true if email is already taken', (done) => {
    const mockCheckMailResult = { available: 'no' }; // Mock the result of usersService.checkMail()
    jest.spyOn(usersService, 'checkMail').mockReturnValue(of(mockCheckMailResult));

    const control = { value: 'test@example.com' } as AbstractControl;
    const validatorFn = EmailValidatorService.validate(usersService);
    const result$ = validatorFn(control);

    result$.subscribe((result) => {
      expect(result).toEqual({ emailTaken: true });
      done();
    });
  });

  it('should return an Observable with null if email is available', (done) => {
    const mockCheckMailResult = { available: 'yes' }; // Mock the result of usersService.checkMail()
    jest.spyOn(usersService, 'checkMail').mockReturnValue(of(mockCheckMailResult));

    const control = { value: 'test@test.com' } as AbstractControl;
    const validatorFn = EmailValidatorService.validate(usersService);
    const result$ = validatorFn(control);

    result$.subscribe((result) => {
      expect(result).toEqual(null);
      done();
    });
  });

});
