import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  NotificationsActionTypes,
  AddNotification,
  RemoveNotification
} from './notifications.actions';
import { Notification } from '../notifications/notifications.reducer';
import { mergeMap, delay, map, tap } from 'rxjs/operators';
import { of, timer } from 'rxjs';

@Injectable()
export class NotificationsEffects {
  @Effect()
  addNotification$ = this.actions$.pipe(
    ofType<AddNotification>(NotificationsActionTypes.addNotificationAction),
    mergeMap((action) => timer(3000)
    .pipe(
        map(() => new RemoveNotification({ id: action.payload.id }))
        )
    )
  );

  constructor(private actions$: Actions) {}
}
