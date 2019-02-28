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
import { ModalService } from '../../modal/modal.service';
import { AdminApiService } from '../../pages/admin-page/admin-api.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  @Input() user: User;
  @Input() allowEditName: boolean;
  editForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private adminApiService: AdminApiService
  ) {}

  ngOnInit() {
    this.editForm = this.fb.group({
      name: [
        '',
        [Validators.required, ValidUserName],
        ValidateUserNameNotTaken(this.user.name, this.adminApiService)
      ],
      age: ['', [Validators.required, ValidAge]],
      dateOfBirth: ['', [Validators.required, ValidDate('YYYY/MM/DD')]],
      dayOfNextNotification: [
        '',
        [Validators.required, ValidDate('DD-MMM-YY')]
      ],
      dayOfLogin: ['', [Validators.required, ValidDate('DD MMM YYYY')]]
    });
    // const userData = {
    //   name,
    //   age,
    //   dateOfBirth,
    //   dayOfNextNotification,
    //   dayOfLogin
    // };
    this.editForm.patchValue(this.user);
  }
  submit() {
    const data = {
      ...this.user,
      ...this.editForm.value,
      age: +this.editForm.value.age
    };
    this.modalService.close(data);
    // this.store.dispatch(new EditUserApiAction(data));
  }
  isFieldTouched(fieldName: string) {
    return this.editForm.get(fieldName).touched;
  }
}
