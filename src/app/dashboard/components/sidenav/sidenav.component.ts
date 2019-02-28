import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { SideNavItem, RolesEnum } from '../../../models';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from '../../../reducers';
import { isAdmin } from '../../../auth/auth.selectors';
import { shareReplay } from 'rxjs/operators';
import { Logout } from '../../../auth/auth.actions';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent implements OnInit {
  @Input() items: SideNavItem[];
  isAdmin$: Observable<boolean>;
  readonly roleEnum = RolesEnum;
  sideMenueCollapsed = false;
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.isAdmin$ = this.store.pipe(
      select(isAdmin),
      shareReplay()
    );
  }
  toggleSideMenue() {
    this.sideMenueCollapsed = !this.sideMenueCollapsed;
  }
  logout() {
    this.store.dispatch(new Logout());
  }
}
