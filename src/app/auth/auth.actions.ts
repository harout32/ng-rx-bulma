import { Action } from '@ngrx/store';
import { User, UserEdit } from '../models';

export enum AuthActionTypes {
  LoginAction = '[Login] Action',
  LogoutAction = '[Logout] Action',
  LoginApiAction = '[Login Api] Action',
  EditUserApiAction = '[Edit User Api] Action',
  EditUserAction = '[Edit User] Action',
  SetLoader = '[Set Loader] Action'
}

export class Login implements Action {
  readonly type = AuthActionTypes.LoginAction;

  constructor(public payload: { user: User }) {}
}
export class LoginApi implements Action {
  readonly type = AuthActionTypes.LoginApiAction;

  constructor(public payload: { name: string; password: string }) {}
}
export class Logout implements Action {
  readonly type = AuthActionTypes.LogoutAction;
}
export class EditUserApiAction implements Action {
  readonly type = AuthActionTypes.EditUserApiAction;

  constructor(
    public payload: UserEdit
  ) {}
}
export class EditUserAction implements Action {
  readonly type = AuthActionTypes.EditUserAction;

  constructor(
    public payload: UserEdit
  ) {}
}
export class SetLoaderAction implements Action {
  readonly type = AuthActionTypes.SetLoader;
  constructor(public payload: boolean) {}
}
export type AuthActions = Login | Logout | LoginApi | EditUserAction | EditUserApiAction | SetLoaderAction;
