import { createSelector } from '@ngrx/store';

const selectAdminState = state => {
  return state.admin;
};

export const selectAdminUserList = createSelector(
  selectAdminState,
  admin => admin.userList
);
export const selectAdminSelectedUser = createSelector(
    selectAdminState,
    admin => admin.selectedUser
);
