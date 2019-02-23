import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { State } from '../../../reducers';
import { Observable } from 'rxjs';
import { User } from '../../../models';
import { userProfile, isLoading } from '../../../auth/auth.selectors';
import { ModalService } from '../../modal/modal.service';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { EditUserApiAction } from '../../../auth/auth.actions';
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  user$: Observable<User>;
  isLoading$: Observable<boolean>;
  constructor(
    private store: Store<State>,
    private modalService: ModalService
  ) {}
  ngOnInit() {
    this.user$ = this.store.pipe(select(userProfile));
    this.isLoading$ = this.store.pipe(select(isLoading));
  }
  edit(user: User) {
    this.modalService
      .create(UserEditComponent, { user, allowEditName: false })
      .subscribe(data => {
        if (data) {
          this.store.dispatch(new EditUserApiAction(data));
        }
      });
  }
}
