import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../../models';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserViewComponent implements OnInit {
  @Input() user: User;
  constructor() { }

  ngOnInit() {
  }

}
