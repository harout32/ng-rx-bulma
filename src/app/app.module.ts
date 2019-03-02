import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { reducers, metaReducers } from './reducers';
import { environment } from '../environments/environment';
import { AuthModule } from './auth/auth.module';
import { NotificationComponent } from './notifications/notification/notification.component';
import { NotificationsEffects } from './notifications/notifications.effects';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { HttpMainInterceptor } from './interceptors/http-main.interceptor';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/lang-', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
    // TranslatePipe
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule.forRoot(),
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
  }),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([NotificationsEffects]),
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpMainInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
