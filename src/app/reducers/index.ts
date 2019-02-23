import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { notificationsReducer, Notification } from '../notifications/notifications.reducer';
import { environment } from '../../environments/environment';

export interface State {
  notifications: Notification[];
}

export const reducers: ActionReducerMap<State> = {
  notifications: notificationsReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
