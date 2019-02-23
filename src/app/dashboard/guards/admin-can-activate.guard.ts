import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { isAdmin } from 'src/app/auth/auth.selectors';
import { take } from 'rxjs/operators';

@Injectable()
export class AdminCanActivateGuard implements CanActivate {
    constructor(private store: Store<State>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.pipe(
            select(isAdmin),
            take(1)
        );
    }
}