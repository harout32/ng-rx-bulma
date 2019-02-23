import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidUserName } from '../../../validators';
import { Store, select } from '@ngrx/store';
import { State } from '../../../reducers';
import { LoginApi } from '../../auth.actions';
import { isLoading } from '../../auth.selectors';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  constructor(private fb: FormBuilder, private store: Store<State>) {}

  ngOnInit() {
    this.isLoading$ = this.store.pipe(select(isLoading), shareReplay());
    this.loginForm = this.fb.group({
      name: ['', [Validators.required, ValidUserName]],
      password: ['', Validators.required]
    });
  }
  isFieldTouched(fieldName: string) {
    return this.loginForm.get(fieldName).touched;
  }
  onSubmit() {
    this.store.dispatch(new LoginApi(this.loginForm.value));
  }
}
