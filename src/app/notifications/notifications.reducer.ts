import {
  NotificationType,
  NotificationsActions,
  NotificationsActionTypes
} from './notifications.actions';

export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
  info: {value: string};
}
export type NotificationState = Notification[];

export function notificationsReducer(
  state: NotificationState = [],
  action: NotificationsActions
) {
  switch (action.type) {
    case NotificationsActionTypes.addNotificationAction:
      return [...state, action.payload];
    case NotificationsActionTypes.removeNotificationAction:
      return state.filter(
        notification => notification.id !== action.payload.id
      );
    default:
      return state;
  }
}
