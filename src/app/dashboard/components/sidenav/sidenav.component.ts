import { Component, OnInit, Input } from '@angular/core';
import { SideNavItem } from '../../../models';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from '../../../reducers';
import { isAdmin } from '../../../auth/auth.selectors';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() items: SideNavItem[];
  isAdmin$: Observable<boolean>;
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
}
