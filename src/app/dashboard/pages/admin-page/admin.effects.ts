import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { State } from './../../../reducers';
import { Store } from '@ngrx/store';
import { AdminApiService } from './admin-api.service';
import {
  DeleteChoosenUserAction,
  AdminActions,
  SelectChoosenUserAction,
  EditChoosenUserAction
} from './admin.actions';
import { switchMap, withLatestFrom, mapTo, map, tap } from 'rxjs/operators';
import { selectAdminSelectedUser } from './admin.selectors';
import { User } from '../../../models';

@Injectable()
export class AdminEffects {
  @Effect()
  deleteUser$ = this.actions$.pipe(
    ofType<DeleteChoosenUserAction>(AdminActions.DeleteChoosenUser),
    withLatestFrom(this.store$.select(selectAdminSelectedUser)),
    switchMap(([action, selectedUser]) =>
      this.adminApiService.deleteUserById(selectedUser.user.id)
    ),
    mapTo(new SelectChoosenUserAction(undefined))
  );
  @Effect()
  editUser$ = this.actions$.pipe(
    ofType<EditChoosenUserAction>(AdminActions.EditChoosenUser),
    switchMap(action =>
      this.adminApiService.editUserById(action.payload.id, action.payload)
    ),
    map((user: User) => new SelectChoosenUserAction(user))
  );
  constructor(
    private actions$: Actions,
    private router: Router,
    private store$: Store<State>,
    private adminApiService: AdminApiService
  ) {}
}
