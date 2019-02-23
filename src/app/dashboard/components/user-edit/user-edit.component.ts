import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable, noop } from 'rxjs';

import { AuthService } from '../../../auth/auth.service';
import {
  ValidUserName,
  ValidAge,
  ValidateUserNameNotTaken,
  ValidDate
} from '../../../validators';
import { User } from '../../../models';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  @Input() user$: Observable<User>;
  @Input() allowEditName: boolean;
  @Input() isLoading$: Observable<boolean>;
  editForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.user$
      .pipe(
        tap(({ name, age, dateOfBirth, dayOfNextNotification, dayOfLogin }) => {
          const userData = {
            name,
            age,
            dateOfBirth,
            dayOfNextNotification,
            dayOfLogin
          };
          this.editForm.patchValue(userData);
        })
      )
      .subscribe(noop);

    this.editForm = this.fb.group({
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
  }
  submit() {
    const data = {
      ...this.editForm.value,
      age: +this.editForm.value.age
    };
    // this.store.dispatch(new EditUserApiAction(data));
  }
  isFieldTouched(fieldName: string) {
    return this.editForm.get(fieldName).touched;
  }
}
