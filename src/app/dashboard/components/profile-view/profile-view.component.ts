import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { State } from '../../../reducers';
import { Observable } from 'rxjs';
import { User } from '../../../models';
import { userProfile } from '../../../auth/auth.selectors';
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  user$: Observable<User>;
  constructor(private store: Store<State>) { }
  ngOnInit() {
    this.user$ = this.store.pipe(select(userProfile));
  }

}
