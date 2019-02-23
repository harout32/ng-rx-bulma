import { AdminActionsType, AdminActions } from './admin.actions';

import { User } from 'src/app/models';

export interface AdminState {
  userList: User[];
  selectedUser: { user: User; isLoading: boolean };
}

const initalAdminState: AdminState = {
  userList: undefined,
  selectedUser: { user: undefined, isLoading: false }
};

export function AdminReducer(
  state: AdminState = initalAdminState,
  action: AdminActionsType
): AdminState {
  switch (action.type) {
    case AdminActions.SetUserList:
      return {
        ...state,
        userList: [...action.payload]
      };
    case AdminActions.SelectChoosenUser:
      return {
        ...state,
        selectedUser: { isLoading: false, user: action.payload }
      };
    case AdminActions.DeleteChoosenUser:
      return {
        ...state,
        selectedUser: { ...state.selectedUser, isLoading: true }
      };
    case AdminActions.EditChoosenUser:
      return {
        ...state,
        selectedUser: { ...state.selectedUser, isLoading: true }
      };
    default:
      return state;
  }
}
