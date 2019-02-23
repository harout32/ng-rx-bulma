import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-dropdown-item',
  templateUrl: './user-dropdown-item.component.html',
  styleUrls: ['./user-dropdown-item.component.scss']
})
export class UserDropdownItemComponent implements OnInit {
@Input()user: User;
@Input()seletedUser$: Observable<User>;
@Output()whenSelect: EventEmitter<User> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  select() {
    this.whenSelect.emit(this.user);
  }
}
