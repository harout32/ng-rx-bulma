import { Action } from '@ngrx/store';

export type NotificationType = 'warning' | 'danger' | 'success';

export enum NotificationsActionTypes {
  addNotificationAction = '[ Add notification ] Action',
  removeNotificationAction = '[ Remove notifications ] Action'
}
let messageId = 0;
export class AddNotification implements Action {
  readonly type = NotificationsActionTypes.addNotificationAction;
  payload: { message: string; type: NotificationType; id: number; info: { value: string, [key: string]: string } };
  constructor(payload: { message: string; type: NotificationType }, info: { value: string, [key: string]: string } = { value: '' }) {
    this.payload = { ...payload, id: messageId, info };
    messageId++;
  }
}
export class RemoveNotification implements Action {
  readonly type = NotificationsActionTypes.removeNotificationAction;
  constructor(public payload: { id: number }) { }
}
export type NotificationsActions = AddNotification | RemoveNotification;
