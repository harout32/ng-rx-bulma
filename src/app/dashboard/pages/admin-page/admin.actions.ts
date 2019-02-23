import { User } from '../../../models';

export enum AdminActions {
    SetUserList = '[Admin Set UserLis] Action',
    ResetUserList = '[Admin Reset UserList] Action',
    SelectChoosenUser = '[Admin Select Choosen User] Action'
}


export class SetUserListAction {
    readonly type = AdminActions.SetUserList;
    constructor(public payload: User[]) { }
}
export class ResetUserListAction {
    readonly type = AdminActions.ResetUserList;
}
export class SelectChoosenUserAction {
    readonly type = AdminActions.SelectChoosenUser;
    constructor(public payload: User) { }
}
export type AdminActionsType = SetUserListAction | ResetUserListAction | SelectChoosenUserAction;