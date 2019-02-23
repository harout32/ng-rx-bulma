import { Injectable, Component } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modal$: Subject<any> = new Subject();
  private close$: Subject<any> = new Subject();
  constructor() { }
  create<T>(component: any, inputs?: { [key: string]: any }): Observable<any> {
    this.modal$.next({component, inputs});
    return this.close$.asObservable()
    .pipe(take(1));
  }
  close(data: any = null) {
    this.close$.next(data);
  }
  onModalClosed() {
    return this.close$.asObservable();
  }
  onModalCreated() {
    return this.modal$.asObservable();
  }
}
