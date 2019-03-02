import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, tap, switchMap, shareReplay } from 'rxjs/operators';
import { noop, Observable, of, empty } from 'rxjs';
import { AdminApiService } from '../../pages/admin-page/admin-api.service';
import { State } from '../../../reducers';
import { Store, select } from '@ngrx/store';
import {
  SetUserListAction,
  SelectChoosenUserAction,
  DeleteChoosenUserAction,
  EditChoosenUserAction
} from '../../pages/admin-page/admin.actions';
import { User } from 'src/app/models';
import {
  selectAdminUserList,
  selectAdminSelectedUser
} from '../../pages/admin-page/admin.selectors';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  searchForm: FormGroup;
  isSearchLoading = false;
  userList$: Observable<User[]>;
  selectedUser$: Observable<User[]>;
  overlay = false;
  constructor(
    private fb: FormBuilder,
    private adminApiService: AdminApiService,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.userList$ = this.store.pipe(select(selectAdminUserList));
    this.selectedUser$ = this.store.pipe(
      select(selectAdminSelectedUser),
      shareReplay()
    );
    this.searchForm = this.fb.group({
      search: ['']
    });
    this.searchForm.controls.search.valueChanges
      .pipe(
        tap(() => (this.isSearchLoading = true)),
        switchMap(value => {
          const trimedValue = value.trim();
          if (trimedValue === '') {
            this.isSearchLoading = false;
            this.store.dispatch(new SetUserListAction([]));
            return empty();
          }
          return of(value).pipe(
            debounceTime(1000),
            switchMap(searchValue => {
              return this.adminApiService.getUsersByName(searchValue);
            }),
            tap(users => {
              this.isSearchLoading = false;
              this.store.dispatch(new SetUserListAction(users));
            })
          );
        })
      )
      .subscribe(noop);
  }
  selectUser(user: User) {
    this.overlay = false;
    this.setUserNameToSearchInput(user.name);
    this.store.dispatch(new SelectChoosenUserAction(user));
    this.store.dispatch(new SetUserListAction([]));
  }
  deleteUser() {
    this.store.dispatch(new DeleteChoosenUserAction());
  }
  editUser(user: User) {
    this.setUserNameToSearchInput(user.name);
    this.store.dispatch(new EditChoosenUserAction(user));
  }
  focus() {
    this.overlay = true;
  }
  closeDropDown() {
    this.overlay = false;
    this.store.dispatch(new SetUserListAction([]));
  }
  private setUserNameToSearchInput(name: string) {
    this.searchForm.patchValue(
      { search: name },
      { emitEvent: false, onlySelf: true }
    );
  }
}
