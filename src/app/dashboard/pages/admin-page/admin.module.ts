import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from 'src/app/shared/shared.module';

import { AdminApiService } from './admin-api.service';
import { AdminEffects } from './admin.effects';

import * as fromAdmin from './admin.reducer';

import { AdminPageComponent } from './admin-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { DashboardSharedComponentsModule } from 'src/app/shared/dashboard-shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      { path: 'users', component: UsersPageComponent },
      { path: '', redirectTo: '/admin/users' }
    ]
  }
];

@NgModule({
  imports: [
    SharedModule,
    DashboardSharedComponentsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('admin', fromAdmin.AdminReducer),
    EffectsModule.forFeature([AdminEffects])
  ],
  exports: [],
  declarations: [
    AdminPageComponent,
    UsersPageComponent
  ],
  providers: [AdminApiService]
})
export class AdminModule {}
