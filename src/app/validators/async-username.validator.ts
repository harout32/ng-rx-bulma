import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { map, switchMap, catchError, skip, mapTo, tap } from 'rxjs/operators';
import { timer, of } from 'rxjs';
import { AdminApiService } from '../dashboard/pages/admin-page/admin-api.service';

export function ValidateUserNameNotTaken(
  initalName: string,
  adminApiService: AdminApiService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (control.value === initalName || control.value.trim() === '') {
      return of(null);
    }

    return timer(700).pipe(
      switchMap((data: number, index: number) =>
      adminApiService.validateUserName(control.value).pipe(
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
