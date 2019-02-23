import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { map, switchMap, catchError, skip, mapTo, tap } from 'rxjs/operators';
import { timer, of } from 'rxjs';

export function ValidateUserNameNotTaken(
  authService: AuthService
): AsyncValidatorFn {
  let count = 0;
  return (control: AbstractControl) => {
    count++;
    if (count < 4) {
      return of(null);
    }

    return timer(700).pipe(
      switchMap((data: number, index: number) =>
        authService.validateUserName(control.value).pipe(
          map(res => {
            return !res.length ? null : { userNameTaken: true };
          }),
          // Set error object on error response
          catchError(() => of({ userNameTaken: true }))
        )
      )
    );
  };
}
