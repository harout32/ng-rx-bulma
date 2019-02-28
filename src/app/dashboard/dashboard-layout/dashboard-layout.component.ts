import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../../reducers';
import { Logout } from 'src/app/auth/auth.actions';
import { Observable } from 'rxjs';
import { isAdmin } from 'src/app/auth/auth.selectors';
import { SideNavItem, RolesEnum } from '../../models';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  public showUserDropdown = false;
  isAdmin$: Observable<boolean>;
  sideNavItems: SideNavItem[] = [
    {
      name: 'common.profile',
      route: '/profile',
      icon: 'typcn typcn-clipboard',
      requiredRole: RolesEnum.all
    },
    {
      name: 'common.admin',
      route: '/admin',
      icon: 'typcn typcn-key',
      requiredRole: RolesEnum.admin,
      children: [
        {
          name: 'common.users',
          icon: 'typcn typcn-group',
          route: '/admin/users',
          requiredRole: RolesEnum.admin
        }
      ]
    },
    {
      name: 'common.feedback',
      route: '/feedback',
      icon: '',
      requiredRole: RolesEnum.user
    }
  ];
  constructor(
    private store: Store<State>,
  ) {}

  ngOnInit() {
    this.isAdmin$ = this.store.pipe(select(isAdmin));
  }
  logout() {
    this.store.dispatch(new Logout());
  }

}
