import { NgModule } from '@angular/core';

import {
  ProfileEditComponent,
  SidenavComponent,
  ProfileViewComponent,
  UserChoosenComponent,
  UserDropdownItemComponent,
  UserDropdownListComponent,
  UserListComponent,
  UserViewComponent,
  CanfirmComponent
} from '../dashboard/components';
import { SharedModule } from './shared.module';

const COMPONENTS = [
  ProfileEditComponent,
  SidenavComponent,
  ProfileViewComponent,
  UserChoosenComponent,
  UserDropdownItemComponent,
  UserDropdownListComponent,
  UserListComponent,
  UserViewComponent,
  CanfirmComponent
];
@NgModule({
  imports: [SharedModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
  entryComponents: [CanfirmComponent],
  providers: []
})
export class DashboardSharedComponentsModule { }
