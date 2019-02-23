import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../../reducers';
import { Logout } from 'src/app/auth/auth.actions';
import { Observable, pipe } from 'rxjs';
import { isAdmin } from 'src/app/auth/auth.selectors';
import { SideNavItem } from '../../models';
import { ModalService } from '../modal/modal.service';
import { UserDropdownListComponent } from '../components';
import { take } from 'rxjs/operators';

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
      adminRequired: false
    },
    {
      name: 'common.admin',
      route: '/admin',
      icon: 'typcn typcn-key',
      adminRequired: true,
      children: [
        {
          name: 'common.users',
          icon: 'typcn typcn-group',
          route: '/admin/users',
          adminRequired: true
        }
      ]
    }
  ];
  constructor(
    private store: Store<State>,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.isAdmin$ = this.store.pipe(select(isAdmin));
  }
  logout() {
    this.store.dispatch(new Logout());
  }

}
