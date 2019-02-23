import { AdminActionsType, AdminActions } from './admin.actions';

import { User } from 'src/app/models';

export interface AdminState {
  userList: User[];
  selectedUser: User;
}

const initalAdminState: AdminState = {
  userList: undefined,
  selectedUser: undefined
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
        selectedUser: action.payload
      };
    default:
      return state;
  }
}
