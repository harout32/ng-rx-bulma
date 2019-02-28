import { Injectable } from '@angular/core';

import { delay, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User, UserEdit } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) { }

  login(userName: string, password: string) {
    return this.http.get<User[]>('assets/users.json').pipe(
      map(res =>
        res.find(user => user.name === userName && user.password === password)
      ),
      delay(3000),
      tap(res => {
        if (!res) {
          throw new Error('invalidLogin');
        }
      })
    );
  }
  editUser(userData: UserEdit) {
    return of(userData).pipe(
      delay(3000),
      tap(console.log)
    );
  }
}
