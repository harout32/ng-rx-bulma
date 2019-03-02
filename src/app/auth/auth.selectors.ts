import { createSelector } from '@ngrx/store';

export const selectAuthState = state => {
  return state.auth;
};
export const selectLoggedInUser = state => {
  return state.auth.user;
};

export const isLoggedIn = createSelector(
  selectAuthState,
  auth => auth.loggedIn
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn => !loggedIn
);

export const isLoading = createSelector(
  selectAuthState,
  auth => auth.isLoading
);
export const userProfile = createSelector(
  selectAuthState,
  auth => auth.user
);
export const isAdmin = createSelector(
  selectLoggedInUser,
  user => user ? user.admin : false
);
