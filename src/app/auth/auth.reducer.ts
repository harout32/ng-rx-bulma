import { User } from '../models';
import { AuthActions, AuthActionTypes } from './auth.actions';

export interface AuthState {
  loggedIn: boolean;
  user: User;
  isLoading: boolean;
}

export const initialAuthState: AuthState = {
  loggedIn: false,
  user: undefined,
  isLoading: false
};

export function AdminReducer(
  state = initialAuthState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginAction:
      return {
        loggedIn: true,
        user: action.payload.user,
        isLoading: false
      };

    case AuthActionTypes.LogoutAction:
      return {
        loggedIn: false,
        user: undefined,
        isLoading: false
      };

    case AuthActionTypes.LoginApiAction:
      return {
        ...state,
        isLoading: true
      };
    case AuthActionTypes.EditUserApiAction:
      return {
        ...state,
        isLoading: true
      };
    case AuthActionTypes.EditUserAction:
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    case AuthActionTypes.SetLoader:
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
}
