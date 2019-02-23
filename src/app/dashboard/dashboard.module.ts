import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { SharedModule } from '../shared/shared.module';
import { AdminCanLoadGuard } from './guards/admin-can-load.guard';
import { AdminCanActivateGuard } from './guards/admin-can-activate.guard';
import { DashboardSharedComponentsModule } from '../shared/dashboard-shared-components.module';
import { ModalComponent } from './modal/modal.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/profile/personal-info' },
      {
        path: 'profile',
        component: ProfilePageComponent,
        children: [
          { path: 'personal-info', component: PersonalInfoComponent },
          { path: '', pathMatch: 'full', redirectTo: '/profile/personal-info' }
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
    RouterModule.forChild(routes)
  ],
  exports: [],
  declarations: [
    ProfilePageComponent,
    NotFoundPageComponent,
    DashboardLayoutComponent,
    ModalComponent
  ],

  providers: [AdminCanLoadGuard, AdminCanActivateGuard]
})
export class DashboardModule {}
