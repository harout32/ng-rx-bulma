import { NgModule } from '@angular/core';

import {
  SidenavComponent,
  UserChoosenComponent,
  UserDropdownItemComponent,
  UserDropdownListComponent,
  UserListComponent,
  UserViewComponent,
  CanfirmComponent,
  UserEditComponent,
  PersonalInfoComponent
} from '../dashboard/components';
import { SharedModule } from './shared.module';
import { AdminApiService } from '../dashboard/pages/admin-page/admin-api.service';

const COMPONENTS = [
  SidenavComponent,
  UserChoosenComponent,
  UserDropdownItemComponent,
  UserDropdownListComponent,
  UserListComponent,
  UserViewComponent,
  CanfirmComponent,
  UserEditComponent,
  PersonalInfoComponent
];
@NgModule({
  imports: [SharedModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
  entryComponents: [CanfirmComponent, UserEditComponent],
  providers: [AdminApiService]
})
export class DashboardSharedComponentsModule {}
