import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from '../../reducers';

import { selectNotifications} from '../notifications.selectors';
import { RemoveNotification } from '../notifications.actions';
import { Notification } from '../notifications.reducer';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  public notifications$: Observable<Notification[]>;
  constructor(private store: Store<State>) {}
  ngOnInit() {
    this.notifications$ = this.store.pipe(select(selectNotifications));
  }
  removeNotification(id: number) {
    this.store.dispatch(new RemoveNotification({ id }));
  }
}
