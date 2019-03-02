import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  AuthActionTypes,
  Login,
  Logout,
  LoginApi,
  EditUserApiAction,
  EditUserAction,
  SetLoaderAction
} from './auth.actions';
import { tap, catchError, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { defer, of, EMPTY, throwError } from 'rxjs';

import { AuthService } from './auth.service';
import { User } from '../models';
import { AddNotification } from '../notifications/notifications.actions';
import { Store } from '@ngrx/store';
import { State } from '../reducers';

@Injectable()
export class AuthEffects {
  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action => {
      sessionStorage.setItem('user', JSON.stringify(action.payload.user));
      this.router.navigate(['/']);
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap(() => {
      sessionStorage.removeItem('user');
      this.router.navigateByUrl('/auth/login');
    })
  );
  @Effect()
  loginApi$ = this.actions$.pipe(
    ofType<LoginApi>(AuthActionTypes.LoginApiAction),
    switchMap(res =>
      this.authService.login(res.payload.name, res.payload.password)
    ),
    tap((loginRes: User) =>
      this.dispatchSuccessNotification('welcome', {
        value: loginRes.name
      })
    ),
    map((loginRes: User) => new Login({ user: loginRes })),

    catchError(this.dispatchErrorNotifications.bind(this))
  );

  @Effect()
  apiUserEdit$ = this.actions$.pipe(
    ofType<EditUserApiAction>(AuthActionTypes.EditUserApiAction),
    switchMap(action => this.authService.editUser(action.payload)),
    map(res => new EditUserAction(res)),
    tap(() => this.dispatchSuccessNotification('successEdit')),
    tap(() => this.router.navigate(['/'])),
    catchError(this.dispatchErrorNotifications.bind(this))
  );

  @Effect()
  init$ = defer(() => {
    const userData = sessionStorage.getItem('user');

    if (userData) {
      return of(new Login({ user: JSON.parse(userData) }));
    } else {
      return of(new Logout()) as any;
    }
  });

  dispatchErrorNotifications(error) {
    this.store.dispatch(
      new AddNotification({
        message: error.message ? error.message : 'somethingWentWrong',
        type: 'danger'
      })
    );
    return of(new SetLoaderAction(false));
  }
  dispatchSuccessNotification(message: string, ...args) {
    this.store.dispatch(
      new AddNotification({ message, type: 'success' }, ...args)
    );
  }
  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
    private store: Store<State>
  ) {}
}
