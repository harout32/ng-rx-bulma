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
  PersonalInfoComponent,
  FeedbackFormComponent,
  FeedbackMessageViewComponent
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
  PersonalInfoComponent,
  FeedbackFormComponent,
  FeedbackMessageViewComponent
];
@NgModule({
  imports: [SharedModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
  entryComponents: [CanfirmComponent, UserEditComponent, FeedbackMessageViewComponent],
  providers: [AdminApiService]
})
export class DashboardSharedComponentsModule {}
