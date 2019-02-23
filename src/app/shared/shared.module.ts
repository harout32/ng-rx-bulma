import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
  TranslateModule,
  TranslateLoader,
  TranslatePipe
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouterModule } from '@angular/router';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/lang-', '.json');
}

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    TranslateModule.forChild(),
    RouterModule,
    FormsModule
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    TranslateModule,
    RouterModule,
    FormsModule
  ],
  declarations: [],
  providers: []
})
export class SharedModule {}
