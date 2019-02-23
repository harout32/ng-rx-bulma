import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { isAdmin } from 'src/app/auth/auth.selectors';
import { tap, map, takeWhile, switchMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class AdminCanLoadGuard implements CanLoad {
    constructor(private store: Store<State>) { }

    canLoad(route: Route): Observable<boolean> {
        return this.store.pipe(
            select(isAdmin),
            take(1)
        );
    }
}
