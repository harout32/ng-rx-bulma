import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models';
import { delay, map } from 'rxjs/operators';

@Injectable()
export class AdminApiService {
    constructor(private httpClient: HttpClient) { }
    getUsersByName(name: string) {
        return this.httpClient.get<User[]>('assets/users.json').pipe(
            map((usersResponse: User[]) => {
                return usersResponse.filter(user => user.name.includes(name) && name !== '');
            }),
            delay(500)
        );
    }
}
