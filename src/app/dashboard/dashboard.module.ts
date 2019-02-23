import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { AdminCanLoadGuard } from './guards/admin-can-load.guard';
import { AdminCanActivateGuard } from './guards/admin-can-activate.guard';
import { DashboardSharedComponentsModule } from '../shared/dashboard-shared-components.module';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ModalComponent } from './modal/modal.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/admin/users' },
      {
        path: 'profile', component: ProfilePageComponent, children: [
          { path: '', pathMatch: 'full', component: ProfileViewComponent },
          { path: 'edit', component: ProfileEditComponent },
        ]
      },
      {
        path: 'admin',
        loadChildren: './pages/admin-page/admin.module#AdminModule',
        canLoad: [AdminCanLoadGuard],
        canActivate: [AdminCanActivateGuard]
      },
      { path: 'not-found', component: NotFoundPageComponent },
      { path: '**', redirectTo: '/not-found' }
    ]
  }
];

@NgModule({
  imports: [
    SharedModule,
    DashboardSharedComponentsModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
  declarations: [
    ProfilePageComponent,
    NotFoundPageComponent,
    DashboardLayoutComponent,
    UserEditComponent,
    ModalComponent,
  ],

  providers: [AdminCanLoadGuard, AdminCanActivateGuard]
})
export class DashboardModule { }
