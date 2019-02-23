import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Observable, interval, timer } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { State } from '../../../reducers';
import {
  ValidUserName,
  ValidDate,
  ValidAge,
  ValidateUserNameNotTaken
} from '../../../validators';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../models';
import { userProfile, isLoading } from '../../../auth/auth.selectors';
import {
  tap,
  first,
  take,
  finalize,
  takeUntil,
  takeWhile
} from 'rxjs/operators';
import { noop } from '@angular/compiler/src/render3/view/util';
import { EditUserApiAction } from 'src/app/auth/auth.actions';
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  user$: Observable<any>;
  isLoading$: Observable<boolean>;
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.pipe(
      select(isLoading)
    );
    this.user$ = this.store.pipe(
      select(userProfile),
      tap(({name, age, dateOfBirth, dayOfNextNotification, dayOfLogin}) => {
        const userData = {
          name,
          age,
          dateOfBirth,
          dayOfNextNotification,
          dayOfLogin
        };
        this.loginForm.patchValue(userData);
      }),
      take(1),
    );

    this.loginForm = this.fb.group({
      name: [
        '',
        [Validators.required, ValidUserName],
        ValidateUserNameNotTaken(this.authService)
      ],
      age: ['', [Validators.required, ValidAge]],
      dateOfBirth: ['', [Validators.required, ValidDate('YYYY/MM/DD')]],
      dayOfNextNotification: [
        '',
        [Validators.required, ValidDate('DD-MMM-YY')]
      ],
      dayOfLogin: ['', [Validators.required, ValidDate('DD MMM YYYY')]]
    });
    this.user$
      .pipe(finalize(console.log))
      .subscribe(console.log, null, console.log);
  }
  submit() {
    const data = {
      ...this.loginForm.value,
      age: +this.loginForm.value.age
    };
    this.store.dispatch(new EditUserApiAction(data));
  }
  isFieldTouched(fieldName: string) {
    return this.loginForm.get(fieldName).touched;
  }
}
