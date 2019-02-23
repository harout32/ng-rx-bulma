import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './components/login/login.component';
import { ForgetPassComponent } from './components/forget-pass/forget-pass.component';
import { AuthPageComponent } from './auth-page/auth-page.component';

import * as fromAdmin from './auth.reducer';
import { AuthEffects } from './auth.effects';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthPageComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'password-recover', component: ForgetPassComponent },
      { path: '**', redirectTo: '/auth/login' }
    ]
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', fromAdmin.AdminReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [],
  declarations: [LoginComponent, ForgetPassComponent, AuthPageComponent]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: []
    };
  }
}
