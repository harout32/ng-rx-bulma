import { Injectable } from '@angular/core';

import { delay, map, tap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User, UserEdit } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

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

  validateUserName(userName: string) {
    return this.http.get<User[]>('assets/users.json').pipe(
      map((usersResponse: User[]) => {
        const currentUser = JSON.parse(sessionStorage.getItem('user')) as User;
        const curretUserId = currentUser ? currentUser.id : null;
        return usersResponse.filter(user => user.name === userName && curretUserId !== user.id);
      }),
      delay(3000)
    );
  }
  editUser(userData: UserEdit) {
    return of({ message: 'successfuly user updated', status: 200 }).pipe(
      delay(3000),
      tap(console.log)
    );
  }
}
