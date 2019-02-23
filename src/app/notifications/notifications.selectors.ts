import { createSelector, createFeatureSelector } from '@ngrx/store';
import { NotificationState } from './notifications.reducer';
import { State } from '../reducers';


export const selectNotifications = createFeatureSelector<State, NotificationState>('notifications');
