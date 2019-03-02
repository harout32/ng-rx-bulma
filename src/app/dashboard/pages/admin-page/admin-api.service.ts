import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models';
import { delay, map, switchMap } from 'rxjs/operators';
import { timer, of, Observable } from 'rxjs';

@Injectable()
export class AdminApiService {
  constructor(private httpClient: HttpClient) {}
  getUsersByName(name: string) {
    const userData = JSON.parse(sessionStorage.getItem('user')) as User;
    return this.httpClient.get<User[]>('assets/users.json').pipe(
      map((usersResponse: User[]) => {
        return usersResponse.filter(
          user =>
            user.name.includes(name) && name !== '' && user.id !== userData.id
        );
      }),
      delay(1000)
    );
  }
  deleteUserById(id) {
    console.log({ id }, 'delete');
    return this.httpClient
      .get<User[]>('assets/users.json')
      .pipe(switchMap(() => timer(1000)));
  }
  editUserById(id: number, data: User): Observable<User> {
    console.log({ id }, 'edit');
    return this.httpClient.get<User[]>('assets/users.json').pipe(
      switchMap(() => of(data)),
      delay(1000)
    );
  }
  validateUserName(userName: string) {
    return this.httpClient.get<User[]>('assets/users.json').pipe(
      map((usersResponse: User[]) => {
        return usersResponse.filter(user => {
          return user.name === userName;
        });
      }),
      delay(3000)
    );
  }
}
