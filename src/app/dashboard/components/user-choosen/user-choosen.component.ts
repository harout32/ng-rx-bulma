import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, noop } from 'rxjs';
import { User } from '../../../models';
import { ModalService } from '../../modal/modal.service';
import { CanfirmComponent } from '../canfirm/canfirm.component';
import { tap } from 'rxjs/operators';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-choosen',
  templateUrl: './user-choosen.component.html',
  styleUrls: ['./user-choosen.component.scss']
})
export class UserChoosenComponent implements OnInit {
  @Input() user$: Observable<{ user: User; isLoading: boolean }>;
  @Output() delete: EventEmitter<void> = new EventEmitter();
  @Output() edit: EventEmitter<User> = new EventEmitter();
  constructor(private modalService: ModalService) {}

  ngOnInit() {}
  deleteUser(userName: string) {
    this.modalService
      .create(CanfirmComponent, {
        message: 'confirm.deleteUser',
        params: { value: userName }
      })
      .pipe(
        tap(data => {
          if (data) {
            this.delete.emit();
          }
        })
      )
      .subscribe(noop);
  }
  editUser(user: User) {
    this.modalService
      .create(UserEditComponent, { user, allowEditName: true })
      .pipe(
        tap(userEditedData => {
          if (userEditedData) {
            this.edit.emit(userEditedData);
          }
        })
      )
      .subscribe(noop, noop, () => {
        console.log('completed');
      });
  }
}
